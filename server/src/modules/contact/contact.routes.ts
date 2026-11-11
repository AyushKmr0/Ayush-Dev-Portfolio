import { Router } from "express";

import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { sendContactMessage } from "./contact.controller.js";
import { contactMessageSchema } from "./contact.schema.js";

const router = Router();

router.post(
	"/",
	validateRequest(contactMessageSchema),
	sendContactMessage,
);

export default router;
