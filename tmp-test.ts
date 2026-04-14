import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const TIENDANUBE_API_URL = "https://api.tiendanube.com/v1";
const STORE_ID = process.env.TIENDANUBE_STORE_ID;
const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN;

async function tiendaNubeFetch(endpoint, options = {}) {
  const url = `${TIENDANUBE_API_URL}/${STORE_ID}${endpoint}`;
  console.log("Fetching", url);
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
    const error = await response.text();
    console.error(`Error: ${response.status} - ${error}`);
    return null;
  }
  return response.json();
}

async function run() {
  // Try POST /customers for newsletter
  console.log("Creating customer...");
  const customer = await tiendaNubeFetch("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: "Newsletter Subscriber",
      email: "test.newsletter." + Date.now() + "@example.com",
      phone: "",
    })
  });
  console.log("Customer response:", customer ? customer.id : null);

  // Try fetching products
  console.log("Fetching products...");
  const products = await tiendaNubeFetch("/products?per_page=1");
  console.log("Products:", products ? products.length : 0);
  
  if (products && products[0]) {
    const productId = products[0].id;
    // Try calculate shipping with the storefront endpoint trick? Look up if tiendanube has `GET /shipping/carriers`
    console.log("Trying to calculate shipping...");
    const shipping = await tiendaNubeFetch(`/shipping_calculate?zipcode=1414&product_id=${productId}`);
    console.log("Shipping response:", shipping);
  }
}

run();
