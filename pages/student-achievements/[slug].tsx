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
          breadcrumbs={["Home", "Student Achievements", name]}
        />

        {/* HERO CARD */}
        <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <Reveal delay={100}>
              <div className="md:col-span-2 relative mx-auto w-full max-w-[340px]">
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/20 rounded-2xl" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-[6px] border-white shadow-2xl">
                  <Image
                    src={item.image}
                    alt={`${name} - ${item.achievement}`}
                    fill
                    priority
                    sizes="(min-width: 768px) 340px, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gradient-to-r from-[#7c3f00] via-[#d89b2b] to-[#7c3f00] px-6 py-2 text-center shadow-xl border border-yellow-200/40">
                  <p className="text-white font-serif font-semibold tracking-wide text-sm">{name}</p>
                  {item.className && <p className="text-white/90 uppercase tracking-[3px] text-[9px]">{item.className}</p>}
                </div>
              </div>
            </Reveal>

            <div className="md:col-span-3 space-y-5 mt-6 md:mt-0">
              <Reveal delay={200}>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  {item.category || "Achievement"}
                </span>
              </Reveal>
              <Reveal delay={300}>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-secondary leading-tight">
                  {titleCase(item.achievement)}
                </h1>
                {item.subTitle && (
                  <p className="mt-2 text-[#10294d] uppercase tracking-[3px] text-sm md:text-base">
                    {item.subTitle}
                  </p>
                )}
              </Reveal>
              <Reveal delay={400}>
                <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
              </Reveal>
              {item.parent && (
                <Reveal delay={500}>
                  <p className="text-sm text-secondary/80 uppercase tracking-wide">{item.parent}</p>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* QUICK FACTS */}
        {facts.length > 1 && (
          <section className="max-w-6xl mx-auto px-4 py-8">
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {facts.map((f) => (
                  <div key={f.label} className="  p-5 text-center shadow-sm border border-slate-100">
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
                      <li className="flex items-start gap-4 p-5 shadow-sm border border-slate-100">
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
                    <Image src={img} alt={`${name} photo ${i + 1}`} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
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
                  <Link href={`/student-achievements/${o.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={o.image} alt={o.studentName} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top transition duration-500 group-hover:scale-105" />
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
          <Link href="/student-achievements" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-white font-medium shadow-lg hover:brightness-95 transition">
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