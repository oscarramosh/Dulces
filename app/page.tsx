import Catalog from "@/components/Catalog";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { Product } from "@/lib/types";

const products: Product[] = [
  {
    id: "1",
    name: "Alfajor de Maicena",
    price: 2600,
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
      <main className="max-w-6xl mx-auto px-4">
        
        {/* HERO */}
        <section className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Dulces de Curacaví
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Tradición chilena hecha a mano. Recibe en tu hogar los mejores dulces artesanales.
          </p>
        </section>

        {/* CATÁLOGO */}
        <Catalog products={products} />

        <CartDrawer />
      </main>
    </CartProvider>
  );
}