import { NextResponse } from "next/server";
import { scrapeBlogPostBySlug } from "@/lib/tiendanube-blog";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await scrapeBlogPostBySlug(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error: any) {
    console.error("[API Blog GET single]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Editar posts debe hacerse directamente desde el panel de Tienda Nube (Tienda online → Blog)" },
    { status: 501 }
  );
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    { error: "Eliminar posts debe hacerse directamente desde el panel de Tienda Nube (Tienda online → Blog)" },
    { status: 501 }
  );
}
