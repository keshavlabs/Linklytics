"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

export default function ClicksChart({ data = [] }) {
  const formatted = data.map((d) => ({
    date: format(parseISO(d.date), "MMM d"),
    clicks: d.clicks,
  }));

  return (
    <div className="card p-5">
      <h3 className="text-sm font-medium text-gray-400 mb-4">
        Clicks over time
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#111827",
              border: "1px solid #374151",
              borderRadius: 8,
            }}
            labelStyle={{ color: "#e5e7eb" }}
            itemStyle={{ color: "#818cf8" }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#4f63ff"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
