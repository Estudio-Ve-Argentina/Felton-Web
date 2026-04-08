import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/tiendanube";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : undefined;
  const per_page = searchParams.get("per_page") ? parseInt(searchParams.get("per_page")!) : undefined;
  const published = searchParams.get("published") === "false" ? false : true;
  const category_id = searchParams.get("category_id") ? parseInt(searchParams.get("category_id")!) : undefined;

  try {
    const products = await getProducts({ page, per_page, published, category_id });
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
