import { env } from "../../config/env.js";
import type { ContactMessageInput } from "./contact.schema.js";

const escapeHtml = (value: string): string =>
	value.replace(/[&<>"']/g, (character) => {
		const entities: Record<string, string> = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		};
		return entities[character] ?? character;
	});

export const sendContactEmail = async (
	input: ContactMessageInput,
): Promise<void> => {
	const safeSubject = input.subject.replace(/[\r\n]+/g, " ");
	const safeName = escapeHtml(input.name);
	const safeEmail = escapeHtml(input.email);
	const safeSubjectHtml = escapeHtml(safeSubject);
	const safeMessage = escapeHtml(input.message);

	const response = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
		signal: AbortSignal.timeout(10_000),
		body: JSON.stringify({
			from: env.RESEND_FROM,
			to: [env.CONTACT_TO_EMAIL],
			reply_to: input.email,
			subject: `[Portfolio] ${safeSubject}`,
			text: [
			"New message from your portfolio contact form",
			"",
			`Name: ${input.name}`,
			`Email: ${input.email}`,
			`Subject: ${safeSubject}`,
			"",
			"Message:",
			input.message,
			].join("\n"),
			html: `
			<div style="font-family:Arial,sans-serif;line-height:1.6;color:#1e293b;max-width:640px">
				<h2 style="color:#1d4ed8">New portfolio message</h2>
				<p><strong>Name:</strong> ${safeName}</p>
				<p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
				<p><strong>Subject:</strong> ${safeSubjectHtml}</p>
				<hr style="border:0;border-top:1px solid #e2e8f0" />
				<p style="white-space:pre-wrap">${safeMessage}</p>
			</div>
			`,
		}),
	});

	if (!response.ok) {
		const body: unknown = await response.json().catch(() => null);
		const providerMessage =
			typeof body === "object" && body !== null && "message" in body &&
			typeof body.message === "string"
				? body.message
				: response.statusText;
		throw new Error(
			`Resend API request failed (${response.status}): ${providerMessage}`,
		);
	}
};
