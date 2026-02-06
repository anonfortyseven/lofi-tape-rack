'use client'

import { Navbar } from '@/components/Navbar'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, total, removeItem, clearCart } = useCart()
  const { user } = useAuth()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState(user?.email || '')

  const handleCheckout = async () => {
    if (items.length === 0) return
    
    setIsProcessing(true)
    
    // Simulate checkout process
    // In production, this would create a Stripe Checkout session
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    
    // For now, just show an alert
    alert('Stripe integration pending. This would redirect to Stripe Checkout.')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        </div>

        <Navbar />

        <main className="relative z-10 pt-24 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-zinc-400 mb-8">
              Looks like you haven&apos;t added any tapes yet. Browse our collection and find your next favorite.
            </p>
            <Link
              href="/browse"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
            >
              Browse Tapes
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <nav className="mb-4">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/browse" className="text-zinc-500 hover:text-white transition-colors">
                    Browse
                  </Link>
                </li>
                <li className="text-zinc-600">/</li>
                <li className="text-zinc-400">Checkout</li>
              </ol>
            </nav>
            <h1 className="text-4xl font-bold text-white">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Items & Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cart Items */}
              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Your Order ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl"
                    >
                      <Link href={`/albums/${item.albumSlug}`}>
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
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
                      
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/albums/${item.albumSlug}`}
                          className="font-medium text-white hover:text-amber-500 transition-colors block truncate"
                        >
                          {item.title}
                        </Link>
                        <p className="text-sm text-zinc-500 truncate">{item.artistName}</p>
                        <p className="text-sm text-zinc-400 mt-1">Digital Download • High Quality MP3 + FLAC</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-white">${item.price}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-zinc-500 hover:text-red-400 transition-colors mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Contact Information
                </h2>
                
                {user ? (
                  <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white">{user.email}</p>
                      <p className="text-sm text-zinc-500">Signed in</p>
                    </div>
                    <div className="ml-auto">
                      <Link href="/profile" className="text-sm text-amber-500 hover:text-amber-400 transition-colors">
                        Edit profile
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-zinc-400 text-sm">
                      Enter your email to receive download links. Already have an account?{' '}
                      <Link href="/login" className="text-amber-500 hover:text-amber-400 transition-colors">
                        Sign in
                      </Link>
                    </p>
                    <div>
                      <label htmlFor="email" className="block text-sm text-zinc-400 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* What You Get */}
              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What&apos;s Included
                </h2>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-800/50 rounded-xl">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-white mb-1">Instant Download</h3>
                    <p className="text-sm text-zinc-500">Download immediately after purchase</p>
                  </div>
                  
                  <div className="p-4 bg-zinc-800/50 rounded-xl">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-white mb-1">Lossless Quality</h3>
                    <p className="text-sm text-zinc-500">MP3 320kbps + FLAC formats</p>
                  </div>
                  
                  <div className="p-4 bg-zinc-800/50 rounded-xl">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-white mb-1">Support Artists</h3>
                    <p className="text-sm text-zinc-500">80% goes directly to creators</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Processing fee</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">Total</span>
                      <span className="font-bold text-2xl text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || (!user && !email)}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-zinc-700 disabled:to-zinc-600 disabled:cursor-not-allowed text-black disabled:text-zinc-400 font-semibold px-6 py-4 rounded-xl transition-all hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-zinc-600 border-t-black rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pay with Stripe
                    </>
                  )}
                </button>

                {/* Security badges */}
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Protected
                  </span>
                </div>

                {/* Money back guarantee */}
                <p className="mt-4 text-xs text-center text-zinc-500">
                  30-day money-back guarantee. No questions asked.
                </p>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full mt-4 py-2 text-sm text-zinc-500 hover:text-red-400 transition-colors"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
