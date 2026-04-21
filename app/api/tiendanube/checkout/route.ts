import { NextRequest, NextResponse } from "next/server";

const TIENDANUBE_API_URL = "https://api.tiendanube.com/v1";

interface CheckoutItem {
  productId: number;
  variantId: number;
  quantity: number;
  name?: string;
  price?: string;
}

async function createDraftOrder(items: CheckoutItem[]): Promise<string> {
  const STORE_ID = process.env.TIENDANUBE_STORE_ID?.trim();
  const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN?.trim();

  if (!STORE_ID || !ACCESS_TOKEN) {
    throw new Error("Missing Tienda Nube credentials");
  }

  // Tienda Nube Draft Orders API
  // We include placeholder contact info as some stores require it to generate a checkout_url
  const payload = {
    contact_email: "checkout@felton.com", // Placeholder
    contact_name: "Cliente",             // Required by some stores
    contact_lastname: "Felton",           // Required by some stores
    products: items.map((item) => ({
      variant_id: item.variantId,
      quantity: item.quantity,
    })),
  };

  console.log(`[Checkout] Creating Draft Order for Store ${STORE_ID}...`);
  
  const response = await fetch(`${TIENDANUBE_API_URL}/${STORE_ID}/draft_orders`, {
    method: "POST",
    headers: {
      "Authentication": `bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "Felton Web (Felton26.01@gmail.com)",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error(`[Checkout] Draft Orders API Error [${response.status}]:`, responseText);
    throw new Error(`Tienda Nube API Error: ${response.status}`);
  }

  try {
    const data = JSON.parse(responseText);
    if (!data.checkout_url) {
      console.warn("[Checkout] Draft Order created but no checkout_url returned. Response:", responseText);
      throw new Error("API response missing checkout_url");
    }
    return data.checkout_url;
  } catch (e) {
    console.error("[Checkout] Failed to parse Draft Order response:", responseText);
    throw new Error("Invalid API response");
  }
}

function getSimpleCheckoutUrl(variantId: number, quantity: number): string {
  const storeUrl = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL?.trim() ?? "https://felton2.mitiendanube.com";
  // Pattern to try to force checkout redirect in TiendaNube
  return `${storeUrl}/checkout/v2/start/${variantId}/${quantity}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const items: CheckoutItem[] = body.items || [];

    if (!items.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Try Draft Orders (supports multiple items and direct checkout)
    try {
      const checkoutUrl = await createDraftOrder(items);
      return NextResponse.json({ checkoutUrl });
    } catch (error: any) {
      console.error("[Checkout] Draft Order creation failed:", error.message);
      return NextResponse.json(
        { 
          error: "No pudimos generar tu link de pago seguro.",
          details: error.message 
        }, 
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("[Checkout] Critical error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}


