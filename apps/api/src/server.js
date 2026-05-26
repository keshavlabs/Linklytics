import Fastify from "fastify";
import { env } from "./config/env.js";
import redis from "./config/redis.js";
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
