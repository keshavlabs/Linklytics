"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@repo/shared/validators";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
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
            Create an account
          </h1>

          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Free — no credit card required
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((d) => registerUser.mutate(d))}
          className="card p-5 sm:p-8 space-y-5 rounded-2xl"
        >
          {/* Name */}
          <div>
            <label className="label block mb-2 text-sm sm:text-base">
              Name
            </label>

            <input
              className="input w-full h-11 sm:h-12 text-sm sm:text-base"
              placeholder="Jane Smith"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

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
              placeholder="Min 8 characters"
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
            disabled={registerUser.isPending}
            className="btn-primary w-full h-11 sm:h-12 text-sm sm:text-base"
          >
            {registerUser.isPending ? "Creating account…" : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm sm:text-base mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
