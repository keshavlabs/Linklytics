import prisma from "../../prisma/client.js";
import {
  createShortLink,
  invalidateSlugCache,
} from "../../services/urlService.js";
import { generateQRCode } from "../../services/qrService.js";
import {
  createLinkSchema,
  updateLinkSchema,
  paginationSchema,
} from "@repo/shared/validators";
import { env } from "../../config/env.js";

export default async function linkRoutes(fastify) {
  const auth = { preHandler: [fastify.authenticate] };

  fastify.get("/", auth, async (req, reply) => {
    const { page, limit } = paginationSchema.parse(req.query);
    const userId = req.user.id;
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      prisma.link.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          slug: true,
          originalUrl: true,
          title: true,
          clicks: true,
          isActive: true,
          expiresAt: true,
          createdAt: true,
        },
      }),
      prisma.link.count({ where: { userId } }),
    ]);

    return reply.send({
      links: links.map((l) => ({ ...l, shortUrl: `${env.APP_URL}/${l.slug}` })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  });

  fastify.post("/", auth, async (req, reply) => {
    const parsed = createLinkSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply
        .code(400)
        .send({ error: "Validation failed", issues: parsed.error.issues });
    }

    try {
      const link = await createShortLink(req.user.id, parsed.data);
      return reply.code(201).send({
        ...link,
        shortUrl: `${env.APP_URL}/${link.slug}`,
      });
    } catch (err) {
      return reply.code(409).send({ error: err.message });
    }
  });

  // GET /api/links/:id — single link details
  fastify.get("/:id", auth, async (req, reply) => {
    const link = await prisma.link.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!link) return reply.code(404).send({ error: "Link not found" });
    return reply.send({ ...link, shortUrl: `${env.APP_URL}/${link.slug}` });
  });

  // PATCH /api/links/:id — update link
  fastify.patch("/:id", auth, async (req, reply) => {
    const parsed = updateLinkSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply
        .code(400)
        .send({ error: "Validation failed", issues: parsed.error.issues });
    }

    const link = await prisma.link.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!link) return reply.code(404).send({ error: "Link not found" });

    const updated = await prisma.link.update({
      where: { id: req.params.id },
      data: {
        ...parsed.data,
        expiresAt: parsed.data.expiresAt
          ? new Date(parsed.data.expiresAt)
          : undefined,
      },
    });

    await invalidateSlugCache(link.slug);
    return reply.send({
      ...updated,
      shortUrl: `${env.APP_URL}/${updated.slug}`,
    });
  });

  // DELETE /api/links/:id
  fastify.delete("/:id", auth, async (req, reply) => {
    const link = await prisma.link.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!link) return reply.code(404).send({ error: "Link not found" });

    await prisma.link.delete({ where: { id: req.params.id } });
    await invalidateSlugCache(link.slug);
    return reply.code(204).send();
  });

  // GET /api/links/:id/qr — generate QR code
  fastify.get("/:id/qr", auth, async (req, reply) => {
    const link = await prisma.link.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!link) return reply.code(404).send({ error: "Link not found" });

    const {
      format = "png",
      size = 300,
      color = "#000000",
      bg = "#ffffff",
    } = req.query;
    const shortUrl = `${env.APP_URL}/${link.slug}`;
    const qr = await generateQRCode(shortUrl, {
      format,
      size: parseInt(size),
      color,
      bg,
    });

    if (format === "svg") {
      reply.header("Content-Type", "image/svg+xml");
      return reply.send(qr);
    }

    return reply.send({ qr, shortUrl });
  });
}
