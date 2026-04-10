import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { getProductByHandle, getProducts } from "@/lib/tiendanube";
import { ProductDetail } from "./product-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductByHandle(slug).catch(() => null);
  if (!product) notFound();

  const allProducts = await getProducts({ published: true, per_page: 200 }).catch(() => []);
  const categoryId = product.categories[0]?.id;
  const related = allProducts
    .filter((p) => p.id !== product.id && p.categories.some((c) => c.id === categoryId))
    .slice(0, 4);

  return (
    <>
      <Header />
      <ProductDetail product={product} related={related} />
      <Footer />
    </>
  );
}
