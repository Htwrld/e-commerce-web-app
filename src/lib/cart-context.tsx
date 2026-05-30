"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product } from "@/lib/data";

export interface CartItem extends Product {
  qty: number;
}

interface CartContextValue {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  cartCount: number;
  cartTotal: number;
  toast: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart]         = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast]       = useState<string | null>(null);

  const addToCart = useCallback((product: Product) => {
    setCart(c => {
      const existing = c.find(x => x.id === product.id);
      return existing
        ? c.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x)
        : [...c, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(null), 2800);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(c => c.filter(x => x.id !== id));
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    setCart(c => c.map(x => x.id === id ? { ...x, qty: Math.max(1, qty) } : x));
  }, []);

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => {
    const n = parseInt(c.price.replace(/[^\d]/g, ""));
    return a + n * c.qty;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, cartOpen, setCartOpen, addToCart, removeFromCart, updateQty, cartCount, cartTotal, toast }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
