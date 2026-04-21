const STORE_ID = "7241057";
const ACCESS_TOKEN = "4d48fca672164fc3940d50c3aa6887d225dece6d";

async function testDraftOrder() {
  const url = `https://api.tiendanube.com/v1/${STORE_ID}/draft_orders`;
  console.log(`Testing URL: ${url}`);
  
  const payload = {
    products: [
      {
        variant_id: 1495056517,
        quantity: 1
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authentication": `bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "Felton Web Test"
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${text}`);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testDraftOrder();
