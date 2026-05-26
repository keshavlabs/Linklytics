import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-bold text-brand-600 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or the short link
          has expired.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
