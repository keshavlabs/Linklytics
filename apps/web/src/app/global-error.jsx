"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">⚠</p>
          <h2 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {error?.message || "An unexpected error occurred."}
          </p>
          <button onClick={reset} className="btn-primary">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
