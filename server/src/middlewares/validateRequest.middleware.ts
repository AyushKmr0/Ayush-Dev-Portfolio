import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validateRequest = <T>(schema: ZodType<T>): RequestHandler =>
	(req, res, next) => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				success: false,
				message: "Please provide valid contact details and a message.",
				errors: result.error.flatten().fieldErrors,
			});
		}

		req.body = result.data;
		next();
	};
