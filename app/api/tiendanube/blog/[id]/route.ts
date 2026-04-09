import { NextResponse } from "next/server";
import { scrapeBlogPost, scrapeBlogPostBySlug } from "@/lib/tiendanube-blog";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // The id can be either a TN slug ("dfsa-c7171f84a0d8") or just a partial slug
    const post = await scrapeBlogPostBySlug(params.id);
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
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Editar posts debe hacerse directamente desde el panel de Tienda Nube (Tienda online → Blog)" },
    { status: 501 }
  );
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Eliminar posts debe hacerse directamente desde el panel de Tienda Nube (Tienda online → Blog)" },
    { status: 501 }
  );
}
