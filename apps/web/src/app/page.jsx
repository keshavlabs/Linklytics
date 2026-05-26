import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-brand-400">Linklytics</span>
        <div className="flex gap-3">
          <Link href="/login" className="btn-secondary text-sm">
            Log in
          </Link>
          <Link href="/register" className="btn-primary text-sm">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-brand-950 border border-brand-800 text-brand-300 text-xs font-medium px-3 py-1 rounded-full mb-6">
          ✦ Free during beta
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Short links.
          <br />
          Real insights.
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Shorten URLs, generate QR codes, and track every click with geo,
          device, and browser analytics — all in one dashboard.
        </p>
        <Link href="/register" className="btn-primary text-base px-8 py-3">
          Start for free →
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 pb-24 max-w-5xl mx-auto w-full">
        {[
          {
            icon: "⚡",
            title: "Instant Shortening",
            desc: "Create short links in seconds with custom slugs and expiry dates.",
          },
          {
            icon: "📊",
            title: "Deep Analytics",
            desc: "Track clicks by country, device, browser, and referrer in real time.",
          },
          {
            icon: "🔷",
            title: "QR Code Generator",
            desc: "Generate and download QR codes for any link — PNG or SVG.",
          },
        ].map((f) => (
          <div key={f.title} className="card p-6">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-gray-800 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Linklytics. Built with Next.js + Fastify.
      </footer>
    </main>
  );
}
