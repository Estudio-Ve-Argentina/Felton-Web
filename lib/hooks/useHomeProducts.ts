import { useEffect, useState } from "react";

// Cache a nivel de módulo — el fetch se hace UNA sola vez por sesión
let cachedProducts: any[] | null = null;
let fetchPromise: Promise<any[]> | null = null;

async function fetchAllProducts(): Promise<any[]> {
  if (cachedProducts) return cachedProducts;
  if (!fetchPromise) {
    fetchPromise = fetch("/api/tiendanube/products?per_page=200&published=true")
      .then((r) => {
        if (!r.ok) throw new Error("Error fetching products");
        return r.json();
      })
      .then((data) => {
        cachedProducts = data;
        return data;
      })
      .catch(() => {
        fetchPromise = null; // permitir reintento si falla
        return [];
      });
  }
  return fetchPromise;
}

export function useAllProducts() {
  const [products, setProducts] = useState<any[]>(cachedProducts ?? []);

  useEffect(() => {
    if (cachedProducts) {
      setProducts(cachedProducts);
      return;
    }
    fetchAllProducts().then((data) => setProducts(data));
  }, []);

  return products;
}
