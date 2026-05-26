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

export default function GeoChart({ data = [] }) {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Top countries</h3>
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
              dataKey="country"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={30}
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
                <Cell
                  key={i}
                  fill={`hsl(${230 + i * 8}, 70%, ${60 - i * 4}%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
