export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-800 rounded-lg" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-5 h-24 bg-gray-900" />
        ))}
      </div>
      <div className="card h-72 bg-gray-900" />
    </div>
  )
}
