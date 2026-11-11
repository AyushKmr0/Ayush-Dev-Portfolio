import { asyncHandler } from "../../shared/async-handler.js";
import type { ContactMessageInput } from "./contact.schema.js";
import { contactService } from "./contact.service.js";

export const sendContactMessage = asyncHandler(async (req, res) => {
	try {
		await contactService.send(req.body as ContactMessageInput);

		res.status(202).json({
			success: true,
			message: "Your email was accepted for delivery.",
		});
	} catch (error) {
		console.error(
			"Contact email delivery failed:",
			error instanceof Error ? error.name : "Unknown error",
		);
		res.status(503).json({
			success: false,
			message: "Email delivery is temporarily unavailable. Please try again later.",
		});
	}
});
