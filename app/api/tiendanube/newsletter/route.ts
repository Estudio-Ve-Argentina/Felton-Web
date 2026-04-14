import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/tiendanube";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await subscribeNewsletter(email);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
