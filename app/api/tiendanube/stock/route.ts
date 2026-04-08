import { NextRequest, NextResponse } from "next/server";
import { updateStock } from "@/lib/tiendanube";

export async function PUT(request: NextRequest) {
  try {
    const { productId, variantId, stock } = await request.json();

    if (!productId || !variantId || stock === undefined) {
      return NextResponse.json(
        { error: "Missing productId, variantId or stock" },
        { status: 400 }
      );
    }

    const updatedVariant = await updateStock(productId, variantId, stock);
    return NextResponse.json(updatedVariant);
  } catch (error: any) {
    console.error("Error updating stock:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
