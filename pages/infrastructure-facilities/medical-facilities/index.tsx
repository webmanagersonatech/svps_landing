import SEO from "../../../components/SEO";
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
      title: "Regular Medical Check-up",
      desc: "Comprehensive health check-ups conducted by Sona Ayush Doctors to monitor student well-being.",
    },
    {
      icon: UserGroupIcon,
      title: "Medical Camp",
      desc: "Specialized medical camps organized for students to ensure thorough health assessment.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Medical Counselling",
      desc: "Professional medical counselling services to address health concerns and promote wellness.",
    },
    {
      icon: PlusCircleIcon,
      title: "First Aid Facility",
      desc: "Immediate first aid assistance available on campus for any minor injuries or emergencies.",
    },
  ];

  return (
    <>
      <SEO
        title="Medical Facilities"
        description="On-campus medical facilities and healthcare support ensuring student health and safety at Sona Valliappa Public School, Salem."
        path="/infrastructure-facilities/medical-facilities"
      />

      <main className="bg-slate-50">
        {/* HEADER */}
        <PageHeader
          title="Medical Facilities"
          subtitle="Ensuring the health, safety, and well-being of every student."
          breadcrumbs={["Home", "Infrastructure facilities", "Medical"]}
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
              <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif mb-4">
                Caring for Every Child
              </h2>

              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                The school provides comprehensive medical support to ensure that every
                student is safe and cared for throughout the day.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                From routine health checkups to emergency care, our facilities are
                equipped to handle every situation efficiently.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                From routine health checkups to emergency care, our facilities are
                equipped to handle every situation efficiently.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg">
                From routine health checkups to emergency care, our facilities are
                equipped to handle every situation efficiently.
              </p>
            </div>
          </Reveal>

        </div>

        {/* FEATURES */}
        <div className="max-w-7xl mx-auto px-4 pb-20">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Our Medical Facilities
          </h2>

         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
  {features.map((item, i) => {
    const Icon = item.icon;
    return (
      <Reveal key={i}>
        <div className="relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-orange-300 transition flex items-start gap-4 overflow-hidden">

          {/* CORNER ACCENT */}
          <div className="absolute top-0 right-0 w-10 h-10 bg-orange-500/90 rounded-bl-2xl" />

          {/* ICON */}
          <div className="bg-primary/10 p-3 rounded-lg relative z-10">
            <Icon className="w-6 h-6 text-primary" />
          </div>

          {/* TEXT */}
          <div className="relative z-10">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
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