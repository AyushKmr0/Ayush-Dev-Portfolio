import nodemailer from "nodemailer";

import { env } from "../../config/env.js";
import type { ContactMessageInput } from "./contact.schema.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: env.GMAIL_USER,
		pass: env.GMAIL_APP_PASSWORD,
	},
	connectionTimeout: 10_000,
	greetingTimeout: 10_000,
	socketTimeout: 20_000,
});

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

	await transporter.sendMail({
		from: { name: "Portfolio Contact Form", address: env.GMAIL_USER },
		to: env.GMAIL_USER,
		replyTo: input.email,
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
	});
};

export const closeContactMailer = (): void => transporter.close();
