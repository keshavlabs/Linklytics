export default function LinksLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-between">
        <div className="h-8 w-32 bg-gray-800 rounded-lg" />
        <div className="h-9 w-28 bg-gray-800 rounded-lg" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="card p-4 h-20 bg-gray-900" />
      ))}
    </div>
  );
}
