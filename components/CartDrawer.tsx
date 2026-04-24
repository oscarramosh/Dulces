"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, removeFromCart, updateQty, total } = useCart();

  // 🔥 FUNCIÓN DE PAGO (Mercado Pago)
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

      console.log("MP RESPONSE:", data);

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
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif text-lg">Tu carrito</h2>
            <button onClick={onClose}>✕</button>
          </div>

          {/* LISTA */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {cart.length === 0 && (
              <p className="text-gray-500">Tu carrito está vacío</p>
            )}

            {cart.map(item => (
              <div key={item.id} className="flex gap-2">
                
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="text-sm">{item.name}</p>

                  <p className="text-xs text-gray-500">
                    ${item.price.toLocaleString("es-CL")}
                  </p>

                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={e =>
                      updateQty(item.id, Number(e.target.value))
                    }
                    className="w-12 border rounded text-xs mt-1"
                  />
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="border-t pt-4">
            
            <p className="flex justify-between font-semibold">
              Total:
              <span>${total.toLocaleString("es-CL")}</span>
            </p>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full bg-amber-700 text-white py-2 rounded-lg mt-3 hover:bg-amber-800 transition disabled:bg-gray-300"
            >
              Pagar
            </button>
          </div>

        </div>
      </div>
    </>
  );
}