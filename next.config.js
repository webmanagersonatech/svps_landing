// Host of the backend API (serves /uploads/...). Allowed so next/image can load uploaded photos.
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
let apiPattern = null;
try {
  const u = new URL(apiUrl);
  apiPattern = {
    protocol: u.protocol.replace(":", ""),
    hostname: u.hostname,
    ...(u.port ? { port: u.port } : {}),
    pathname: "/uploads/**",
  };
} catch (e) {
  /* invalid URL - ignore */
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow next/image to load these external hosts (fixes broken images locally & live)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.magnific.com" },
      { protocol: "https", hostname: "www.sonavalliappapublicschool.com" },
      { protocol: "https", hostname: "sonavalliappapublicschool.com" },
      ...(apiPattern ? [apiPattern] : []),
    ],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
