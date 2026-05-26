'use client'

import { useDashboardStats } from '@/hooks/useAnalytics'
import StatsCard from '@/components/dashboard/StatsCard'
import LinksTable from '@/components/dashboard/LinksTable'

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total links" value={data?.totalLinks} icon="⇗" />
        <StatsCard label="Total clicks" value={data?.totalClicks} icon="⚡" />
        <StatsCard label="Clicks (30d)" value={data?.recentClicks} icon="📈" />
        <StatsCard label="Avg CTR" value={data?.totalLinks ? Math.round(data.recentClicks / data.totalLinks) : 0} sub="clicks per link" icon="◎" />
      </div>

      <LinksTable links={data?.topLinks || []} />
    </div>
  )
}
