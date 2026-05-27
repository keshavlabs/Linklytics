import { nanoid } from "nanoid";
import prisma from "../prisma/client.js";
import redis from "../config/redis.js";

const SLUG_LENGTH = 6;
const CACHE_TTL = 3600;

export async function generateUniqueSlug() {
  let slug;
  let exists = true;
  while (exists) {
    slug = nanoid(SLUG_LENGTH);
    exists = await prisma.link.findUnique({ where: { slug } });
  }
  return slug;
}

export async function createShortLink(userId, data) {
  const slug = data.customSlug || (await generateUniqueSlug());

  if (data.customSlug) {
    const taken = await prisma.link.findUnique({ where: { slug } });
    if (taken) throw new Error("Custom slug already taken");
  }

  return prisma.link.create({
    data: {
      slug,
      originalUrl: data.originalUrl,
      title: data.title || null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      userId,
    },
  });
}

export async function resolveSlug(slug) {
  const cached = await redis.get(`slug: ${slug}`);
  if (cached) return cached;

  const link = await prisma.link.findFirst({
    where: {
      slug,
      isActive: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
  });

  if (!link) return null;
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) return null;
  await redis.set(`slug: ${slug}`, link, { ex: CACHE_TTL });
  return link;
}

export async function invalidateSlugCache(slug) {
  await redis.del(`slug: ${slug}`);
}
