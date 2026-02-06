'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function CartDrawer() {
  const { items, isOpen, total, removeItem, clearCart, closeCart } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [newItemId, setNewItemId] = useState<string | null>(null)
  const [prevItemCount, setPrevItemCount] = useState(items.length)

  // Track new items being added
  useEffect(() => {
    if (items.length > prevItemCount && items.length > 0) {
      const lastItem = items[items.length - 1]
      setNewItemId(lastItem.id)
      setTimeout(() => setNewItemId(null), 600)
    }
    setPrevItemCount(items.length)
  }, [items, prevItemCount])

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      setIsClosing(false)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      closeCart()
      setIsAnimating(false)
      setIsClosing(false)
    }, 250)
  }

  if (!isOpen && !isAnimating) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isClosing ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          animation: !isClosing ? 'slide-in-right 0.3s ease-out' : undefined
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Your Cart</h2>
              <p className="text-sm text-zinc-500">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
              <p className="text-zinc-500 mb-6">
                Add some tapes to get started on your lofi journey
              </p>
              <Link
                href="/browse"
                onClick={handleClose}
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105"
              >
                Browse Tapes
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-800 transition-all duration-300 ${
                    newItemId === item.id ? 'animate-item-pop ring-2 ring-amber-500/50' : ''
                  }`}
                  style={{
                    animation: newItemId === item.id ? 'item-pop 0.4s ease-out' : undefined,
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {/* Album art placeholder */}
                  <Link 
                    href={`/albums/${item.albumSlug}`}
                    onClick={handleClose}
                    className="flex-shrink-0"
                  >
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center transition-transform hover:scale-105"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.coverGradient.primary}, ${item.coverGradient.secondary})` 
                      }}
                    >
                      <div className="w-8 h-5 bg-zinc-900/50 rounded-sm flex items-center justify-center gap-1">
                        <div className="w-2 h-2 border border-zinc-600 rounded-full" />
                        <div className="w-2 h-2 border border-zinc-600 rounded-full" />
                      </div>
                    </div>
                  </Link>
                  
                  {/* Item details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/albums/${item.albumSlug}`}
                      onClick={handleClose}
                      className="font-medium text-white hover:text-amber-500 transition-colors text-sm block truncate"
                    >
                      {item.title}
                    </Link>
                    <Link 
                      href={`/artists/${item.artistSlug}`}
                      onClick={handleClose}
                      className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors truncate block"
                    >
                      {item.artistName}
                    </Link>
                    <p className="text-sm font-semibold text-amber-500 mt-1">
                      ${item.price}
                    </p>
                  </div>

                  {/* Remove button */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-all hover:scale-110"
                    title="Remove from cart"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-zinc-800 space-y-4">
            {/* Clear cart */}
            <div className="flex items-center justify-between">
              <button 
                onClick={clearCart}
                className="text-sm text-zinc-500 hover:text-red-400 transition-colors"
              >
                Clear cart
              </button>
              <div className="text-right">
                <p className="text-sm text-zinc-500">Total</p>
                <p className="text-2xl font-bold text-white">${total.toFixed(2)}</p>
              </div>
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold px-6 py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Proceed to Checkout
            </Link>

            {/* Security note */}
            <p className="text-xs text-zinc-500 text-center flex items-center justify-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure checkout powered by Stripe
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes item-pop {
          0% {
            opacity: 0;
            transform: scale(0.8) translateX(20px);
          }
          50% {
            transform: scale(1.02) translateX(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }
      `}</style>
    </>
  )
}
