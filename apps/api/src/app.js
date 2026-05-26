import helmetPlugin from "./plugins/helmet.js";
import jwtPlugin from "./plugins/jwt.js";
import rateLimitPlugin from "./plugins/rateLimit.js";
import formbody from "@fastify/formbody";
import routes from "./routes/routes.js";
import { authenticate } from "./middleware/authenticate.js";

export default async function buildApp(fastify) {
  // corsPlugin removed — registered directly in server.js
  await fastify.register(helmetPlugin);
  await fastify.register(formbody);
  await fastify.register(jwtPlugin);
  fastify.decorate("authenticate", authenticate);
  await fastify.register(rateLimitPlugin);
  fastify.get("/health", async () => ({ status: "ok", ts: Date.now() }));
  await fastify.register(routes);
}
