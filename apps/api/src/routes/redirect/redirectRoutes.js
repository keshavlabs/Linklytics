import { resolveSlug } from "../../services/urlService.js";
import { trackClick } from "../../middleware/trackClick.js";

export default async function redirectRoutes(fastify) {
  fastify.get("/:slug", async (req, reply) => {
    const { slug } = req.params;

    const link = await resolveSlug(slug);

    if (!link) {
      return reply.code(404).send({ error: "Short link not found or expired" });
    }

    setImmediate(() => trackClick(link.id, req));
    return reply.redirect(link.originalUrl, 302);
  });
}
