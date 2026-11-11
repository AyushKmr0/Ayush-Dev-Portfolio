import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact.schema";

describe("contactSchema", () => {
	it("accepts valid contact details", () => {
		const result = contactSchema.safeParse({
			name: "Ayush Kumar",
			email: "ayush@example.com",
			subject: "Job opportunity",
			message: "I would like to discuss a development opportunity.",
		});

		expect(result.success).toBe(true);
	});

	it("rejects an invalid email address", () => {
		const result = contactSchema.safeParse({
			name: "Ayush Kumar",
			email: "invalid-email",
			subject: "Job opportunity",
			message: "I would like to discuss a development opportunity.",
		});

		expect(result.success).toBe(false);
	});

	it("rejects a name shorter than two characters", () => {
		const result = contactSchema.safeParse({
			name: "A",
			email: "ayush@example.com",
			subject: "Job opportunity",
			message: "I would like to discuss a development opportunity.",
		});

		expect(result.success).toBe(false);
	});

	it("rejects an empty message", () => {
		const result = contactSchema.safeParse({
			name: "Ayush Kumar",
			email: "ayush@example.com",
			subject: "Job opportunity",
			message: "",
		});

		expect(result.success).toBe(false);
	});
});
