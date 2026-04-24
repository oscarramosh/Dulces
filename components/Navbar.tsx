"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="flex justify-between items-center px-4 py-3">

        <h1 className="font-serif text-lg text-amber-900">
          Dulces
        </h1>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#catalogo">Productos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>

        {/* CARRITO */}
        <button
          onClick={onOpenCart}
          className="relative bg-amber-600 text-white px-3 py-1 rounded-lg"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 px-4 pb-4">
          <a href="#catalogo">Productos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </div>
      )}
    </header>
  );
}