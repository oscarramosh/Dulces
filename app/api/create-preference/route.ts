import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Carrito vacío" },
        { status: 400 }
      );
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const preference = new Preference(client);

    // 🔥 ITEMS + ENVÍO
    const items = [
      ...body.items.map((item: any) => ({
        title: String(item.name),
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: "CLP",
      })),

      {
        title: body.shipping === 0 ? "Retiro en tienda" : "Despacho",
        quantity: 1,
        unit_price: Number(body.shipping || 0),
        currency_id: "CLP",
      },
    ];

    const response = await preference.create({
      body: {
        items,
      },
    });

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