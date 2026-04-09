const STORE_ID = "7241057";
const ACCESS_TOKEN = "4d48fca672164fc3940d50c3aa6887d225dece6d";
const BASE_URL = `https://api.tiendanube.com/v1/${STORE_ID}`;

async function test(endpoint: string) {
  console.log(`Testing ${endpoint}...`);
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Authentication": `bearer ${ACCESS_TOKEN}`,
        "User-Agent": "Test (contact@velmor.com)"
      }
    });
    console.log(`Status: ${res.status}`);
    if (res.ok) {
        const json = await res.json();
        console.log(`Success! Count: ${Array.isArray(json) ? json.length : 1}`);
    } else {
        const text = await res.text();
        console.log(`Error: ${text}`);
    }
  } catch (e: any) {
    console.log(`Exception: ${e.message}`);
  }
  console.log('---');
}

async function run() {
  await test("/products"); // reference
  await test("/blog_posts");
  await test("/blog/posts");
  await test("/posts");
  await test("/articles");
  await test("/pages");
  await test("/blog");
}

run();
