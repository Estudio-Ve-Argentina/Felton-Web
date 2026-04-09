/**
 * Tienda Nube Blog Scraper
 * Reads blog posts from the public storefront since the TN API v1 doesn't expose blog_posts.
 * Uses structured data (microdata/inline JSON) embedded in the HTML by Tienda Nube themes.
 */

const STORE_URL = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL || "https://velmor.mitiendanube.com";

export interface TiendaNubeBlogPostScraped {
  id: string;           // derived from the slug (last segment of URL)
  slug: string;         // e.g. "como-reconocer-cuero-genuino-c7171f84a0d8"
  title: string;
  description: string;
  content: string;
  author: string;
  published_at: string; // ISO date
  image: string | null;
  url: string;          // full storefront URL
  status: "published";
  categories: string[];
}

function extractMeta(html: string, field: string): string | null {
  const patterns = [
    new RegExp(`"${field}"\\s*:\\s*"([^"]+)"`, "i"),
    new RegExp(`itemprop="${field}"[^>]*content="([^"]+)"`, "i"),
    new RegExp(`itemprop="${field}"[^>]*>([^<]+)<`, "i"),
    new RegExp(`name="${field}"[^>]*content="([^"]+)"`, "i"),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1].trim();
  }
  return null;
}

function extractCategories(html: string): string[] {
  // Try meta keywords first
  const keywords = extractMeta(html, "keywords");
  if (keywords) {
    return keywords.split(",").map(k => k.trim()).filter(Boolean);
  }

  // Try to find tags or categories in links /blog/tag/ or /blog/category/
  const tagMatches = [...html.matchAll(/href="[^"]*blog\/(?:tag|category)\/([^"/?]+)"/gi)];
  if (tagMatches.length > 0) {
    return [...new Set(tagMatches.map(m => decodeURIComponent(m[1].replace(/-/g, " "))))];
  }

  return ["General"];
}

function extractContent(html: string): string {
  // Common TN theme patterns for article body
  const patterns = [
    /itemprop="articleBody"[^>]*>([\s\S]*?)<\/(?:div|section|article)>/i,
    /class="[^"]*post[-_]body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /class="[^"]*blog[-_]content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /class="[^"]*article[-_]body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/(?:div|p)>/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1] && m[1].trim().length > 20) return m[1].trim();
  }
  // Fallback: description from meta
  const desc = extractMeta(html, "description");
  return desc ? `<p>${desc}</p>` : "";
}

async function fetchHTML(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Felton-Bot/1.0)",
      "Accept": "text/html,application/xhtml+xml",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes in Next.js
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

export async function scrapeBlogPosts(): Promise<TiendaNubeBlogPostScraped[]> {
  const html = await fetchHTML(`${STORE_URL}/blog/`);

  // Extract all post URLs
  const urlMatches = [...html.matchAll(/href="(\/blog\/posts\/[^"#?]+)"/g)];
  const postPaths = [...new Set(urlMatches.map(m => m[1]))];

  if (postPaths.length === 0) return [];

  // Fetch each post in parallel (with a concurrency limit)
  const posts = await Promise.all(
    postPaths.map(path => scrapeBlogPost(path))
  );

  return posts.filter((p): p is TiendaNubeBlogPostScraped => p !== null);
}

export async function scrapeBlogPost(path: string): Promise<TiendaNubeBlogPostScraped | null> {
  try {
    const url = path.startsWith("http") ? path : `${STORE_URL}${path}`;
    const html = await fetchHTML(url);

    const slug = path.split("/").filter(Boolean).pop() ?? path;
    // ID is the unique hash portion after the last hyphen (TN format: slug-HASH)
    const id = slug.split("-").pop() ?? slug;

    const title = extractMeta(html, "headline") ?? extractMeta(html, "name") ?? slug;
    const description = extractMeta(html, "description") ?? "";
    const published_at = extractMeta(html, "datePublished") ?? new Date().toISOString();
    const author = extractMeta(html, "author") ?? "Equipo Felton";
    const image = extractMeta(html, "image") ?? null;
    const content = extractContent(html) || `<p>${description}</p>`;

    return {
      id,
      slug,
      title,
      description,
      content,
      author,
      published_at,
      image,
      url,
      status: "published",
      categories: extractCategories(html),
    };
  } catch (e) {
    console.error(`[scrapeBlogPost] Error scraping ${path}:`, e);
    return null;
  }
}

export async function scrapeBlogPostBySlug(slug: string): Promise<TiendaNubeBlogPostScraped | null> {
  // First try direct URL
  const post = await scrapeBlogPost(`/blog/posts/${slug}`);
  if (post && post.title !== slug) return post;

  // If not found by slug, search in list
  const posts = await scrapeBlogPosts();
  return posts.find(p => p.slug === slug || p.slug.startsWith(slug)) ?? null;
}
