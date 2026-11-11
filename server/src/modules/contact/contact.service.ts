import type { ContactMessageInput } from "./contact.schema.js";
import { sendContactEmail } from "./contact.mailer.js";

export const contactService = {
	send: (input: ContactMessageInput) => sendContactEmail(input),
};
