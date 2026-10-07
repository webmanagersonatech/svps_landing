import { useState } from "react";
import Image from "next/image";
import type { GetStaticPaths, GetStaticProps } from "next";
import SEO, { SITE_NAME, SITE_URL, toAbsoluteUrl } from "../../components/SEO";
import { PageHeader } from "../../components/PageHeader";
import { Reveal } from "../../components/Reveal";
import type { Activity } from "../../lib/activitiesApi";
import { fetchActivity } from "../../lib/activitiesApi";
import { ApiNotFound, REVALIDATE_SECONDS, skipOptimization } from "../../lib/apiClient";

/* =========================
   MAIN PAGE
========================= */
export default function ActivityDetailPage({ activity }: { activity: Activity }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const description =
    activity.shortDescription ||
    `Explore ${activity.title} at ${SITE_NAME}, Salem, and discover new skills through hands-on, engaging activities.`;

  const pageUrl = `${SITE_URL}/activities/${activity.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${activity.title} Activities`,
      description,
      url: pageUrl,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(activity.thumbnail),
      },
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Activities", item: `${SITE_URL}/#activities` },
        { "@type": "ListItem", position: 3, name: activity.title, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <SEO
        title={`${activity.title} Activities`}
        description={description}
        path={`/activities/${activity.slug}`}
        image={activity.thumbnail}
        imageAlt={`${activity.title} at ${SITE_NAME}`}
        jsonLd={jsonLd}
      />

      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
        {/* HERO SECTION */}
        <PageHeader
          title={activity.title}
          subtitle="Explore this activity and discover new skills"
          breadcrumbs={["Home", "Activities", activity.title]}
        />

        {/* ACTIVITY OVERVIEW */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <Reveal delay={100}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-secondary/10" />
              <div className="relative overflow-hidden h-[320px] group">
                <Image
                  src={activity.thumbnail}
                  alt={`${activity.title} at ${SITE_NAME}`}
                  fill
                  priority
                  unoptimized={skipOptimization(activity.thumbnail)}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </Reveal>

          {/* TEXT CONTENT */}
          <div className="space-y-6">
            <Reveal delay={200}>
              <p className="text-sm uppercase tracking-widest text-secondary font-semibold">
                Activity Overview
              </p>
            </Reveal>

            <Reveal delay={300}>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                About {activity.title}
              </h1>
            </Reveal>

            <Reveal delay={400}>
              <div
                className="text-gray-600 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: activity.description }}
              />
            </Reveal>
          </div>
        </section>

        {/* GALLERY SECTION */}
        {activity.images.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">
                  Gallery
                </h2>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {activity.images.map((img, i) => (
                <Reveal key={img} delay={i * 80}>
                  <div
                    className="relative group cursor-pointer overflow-hidden rounded-2xl h-[220px] md:h-[240px]"
                    onClick={() => setActiveImage(img)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActiveImage(img);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${activity.title} photo ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${activity.title} – photo ${i + 1}`}
                      fill
                      loading="lazy"
                      unoptimized={skipOptimization(img)}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-[1deg]"
                    />

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow">
                        View
                      </div>
                    </div>

                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* LIGHTBOX MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all"
          onClick={() => setActiveImage(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setActiveImage(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition"
              onClick={() => setActiveImage(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <Image
              src={activeImage}
              alt={`${activity.title} – full size photo`}
              width={1600}
              height={1067}
              unoptimized={skipOptimization(activeImage)}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ==========================================================
   SERVER-SIDE DATA  (this is what makes WhatsApp previews work)
   The HTML that WhatsApp/Google download now already contains
   the title, description and og:image for THIS activity.
========================================================== */
// Pages are built on first visit and refreshed from the API every minute,
// so activities added in the admin panel show up without a redeploy.
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const activity = await fetchActivity(String(params?.slug));
    return { props: { activity }, revalidate: REVALIDATE_SECONDS };
  } catch (err) {
    if (err instanceof ApiNotFound) return { notFound: true, revalidate: REVALIDATE_SECONDS };
    throw err;
  }
};
