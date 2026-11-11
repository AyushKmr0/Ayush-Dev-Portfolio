import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import { env } from "./config/env.js";
import healthRoutes from "./modules/health/health.routes.js";
import contactRoutes from "./modules/contact/contact.routes.js";

const app = express();

app.use(helmet());

app.use(
	cors({
		origin: env.CLIENT_ORIGIN,
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/health", healthRoutes);
app.use(
	"/api/v1/contact",
	rateLimit({
		windowMs: 15 * 60 * 1000,
		limit: 5,
		standardHeaders: "draft-8",
		legacyHeaders: false,
		message: {
			success: false,
			message: "Too many messages submitted. Please try again later.",
		},
	}),
	contactRoutes,
);

app.use("/api/v1", (_req, res) => {
	res.status(404).json({ success: false, message: "API route not found." });
});

app.use(
	(error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
		console.error("Unhandled API error:", error);
		res.status(500).json({
			success: false,
			message: "An unexpected server error occurred.",
		});
	},
);

export default app;
