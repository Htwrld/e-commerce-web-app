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
    setToast: (toast: string | null) => void
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
            if (!product.in_stock) {
                setToast(`${product.name} is out of stock.`)
                return
            }
            const cartQuantity = cart
                .filter((item) => item.id === product.id)
                .reduce((total, item) => total + item.qty, 0)
            if (
                product.manage_stock &&
                !product.backorders_allowed &&
                product.stock_quantity !== null &&
                cartQuantity >= product.stock_quantity
            ) {
                setToast(`${product.name}: only ${product.stock_quantity} available.`)
                return
            }
            setCart((c) => {
                const quantity = c
                    .filter((item) => item.id === product.id)
                    .reduce((total, item) => total + item.qty, 0)
                if (
                    product.manage_stock &&
                    !product.backorders_allowed &&
                    product.stock_quantity !== null &&
                    quantity >= product.stock_quantity
                )
                    return c
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
        [cart]
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
                        ? {
                              ...x,
                              qty: Math.max(
                                  1,
                                  x.manage_stock &&
                                      !x.backorders_allowed &&
                                      x.stock_quantity !== null
                                      ? Math.min(
                                            qty,
                                            x.stock_quantity -
                                                c
                                                    .filter(
                                                        (other) => other.id === id && other !== x
                                                    )
                                                    .reduce((total, other) => total + other.qty, 0)
                                        )
                                      : qty
                              ),
                          }
                        : x
                )
            )
        },
        []
    )

    const cartCount = cart.reduce((a, c) => a + c.qty, 0)
    const cartTotal = cart.reduce((a, c) => {
        const n = parseFloat(c.price.replace(/[^\d.]/g, "")) || 0
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
                setToast,
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
