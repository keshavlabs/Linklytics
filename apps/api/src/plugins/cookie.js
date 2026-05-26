import cookie from "@fastify/cookie";

export default async function cookiePlugin(fastify) {
  fastify.register(cookie, {
    secret: process.env.JWT_SECRET || "keshav-linklytics",
    hook: "onRequest",
    parseOptions: {},
  });
}
