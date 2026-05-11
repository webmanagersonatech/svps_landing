import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  LightBulbIcon,

} from "@heroicons/react/24/outline";

/* =========================
   SCROLL REVEAL HOOK
========================= */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${visible
          ? "opacity-100 translate-y-0 scale-100 blur-0"
          : "opacity-0 translate-y-12 scale-[0.98] blur-sm"
        }`}
    >
      {children}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function HeritagePage() {

  const milestones = [
    {
      year: "1958",
      title: "Thiagarajar Polytechnic College",
      description:
        "The seed of educational service was sown in Salem by Philanthropist Kalathanthai Sri.Karumuttu Thiagarajar Chettiar.",
    },
    {
      year: "1997",
      title: "Sona College of Technology",
      description:
        "Established under the vision of Sri.M.S.Chockalingam, becoming a forerunner in technical education.",
    },
    {
      year: "2017",
      title: "Sona College of Arts and Science",
      description:
        "The most sought-after Arts and Science college in Salem district, known for excellence and quality.",
    },
    {
      year: "2025",
      title: "Sona Valliappa Public School",
      description:
        "Our new venture to enlighten young minds with holistic, innovative education.",
    },
  ];

  return (
    <>
      <Head>
        <title>Our Heritage | Sona Valliappa Public School</title>
      </Head>

      <main className="bg-gradient-to-b from-background/60 via-white to-background/50">

        {/* HERO */}
        <PageHeader
          title='"Education gives wings to fly"'
          subtitle="- Dr. APJ Abdul Kalam"
          breadcrumbs={["Home", "About", "Our Heritage"]}
        />

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">


            {/* VIDEO */}
            <Reveal>
              <div className="mt-6 w-full">

                {/* FULL WIDTH TV FRAME VIDEO */}
                <div className="relative group">
                  <div className="bg-black p-2 md:p-3 rounded-3xl shadow-2xl border-[6px] border-secondary relative">

                    {/* Screen */}
                    <div className="rounded-2xl overflow-hidden bg-black relative">

                      {/* subtle screen glow */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent z-10" />

                      <iframe
                        src="https://www.youtube.com/embed/U-KlS3OA9VA"
                        title="School Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        // 🔽 Reduced heights
                        className="w-full h-[180px] md:h-[280px] lg:h-[360px] object-cover"
                      />
                    </div>

                    {/* TV stand (unchanged - stays at bottom of new height) */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-3 bg-secondary rounded-full blur-sm opacity-70" />
                  </div>
                </div>

              </div>
            </Reveal>

            {/* TEXT */}
            <div className="h-full flex flex-col justify-center space-y-4">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary">
                  A Legacy of Excellence in Education
                </h2>
              </Reveal>

              <Reveal delay={100}>
                <p className="text-gray-700 leading-relaxed">
                  Education is the most powerful tool that brings in changes in everyone's life.
                  Rightly, with this noble and lofty vision, the Philanthropist
                  Kalathanthai Sri.Karumuttu Thiagarajar Chettiar, the textile wizard,
                  seeded the educational service in Salem with the humble beginning of
                  "Thiagarajar Polytechnic College" in 1958.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-gray-700 leading-relaxed">
                  This seed had its rapid growth and blossomed into a magnificent tree with the relentless and magnanimous services of Sri.M.S.Chockalingam. He turned the institution to be a forerunner in technical education with its rich academic standards and is being celebrated as the most respected institution across the nation with 50000+ Alumni occupying top ranks in various multinational forums. His ardent desire in offering higher education led to the establishment of “Sona College of Technology” in 1997.
                </p>
              </Reveal>
            </div>

          </div>
        </div>

        {/* STORY */}
        <div className="max-w-7xl  mx-auto px-4 space-y-4 text-gray-700  leading-relaxed">
          {[
            `Following the footsteps of the two legendary personalities, the educational legacy of Sona Group is being multiplied under the vibrant leadership of Sri.C.Valliappa, the Chairman and the Vice Chairmen Sri.Chocko Valliappa and Sri.Thyagu Valliappa, whose dedicated services with commitment has made SCT, the first offshoot of Sona Group to root strongly with its emergence as a top ranking engineering college in the nation and offers Under Graduate, Post Graduate and Doctoral programmes in engineering, technology and business,recognized by SIRO with 30+ research centers catering to the needs of society.`,
            `The relentless quest along with the public demand instilled great passion in the minds of the Chairman and the Vice Chairmen to establish yet another offshoot “Sona College of Arts and Science” in 2017 which has become the most sought after Arts and Science college in and around Salem district within a very short span of its inception for its excellent quality and standards.`,
            `During this splendid and untiring journey of Six decades, the Sona Group takes pride in polishing more than 75000 diamonds, who uphold the name and fame of the Institutions by serving the needs of the world in various sectors.`,

            `Having become self-reliant and progressive in offering higher education, the Sona Group now intends to enlighten the uncut diamonds, the young children with its new venture the “Sona Valliappa Public School”.`,
            `The school aims to offer right and holistic education with love and care to nurture, develop, enlighten and empower the future citizens of tomorrow and stands up with its motto “Nurturing Young Minds with Innovation!”.`
          ].map((text, i) => (
            <Reveal key={i} delay={i * 120}>
              <p>{text}</p>
            </Reveal>
          ))}

          <Reveal delay={500}>
            <p className="font-semibold text-primary">
              "Nurturing Young Minds with Innovation!"
            </p>
          </Reveal>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">

          {/* TWO COLUMN LAYOUT */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

            {/* LEFT SIDE - HONEYCOMB ACHIEVEMENT GRID */}
            <div className="relative">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full" />
                <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-primary rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {milestones.map((item, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div className="group relative">
                      {/* Card with tilt/shadow effect */}
                      <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">

                        {/* Gradient border effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Decorative ribbon/tag */}
                        <div className="absolute -top-2 -right-2 w-16 h-16 overflow-hidden">
                          <div className="absolute top-4 right-[-20px] w-28 bg-primary text-white text-xs font-bold py-1 rotate-45 text-center shadow-md">
                            {i === 0 ? "Latest" : `#${i + 1}`}
                          </div>
                        </div>

                        {/* Year badge */}
                        <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-4">
                          <span className="text-primary font-mono font-bold text-sm">
                            {item.year}
                          </span>
                        </div>

                        {/* Title with icon */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors flex-1">
                            {item.title}
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>

                        {/* Decorative bottom line */}
                        <div className="mt-4 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500" />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - STATS + FINAL */}
            <div className="space-y-16">

              {/* STATS SECTION */}
              <div>
                <Reveal delay={100}>
                  <h3 className="text-2xl font-bold text-secondary mb-8 text-center md:text-left">
                    Our Impact in Numbers
                  </h3>
                </Reveal>

                <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 text-center">
                  {[
                    ["75,000+", "Students Transformed", "Diamonds Polished"],
                    ["60+", "Years of Legacy", "Educational Excellence"],
                    ["30+", "Research Centers", "Catering to Society"],

                  ].map((item, i) => (
                    <Reveal key={i} delay={i * 120}>
                      <div className="hover:-translate-y-1 transition min-w-[120px]">
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary">{item[0]}</h3>
                        <p className="text-gray-800 font-semibold text-sm md:text-base mt-1">{item[1]}</p>
                        <p className="text-gray-500 text-xs">{item[2]}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* FINAL / SCHOOL SECTION */}
              <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center overflow-hidden shadow-lg"
                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)" }}>
                <Reveal>
                  <LightBulbIcon className="w-12 h-12 mx-auto text-primary mb-4 animate-pulse" />
                </Reveal>

                <Reveal delay={150}>
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                    Sona Valliappa Public School
                  </h3>
                </Reveal>

                <Reveal delay={250}>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Having become self-reliant and progressive in offering higher education,
                    the Sona Group now intends to enlighten the <span className="font-bold text-primary">uncut diamonds</span>,
                    the young children with its new venture.
                  </p>
                </Reveal>

                <Reveal delay={350}>
                  <button className="bg-primary text-white px-8 py-2 rounded-r-full hover:scale-105 active:scale-95 transition duration-300 shadow-md hover:shadow-lg">
                    Enquire Now
                  </button>
                </Reveal>
              </div>


            </div>
          </div>
        </div>

      </main>
    </>
  );
}