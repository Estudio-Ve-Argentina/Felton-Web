import { NextRequest, NextResponse } from "next/server";
import { getCheckoutUrl } from "@/lib/tiendanube";

export async function POST(request: NextRequest) {
  try {
    const { variantId, quantity } = await request.json();

    if (!variantId) {
      return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
    }

    // This uses the simple checkout URL generator provided in lib/tiendanube.ts
    // In a future update, this could be upgraded to use the Draft Orders API
    const checkoutUrl = getCheckoutUrl(variantId, quantity || 1);
    
    return NextResponse.json({ checkoutUrl });
  } catch (error: any) {
    console.error("Error generating checkout URL:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
