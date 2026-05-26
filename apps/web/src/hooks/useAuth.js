"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export function useAuth() {
  const router = useRouter();
  const qc = useQueryClient();
  const { setAuth, logout: storeLogout } = useAuthStore();

  const login = useMutation({
    mutationFn: (data) => api.post("/api/auth/login", data).then((r) => r.data),
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
      toast.success(`Welcome back, ${user.name}!`);
      router.replace("/dashboard");
    },
    onError: (err) => {
      const data = err.response?.data;

      toast.error(
        data?.message || data?.error?.message || data?.error || "Login failed",
      );
    },
  });

  const register = useMutation({
    mutationFn: (data) =>
      api.post("/api/auth/register", data).then((r) => r.data),
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
      toast.success(`Welcome, ${user.name}!`);
      router.replace("/dashboard");
    },
    onError: (err) => {
      const data = err.response?.data;

      toast.error(
        data?.message ||
          data?.error?.message ||
          data?.error ||
          "Registration failed",
      );
    },
  });

  const logout = () => {
    storeLogout();
    qc.clear();
    router.replace("/login");
    toast.success("Logged out");
  };

  return { login, register, logout };
}
