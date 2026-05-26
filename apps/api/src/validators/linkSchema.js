export {
  registerSchema,
  loginSchema,
  createLinkSchema,
  updateLinkSchema,
  paginationSchema,
} from "@repo/shared/validators";

import { z } from "zod";

export const qrQuerySchema = z.object({
  format: z.enum(["png", "svg"]).default("png"),
  size: z.coerce.number().int().min(64).max(1024).default(300),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color")
    .default("#000000"),
  bg: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color")
    .default("#ffffff"),
});

export const analyticsQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(365).default(30),
});
