"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4f63ff", "#06b6d4", "#8b5cf6", "#f59e0b"];

export default function DeviceChart({ data = [] }) {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-medium text-gray-400 mb-4">
        Device breakdown
      </h3>
      {data.length === 0 ? (
        <p className="text-gray-600 text-sm text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="clicks"
              nameKey="device"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: 8,
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend
              formatter={(v) => (
                <span style={{ color: "#9ca3af", fontSize: 12 }}>{v}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
