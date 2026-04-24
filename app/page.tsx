import Catalog from "@/components/Catalog";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
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
  return (
    <CartProvider>
      <main className="bg-amber-50 min-h-screen">

        {/* HERO */}
        <section className="text-center py-16 px-4">
          <h1 className="text-5xl font-serif text-amber-900 mb-4">
            Dulces de Curacaví
          </h1>

          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Tradición chilena hecha a mano. Dulces frescos, artesanales y con historia.
          </p>

          <a
            href="#catalogo"
            className="bg-amber-700 text-white px-6 py-3 rounded-xl shadow hover:bg-amber-800 transition"
          >
            Ver catálogo
          </a>
        </section>

        {/* CATÁLOGO */}
        <section id="catalogo" className="max-w-6xl mx-auto px-4 pb-20">
          <Catalog products={products} />
        </section>

        <CartDrawer />
      </main>
    </CartProvider>
  );
}