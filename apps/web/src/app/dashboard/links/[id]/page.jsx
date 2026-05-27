"use client";

import { use, useState } from "react";
import { useLinkAnalytics } from "@/hooks/useAnalytics";
import ClicksChart from "@/components/dashboard/ClicksChart";
import GeoChart from "@/components/dashboard/GeoChart";
import DeviceChart from "@/components/dashboard/DeviceChart";
import BrowserChart from "@/components/dashboard/BrowserChart";
import StatsCard from "@/components/dashboard/StatsCard";
import CopyButton from "@/components/links/CopyButton";
import Link from "next/link";

const DAYS_OPTIONS = [7, 14, 30, 90];

export default function LinkAnalyticsPage({ params }) {
  const { id } = use(params);
  const [days, setDays] = useState(30);
  const { data, isLoading } = useLinkAnalytics(id, days);

  const shortUrl = data?.link
    ? `${process.env.NEXT_PUBLIC_APP_URL}/${data.link.slug}`
    : "";

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <Link
            href="/dashboard/links"
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            ← Links
          </Link>
          <h1 className="text-2xl font-bold text-white mt-1">
            {data?.link?.title || `/${data?.link?.slug}`}
          </h1>
          {data?.link && (
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-brand-400 text-sm">
                {process.env.NEXT_PUBLIC_APP_URL}/{data.link.slug}
              </span>
              <CopyButton text={shortUrl} />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {DAYS_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                days === d
                  ? "bg-brand-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              label="Total clicks"
              value={data?.link?.clicks}
              icon="⚡"
            />
            <StatsCard
              label={`Clicks (${days}d)`}
              value={data?.totalClicks}
              icon="📈"
            />
            <StatsCard
              label="Countries"
              value={data?.topCountries?.length}
              icon="🌍"
            />
            <StatsCard
              label="Browsers"
              value={data?.topBrowsers?.length}
              icon="🌐"
            />
          </div>

          <ClicksChart data={data?.clicksOverTime || []} />

          <div className="grid md:grid-cols-2 gap-6">
            <GeoChart data={data?.topCountries || []} />
            <DeviceChart data={data?.topDevices || []} />
          </div>

          {/* Browsers & Referrers */}
          <div className="grid md:grid-cols-2 gap-6">
            <BrowserChart data={data?.topBrowsers || []} />

            <div className="card p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                Top referrers
              </h3>
              {data?.topReferrers?.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">
                  No referrer data yet
                </p>
              ) : (
                <div className="space-y-3">
                  {data?.topReferrers?.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className="text-gray-300 truncate max-w-50"
                        title={r.referer}
                      >
                        {r.referer}
                      </span>
                      <span className="font-semibold text-white ml-2 shrink-0">
                        {r.clicks}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
