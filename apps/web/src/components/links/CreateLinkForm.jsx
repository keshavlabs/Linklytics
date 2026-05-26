"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateLink } from "@/hooks/useLinks";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Must be a valid URL starting with https://"),
  customSlug: z
    .string()
    .min(3, "Min 3 characters")
    .max(20, "Max 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _")
    .optional()
    .or(z.literal("")),
  expiresAt: z.string().optional(),
  title: z.string().max(100).optional(),
});

export default function CreateLinkForm({ onSuccess }) {
  const createLink = useCreateLink();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createLinkSchema),
  });

  const onSubmit = (data) => {
    // Clean up empty optional fields before sending
    if (!data.customSlug) delete data.customSlug;
    if (!data.title) delete data.title;
    if (data.expiresAt) {
      data.expiresAt = new Date(data.expiresAt).toISOString();
    } else {
      delete data.expiresAt;
    }

    createLink.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="label">Destination URL *</label>
        <input
          className="input"
          placeholder="https://example.com/very/long/url"
          {...register("originalUrl")}
        />
        {errors.originalUrl && (
          <p className="text-red-400 text-xs mt-1">
            {errors.originalUrl.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Custom slug (optional)</label>
          <div className="flex items-center gap-1">
            <span className="text-gray-500 text-sm">lnkly.io/</span>
            <input
              className="input flex-1"
              placeholder="my-link"
              {...register("customSlug")}
            />
          </div>
          {errors.customSlug && (
            <p className="text-red-400 text-xs mt-1">
              {errors.customSlug.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Expires at (optional)</label>
          <input
            type="datetime-local"
            className="input"
            {...register("expiresAt")}
          />
        </div>
      </div>

      <div>
        <label className="label">Title (optional)</label>
        <input
          className="input"
          placeholder="My campaign link"
          {...register("title")}
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={createLink.isPending}
      >
        {createLink.isPending ? "Creating…" : "Create short link"}
      </button>
    </form>
  );
}
