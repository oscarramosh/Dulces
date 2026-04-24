import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validación básica
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "No hay productos en el carrito" },
        { status: 400 }
      );
    }

    // Configurar cliente Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const preference = new Preference(client);

    // Crear preferencia (VERSIÓN SEGURA)
    const response = await preference.create({
      body: {
        items: body.items.map((item: any) => ({
          title: String(item.name),
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "CLP",
        })),
      },
    });

    // Respuesta al frontend
    return NextResponse.json({
      init_point: response.init_point,
    });

  } catch (error: any) {
    console.error("🔥 ERROR MP:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      {
        error: "Error al crear preferencia",
        detail: error?.message || "Error desconocido",
      },
      { status: 500 }
    );
  }
}