"use client";

import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import ProductModal from "./ProductModal";

export default function Catalog({ products }: { products: Product[] }) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      {/* GRID RESPONSIVE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4 active:scale-[0.98]"
          >
            {/* IMAGEN */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 sm:h-56 object-cover mb-4 rounded-xl"
            />

            {/* NOMBRE */}
            <h3 className="font-semibold text-base sm:text-lg mb-1">
              {product.name}
            </h3>

            {/* DESCRIPCIÓN */}
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* PRECIO + BOTÓN */}
            <div className="flex justify-between items-center gap-2">
              <span className="font-bold text-amber-800 text-base sm:text-lg">
                ${product.price.toLocaleString("es-CL")}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 evita abrir modal
                  addToCart(product);
                }}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-amber-700 transition active:scale-95"
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}