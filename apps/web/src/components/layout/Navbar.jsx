'use client'

import { useAuthStore } from '@/store/authStore'

export default function Navbar() {
  const { user } = useAuthStore()

  return (
    <header className="h-14 border-b border-gray-800 bg-gray-900 px-6 flex items-center justify-between flex-shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold text-white">
          {user?.name?.[0]?.toUpperCase() || '?'}
        </div>
        <span className="text-sm text-gray-300">{user?.name}</span>
      </div>
    </header>
  )
}
