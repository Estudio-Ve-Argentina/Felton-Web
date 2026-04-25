/**
 * Tienda Nube Blog Scraper
 * Reads blog posts from the public storefront since the TN API v1 doesn't expose blog_posts.
 */

const STORE_URL = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL || "https://velmor.mitiendanube.com";

export interface TiendaNubeBlogPostScraped {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  published_at: string;
  image: string | null;
  url: string;
  status: "published";
  categories: string[];
}

// ── OG / meta extraction ──────────────────────────────────────────────────────

function extractOg(html: string, prop: string): string | null {
  const patterns = [
    new RegExp(`property="${prop}"[^>]*content="([^"]+)"`, "i"),
    new RegExp(`content="([^"]+)"[^>]*property="${prop}"`, "i"),
    new RegExp(`name="${prop}"[^>]*content="([^"]+)"`, "i"),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]?.trim()) return m[1].trim();
  }
  return null;
}

function extractJsonLd(html: string, field: string): string | null {
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of blocks) {
    try {
      const ld = JSON.parse(block[1]);
      // Only use BlogPosting / Article schemas, not WebSite / Organization
      const type: string = ld["@type"] ?? "";
      if (!type.toLowerCase().includes("post") && !type.toLowerCase().includes("article")) continue;
      const val = ld[field];
      if (!val) continue;
      if (typeof val === "string" && val.trim()) return val.trim();
      if (typeof val === "object" && val.name) return String(val.name).trim();
    } catch {}
  }
  return null;
}

function extractTitle(html: string): string | null {
  return (
    extractOg(html, "og:title") ??
    extractJsonLd(html, "headline") ??
    extractJsonLd(html, "name") ??
    null
  );
}

function extractDescription(html: string): string | null {
  return (
    extractOg(html, "og:description") ??
    extractJsonLd(html, "description") ??
    (() => {
      const m = html.match(/name="description"[^>]*content="([^"]+)"/i);
      return m?.[1]?.trim() ?? null;
    })()
  );
}

function extractImage(html: string): string | null {
  return (
    extractOg(html, "og:image") ??
    extractJsonLd(html, "image") ??
    null
  );
}

function extractDate(html: string): string | null {
  return (
    extractOg(html, "article:published_time") ??
    extractJsonLd(html, "datePublished") ??
    null
  );
}

function extractAuthor(html: string): string | null {
  return extractJsonLd(html, "author") ?? null;
}

function extractCategories(html: string): string[] {
  const tagMatches = [...html.matchAll(/href="[^"]*blog\/(?:tag|category)\/([^"/?]+)"/gi)];
  if (tagMatches.length > 0) {
    return [...new Set(tagMatches.map(m => decodeURIComponent(m[1].replace(/-/g, " "))))];
  }
  const keywords = (() => {
    const m = html.match(/name="keywords"[^>]*content="([^"]+)"/i);
    return m?.[1] ?? null;
  })();
  if (keywords) return keywords.split(",").map(k => k.trim()).filter(Boolean);
  return ["General"];
}

// ── Content extraction ────────────────────────────────────────────────────────

function extractContent(html: string): string {
  // 1. JSON-LD articleBody (only from BlogPosting schemas)
  const ldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of ldBlocks) {
    try {
      const ld = JSON.parse(block[1]);
      const type: string = ld["@type"] ?? "";
      if (!type.toLowerCase().includes("post") && !type.toLowerCase().includes("article")) continue;
      const body: string = ld.articleBody ?? "";
      if (body.replace(/<[^>]*>/g, "").trim().length > 80) {
        return body.startsWith("<")
          ? body
          : `<p>${body.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
      }
    } catch {}
  }

  // 2. HTML patterns ordered by specificity
  const patterns = [
    /itemprop="articleBody"[^>]*>([\s\S]*?)<\/(?:div|section|article)>/i,
    /<article\b[^>]*class="[^"]*(?:post|blog|article)[^"]*"[^>]*>([\s\S]*?)<\/article>/i,
    /<article\b[^>]*>([\s\S]*?)<\/article>/i,
    /class="[^"]*(?:post|blog|article)[-_](?:body|content|description|text)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|section)>/i,
    /class="[^"]*(?:entry|content)[-_](?:body|text|content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /id="[^"]*(?:post|article|blog)[-_](?:body|content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) {
      const text = m[1].replace(/<[^>]*>/g, "").trim();
      if (text.length > 80) return m[1].trim();
    }
  }

  return "";
}

function sanitizeContent(html: string): string {
  return html
    .replace(/(<img\b[^>]*?)\s+style="[^"]*"/gi, "$1")
    .replace(/(<img\b[^>]*?)\s+width="\d+[^"]*"/gi, "$1")
    .replace(/(<img\b[^>]*?)\s+height="\d+[^"]*"/gi, "$1")
    .replace(/(<img\b[^>]*?)\s+width='\d+[^']*'/gi, "$1")
    .replace(/(<img\b[^>]*?)\s+height='\d+[^']*'/gi, "$1");
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

async function fetchHTML(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function scrapeBlogPosts(): Promise<TiendaNubeBlogPostScraped[]> {
  const html = await fetchHTML(`${STORE_URL}/blog/`);

  const urlMatches = [...html.matchAll(/href="(\/blog\/posts\/[^"#?]+)"/g)];
  const postPaths = [...new Set(urlMatches.map(m => m[1]))];

  if (postPaths.length === 0) return [];

  const posts = await Promise.all(postPaths.map(path => scrapeBlogPost(path)));
  return posts.filter((p): p is TiendaNubeBlogPostScraped => p !== null);
}

export async function scrapeBlogPost(path: string): Promise<TiendaNubeBlogPostScraped | null> {
  try {
    const url = path.startsWith("http") ? path : `${STORE_URL}${path}`;
    const html = await fetchHTML(url);

    const slug = path.split("/").filter(Boolean).pop() ?? path;
    const id = slug.split("-").pop() ?? slug;

    const title = extractTitle(html);
    if (!title || title.length < 5) {
      // If we can't get a real title, this is probably not a blog post page
      return null;
    }

    const description = extractDescription(html) ?? "";
    const published_at = extractDate(html) ?? new Date().toISOString();
    const author = extractAuthor(html) ?? "Equipo Felton";
    const image = extractImage(html);
    const rawContent = extractContent(html);
    const content = sanitizeContent(rawContent || (description ? `<p>${description}</p>` : ""));

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
  const post = await scrapeBlogPost(`/blog/posts/${slug}`);
  if (post) return post;

  // Fallback: search in the full list
  const posts = await scrapeBlogPosts();
  return posts.find(p => p.slug === slug || p.slug.startsWith(slug)) ?? null;
}
