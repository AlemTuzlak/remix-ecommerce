import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "aaa@aaa.com",
    },
  });
}

main()
  .then(() => {
    console.log(chalk.green("Seed successful"));
  })
  .catch((e) => {
    console.error(e);
    console.log("Error: Seed failed");
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
