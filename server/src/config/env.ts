import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(5000),

  CLIENT_ORIGIN: z.string().url(),
	GMAIL_USER: z.string().trim().email(),
	GMAIL_APP_PASSWORD: z
		.string()
		.trim()
		.transform((value) => value.replace(/\s+/g, ""))
		.pipe(z.string().length(16, "Gmail App Password must contain 16 characters.")),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment configuration:");
  console.error(result.error.flatten().fieldErrors);

  process.exit(1);
}

export const env = result.data;
