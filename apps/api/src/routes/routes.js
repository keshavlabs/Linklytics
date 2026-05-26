import authRoutes from "./auth/authRoutes.js";
import analyticsRoutes from "./analytics/analyticsRoutes.js";
import linkRoutes from "./links/linksRoutes.js";
import redirectRoutes from "./redirect/redirectRoutes.js";

export default async function routes(fastify) {
  fastify.register(authRoutes, { prefix: "/api/auth" });
  fastify.register(linkRoutes, { prefix: "/api/links" });
  fastify.register(analyticsRoutes, { prefix: "/api/analytics" });
  fastify.register(redirectRoutes);
}
