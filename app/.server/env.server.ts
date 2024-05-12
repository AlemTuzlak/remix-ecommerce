import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.string(),
  TEST: z.boolean({ coerce: true }),
});

let env: ReturnType<typeof initEnv>;

export const initEnv = () => {
  const envData = envSchema.safeParse(process.env);
  if (!envData.success) {
    console.error(
      "❌ Invalid environment variables:",
      envData.error.flatten().fieldErrors
    );

    throw new Error("Invalid environment variables");
  }
  env = envData.data;

  console.log("✅ Environment variables loaded successfully");
  return envData.data;
};

export const getServerEnv = () => env;

export const getClientEnv = () => {
  const serverEnv = env;
  return {
    NODE_ENV: serverEnv.NODE_ENV,
  };
};

export type CLIENT_ENV = ReturnType<typeof getClientEnv>;
type APP_ENV = z.infer<typeof envSchema>;

declare global {
  interface Window {
    env: CLIENT_ENV;
  }
  namespace NodeJS {
    interface ProcessEnv extends APP_ENV {}
  }
}
