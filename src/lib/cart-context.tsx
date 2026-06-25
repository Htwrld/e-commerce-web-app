"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { Product } from "@/src/action/productController"

export interface CartItem extends Product {
    qty: number
    selectedColor: string
    selectedSize: string
}

interface CartContextValue {
    cart: CartItem[]
    cartOpen: boolean
    setCartOpen: (open: boolean) => void
    addToCart: (data: { product: Product; selectedColor: string; selectedSize: string }) => void
    removeFromCart: (data: { id: number; color: string; size: string }) => void
    updateQty: (data: { id: number; color: string; size: string; qty: number }) => void
    cartCount: number
    cartTotal: number
    toast: string | null
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [cartOpen, setCartOpen] = useState(false)
    const [toast, setToast] = useState<string | null>(null)

    const addToCart = useCallback(
        ({
            product,
            selectedColor,
            selectedSize,
        }: {
            product: Product
            selectedColor: string
            selectedSize: string
        }) => {
            setCart((c) => {
                const existing = c.find(
                    (x) =>
                        x.id === product.id &&
                        x.selectedColor === selectedColor &&
                        x.selectedSize === selectedSize
                )

                return existing
                    ? c.map((x) =>
                          x.id === product.id &&
                          x.selectedColor === selectedColor &&
                          x.selectedSize === selectedSize
                              ? { ...x, qty: x.qty + 1 }
                              : x
                      )
                    : [
                          ...c,
                          {
                              ...product,
                              qty: 1,
                              selectedColor,
                              selectedSize,
                          },
                      ]
            })

            setToast(
                `${product.name} ${selectedColor ? selectedColor : ""} ${selectedSize ? selectedSize : ""} added to cart!`
            )

            setTimeout(() => setToast(null), 2800)
        },
        []
    )

    const removeFromCart = useCallback(
        ({ id, color, size }: { id: number; color: string; size: string }) => {
            setCart((c) =>
                c.filter(
                    (x) => !(x.id === id && x.selectedColor === color && x.selectedSize === size)
                )
            )
        },
        []
    )

    const updateQty = useCallback(
        ({ id, color, size, qty }: { id: number; color: string; size: string; qty: number }) => {
            setCart((c) =>
                c.map((x) =>
                    x.id === id && x.selectedColor === color && x.selectedSize === size
                        ? { ...x, qty: Math.max(1, qty) }
                        : x
                )
            )
        },
        []
    )

    const cartCount = cart.reduce((a, c) => a + c.qty, 0)
    const cartTotal = cart.reduce((a, c) => {
        const n = parseInt(c.price.replace(/[^\d]/g, ""))
        return a + n * c.qty
    }, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                cartOpen,
                setCartOpen,
                addToCart,
                removeFromCart,
                updateQty,
                cartCount,
                cartTotal,
                toast,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart must be used within CartProvider")
    return ctx
}
