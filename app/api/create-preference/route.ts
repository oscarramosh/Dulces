export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🧪 BODY RAW:", body);

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const preference = new Preference(client);

    const items = body.items.map((item: any) => ({
      title: String(item.name),
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
    }));

    console.log("🧪 ITEMS LIMPIOS:", items);

    const response = await preference.create({
      body: {
        items,
      },
    });

    console.log("✅ PREFERENCE:", response);

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    });

  } catch (error: any) {
    console.error("🔥 ERROR FULL:");
    console.error(JSON.stringify(error, null, 2));

    return NextResponse.json(
      { error: "Error creando preferencia" },
      { status: 500 }
    );
  }
}