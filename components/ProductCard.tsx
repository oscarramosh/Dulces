"use client";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover hover:scale-105 transition"
        />
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-amber-700">
            ${product.price.toLocaleString("es-CL")}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-amber-600 text-white px-3 py-1 rounded-xl hover:bg-amber-700 transition"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}