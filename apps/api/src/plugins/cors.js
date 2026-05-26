import cors from "@fastify/cors";
import { env } from "../config/env.js";

export default async function corsPlugin(fastify) {
  fastify.register(cors, {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
}
