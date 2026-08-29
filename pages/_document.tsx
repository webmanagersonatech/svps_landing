import { Html, Head, Main, NextScript } from "next/document";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Sona Valliappa Public School",
  alternateName: "SVPS",
  url: "https://www.sonavalliappapublicschool.com",
  logo: "https://www.sonavalliappapublicschool.com/homeimages/sona-valliappa-public-school.png",
  image: "https://www.sonavalliappapublicschool.com/og-image.jpg",
  description:
    "Sona Valliappa Public School (SVPS) is a CBSE-affiliated school in Salem, Tamil Nadu, nurturing young minds with innovation through academic excellence, holistic development and modern infrastructure.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Junction Main Road",
    addressLocality: "Salem",
    postalCode: "636005",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  telephone: "+91-427-2912160",
  email: "svpschool@sonatech.ac.in",
  sameAs: [],
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme */}
        <meta name="theme-color" content="#0c224a" />
        <meta name="msapplication-TileColor" content="#0c224a" />
        <meta name="format-detection" content="telephone=no" />

        {/* Site-wide structured data so Google understands this is a school */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
