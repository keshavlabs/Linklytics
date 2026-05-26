import prisma from "../prisma/client.js";
import dayjs from "dayjs";

export async function getLinkAnalytics(linkId, userId, days = 30) {
  const link = await prisma.link.findFirst({ where: { id: linkId, userId } });
  if (!link) throw new Error("Link not found");

  const since = dayjs().subtract(days, "day").toDate();

  const [
    clicksOverTime,
    topCountries,
    topBrowsers,
    topDevices,
    topReferrers,
    totalClicks,
  ] = await Promise.all([
    prisma.$queryRaw`
        SELECT DATE ("createdAt") as date, COUNT (*)::int as clicks
        FROM analytics
        WHERE "linkId" = ${linkId} AND "createdAt" >= ${since}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
        `,

    prisma.analytics.groupBy({
      by: ["country"],
      where: { linkId, createdAt: { gte: since }, browser: { not: null } },
      _count: { country: true },
      orderBy: { _count: { country: "desc" } },
      take: 10,
    }),

    prisma.analytics.groupBy({
      by: ["browser"],
      where: { linkId, createdAt: { gte: since }, browser: { not: null } },
      _count: { browser: true },
      orderBy: { _count: { browser: "desc" } },
      take: 5,
    }),

    prisma.analytics.groupBy({
      by: ["device"],
      where: { linkId, createdAt: { gte: since } },
      _count: { device: true },
      orderBy: { _count: { device: "desc" } },
    }),

    prisma.analytics.groupBy({
      by: ["referrer"],
      where: { linkId, createdAt: { gte: since }, referrer: { not: null } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: "desc" } },
      take: 5,
    }),

    prisma.analytics.count({ where: { linkId, createdAt: { gte: since } } }),
  ]);

  return {
    link,
    totalClicks,
    clicksOverTime,
    topCountries: topCountries.map((r) => ({
      country: r.country,
      clicks: r._count.country,
    })),
    topBrowsers: topBrowsers.map((r) => ({
      browser: r.browser,
      clicks: r._count.browser,
    })),
    topDevices: topDevices.map((r) => ({
      device: r.device || "unknown",
      clicks: r._count.device,
    })),
    topReferrers: topReferrers.map((r) => ({
      referrer: r.referrer,
      clicks: r._count.referrer,
    })),
  };
}

export async function getDashboardStats(userId) {
  const since = dayjs().subtract(30, "day").toDate();

  const [totalLinks, totalClicks, recentClicks, topLinks] = await Promise.all([
    prisma.link.count({ where: { userId } }),
    prisma.link.aggregate({ where: { userId }, _sum: { clicks: true } }),
    prisma.analytics.count({
      where: { link: { userId }, createdAt: { gte: since } },
    }),
    prisma.link.findMany({
      where: { userId },
      orderBy: { clicks: "desc" },
      take: 5,
      select: {
        id: true,
        slug: true,
        title: true,
        originalUrl: true,
        clicks: true,
      },
    }),
  ]);

  return {
    totalLinks,
    totalClicks: totalClicks._sum.clicks || 0,
    recentClicks,
    topLinks,
  };
}
