import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";

const startServer = async () => {
	const server = app.listen(env.PORT, () => {
		console.log(`Server running on port ${env.PORT}`);
		console.log(`Environment: ${env.NODE_ENV}`);
	});

	const shutdown = async (signal: string) => {
		console.log(`${signal} received. Shutting down...`);

		server.close(() => {
			process.exit(0);
		});
	};

	process.on("SIGTERM", () => void shutdown("SIGTERM"));
	process.on("SIGINT", () => void shutdown("SIGINT"));
};

void startServer();
