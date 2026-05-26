"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { token, hasHydrated } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for zustand to rehydrate from localStorage
    if (!hasHydrated) return;

    if (!token) {
      router.replace("/login");
      return;
    }

    setReady(true);
  }, [hasHydrated, token, router]);

  // Show spinner while hydrating or redirecting
  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="w-56 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col py-6 px-3">
        <span className="text-lg font-bold text-brand-400 px-3 mb-8 block">
          Linklytics
        </span>
        <nav className="flex-1 space-y-1">
          {[
            { href: "/dashboard", label: "Overview", icon: "◈" },
            { href: "/dashboard/links", label: "Links", icon: "⇗" },
            { href: "/dashboard/qr", label: "QR Codes", icon: "⊞" },
            { href: "/dashboard/settings", label: "Settings", icon: "⚙" },
          ].map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
            >
              <span>{icon}</span>
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-gray-800 bg-gray-900 px-6 flex items-center justify-end">
          <span className="text-sm text-gray-300">Dashboard</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
