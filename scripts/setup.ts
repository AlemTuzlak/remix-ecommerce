import { spawn } from "child_process";
import prompt from "prompt";
import dotenv from "dotenv";
import chalk from "chalk";
// add all the env you wish here
const ENVIRONMENTS = ["stage", "prod", "test"];

const getEnvInfo = () => {
  // Gets the environment from the command line arguments if set, otherwise defaults to dev
  const env = process.argv.find((arg) => ENVIRONMENTS.includes(arg)) ?? "";
  // Sets the environment name to be console logged for info
  const envName = env !== "" ? env : "dev";
  // Allows for reading from .env .env.prod .env.stage etc
  const path = `.env${env ? `.${env}` : ""}`;
  return { env, envName, path };
};

// Helper method used to confirm the run
const confirmRun = async () => {
  const { envName } = getEnvInfo();
  console.log(
    `About to execute the command in ${chalk.bold.red(envName)} environment.`
  );

  const { sure } = await prompt.get([
    {
      name: "sure",
      description: "Are you sure? (y/n)",
      type: "string",
      required: true,
    },
  ]);

  if (sure !== "y") {
    console.log(chalk.bold.red("Command aborted!\n"));
    process.exit(1);
  }
};

const setupEnv = () => {
  const { envName, path } = getEnvInfo();
  console.log(chalk.green(`Loading environment: ${envName}`));
  dotenv.config({ path });
  console.log(
    `Environment loaded: ${chalk.green(envName)} from ${chalk.green(path)}`
  );
};

if (!process.argv[2]) {
  chalk.red("Missing command to run argument");
  process.exit(1);
}
// Injects .env variables into the process
setupEnv();

// Main command to run
const main = () => {
  // Allows us to run scripts from the scripts folder without having to wrap them in package.json with npm run execute
  const command = process.argv[2].startsWith("scripts/")
    ? `npm run execute ${process.argv[2]}`
    : process.argv[2];
  // Filter out the script command and the environment (the slice(3) part) and remove our custom args and pass everything else down
  const filteredArgs = process.argv
    .slice(3)
    .filter((arg) => !ENVIRONMENTS.includes(arg) && arg !== "confirm");
  // Spawns a child process with the command to run
  // param 1 - command to run
  // param 2 - arguments to pass to the command
  // param 3 - options for the child process
  const child = spawn(command, filteredArgs, {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true,
  });
  // If the child process exits, exit the parent process too if the exit code is not 0
  child.on("exit", (exitCode) => {
    if (exitCode !== 0) {
      process.exit(exitCode ?? 1);
    }
  });
  //
  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => {
      // Kills the child only if it is still connected and alive
      if (child.connected) {
        child.kill(child.pid);
      }
      process.exit(1);
    });
  });
};
// Makes the user confirm the run if the confirm argument is passed
if (process.argv.includes("confirm")) {
  confirmRun()
    .then(() => {
      main();
    })
    .catch(() => process.exit(1));

  // If the confirm argument is not passed, just run the command
} else {
  main();
}
