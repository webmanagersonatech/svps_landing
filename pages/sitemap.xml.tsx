import { GetServerSideProps } from "next";
import { activities } from "../data/activities";
import { newsAndEvents } from "../data/newsandevents";

const SITE_URL = "https://www.sonavalliappapublicschool.com";

// Every static page on the site, with a relative priority/change frequency.
const staticRoutes: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about-us/heritage", priority: "0.7", changefreq: "monthly" },
  { path: "/about-us/vision-and-mission", priority: "0.7", changefreq: "monthly" },
  { path: "/about-us/principal-message", priority: "0.7", changefreq: "monthly" },
  { path: "/about-us/management-team-committee", priority: "0.7", changefreq: "monthly" },
  { path: "/about-us/chairman-books", priority: "0.6", changefreq: "monthly" },
  { path: "/about-us/rules-and-regulations", priority: "0.6", changefreq: "monthly" },
  { path: "/academics/academic-excellence", priority: "0.8", changefreq: "monthly" },
  { path: "/academics/all-round-development", priority: "0.7", changefreq: "monthly" },
  { path: "/academics/creative-learning", priority: "0.7", changefreq: "monthly" },
  { path: "/academics/curriculum-and-pedagogical-processes", priority: "0.7", changefreq: "monthly" },
  { path: "/academics/methodology", priority: "0.7", changefreq: "monthly" },
  { path: "/academics/teacher-training-programme-workshops", priority: "0.6", changefreq: "monthly" },
  { path: "/admission/admission-procedure", priority: "0.9", changefreq: "monthly" },
  { path: "/admission/admission-contact", priority: "0.9", changefreq: "monthly" },
  { path: "/infrastructure-facilities/auditorium", priority: "0.6", changefreq: "monthly" },
  { path: "/infrastructure-facilities/computer-lab", priority: "0.6", changefreq: "monthly" },
  { path: "/infrastructure-facilities/classrooms", priority: "0.6", changefreq: "monthly" },
  { path: "/infrastructure-facilities/indoor-outdoor-and-traditional-games", priority: "0.6", changefreq: "monthly" },
  { path: "/infrastructure-facilities/library", priority: "0.6", changefreq: "monthly" },
  { path: "/infrastructure-facilities/medical-facilities", priority: "0.6", changefreq: "monthly" },
  { path: "/infrastructure-facilities/pantry-and-dining", priority: "0.6", changefreq: "monthly" },
  { path: "/infrastructure-facilities/transport-facilities", priority: "0.6", changefreq: "monthly" },
  { path: "/news-and-events", priority: "0.8", changefreq: "weekly" },
  { path: "/contact-us", priority: "0.8", changefreq: "monthly" },
  { path: "/public-disclosure", priority: "0.5", changefreq: "yearly" },
];

function generateSiteMap() {
  const staticUrls = staticRoutes
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("");

  const activityUrls = activities
    .map(
      (a) => `
  <url>
    <loc>${SITE_URL}/activities/${a.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("");

  const newsUrls = newsAndEvents
    .map(
      (n) => `
  <url>
    <loc>${SITE_URL}/news-and-events/${n.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${activityUrls}${newsUrls}
</urlset>`;
}

// This page has no visual output — it only ever runs on the server to stream XML.
export default function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};
