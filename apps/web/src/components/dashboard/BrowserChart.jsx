"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#4f63ff", "#06b6d4", "#8b5cf6", "#f59e0b", "#10b981"];

export default function BrowserChart({ data = [] }) {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Browsers</h3>
      {data.length === 0 ? (
        <p className="text-gray-600 text-sm text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} layout="vertical">
            <XAxis
              type="number"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="browser"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: 8,
              }}
              itemStyle={{ color: "#818cf8" }}
            />
            <Bar dataKey="clicks" radius={[0, 4, 4, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
