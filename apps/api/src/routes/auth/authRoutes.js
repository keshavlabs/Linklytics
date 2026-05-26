import {
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile,
  updatePassword,
} from "../../services/authService.js";
import { registerSchema, loginSchema } from "@repo/shared/validators";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Invalid email").optional(),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default async function authRoutes(fastify) {
  fastify.post("/register", async (req, reply) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({
        error: "Validation failed",
        issues: parsed.error.issues,
      });
    }

    try {
      const user = await registerUser(parsed.data);
      const token = fastify.jwt.sign({ id: user.id, email: user.email });
      return reply.code(201).send({ user, token });
    } catch (err) {
      return reply.code(409).send({ error: err.message });
    }
  });

  fastify.post("/login", async (req, reply) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({
        error: "Validation failed",
        issues: parsed.error.issues,
      });
    }

    try {
      const user = await loginUser(parsed.data);
      const token = fastify.jwt.sign({ id: user.id, email: user.email });
      return reply.send({ user, token });
    } catch (err) {
      return reply.code(401).send({ error: err.message });
    }
  });

  fastify.post(
    "/logout",
    { preHandler: [fastify.authenticate] },
    async (req, reply) => {
      // JWT is stateless — logout is handled client-side by deleting the token
      // If you add a token blacklist via Redis in future, invalidate here
      return reply.send({ message: "Logged out successfully" });
    },
  );

  fastify.get(
    "/me",
    { preHandler: [fastify.authenticate] },
    async (req, reply) => {
      const user = await getUserById(req.user.id);
      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }
      return reply.send({ user });
    },
  );

  fastify.patch(
    "/me",
    { preHandler: [fastify.authenticate] },
    async (req, reply) => {
      const parsed = updateProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.code(400).send({
          error: "Validation failed",
          issues: parsed.error.issues,
        });
      }

      // Reject empty body
      if (!parsed.data.name && !parsed.data.email) {
        return reply.code(400).send({ error: "Nothing to update" });
      }

      try {
        const user = await updateUserProfile(req.user.id, parsed.data);
        const token = fastify.jwt.sign({ id: user.id, email: user.email });
        return reply.send({ user, token });
      } catch (err) {
        return reply.code(409).send({ error: err.message });
      }
    },
  );

  fastify.patch(
    "/password",
    { preHandler: [fastify.authenticate] },
    async (req, reply) => {
      const parsed = changePasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.code(400).send({
          error: "Validation failed",
          issues: parsed.error.issues,
        });
      }

      try {
        await updatePassword(
          req.user.id,
          parsed.data.currentPassword,
          parsed.data.newPassword,
        );
        return reply.send({ message: "Password updated successfully" });
      } catch (err) {
        return reply.code(400).send({ error: err.message });
      }
    },
  );
}
