"use client";

import Link from "next/link";
import { formatDistance } from "date-fns";
import { formatNumber } from "@/lib/utils";
import CopyButton from "./CopyButton";
import { useDeleteLink, useUpdateLink } from "@/hooks/useLinks";

export default function LinkCard({ link }) {
  const deleteLink = useDeleteLink();
  const updateLink = useUpdateLink();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const shortUrl = `${appUrl}/${link.slug}`;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {link.title && (
            <p className="text-sm font-medium text-white mb-1">{link.title}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-blue-400 text-sm">
              {appUrl}/{link.slug}
            </span>
            <CopyButton text={shortUrl} />
            {!link.isActive && (
              <span className="text-xs bg-red-400/10 text-red-400 border border-red-400/20 px-1.5 py-0.5 rounded">
                Paused
              </span>
            )}
            {link.expiresAt && new Date(link.expiresAt) < new Date() && (
              <span className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-1.5 py-0.5 rounded">
                Expired
              </span>
            )}
          </div>
          <p className="text-gray-500 text-xs mt-1 truncate">
            {link.originalUrl}
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Created{" "}
            {formatDistance(new Date(link.createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right mr-2">
            <p className="text-lg font-bold text-white">
              {formatNumber(link.clicks)}
            </p>
            <p className="text-gray-500 text-xs">clicks</p>
          </div>

          <Link
            href={`/dashboard/links/${link.id}`}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Analytics
          </Link>

          <button
            onClick={() =>
              updateLink.mutate({ id: link.id, isActive: !link.isActive })
            }
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            {link.isActive ? "Pause" : "Resume"}
          </button>

          <button
            onClick={() => {
              if (confirm("Delete this link? This cannot be undone.")) {
                deleteLink.mutate(link.id);
              }
            }}
            className="bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
