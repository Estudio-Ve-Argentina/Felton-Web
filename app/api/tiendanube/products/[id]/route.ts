import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/tiendanube";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const product = await getProduct(id);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error(`Error fetching product ${id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
