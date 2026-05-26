"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      hasHydrated: false,

      setAuth: (user, token) => {
        localStorage.setItem("token", token);
        set({ user, token });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },

      fetchMe: async () => {
        set({ isLoading: true });
        try {
          const { data } = await api.get("/api/auth/me");
          set({ user: data.user });
        } catch {
          get().logout();
        } finally {
          set({ isLoading: false });
        }
      },

      setHasHydrated: (val) => set({ hasHydrated: val }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
