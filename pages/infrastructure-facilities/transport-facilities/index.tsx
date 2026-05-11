import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  TruckIcon,
  MapIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  PhoneIcon,
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
export default function TransportPage() {
  const features = [
    {
      icon: TruckIcon,
      title: "Wide Transport Network",
      desc: "School buses cover major routes ensuring easy access.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Safety First",
      desc: "GPS tracking & trained staff for student safety.",
    },
    {
      icon: ClockIcon,
      title: "Punctual Timings",
      desc: "Well-planned schedules for timely travel.",
    },
    {
      icon: MapIcon,
      title: "Route Optimization",
      desc: "Efficient routes for faster commute.",
    },
    {
      icon: UserGroupIcon,
      title: "Comfort Seating",
      desc: "Spacious buses for a relaxed journey.",
    },
    {
      icon: PhoneIcon,
      title: "Parent Updates",
      desc: "Stay informed with regular updates.",
    },
  ];

  return (
    <>
      <Head>
        <title>Transport Facilities | Sona Valliappa Public School</title>
      </Head>

      <main className="bg-gradient-to-b from-slate-50 to-white">
        {/* HEADER */}
        <PageHeader
          title="Transport Facilities"
          subtitle="Safe, reliable, and efficient transportation for every student."
          breadcrumbs={["Home", "Facilities", "Transport"]}
        />

        {/* INTRO */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary  mb-6 font-serif leading-snug">
                Safe Journeys,
                <span className="text-primary block">Every Single Day</span>
              </h2>

              <p className="text-gray-600 mb-4 text-lg">
                Our transport system is built with safety, comfort, and
                punctuality at its core.
              </p>

              <p className="text-gray-600 text-lg">
                GPS-enabled buses, trained drivers, and optimized routes ensure
                a smooth and secure commute for every student.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative group ">

              {/* back layers */}
              <div className="absolute top-4 left-4 w-full h-full bg-primary/10 rounded-2xl"></div>
              <div className="absolute top-2 left-2 w-full h-full bg-primary/20 rounded-2xl"></div>

              {/* main */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://img.magnific.com/premium-photo/landscape-yellow-school-bus-with-word-school-front_1288286-2797.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                  alt="School Bus"
                  className="w-full h-[240px] object-cover"
                />
              </div>

            </div>
          </Reveal>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
              Why Choose Our Transport?
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i}>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">

                    <Icon className="w-8 h-8 text-primary mb-3" />

                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}