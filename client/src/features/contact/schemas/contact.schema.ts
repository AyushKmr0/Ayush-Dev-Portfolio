import { z } from "zod";

export const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Name must contain at least 2 characters.")
		.max(60, "Name cannot exceed 60 characters."),

	email: z
		.string()
		.trim()
		.email("Please enter a valid email address.")
		.max(254, "Email address is too long."),

	subject: z
		.string()
		.trim()
		.min(3, "Subject must contain at least 3 characters.")
		.max(100, "Subject cannot exceed 100 characters."),

	message: z
		.string()
		.trim()
		.min(10, "Message must contain at least 10 characters.")
		.max(2000, "Message cannot exceed 2000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
