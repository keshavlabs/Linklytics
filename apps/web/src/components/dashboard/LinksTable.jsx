import { truncate, formatNumber } from "@/lib/utils";
import Link from "next/link";

export default function LinksTable({ links = [] }) {
  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-800">
        <h3 className="text-sm font-medium text-gray-400">Top links</h3>
      </div>
      {links.length === 0 ? (
        <p className="text-gray-600 text-sm text-center py-8">No links yet</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-800">
            <tr>
              <th className="text-left px-5 py-3">Link</th>
              <th className="text-right px-5 py-3">Clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {links.map((l) => (
              <tr key={l.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-5 py-3">
                  <Link
                    href={`/dashboard/links/${l.id}`}
                    className="text-brand-400 hover:underline font-mono text-xs"
                  >
                    /{l.slug}
                  </Link>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {truncate(l.originalUrl, 50)}
                  </p>
                </td>
                <td className="px-5 py-3 text-right font-semibold text-white">
                  {formatNumber(l.clicks)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
