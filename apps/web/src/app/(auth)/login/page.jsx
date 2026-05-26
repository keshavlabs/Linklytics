"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@repo/shared/validators";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link
            href="/"
            className="text-3xl sm:text-4xl font-bold text-brand-400"
          >
            Linklytics
          </Link>

          <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-4">
            Welcome back
          </h1>

          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Log in to your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((d) => login.mutate(d))}
          className="card p-5 sm:p-8 space-y-5 rounded-2xl"
        >
          {/* Email */}
          <div>
            <label className="label block mb-2 text-sm sm:text-base">
              Email
            </label>

            <input
              type="email"
              className="input w-full h-11 sm:h-12 text-sm sm:text-base"
              placeholder="you@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label block mb-2 text-sm sm:text-base">
              Password
            </label>

            <input
              type="password"
              className="input w-full h-11 sm:h-12 text-sm sm:text-base"
              placeholder="••••••••"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={login.isPending}
            className="btn-primary w-full h-11 sm:h-12 text-sm sm:text-base"
          >
            {login.isPending ? "Logging in…" : "Log in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm sm:text-base mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
