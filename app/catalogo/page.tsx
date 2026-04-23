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
    description: "Suave y relleno con manjar artesanal",
  },
  {
    id: "2",
    name: "Chilenitos",
    price: 3000,
    image: "/chilenitos.jpg",
    category: "chilenitos",
    description: "Clásicos dulces chilenos",
  },
];

export default function Page() {
  return (
    <CartProvider>
      <main>
        <h1 className="text-3xl font-serif text-center mt-6">
          Dulces de Curacaví
        </h1>

        <Catalog products={products} />
        <CartDrawer />
      </main>
    </CartProvider>
  );
}
