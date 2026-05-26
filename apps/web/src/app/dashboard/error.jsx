'use client'

export default function DashboardError({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <p className="text-4xl mb-4">⚠</p>
        <h2 className="text-lg font-semibold text-white mb-2">Failed to load</h2>
        <p className="text-gray-400 text-sm mb-6">{error?.message || 'Something went wrong.'}</p>
        <button onClick={reset} className="btn-primary text-sm">
          Try again
        </button>
      </div>
    </div>
  )
}
