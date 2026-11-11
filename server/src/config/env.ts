import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(5000),

  CLIENT_ORIGIN: z.string().url(),
  CONTACT_TO_EMAIL: z.string().trim().email(),
  RESEND_API_KEY: z
    .string()
    .trim()
    .regex(/^re_\S+$/, "must be a Resend API key beginning with re_"),
  RESEND_FROM: z.string().trim().min(3),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment configuration:");
  console.error(result.error.flatten().fieldErrors);

  process.exit(1);
}

export const env = result.data;
