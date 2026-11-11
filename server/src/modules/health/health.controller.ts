import { asyncHandler } from "../../shared/async-handler.js";

export const healthCheck = asyncHandler(async (_req, res) => {
	res.status(200).json({
		success: true,
		message: "Portfolio API is running.",
		data: { api: "healthy", timestamp: new Date().toISOString() },
	});
});
