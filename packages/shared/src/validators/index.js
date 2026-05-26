import { email, z } from "zod";

// Auth
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Links
export const createLinkSchema = z.object({
  originalUrl: z.string().url("Must be a valid URL"),
  customSlug: z
    .string()
    .min(3, "Custom slug must be at least 3 characters")
    .max(20, "Custom slug must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens and underscores")
    .optional(),
  expiresAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Must be a valid date",
    })
    .optional()
    .nullable(),
  title: z.string().max(100).optional(),
});

export const updateLinkSchema = z.object({
  title: z.string().max(100).optional(),
  expiresAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Must be a valid date",
    })
    .optional()
    .nullable(),
  isActive: z.boolean().optional(),
});

// Pagination
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
