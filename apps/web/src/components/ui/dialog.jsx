'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export default function Dialog({ open, onClose, title, description, children, className }) {
  const overlayRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose?.() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className={cn(
          'relative z-10 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-md animate-slide-up',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-800">
          <div>
            {title && <h2 className="text-base font-semibold text-white">{title}</h2>}
            {description && <p className="text-sm text-gray-400 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors ml-4 flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
