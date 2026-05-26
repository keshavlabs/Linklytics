import { formatNumber } from "@/lib/utils";

export default function StatsCard({ label, value, sub, icon }) {
  return (
    <div className="card p-5 flex items-start gap-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-white mt-0.5">
          {formatNumber(value ?? 0)}
        </p>
        {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
      </div>
    </div>
  );
}
