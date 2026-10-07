import Head from "next/head";

export const SITE_NAME = "Sona Valliappa Public School";
export const SITE_URL = "https://www.sonavalliappapublicschool.com";
export const DEFAULT_DESCRIPTION =
  "Sona Valliappa Public School (SVPS) is a CBSE-affiliated school nurturing young minds with innovation through academic excellence, holistic development and modern infrastructure.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Turn "/activities/a.jpg" or "https://..." into a clean, absolute, URL-safe string. */
export function toAbsoluteUrl(src: string): string {
  if (!src) return DEFAULT_OG_IMAGE;
  const abs = /^https?:\/\//i.test(src) ? src : `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
  // encodeURI keeps existing %XX and ?query intact but fixes spaces / unicode in file names
  try {
    return encodeURI(decodeURI(abs));
  } catch {
    return encodeURI(abs);
  }
}

function mimeFromUrl(url: string): string | undefined {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".png")) return "image/png";
  if (clean.endsWith(".webp")) return "image/webp";
  if (clean.endsWith(".gif")) return "image/gif";
  if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return "image/jpeg";
  return undefined;
}

interface SEOProps {
  /** Page title WITHOUT the site name suffix, e.g. "Admission Procedure" */
  title: string;
  /** 1-2 sentence meta description, ideally 120-160 characters */
  description?: string;
  /** Site-relative path starting with "/", e.g. "/about-us/heritage" */
  path?: string;
  /** Image used for Google / WhatsApp / Facebook previews. Relative ("/x.jpg") or absolute. */
  image?: string;
  /** Alt text for the share image (defaults to the page title) */
  imageAlt?: string;
  /** Only pass if you know the real size; defaults are used for the site og-image only */
  imageWidth?: number;
  imageHeight?: number;
  /** Open Graph type */
  type?: "website" | "article";
  /** ISO date (article pages) */
  publishedTime?: string;
  modifiedTime?: string;
  /** Extra comma separated keywords, optional */
  keywords?: string;
  /** Set true to keep a page out of search results (e.g. thank-you pages) */
  noindex?: boolean;
  /** Extra JSON-LD structured data object(s) specific to this page */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Drop this at the top of every page for consistent, Google- and
 * WhatsApp/Facebook-share-friendly metadata.
 *
 * IMPORTANT: the page that renders <SEO/> must get its data on the SERVER
 * (getStaticProps / getServerSideProps). If the data only exists after
 * client-side hydration (e.g. router.query), WhatsApp's crawler sees an empty
 * page and shows no thumbnail.
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? toAbsoluteUrl(image) : DEFAULT_OG_IMAGE;
  const isDefaultImage = ogImage === DEFAULT_OG_IMAGE;
  const w = imageWidth ?? (isDefaultImage ? 1200 : undefined);
  const h = imageHeight ?? (isDefaultImage ? 630 : undefined);
  const ogType = mimeFromUrl(ogImage);
  const alt = imageAlt || (isDefaultImage ? `${SITE_NAME} logo` : title);

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      <link rel="canonical" href={url} />

      {/* Open Graph — used by WhatsApp, Facebook, LinkedIn, Telegram link previews */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      {ogType && <meta property="og:image:type" content={ogType} />}
      {w && <meta property="og:image:width" content={String(w)} />}
      {h && <meta property="og:image:height" content={String(h)} />}
      <meta property="og:image:alt" content={alt} />
      <meta property="og:locale" content="en_IN" />
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={alt} />

      {jsonLdArray.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  );
}
