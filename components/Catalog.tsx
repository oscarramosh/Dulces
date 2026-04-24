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
      <div className="grid md:grid-cols-3 gap-8">
        {products.map(product => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover mb-4"
            />

            <h3 className="font-semibold text-lg mb-1">
              {product.name}
            </h3>

            <p className="text-gray-500 text-sm mb-3">
              {product.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-800 text-lg">
                ${product.price.toLocaleString("es-CL")}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 clave
                  addToCart(product);
                }}
                className="bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700 transition"
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