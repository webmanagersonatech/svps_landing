import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { activities } from "../../data/activities";
import { PageHeader } from "../../components/PageHeader";

/* =========================
   REVEAL HOOK (with delay support)
========================= */
function useReveal(delay: number = 0) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay if specified, before showing the element
          if (delay > 0) {
            const timer = setTimeout(() => setVisible(true), delay);
            return () => clearTimeout(timer);
          } else {
            setVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
}

/* =========================
   REVEAL COMPONENT
========================= */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

function Reveal({ children, delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal(delay);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
        }`}
      style={{ transitionDelay: visible ? "0ms" : `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function ActivityDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const activity = activities.find((a) => a.slug === slug);

  if (!activity) return null;

  return (
    <>
      <Head>
        <title>{activity.title} | Activities</title>
        <meta name="description" content={`Explore ${activity.title} and discover new skills`} />
      </Head>

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
              <div className="absolute -top-6 -left-6 w-full h-full bg-secondary/10 " />
              <div className="relative overflow-hidden h-[320px] group">
                <img
                  src={activity.thumbnail}
                  alt={activity.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  loading="eager"
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 ">
                About {activity.title}
              </h2>
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
    
    {/* HEADER */}
    <Reveal>
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">
          Gallery
        </h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
      </div>
    </Reveal>

    {/* GRID */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {activity.images.map((img, i) => (
        <Reveal key={img} delay={i * 80}>
          <div
            className="relative group cursor-pointer overflow-hidden rounded-2xl"
            onClick={() => setActiveImage(img)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveImage(img);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {/* IMAGE */}
            <img
              src={img}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              className="w-full h-[220px] md:h-[240px] object-cover 
              transition duration-700 ease-out 
              group-hover:scale-110 group-hover:rotate-[1deg]"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* CENTER ICON */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow">
                View
              </div>
            </div>

            {/* TOP GRADIENT (modern look) */}
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
            <img
              src={activeImage}
              alt="Full size"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}