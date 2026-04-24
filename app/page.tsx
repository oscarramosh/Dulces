"use client";

import { useState, useEffect } from "react";
import Catalog from "@/components/Catalog";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";
import ClientProviders from "@/components/ClientProviders";
import { Product } from "@/lib/types";

const products: Product[] = [
  {
    id: "1",
    name: "Alfajor de Maicena",
    price: 2500,
    image: "/alfajor.jpg",
    category: "alfajores",
    description: "Suave, relleno con manjar artesanal",
  },
  {
    id: "2",
    name: "Chilenitos",
    price: 3000,
    image: "/chilenitos.jpg",
    category: "chilenitos",
    description: "Crujientes y tradicionales",
  },
];

export default function Page() {
  const [openCart, setOpenCart] = useState(false);

  // 🔥 cerrar carrito con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenCart(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <ClientProviders>
      <main className="bg-[#fefaf6] min-h-screen">

        {/* NAVBAR */}
        <Navbar onOpenCart={() => setOpenCart(true)} />

        {/* HERO */}
        <section className="text-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-amber-900 mb-4">
            Dulces de Curacaví
          </h1>

          <p className="text-gray-600 max-w-xl mx-auto mb-8 text-lg">
            Dulces artesanales chilenos, hechos con tradición y amor.
          </p>

          <a
            href="#catalogo"
            className="bg-amber-700 text-white px-8 py-3 rounded-xl shadow-md hover:bg-amber-800 transition text-lg"
          >
            Ver catálogo
          </a>
        </section>

        {/* CATÁLOGO */}
        <section id="catalogo" className="max-w-6xl mx-auto px-4 pb-20">
          <Catalog products={products} />
        </section>

        {/* CARRITO */}
        <CartDrawer
          open={openCart}
          onClose={() => setOpenCart(false)}
        />

      </main>
    </ClientProviders>
  );
}