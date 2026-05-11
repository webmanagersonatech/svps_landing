import Head from "next/head";
import { PageHeader } from "./PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  BookOpenIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  SparklesIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

/* =========================
   SCROLL REVEAL (Enhanced)
========================= */
function useReveal(threshold = 0.15, delay = 0) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal(0.15, delay);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        visible
          ? "opacity-100 translate-y-0 rotate-0 scale-100"
          : "opacity-0 translate-y-12 rotate-1 scale-95"
      }`}
    >
      {children}
    </div>
  );
}

/* =========================
   MAIN PAGE - REDESIGNED
========================= */
export default function ClassroomPage() {
  const features = [
    {
      icon: BookOpenIcon,
      title: "Concept-Based Learning",
      desc: "Deep understanding over rote memorization with real-world connections.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: ComputerDesktopIcon,
      title: "Smart Classrooms",
      desc: "Interactive panels, digital resources & immersive visual learning.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: UserGroupIcon,
      title: "Collaborative Learning",
      desc: "Structured group work, peer mentoring & presentation skills.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: LightBulbIcon,
      title: "Activity-Based Teaching",
      desc: "Hands-on experiments, simulations & project-based learning.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Open Interaction",
      desc: "Safe environment for questions, debates and classroom dialogue.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: AcademicCapIcon,
      title: "Individual Attention",
      desc: "Personalized learning paths & mentor support for every child.",
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  const stats = [
    { value: "24:1", label: "Student-Teacher Ratio", icon: UserGroupIcon },
    { value: "100%", label: "Smart Classrooms", icon: ComputerDesktopIcon },
    { value: "8+", label: "Awards for Excellence", icon: StarIcon },
    { value: "15+", label: "Clubs & Activities", icon: SparklesIcon },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
  ];

  return (
    <>
      <Head>
        <title>Classrooms | Sona Valliappa Public School</title>
        <meta
          name="description"
          content="Step into the future of education — modern, interactive, and child-centric classrooms designed for 21st century learning."
        />
      </Head>

      <main className="bg-white overflow-x-hidden">
        {/* HEADER with custom styling */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-cyan-50 -z-10" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-indigo-100/30 to-transparent rounded-bl-[100px] -z-10" />
          <PageHeader
            title="Classrooms"
            subtitle="Where curiosity meets innovation — a learning ecosystem designed for brilliance."
            breadcrumbs={["Home", "Academics", "Classrooms"]}
          />
        </div>

        {/* HERO SECTION - Redesigned with modern split layout & badges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
                  <SparklesIcon className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-700">
                    Next-Gen Learning Environment
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  A Space Where{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    Learning Comes Alive
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our classrooms break free from traditional boundaries — designed
                  to inspire creativity, foster collaboration, and empower every
                  student to thrive in a rapidly changing world.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button className="group bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-indigo-200 transition-all duration-300 flex items-center gap-2">
                    Virtual Tour
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="border-2 border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 px-6 py-3 rounded-full font-semibold transition-all duration-300">
                    Download Brochure
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop"
                    alt="Modern classroom with students"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <CheckBadgeIcon className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-800">
                        Smart Class Certified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* STATS SECTION - new engaging metrics */}
        <div className="bg-gradient-to-r from-indigo-50 via-white to-cyan-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={idx} delay={idx * 80}>
                    <div className="text-center group">
                      <div className="mx-auto w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-indigo-200">
                        <Icon className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* FEATURES SECTION - modern card design with gradient borders */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Designed for{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  Holistic Growth
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
              <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                Every corner of our classroom is intentionally crafted to spark
                curiosity, encourage exploration, and build lifelong skills.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-indigo-700" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRightIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* IMMERSIVE GALLERY SECTION - new visual showcase */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  A Glimpse Inside Our{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    Learning Spaces
                  </span>
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  See how our classrooms transform into dynamic hubs of discovery.
                </p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.map((img, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                    <img
                      src={img}
                      alt={`Classroom gallery ${idx + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="bg-white p-3">
                      <p className="text-sm text-gray-500 text-center">
                        {idx === 0 && "Interactive Session"}
                        {idx === 1 && "Group Discovery"}
                        {idx === 2 && "Smart Lab"}
                        {idx === 3 && "Creative Corner"}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* TESTIMONIAL PILL - adds credibility and warmth */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Reveal>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-indigo-100 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-40" />
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-gray-700 italic leading-relaxed">
                  “The classroom environment at Sona Valliappa is unlike anything
                  we've seen. My child looks forward to school every day — the
                  interactive teaching methods have genuinely reignited her love
                  for learning.”
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    SP
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      Mrs. Sunita Prakash
                    </div>
                    <div className="text-sm text-gray-500">
                      Parent, Grade 5 Student
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* CTA SECTION - redesigned with dual action & modern backdrop */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=600&fit=crop"
              className="w-full h-full object-cover"
              alt="Campus background"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-cyan-900/80 backdrop-blur-sm" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <CalendarDaysIcon className="w-5 h-5 text-white" />
                <span className="text-white/90 font-medium">
                  Open House Every Saturday
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Experience the Difference
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Walk through our interactive classrooms, meet our passionate
                educators, and see why parents call SVS the best decision for
                their child’s future.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="group bg-white text-indigo-700 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  Book a Campus Visit
                  <MapPinIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white/50 hover:border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5" />
                  Virtual Experience
                </button>
              </div>
              <p className="text-white/60 text-sm mt-8">
                Limited slots available — register now for a personalized tour.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}