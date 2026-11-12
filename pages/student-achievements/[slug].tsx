import Image from "next/image";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import SEO, { SITE_NAME, SITE_URL, toAbsoluteUrl } from "../../components/SEO";
import { PageHeader } from "../../components/PageHeader";
import { Reveal } from "../../components/Reveal";
import { achievements, getAchievement, type Achievement } from "../../data/achievements";

const titleCase = (s: string) =>
  s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export default function AchievementDetail({
  item,
  others,
}: {
  item: Achievement;
  others: Achievement[];
}) {
  const name = titleCase(item.studentName);
  const title = `${name} - ${titleCase(item.achievement)}`;
  const pageUrl = `${SITE_URL}/student-achievements/${item.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: item.description,
      url: pageUrl,
      primaryImageOfPage: { "@type": "ImageObject", url: toAbsoluteUrl(item.image) },
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Student Achievements", item: `${SITE_URL}/student-achievements` },
        { "@type": "ListItem", position: 3, name, item: pageUrl },
      ],
    },
  ];

  const facts = [
    { label: "Class", value: item.className ? titleCase(item.className) : undefined },
    { label: "Category", value: item.category },
    { label: "Level", value: item.level },
    { label: "Year", value: item.date },
  ].filter((f) => f.value);

  return (
    <>
      <SEO
        title={title}
        description={item.description}
        path={`/student-achievements/${item.slug}`}
        image={item.image}
        imageAlt={`${name} - ${item.achievement}`}
        jsonLd={jsonLd}
      />

      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <PageHeader
          title="Student Achievements"
          subtitle="Celebrating the pride of our school"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Student Achievements", href: "/student-achievements" },
            { label: name, href: `/student-achievements/${item.slug}` },
          ]}
        />

        {/* HERO CARD */}
      
{/* HERO CARD */}
<section className="relative max-w-6xl mx-auto px-6 pt-12 pb-16 overflow-hidden">
  {/* soft background glow */}
  <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
  <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#d89b2b]/10 blur-3xl" />

  <div className="relative grid md:grid-cols-12 gap-10 lg:gap-16 items-center">

    {/* IMAGE SECTION */}
    <div className="md:col-span-5 w-full">
      <Reveal delay={100}>
        <div className="relative mx-auto w-full max-w-[380px] md:max-w-[440px] mb-8">

          {/* Decorative layers */}
          <div className="absolute -top-3 -left-3 h-full w-full rounded-3xl bg-primary/20" />
          <div className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl border-2 border-[#d89b2b]/50" />

          {/* Gold gradient frame */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#7c3f00] via-[#d89b2b] to-[#7c3f00] p-[5px] shadow-2xl">

            {/* Reduced image height */}
            <div className="relative h-[300px] sm:h-[340px] md:h-[360px] lg:h-[390px] overflow-hidden rounded-[20px] bg-white">

              <Image
                src={item.image}
                alt={`${name} - ${item.achievement}`}
                fill
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 40vw, 90vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
              />

              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Name plate */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gradient-to-r from-[#7c3f00] via-[#d89b2b] to-[#7c3f00] px-6 py-2.5 text-center shadow-xl border border-yellow-200/40">
            <p className="text-white font-serif font-semibold tracking-wide text-sm md:text-base">
              {name}
            </p>

            {item.className && (
              <p className="text-white/90 uppercase tracking-[3px] text-[10px] mt-0.5">
                {item.className}
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </div>

    {/* CONTENT SECTION */}
    <div className="md:col-span-7 space-y-5">

      <Reveal delay={250}>
        <span className="inline-flex items-center gap-2  bg-[#d89b2b]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-[#7c3f00]">
          <span className="h-1.5 w-1.5  bg-[#d89b2b]" />
          Achievement
        </span>
      </Reveal>

      <Reveal delay={300}>
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-secondary leading-tight">
            {titleCase(item.achievement)}
          </h1>

          {item.subTitle && (
            <p className="mt-3 text-[#10294d] uppercase tracking-[3px] text-sm md:text-base font-medium">
              {item.subTitle}
            </p>
          )}

          <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#d89b2b] to-transparent" />
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className=" border-l-4 border-l-[#d89b2b] bg-white/80 backdrop-blur p-5 md:p-7">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {item.description}
          </p>
        </div>
      </Reveal>

      {item.parent && (
        <Reveal delay={500}>
          <p className="text-sm text-secondary/80 uppercase tracking-wide">
            <span className="text-[#d89b2b] mr-2">—</span>
            {item.parent}
          </p>
        </Reveal>
      )}

    </div>
  </div>
</section>


        {/* QUICK FACTS */}
        {facts.length > 1 && (
          <section className="max-w-6xl mx-auto px-4 py-8">
            <Reveal>
              <div className="flex flex-wrap justify-center gap-4">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="w-[calc(50%-0.5rem)] md:w-56 rounded-2xl bg-white p-5 text-center shadow-sm border border-slate-100"
                  >
                    <p className="text-[11px] uppercase tracking-widest text-slate-400">{f.label}</p>
                    <p className="mt-1 text-lg font-semibold text-secondary">{f.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* ACHIEVEMENTS (+ optional story) */}
        {(item.story?.length || item.highlights?.length) && (
          <section className="max-w-5xl mx-auto px-4 py-12 space-y-10">
            {item.story && item.story.length > 0 && (
              <div className="space-y-5">
                {item.story.map((p, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <p className="text-gray-600 leading-relaxed">{p}</p>
                  </Reveal>
                ))}
              </div>
            )}

            {item.highlights && item.highlights.length > 0 && (
              <div>
                <Reveal>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900">Achievements</h2>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
                  </div>
                </Reveal>
                <ul className="space-y-4">
                  {item.highlights.map((h, i) => (
                    <Reveal key={h} delay={i * 80}>
                      <li className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {i + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed pt-1">{h}</p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* QUOTE */}
        {item.quote && (
          <section className="max-w-4xl mx-auto px-4 py-10">
            <Reveal>
              <blockquote className="relative rounded-3xl bg-white p-8 md:p-12 text-center shadow-lg border border-slate-100">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl font-serif text-primary leading-none">&ldquo;</span>
                <p className="text-xl md:text-2xl font-serif italic text-secondary">{item.quote}</p>
                {item.quoteBy && (
                  <footer className="mt-4 text-sm uppercase tracking-widest text-slate-500">- {item.quoteBy}</footer>
                )}
              </blockquote>
            </Reveal>
          </section>
        )}

        {/* GALLERY */}
        {item.gallery && item.gallery.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-12">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-8">Gallery</h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {item.gallery.map((img, i) => (
                <Reveal key={img} delay={i * 80}>
                  <div className="relative h-[220px] overflow-hidden rounded-2xl">
                    <Image
                      src={img}
                      alt={`${name} photo ${i + 1}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* MORE ACHIEVERS */}
        {others.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-12">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-8">More Achievers</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={i * 100}>
                  <Link
                    href={`/student-achievements/${o.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={o.image}
                        alt={o.studentName}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-widest text-primary">{o.category || o.className}</p>
                      <h3 className="mt-1 font-serif text-lg text-secondary">{titleCase(o.studentName)}</h3>
                      <p className="text-sm text-gray-500">{titleCase(o.achievement)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <div className="max-w-6xl mx-auto px-4 pb-20 text-center">
          <Link
            href="/student-achievements"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-white font-medium shadow-lg hover:brightness-95 transition"
          >
            &larr; All Student Achievements
          </Link>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: achievements.map((a) => ({ params: { slug: a.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const item = getAchievement(String(params?.slug));
  if (!item) return { notFound: true };
  const others = achievements.filter((a) => a.slug !== item.slug).slice(0, 3);
  return { props: { item, others } };
};