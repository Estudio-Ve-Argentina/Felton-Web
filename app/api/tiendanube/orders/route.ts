import { NextRequest, NextResponse } from "next/server";
import { getOrders } from "@/lib/tiendanube";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : undefined;
  const per_page = searchParams.get("per_page") ? parseInt(searchParams.get("per_page")!) : undefined;
  const status = searchParams.get("status") as any || undefined;
  const payment_status = searchParams.get("payment_status") || undefined;
  const created_at_min = searchParams.get("created_at_min") || undefined;
  const created_at_max = searchParams.get("created_at_max") || undefined;

  try {
    const orders = await getOrders({ page, per_page, status, payment_status, created_at_min, created_at_max });
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
