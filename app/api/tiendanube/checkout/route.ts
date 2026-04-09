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
    body: JSON.stringify({
      items: items.map((item) => ({
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

function getSimpleCheckoutUrl(variantId: number, quantity: number): string {
  const storeUrl = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL ?? "https://felton2.mitiendanube.com";
  return `${storeUrl}/checkout/v3/start/${variantId}/${quantity}`;
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

    // Try Draft Orders first (supports multiple items)
    try {
      const checkoutUrl = await createDraftOrder(items);
      return NextResponse.json({ checkoutUrl });
    } catch {
      // Fallback: simple checkout URL for the first item
      const first = items[0];
      const checkoutUrl = getSimpleCheckoutUrl(first.variantId, first.quantity);
      return NextResponse.json({ checkoutUrl });
    }
  } catch (error: any) {
    console.error("Error generating checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
