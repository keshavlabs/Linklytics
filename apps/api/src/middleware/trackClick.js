import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import prisma from "../prisma/client.js";

export async function trackClick(linkId, req) {
  try {
    const ua = UAParser(req.headers["user-agent"] || "");
    const ip = req.ip === "::1" ? "127.0.0.1" : req.ip;
    const geo = geoip.lookup(ip);

    await prisma.analytics.create({
      data: {
        linkId,
        ip,
        country: geo?.country || null,
        city: geo?.city || null,
        device: ua.device?.type || "desktop",
        browser: ua.browser?.name || null,
        os: ua.os?.name || null,
        referrer: req.headers.referrer || null,
      },
    });

    await prisma.link.update({
      where: { id: linkId },
      data: { clicks: { increment: 1 } },
    });
  } catch (err) {
    console.error("Analytics tracking error:", err);
  }
}
