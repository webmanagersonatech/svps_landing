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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-178395216-1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-178395216-1');`,
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TFF2GJ3');`,
          }}
        />
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TFF2GJ3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
