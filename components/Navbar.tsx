"use client";

import { useCart } from "@/context/CartContext";

export default function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <h1 className="font-serif text-xl text-amber-900">
          Dulces de Curacaví
        </h1>

        {/* MENÚ */}
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#catalogo" className="hover:text-amber-700">Productos</a>
          <a href="#nosotros" className="hover:text-amber-700">Nosotros</a>
          <a href="#contacto" className="hover:text-amber-700">Contacto</a>
        </nav>

        {/* CARRITO */}
        <button
          onClick={onOpenCart}
          className="relative bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          Carrito
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}