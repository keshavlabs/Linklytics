"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { href: "/dashboard", label: "Overview", icon: "◈" },
  { href: "/dashboard/links", label: "Links", icon: "⇗" },
  { href: "/dashboard/qr", label: "QR Codes", icon: "⊞" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-56 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col py-6 px-3">
      <Link
        href="/dashboard"
        className="text-lg font-bold text-brand-400 px-3 mb-8 block"
      >
        Linklytics
      </Link>

      <nav className="flex-1 space-y-1">
        {nav.map(({ href, label, icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-brand-600/20 text-brand-300"
                  : "text-gray-400 hover:text-gray-100 hover:bg-gray-800",
              )}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors w-full"
      >
        <span>⎋</span> Log out
      </button>
    </aside>
  );
}
