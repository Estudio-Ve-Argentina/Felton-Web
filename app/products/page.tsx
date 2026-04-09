import { getProducts } from "@/lib/tiendanube";
import { Header, Footer } from "@/components/layout";
import { ProductsContent } from "./products-content";

export default async function ProductsPage() {
  let products = [];
  try {
    products = await getProducts({ published: true, per_page: 200 });
  } catch (error) {
    console.error("Error fetching products from Tienda Nube:", error);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ProductsContent products={products} />
      </main>
      <Footer />
    </>
  );
}
