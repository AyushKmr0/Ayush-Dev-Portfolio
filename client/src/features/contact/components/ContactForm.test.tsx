import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

vi.mock("../services/contact.service", () => ({
	sendContactMessage: vi.fn().mockResolvedValue({
		success: true,
		message: "Message sent successfully.",
	}),
}));

describe("ContactForm", () => {
	it("renders all form fields", () => {
		render(<ContactForm />);

		expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^subject$/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^message$/i)).toBeInTheDocument();

		expect(
			screen.getByRole("button", { name: /send message/i }),
		).toBeInTheDocument();
	});

	it("displays validation errors for empty fields", async () => {
		const user = userEvent.setup();

		render(<ContactForm />);

		await user.click(screen.getByRole("button", { name: /send message/i }));

		expect(
			await screen.findByText(/name must contain at least 2 characters/i),
		).toBeInTheDocument();

		expect(
			screen.getByText(/please enter a valid email address/i),
		).toBeInTheDocument();
	});

	it("accepts valid form details", async () => {
		const user = userEvent.setup();

		render(<ContactForm />);

		await user.type(screen.getByLabelText(/^name$/i), "Ayush Kumar");
		await user.type(screen.getByLabelText(/^email$/i), "ayush@example.com");
		await user.type(
			screen.getByLabelText(/^subject$/i),
			"Portfolio Collaboration",
		);
		await user.type(
			screen.getByLabelText(/^message$/i),
			"I would like to discuss a project collaboration.",
		);

		await user.click(screen.getByRole("button", { name: /send message/i }));

		const successMessage = await screen.findByRole("status");

		expect(successMessage).toHaveTextContent(/message sent successfully/i);
	});
});
