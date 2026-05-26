import Fastify from "fastify";
import { env } from "./config/env.js";
import cors from "../src/plugins/cors.js";
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
    fastify.log.info(`API running at http://${env.HOST}:${env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

const shutdown = async () => {
  try {
    await fastify.close();
    await prisma.$disconnect();
  } catch (err) {
    fastify.log.error(err);
  } finally {
    process.exit(0);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
