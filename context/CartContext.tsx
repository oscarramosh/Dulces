"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev: any) => {
      const existing = prev.find((i: any) => i.id === product.id);

      if (existing) {
        return prev.map((i: any) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const total = cart.reduce(
    (acc: number, item: any) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);