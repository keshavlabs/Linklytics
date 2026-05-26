// server.js
import Fastify from "fastify";
import cors from "@fastify/cors"; // ← add this
import { env } from "./config/env.js";
import buildApp from "./app.js";
import prisma from "../../api/src/prisma/client.js";

const fastify = Fastify({
  logger: {
    level: env.NODE_ENV === "production" ? "info" : "debug",
    transport:
      env.NODE_ENV !== "production"
        ? { target: "pino-pretty", options: { colorize: true } }
        : undefined,
  },
});

async function start() {
  try {
    // Register CORS at the top level before anything else
    await fastify.register(cors, {
      origin: (origin, cb) => {
        const allowedOrigins = [
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "https://linklytics-web.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          cb(null, true);
        } else {
          cb(new Error(`Origin ${origin} not allowed`), false);
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    await buildApp(fastify);
    await fastify.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    fastify.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
