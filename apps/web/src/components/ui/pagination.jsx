'use client'

import { cn } from '@/lib/utils'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const showPages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  )

  let prev = null
  const items = []
  for (const p of showPages) {
    if (prev !== null && p - prev > 1) {
      items.push('...')
    }
    items.push(p)
    prev = p
  }

  return (
    <div className="flex items-center justify-center gap-1 pt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-40"
      >
        ← Prev
      </button>

      {items.map((item, i) =>
        item === '...' ? (
          <span key={`ellipsis-${i}`} className="text-gray-600 px-2">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={cn(
              'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
              item === page
                ? 'bg-brand-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  )
}
