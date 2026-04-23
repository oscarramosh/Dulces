"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();

      console.log("Respuesta MP:", data); // 👈 útil para debug

      // 🔥 CORREGIDO: usar init_point
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al iniciar el pago");
      }

    } catch (error) {
      console.error("Error en checkout:", error);
      alert("Error en checkout");
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl p-4 border-l z-50">
      
      <h2 className="text-xl font-serif mb-4">Tu carrito</h2>

      {/* LISTA */}
      <div className="flex flex-col gap-3 overflow-y-auto h-[70%]">
        
        {cart.length === 0 && (
          <p className="text-gray-500">Tu carrito está vacío</p>
        )}

        {cart.map(item => (
          <div key={item.id} className="flex gap-2">
            
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>

              <p className="text-xs text-gray-500">
                ${item.price.toLocaleString("es-CL")}
              </p>

              <div className="flex items-center gap-2 mt-1">
                
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e =>
                    updateQty(item.id, Number(e.target.value))
                  }
                  className="w-12 border rounded text-center text-sm"
                />

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  eliminar
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-4 border-t pt-4">
        
        <p className="flex justify-between font-semibold text-lg">
          Total:
          <span>${total.toLocaleString("es-CL")}</span>
        </p>

        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className="w-full bg-amber-600 text-white py-2 rounded-xl mt-3 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Ir a pagar
        </button>

      </div>
    </div>
  );
}