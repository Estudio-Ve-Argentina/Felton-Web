import { NextResponse } from "next/server";
import { scrapeBlogPosts } from "@/lib/tiendanube-blog";

export async function GET(request: Request) {
  try {
    const posts = await scrapeBlogPosts();
    // Sort newest first
    const sorted = [...posts].sort(
      (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
    return NextResponse.json(sorted);
  } catch (error: any) {
    console.error("[API Blog GET]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return NextResponse.json(
    { error: "Crear posts debe hacerse directamente desde el panel de Tienda Nube (Tienda online → Blog)" },
    { status: 501 }
  );
}
