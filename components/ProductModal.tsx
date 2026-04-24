"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const { addToCart } = useCart();

  const images = product.images || [product.image];

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-[999]"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-4 relative shadow-xl">

          {/* CERRAR */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-lg"
          >
            ✕
          </button>

          {/* IMAGEN */}
          <img
            src={images[index]}
            alt={product.name}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />

          {/* CONTROLES */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() =>
                setIndex((i) => (i - 1 + images.length) % images.length)
              }
            >
              ←
            </button>
            <button
              onClick={() =>
                setIndex((i) => (i + 1) % images.length)
              }
            >
              →
            </button>
          </div>

          {/* INFO */}
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-500 mb-3">{product.description}</p>

          <p className="font-bold text-lg mb-3">
            ${product.price.toLocaleString("es-CL")}
          </p>

          {/* BOTÓN */}
          <button
            onClick={() => addToCart(product)} // ✅ SIN quantity
            className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </>
  );
}