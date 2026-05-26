import {
  getLinkAnalytics,
  getDashboardStats,
} from "../../services/analyticsService.js";

export default async function analyticsRoute(fastify) {
  const auth = { preHandler: [fastify.authenticate] };

  fastify.get("/dashboard", auth, async (req, reply) => {
    const stats = await getDashboardStats(req.user.id);
    return reply.send(stats);
  });

  fastify.get("/:linkId", auth, async (req, reply) => {
    const days = parseInt(req.query.days || "30");
    try {
      const data = await getLinkAnalytics(req.params.linkId, req.user.id, days);
      return reply.send(data);
    } catch (err) {
      return reply.code(404).send({ error: err.message });
    }
  });
}
