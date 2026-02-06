'use client'

import { useToast, Toast as ToastType } from '@/contexts/ToastContext'
import { useEffect, useState } from 'react'

function ToastItem({ toast, onRemove }: { toast: ToastType; onRemove: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => {
      setIsVisible(true)
    })

    // Start exit animation before removal
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 2700)

    return () => clearTimeout(exitTimer)
  }, [])

  const icons = {
    success: (
      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/30',
    error: 'bg-red-500/10 border-red-500/30',
    info: 'bg-amber-500/10 border-amber-500/30',
  }

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl
        ${bgColors[toast.type]}
        transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}
    >
      <div className="flex-shrink-0">
        {icons[toast.type]}
      </div>
      <p className="text-sm text-white font-medium">{toast.message}</p>
      <button
        onClick={onRemove}
        className="ml-2 p-1 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-24 right-4 z-[60] flex flex-col gap-2 max-w-sm">
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}
