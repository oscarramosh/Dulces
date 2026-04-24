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
  const [startX, setStartX] = useState<number | null>(null);
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
      <div className="fixed inset-0 flex items-end sm:items-center justify-center z-[1000]">
        <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 relative shadow-xl animate-[fadeIn_0.2s_ease]">

          {/* CERRAR */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-lg"
          >
            ✕
          </button>

          {/* IMAGEN + SWIPE */}
          <img
            key={index}
            src={images[index]}
            alt={product.name}
            className="w-full h-56 sm:h-64 object-cover rounded-xl mb-4 transition-all duration-300"
            onTouchStart={(e) => setStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (startX === null) return;

              const endX = e.changedTouches[0].clientX;
              const diff = startX - endX;

              if (diff > 50) {
                setIndex((i) => (i + 1) % images.length);
              } else if (diff < -50) {
                setIndex((i) => (i - 1 + images.length) % images.length);
              }

              setStartX(null);
            }}
          />

          {/* DOTS */}
          <div className="flex justify-center gap-2 mb-4">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === index ? "bg-amber-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* CONTROLES */}
          <div className="flex justify-between mb-4">
            <button
              className="px-3 py-1 bg-gray-100 rounded-lg"
              onClick={() =>
                setIndex((i) => (i - 1 + images.length) % images.length)
              }
            >
              ←
            </button>

            <button
              className="px-3 py-1 bg-gray-100 rounded-lg"
              onClick={() =>
                setIndex((i) => (i + 1) % images.length)
              }
            >
              →
            </button>
          </div>

          {/* INFO */}
          <h2 className="text-lg sm:text-xl font-semibold">
            {product.name}
          </h2>

          <p className="text-gray-500 mb-3 text-sm sm:text-base">
            {product.description}
          </p>

          <p className="font-bold text-lg mb-4 text-amber-800">
            ${product.price.toLocaleString("es-CL")}
          </p>

          {/* BOTÓN */}
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-amber-700 text-white py-3 rounded-xl hover:bg-amber-800 transition active:scale-95"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </>
  );
}