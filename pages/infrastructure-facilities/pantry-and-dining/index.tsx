import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

/* =========================
   REVEAL
========================= */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      {children}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function DiningPage() {
  return (
    <>
      <Head>
        <title>Dining | Sona Valliappa Public School</title>
      </Head>

      <main className="bg-slate-50">
        {/* HEADER */}
        <PageHeader
          title="Dining"
          subtitle="Promoting healthy eating habits for growing minds."
          breadcrumbs={["Home", "Facilities", "Dining"]}
        />

        {/* INTRO */}
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-secondary mb-4">
                Healthy Food, Healthy Students
              </h2>

              <p className="text-gray-600 mb-5">
                Students are encouraged to bring nutritious, home-prepared food
                to support their physical and mental well-being.
              </p>

              {/* KEY POINTS */}
              <div className="space-y-3 mb-5">

                <p className="text-gray-700 flex gap-2">
                  <span className="text-green-600">•</span>
                  Promotes balanced nutrition for growing children.
                </p>

                <p className="text-gray-700 flex gap-2">
                  <span className="text-green-600">•</span>
                  Helps improve concentration and classroom performance.
                </p>

                <p className="text-gray-700 flex gap-2">
                  <span className="text-green-600">•</span>
                  Encourages home-cooked and hygienic food habits.
                </p>

                <p className="text-gray-700 flex gap-2">
                  <span className="text-green-600">•</span>
                  Reduces consumption of junk and processed foods.
                </p>

                <p className="text-gray-700 flex gap-2">
                  <span className="text-green-600">•</span>
                  Builds lifelong healthy eating discipline from early age.
                </p>

              </div>

              <p className="text-gray-600">
                Developing healthy eating habits at an early age helps children
                stay active, focused, and energetic throughout the day.
              </p>
            </div>
          </Reveal>


          <Reveal>
            <div className="relative">

              {/* LEFT COLOR STRIP (modern accent) */}
              <div className="absolute -left-2 top-6 h-[85%] w-2 bg-green-400 rounded-full" />

              {/* BACKGROUND SHADOW CARD */}
              <div className="absolute top-4 left-4 w-full h-full bg-green-50 rounded-2xl" />

              {/* MAIN IMAGE CARD */}
              <div className="relative  overflow-hidden shadow-2xl group aspect-[4/3]">

                <img
                  src="https://img.magnific.com/premium-photo/students-enjoy-nutritious-breakfast-national-school-breakfast-week-sharing-smiles_771426-115272.jpg"
                  alt="Healthy Food"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* SOFT GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

                {/* FLOATING CONTENT BLOCK */}
                <div className="absolute bottom-6 left-6 max-w-[80%]">

                  <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-t-xl shadow-md">

                    <p className="font-semibold text-gray-900 text-lg">
                      Healthy Dining Culture
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      Encouraging nutritious habits, balanced meals, and mindful eating
                    </p>

                  </div>

                </div>

                {/* TOP BADGE */}
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium shadow">
                  Nutrition First
                </div>

              </div>

            </div>
          </Reveal>
        </div>

        {/* RULES */}
        <div className="max-w-7xl mx-auto px-4 pb-20 grid md:grid-cols-2 gap-8">

          {/* MUST FOLLOW */}
          <Reveal>
            <div className="relative overflow-hidden border shadow-sm">

              {/* Background Image */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/infra/junk2.webp')",
                  }}
                />

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/70" />
              </div>

              {/* Decorative Shapes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-10 w-44 h-44 bg-yellow-400/20 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10 p-6">
                <h3 className="text-lg font-semibold mb-5 flex items-center gap-2 text-white">
                  <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  </div>
                  Guidelines
                </h3>

                <ul className="space-y-3 text-white/90 text-sm leading-relaxed">
                  <li>
                    Children must carry their own water bottle, snacks box, and lunch box.
                  </li>

                  <li>
                    All items must be labeled with the child's name and class.
                  </li>

                  <li className="font-semibold text-white pt-2">
                    Snacks can include:
                  </li>

                  <li className="ml-4 list-disc marker:text-green-400">
                    Seasonal fruits, fruit salads, vegetable salads
                  </li>

                  <li className="ml-4 list-disc marker:text-green-400">
                    Boiled vegetables, dates, nuts, peanuts, corn
                  </li>

                  <li className="ml-4 list-disc marker:text-green-400">
                    Sandwiches, paneer, grams of your choice
                  </li>

                  <li className="ml-4 list-disc marker:text-green-400">
                    Homemade fruit juice, tender coconut
                  </li>

                  <li className="pt-2">
                    Lunch can be any rice variety with one vegetable side dish.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>


          {/* NOT ALLOWED */}
          <Reveal>
            <div className="relative overflow-hidden border shadow-sm">

              {/* Background */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/infra/junk1.webp')",
                  }}
                />

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/75" />
              </div>

              {/* Decorative Blur Effects */}
              <div className="absolute -top-12 -left-12 w-44 h-44 bg-red-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10 p-6">

                <h3 className="text-lg font-semibold mb-5 flex items-center gap-3 text-white">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <XCircleIcon className="w-5 h-5 text-red-400" />
                  </div>

                  Not Allowed
                </h3>

                <ul className="space-y-4 text-white/90 text-sm leading-relaxed">

                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-red-400" />
                    Junk food and packaged snacks are strictly prohibited.
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-red-400" />
                    Soft drinks, fizzy beverages, and energy drinks are not allowed.
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-red-400" />
                    Chocolate, candies, and sugary sweets should be avoided.
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-red-400" />
                    Outside food items without proper labeling are not permitted.
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-red-400" />
                    Glass bottles and unsafe containers are discouraged.
                  </li>

                </ul>

                {/* Bottom Alert Box */}
                <div className="mt-6 relative overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md p-4">

                  <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 rounded-full blur-2xl" />

                  <p className="relative z-10 text-sm text-white/90 leading-relaxed">
                    Parents are kindly requested to ensure children follow healthy eating
                    habits and avoid all junk food items.
                  </p>

                </div>

              </div>
            </div>
          </Reveal>
        </div>


      </main>
    </>
  );
}