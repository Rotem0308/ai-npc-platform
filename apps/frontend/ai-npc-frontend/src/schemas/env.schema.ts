import { NodeEnv } from "@/constants/env.const";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(NodeEnv),
  DATABASE_URL: z.url(),
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_BACKEND_API_URL: z.url(),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

// Parse and validate process.env
export const env = envSchema.parse(process.env);
