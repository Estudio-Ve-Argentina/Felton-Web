const STORE_URL = "https://felton2.mitiendanube.com";

async function fetchBlogList() {
  const res = await fetch(`${STORE_URL}/blog/`, {
    headers: { "User-Agent": "Mozilla/5.0 Felton/1.0" }
  });
  const html = await res.text();
  
  const urlMatches = [...html.matchAll(/href="(\/blog\/posts\/[^"]+)"/g)];
  const urls = [...new Set(urlMatches.map(m => m[1]))];
  
  const headlines = [...html.matchAll(/"headline"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
  const dates = [...html.matchAll(/"datePublished"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
  const authors = [...html.matchAll(/"author"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
  const images = [...html.matchAll(/"image"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
  const ids = [...html.matchAll(/"@id"\s*:\s*"([^"]*blog[^"]+)"/g)].map(m => m[1]);
  
  const result = { urls, headlines, dates, authors, images, ids };
  process.stdout.write(JSON.stringify(result, null, 2));
  return urls;
}

async function fetchPost(path) {
  const res = await fetch(`${STORE_URL}${path}`, {
    headers: { "User-Agent": "Mozilla/5.0 Felton/1.0" }
  });
  const html = await res.text();
  
  const headline = html.match(/"headline"\s*:\s*"([^"]+)"/)?.[1];
  const description = html.match(/"description"\s*:\s*"([^"]+)"/)?.[1];
  const datePublished = html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1];
  const author = html.match(/"author"\s*:\s*"([^"]+)"/)?.[1];
  const image = html.match(/"image"\s*:\s*"([^"]+)"/)?.[1];
  
  // Look for post body content with various selectors
  const bodyPatterns = [
    /class="[^"]*post-body[^"]*"[^>]*>([\s\S]{0,3000}?)<\/div>/i,
    /class="[^"]*blog-post[^"]*content[^"]*"[^>]*>([\s\S]{0,3000}?)<\/div>/i,
    /itemprop="articleBody"[^>]*>([\s\S]{0,3000}?)<\/div>/i,
    /class="[^"]*description[^"]*"[^>]*>([\s\S]{0,3000}?)<\/div>/i,
  ];
  
  let body = null;
  for (const pat of bodyPatterns) {
    const m = html.match(pat);
    if (m) { body = m[1].substring(0, 200); break; }
  }
  
  process.stdout.write("\n\nPOST DATA:\n" + JSON.stringify({ headline, description, datePublished, author, image, body }, null, 2));
}

const urls = await fetchBlogList();
if (urls.length > 0) await fetchPost(urls[0]);
