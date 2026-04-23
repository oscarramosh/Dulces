"use client";
import { useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

const categories = [
  "todos",
  "alfajores",
  "empolvados",
  "chilenitos",
  "packs",
];

export default function Catalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("todos");

  const filtered =
    filter === "todos"
      ? products
      : products.filter(p => p.category === filter);

  return (
    <section>
      
      {/* FILTROS */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1 rounded-full border text-sm transition ${
              filter === cat
                ? "bg-amber-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}