"use client";

import { useState, useEffect } from "react";
import Catalog from "@/components/Catalog";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";
import ClientProviders from "@/components/ClientProviders";
import Footer from "@/components/Footer";
import { Product } from "@/lib/types";

const products: Product[] = [
  {
    id: "1",
    name: "Alfajor de Maicena",
    price: 2500,
    image: "/alfajor.jpg",
    images: ["/alfajor.jpg", "/alfajor2.jpg"],
    category: "alfajores",
    description: "Suave, relleno con manjar artesanal",
  },
  {
    id: "2",
    name: "Chilenitos",
    price: 3000,
    image: "/chilenitos.jpg",
    images: ["/chilenitos.jpg", "/chilenitos2.jpg"],
    category: "chilenitos",
    description: "Crujientes y tradicionales",
  },
];

export default function Page() {
  const [openCart, setOpenCart] = useState(false);

  // cerrar carrito con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCart(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <ClientProviders>
      <main className="bg-[#fefaf6] min-h-screen">

        {/* NAVBAR */}
        <Navbar onOpenCart={() => setOpenCart(true)} />

        {/* HERO */}
        <section className="text-center py-24 px-4">
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
        <section
          id="catalogo"
          className="max-w-6xl mx-auto px-4 pb-20"
        >
          <Catalog products={products} />
        </section>

        {/* NOSOTROS */}
        <section
          id="nosotros"
          className="bg-white py-20 px-4 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif text-amber-900 mb-4">
              Nuestra tradición
            </h2>

            <p className="text-gray-600 leading-relaxed">
              En Dulces de Curacaví rescatamos recetas tradicionales chilenas,
              elaboradas artesanalmente con ingredientes de calidad. Cada producto
              es hecho con dedicación, buscando entregar una experiencia auténtica
              y llena de sabor.
            </p>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="py-20 px-4">
          <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-serif text-center text-amber-900 mb-6">
              Contáctanos
            </h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

              <textarea
                placeholder="Mensaje"
                rows={4}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

              <button className="bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition">
                Enviar mensaje
              </button>
            </form>
          </div>
        </section>

        {/* CARRITO */}
        <CartDrawer
          open={openCart}
          onClose={() => setOpenCart(false)}
        />

        {/* FOOTER */}
        <Footer />

      </main>
    </ClientProviders>
  );
}