import helmet from "@fastify/helmet";

export default async function helmetPlugin(fastify) {
  fastify.register(helmet, { contentSecurityPolicy: false });
}
