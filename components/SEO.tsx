import Head from "next/head";

export const SITE_NAME = "Sona Valliappa Public School";
export const SITE_URL = "https://www.sonavalliappapublicschool.com";
export const DEFAULT_DESCRIPTION =
  "Sona Valliappa Public School (SVPS) is a CBSE-affiliated school nurturing young minds with innovation through academic excellence, holistic development and modern infrastructure.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOProps {
  /** Page title WITHOUT the site name suffix, e.g. "Admission Procedure" */
  title: string;
  /** 1-2 sentence meta description, ideally 120-160 characters */
  description?: string;
  /** Site-relative path starting with "/", e.g. "/about-us/heritage" */
  path?: string;
  /** Absolute or site-relative image used for social/WhatsApp previews (1200x630 recommended) */
  image?: string;
  /** Open Graph type */
  type?: "website" | "article";
  /** Extra comma separated keywords, optional */
  keywords?: string;
  /** Set true to keep a page out of search results (e.g. thank-you pages) */
  noindex?: boolean;
  /** Extra JSON-LD structured data object(s) specific to this page */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Drop this at the top of every page for consistent, Google- and
 * WhatsApp/Facebook-share-friendly metadata:
 *  <SEO title="Admission Procedure" description="..." path="/admission/admission-procedure" />
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image,
  type = "website",
  keywords,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_OG_IMAGE;

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={url} />

      {/* Open Graph — used by Facebook, LinkedIn, and WhatsApp link previews */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} logo`} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

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
