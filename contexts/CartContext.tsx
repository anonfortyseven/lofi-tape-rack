'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useToast } from './ToastContext'

export interface CartItem {
  id: string
  type: 'album' | 'track'
  title: string
  artistName: string
  artistSlug: string
  albumSlug: string
  price: number
  coverGradient: {
    primary: string
    secondary: string
  }
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  total: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'drift-tapes-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Get toast function - may be undefined if ToastProvider isn't mounted yet
  let showToast: ((message: string, type?: 'success' | 'error' | 'info') => void) | undefined
  try {
    const toast = useToast()
    showToast = toast.showToast
  } catch {
    // ToastProvider not available yet, that's fine
  }

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error)
      }
    }
  }, [items, isHydrated])

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      // Don't add duplicates
      if (prev.some(i => i.id === item.id)) {
        showToast?.(`"${item.title}" is already in your cart`, 'info')
        return prev
      }
      showToast?.(`Added "${item.title}" to cart`, 'success')
      return [...prev, item]
    })
  }, [showToast])

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id)
      if (item) {
        showToast?.(`Removed "${item.title}" from cart`, 'info')
      }
      return prev.filter(item => item.id !== id)
    })
  }, [showToast])

  const clearCart = useCallback(() => {
    setItems([])
    showToast?.('Cart cleared', 'info')
  }, [showToast])

  const isInCart = useCallback((id: string) => {
    return items.some(item => item.id === id)
  }, [items])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), [])

  const itemCount = items.length
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        itemCount,
        total,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
