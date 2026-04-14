const TIENDANUBE_API_URL = "https://api.tiendanube.com/v1";

interface TiendaNubeImage {
  id: number;
  src: string;
  position: number;
}

interface TiendaNubeVariant {
  id: number;
  product_id: number;
  sku: string;
  price: string;
  stock: number | null;
  stock_management: boolean;
  values: { es: string }[];
}

export interface TiendaNubeProduct {
  id: number;
  name: { es: string };
  description: { es: string };
  handle: { es: string };
  published: boolean;
  free_shipping: boolean;
  images: TiendaNubeImage[];
  variants: TiendaNubeVariant[];
  categories: { id: number; name: { es: string } }[];
  brand: string | null;
  tags: string;
  created_at: string;
  updated_at: string;
}

export interface TiendaNubeOrder {
  id: number;
  number: string;
  status: "open" | "closed" | "cancelled";
  payment_status: "pending" | "authorized" | "paid" | "voided" | "refunded";
  shipping_status: "unpacked" | "shipped" | "delivered";
  total: string;
  currency: string;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  products: {
    product_id: number;
    variant_id: number;
    name: string;
    quantity: number;
    price: string;
  }[];
  created_at: string;
  updated_at: string;
}

async function tiendaNubeFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const STORE_ID = process.env.TIENDANUBE_STORE_ID;
  const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN;

  if (!STORE_ID || !ACCESS_TOKEN) {
    throw new Error(
      "Missing Tienda Nube credentials. Set TIENDANUBE_STORE_ID and TIENDANUBE_ACCESS_TOKEN in .env.local.\n" +
      "See .agents/workflows/tiendanube-setup.md for setup instructions."
    );
  }

  const url = `${TIENDANUBE_API_URL}/${STORE_ID}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Authentication": `bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "VELMOR Web (contact@velmor.com)",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      // If endpoint doesn't exist, return empty data structure for the expected type
      return (endpoint.includes("blog_posts") ? [] : {}) as T;
    }
    const error = await response.text();
    throw new Error(`Tienda Nube API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function subscribeNewsletter(email: string): Promise<any> {
  // Tiendanube allows creating a customer with email and accepts_marketing
  return tiendaNubeFetch("/customers", {
    method: "POST",
    body: JSON.stringify({
      email,
      name: "Newsletter Subscriber",
      accepts_marketing: true,
    }),
  }).catch((err) => {
    // Ignore error if customer exists already (e.g. status 422)
    console.error("Newsletter error:", err.message);
    return null;
  });
}

// Products
export async function getProducts(params?: {
  page?: number;
  per_page?: number;
  published?: boolean;
  category_id?: number;
}): Promise<TiendaNubeProduct[]> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.published !== undefined) searchParams.set("published", String(params.published));
  if (params?.category_id) searchParams.set("category_id", String(params.category_id));
  
  const query = searchParams.toString();
  return tiendaNubeFetch<TiendaNubeProduct[]>(`/products${query ? `?${query}` : ""}`);
}

export async function getProduct(id: number): Promise<TiendaNubeProduct> {
  return tiendaNubeFetch<TiendaNubeProduct>(`/products/${id}`);
}

export async function getProductByHandle(handle: string): Promise<TiendaNubeProduct | null> {
  const products = await getProducts({ per_page: 200, published: true });
  return products.find(p => p.handle.es === handle) || null;
}

// Stock
export async function updateStock(
  productId: number,
  variantId: number,
  stock: number
): Promise<TiendaNubeVariant> {
  return tiendaNubeFetch<TiendaNubeVariant>(
    `/products/${productId}/variants/${variantId}`,
    {
      method: "PUT",
      body: JSON.stringify({ stock }),
    }
  );
}

// Orders
export async function getOrders(params?: {
  page?: number;
  per_page?: number;
  status?: "open" | "closed" | "cancelled";
  payment_status?: string;
  created_at_min?: string;
  created_at_max?: string;
}): Promise<TiendaNubeOrder[]> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.status) searchParams.set("status", params.status);
  if (params?.payment_status) searchParams.set("payment_status", params.payment_status);
  if (params?.created_at_min) searchParams.set("created_at_min", params.created_at_min);
  if (params?.created_at_max) searchParams.set("created_at_max", params.created_at_max);
  
  const query = searchParams.toString();
  return tiendaNubeFetch<TiendaNubeOrder[]>(`/orders${query ? `?${query}` : ""}`);
}

export async function getOrder(id: number): Promise<TiendaNubeOrder> {
  return tiendaNubeFetch<TiendaNubeOrder>(`/orders/${id}`);
}

// Categories
export interface TiendaNubeCategory {
  id: number;
  name: { es: string };
  handle: { es: string };
  parent: number | null;
}

export async function getCategories(): Promise<TiendaNubeCategory[]> {
  return tiendaNubeFetch<TiendaNubeCategory[]>("/categories");
}

// Blog Posts
export interface TiendaNubeBlogPost {
  id: number;
  title: { es: string; en?: string };
  content: { es: string; en?: string };
  excerpt?: { es: string; en?: string };
  handle: { es: string; en?: string };
  status: "published" | "draft";
  image?: string;
  created_at: string;
  updated_at: string;
}

export async function getBlogPosts(params?: {
  page?: number;
  per_page?: number;
  status?: "published" | "draft";
}): Promise<TiendaNubeBlogPost[]> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.status) searchParams.set("status", params.status);
  
  const query = searchParams.toString();
  return tiendaNubeFetch<TiendaNubeBlogPost[]>(`/blog_posts${query ? `?${query}` : ""}`);
}

export async function getBlogPost(id: number): Promise<TiendaNubeBlogPost> {
  return tiendaNubeFetch<TiendaNubeBlogPost>(`/blog_posts/${id}`);
}

export async function createBlogPost(data: Partial<TiendaNubeBlogPost>): Promise<TiendaNubeBlogPost> {
  return tiendaNubeFetch<TiendaNubeBlogPost>("/blog_posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBlogPost(id: number, data: Partial<TiendaNubeBlogPost>): Promise<TiendaNubeBlogPost> {
  return tiendaNubeFetch<TiendaNubeBlogPost>(`/blog_posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBlogPost(id: number): Promise<void> {
  return tiendaNubeFetch<void>(`/blog_posts/${id}`, {
    method: "DELETE",
  });
}

// Checkout URL generator
export function getCheckoutUrl(variantId: number, quantity: number = 1): string {
  const storeUrl = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL || "https://velmor.mitiendanube.com";
  return `${storeUrl}/checkout/v3/start/${variantId}/${quantity}`;
}

// Helpers
export function formatPrice(price: string | number, currency: string = "ARS"): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
  }).format(numPrice);
}

export function getProductMainImage(product: TiendaNubeProduct): string | null {
  const mainImage = product.images.find(img => img.position === 1) || product.images[0];
  return mainImage?.src || null;
}

export function getProductStock(product: TiendaNubeProduct): number | null {
  // Sum all variants stock, or null if stock management is disabled
  const hasStockManagement = product.variants.some(v => v.stock_management);
  if (!hasStockManagement) return null;
  
  return product.variants.reduce((total, variant) => {
    return total + (variant.stock || 0);
  }, 0);
}

export function isInStock(product: TiendaNubeProduct): boolean {
  const stock = getProductStock(product);
  return stock === null || stock > 0;
}
