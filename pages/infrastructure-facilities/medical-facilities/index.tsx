import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  TruckIcon,
  PlusCircleIcon,
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
export default function MedicalFacilitiesPage() {
  const features = [
    {
      icon: HeartIcon,
      title: "Well-Equipped Infirmary",
      desc: "Dedicated medical room with essential equipment for immediate care.",
    },
    {
      icon: UserGroupIcon,
      title: "Qualified Staff",
      desc: "Trained nurse and staff available during school hours.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Health & Safety Protocols",
      desc: "Strict hygiene standards and regular health monitoring.",
    },
    {
      icon: ClockIcon,
      title: "Regular Health Checkups",
      desc: "Periodic medical checkups to track student well-being.",
    },
    {
      icon: TruckIcon,
      title: "Emergency Support",
      desc: "Quick response system with tie-ups to nearby hospitals.",
    },
    {
      icon: PlusCircleIcon,
      title: "First Aid & Care",
      desc: "Immediate attention for minor injuries and health concerns.",
    },
  ];

  return (
    <>
      <Head>
        <title>Medical Facilities | Sona Valliappa Public School</title>
      </Head>

      <main className="bg-slate-50">
        {/* HEADER */}
        <PageHeader
          title="Medical Facilities"
          subtitle="Ensuring the health, safety, and well-being of every student."
          breadcrumbs={["Home", "Facilities", "Medical"]}
        />

        {/* INTRO */}
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <Reveal>
            <div className="relative group  overflow-hidden transition-all duration-500  hover:-translate-y-1">

              {/* IMAGE SECTION */}
              <div className="relative p-5">
                <div
                  className="w-full aspect-[4/3] overflow-hidden shadow-lg"
                  style={{
                    clipPath:
                      "polygon(20% 0%, 85% 0%, 100% 25%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                  }}
                >
                  <img
                    src="https://img.magnific.com/premium-photo/portrait-beautiful-young-intelligent-looking-indian-asian-woman-student_1207718-128135.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                    alt="Medical Room"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                {/* BADGE */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-md text-sm font-medium">
                  Safe & Caring Environment
                </div>
              </div>

            </div>
          </Reveal>

          {/* CONTENT */}
          <Reveal>
            <div>
              <h2 className="text-3xl font-bold text-secondary  font-serif  mb-4">
                Caring for Every Child
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed">
                The school provides comprehensive medical support to ensure that every
                student is safe and cared for throughout the day.
              </p>

              <p className="text-gray-600 leading-relaxed mb-4">
                From routine health checkups to emergency care, our facilities are
                equipped to handle every situation efficiently.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                From routine health checkups to emergency care, our facilities are
                equipped to handle every situation efficiently.
              </p>

              <p className="text-gray-600 leading-relaxed">
                From routine health checkups to emergency care, our facilities are
                equipped to handle every situation efficiently.
              </p>
            </div>
          </Reveal>

        </div>

        {/* FEATURES */}
        <div className="max-w-7xl mx-auto px-4 pb-20">

          <h2 className="text-2xl font-bold text-center mb-10">
            Our Medical Services
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i}>
                  <div className="bg-white rounded-xl border p-5 hover:shadow-md transition flex items-start gap-4">

                    {/* ICON */}
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* TEXT */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </main>
    </>
  );
}