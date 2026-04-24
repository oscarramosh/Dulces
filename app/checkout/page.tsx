"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, total } = useCart();

  const [shipping, setShipping] = useState(3000);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const finalTotal = total + shipping;

  const handleCheckout = async () => {
    console.log("CHECKOUT");
    console.log("CART:", cart);

    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    if (!name || !address) {
      alert("Completa tus datos");
      return;
    }

    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          shipping, // 🔥 ahora sí se envía
        }),
      });

      const data = await res.json();

      console.log("MP:", data);

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al iniciar el pago");
      }

    } catch (error) {
      console.error(error);
      alert("Error en checkout");
    }
  };

  return (
    <main className="min-h-screen bg-[#fefaf6] px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">

        <h1 className="text-2xl font-serif mb-6">Checkout</h1>

        {/* PRODUCTOS */}
        <div className="mb-6">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between mb-2 text-sm">
              <span>{item.name} x{item.quantity}</span>
              <span>
                ${(item.price * item.quantity).toLocaleString("es-CL")}
              </span>
            </div>
          ))}
        </div>

        {/* ENVÍO */}
        <div className="mb-6">
          <p className="font-medium mb-2">Despacho</p>

          <select
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setShipping(Number(e.target.value))}
          >
            <option value={3000}>Despacho normal ($3.000)</option>
            <option value={5000}>Despacho express ($5.000)</option>
            <option value={0}>Retiro en tienda (Gratis)</option>
          </select>
        </div>

        {/* DATOS */}
        <div className="flex flex-col gap-3 mb-6">
          <input
            placeholder="Nombre"
            className="border p-3 rounded-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Dirección"
            className="border p-3 rounded-lg w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* TOTAL */}
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>${finalTotal.toLocaleString("es-CL")}</span>
        </div>

        {/* PAGAR */}
        <button
          onClick={handleCheckout}
          className="w-full bg-amber-700 text-white py-3 rounded-xl hover:bg-amber-800 transition active:scale-95"
        >
          Ir a pagar
        </button>

      </div>
    </main>
  );
}