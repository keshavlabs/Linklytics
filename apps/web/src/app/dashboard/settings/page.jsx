"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import toast from "react-hot-toast";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
});

const passwordSchema = z
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

function ProfileForm({ user }) {
  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name, email: user?.email },
  });

  useEffect(() => {
    reset({ name: user?.name, email: user?.email });
  }, [user, reset]);

  const update = useMutation({
    mutationFn: (data) => api.patch("/api/auth/me", data).then((r) => r.data),
    onSuccess: ({ user: updated, token }) => {
      setAuth(updated, token);
      toast.success("Profile updated");
    },
    onError: (err) => toast.error(err.response?.data?.error || "Update failed"),
  });

  return (
    <form
      onSubmit={handleSubmit((d) => update.mutate(d))}
      className="space-y-4"
    >
      <div>
        <label className="label">Name</label>
        <input className="input" {...register("name")} />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="label">Email</label>
        <input type="email" className="input" {...register("email")} />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <button type="submit" className="btn-primary" disabled={update.isPending}>
        {update.isPending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function PasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const update = useMutation({
    mutationFn: (data) =>
      api.patch("/api/auth/password", data).then((r) => r.data),
    onSuccess: () => {
      toast.success("Password updated");
      reset();
    },
    onError: (err) =>
      toast.error(err.response?.data?.error || "Failed to update password"),
  });

  return (
    <form
      onSubmit={handleSubmit((d) => update.mutate(d))}
      className="space-y-4"
    >
      <div>
        <label className="label">Current password</label>
        <input
          type="password"
          className="input"
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <p className="text-red-400 text-xs mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      <div>
        <label className="label">New password</label>
        <input
          type="password"
          className="input"
          placeholder="Min 8 characters"
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p className="text-red-400 text-xs mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div>
        <label className="label">Confirm new password</label>
        <input
          type="password"
          className="input"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button type="submit" className="btn-primary" disabled={update.isPending}>
        {update.isPending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  return (
    <div className="space-y-8 animate-slide-up max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account preferences
        </p>
      </div>

      {/* Avatar + info */}
      <div className="card p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-white text-lg">{user?.name}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <p className="text-gray-600 text-xs mt-0.5">
            Member since{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : ""}
          </p>
        </div>
      </div>

      {/* Profile update */}
      <div className="card p-6">
        <h2 className="text-base font-semibold text-white mb-5">
          Profile information
        </h2>
        <ProfileForm user={user} />
      </div>

      {/* Password update */}
      <div className="card p-6">
        <h2 className="text-base font-semibold text-white mb-5">
          Change password
        </h2>
        <PasswordForm />
      </div>

      {/* Danger zone */}
      <div className="card p-6 border-red-900/40">
        <h2 className="text-base font-semibold text-red-400 mb-2">
          Danger zone
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Logging out will clear your session on this device.
        </p>
        <button onClick={logout} className="btn-danger">
          Log out
        </button>
      </div>
    </div>
  );
}
