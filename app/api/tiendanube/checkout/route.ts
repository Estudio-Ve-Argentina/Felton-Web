import { NextRequest, NextResponse } from "next/server";

const TIENDANUBE_API_URL = "https://api.tiendanube.com/v1";

interface CheckoutItem {
  variantId: number;
  quantity: number;
}

async function createDraftOrder(items: CheckoutItem[]): Promise<string> {
  const STORE_ID = process.env.TIENDANUBE_STORE_ID;
  const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN;

  const response = await fetch(`${TIENDANUBE_API_URL}/${STORE_ID}/draft_orders`, {
    method: "POST",
    headers: {
      "Authentication": `bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "Felton Web (Felton26.01@gmail.com)",
    },
    // La API de draft_orders exige datos de contacto y el campo `products`
    // (no `items`). El cliente real completa sus datos en el checkout de
    // Tienda Nube, así que estos valores son placeholders iniciales.
    // No enviamos `price`: Tienda Nube lo calcula del variante (evita que el
    // precio se pueda manipular desde el cliente).
    body: JSON.stringify({
      contact_name: "Cliente",
      contact_lastname: "Felton",
      contact_email: "ventas@felton.com",
      products: items.map((item) => ({
        variant_id: item.variantId,
        quantity: item.quantity,
      })),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Draft Orders API Error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.checkout_url;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Support both single item { variantId, quantity } and multi-item { items: [...] }
    const items: CheckoutItem[] = body.items
      ? body.items
      : [{ variantId: body.variantId, quantity: body.quantity ?? 1 }];

    if (!items.length || !items[0].variantId) {
      return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
    }

    // Draft Orders soporta múltiples items y devuelve una checkout_url válida
    // (con token). No usamos un fallback de URL "simple" porque ese formato
    // no es un contrato válido de Tienda Nube y manda al usuario a una página
    // muerta: es preferible fallar con un error visible.
    const checkoutUrl = await createDraftOrder(items);
    return NextResponse.json({ checkoutUrl });
  } catch (error: any) {
    console.error("Error generating checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
