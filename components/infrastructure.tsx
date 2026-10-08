import React from "react";
import UXMindMapping from "./MindMap";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const highlights = [
  "25+ Acre Smart Campus",
  "AI & Robotics Labs",
  "Modern Digital Learning",
  "Sports & Creative Spaces",
];

export default function SchoolInfrastructureComponent() {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.2, // Trigger when 20% of element is visible
  });

  // Before the section is visible -> hidden. Once visible -> CSS keyframe plays.
  // Using animation-fill-mode: backwards (see CSS) so hover transforms still work after the entrance ends.
  const left = inView ? "infra-slide-left" : "opacity-0";
  const up = inView ? "infra-fade-up" : "opacity-0";

  return (
    <section className="relative p-6 border-t overflow-hidden bg-gradient-to-b from-gray-100 to-[#fffaf3]">
      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* 🔶 LEFT SIDE */}
        <div ref={ref}>
          <div>
            <h2
              className={`${left} text-2xl sm:text-3xl md:text-4xl mt-1 font-semibold mb-3 sm:mb-4 text-secondary leading-tight tracking-tight`}
            >
              Smart <span className="text-orange-500">Campus</span> Infrastructure
            </h2>

            <p
              className={`${left} mt-6 text-gray-600`}
              style={{ animationDelay: "0.1s" }}
            >
              Our campus is designed as an intelligent ecosystem where technology,
              creativity, and learning merge to build future-ready students.
            </p>

            <div className="mt-8 space-y-4">
              {highlights.map((item, i) => (
                <div
                  key={item}
                  className={`${left} flex items-center gap-4 border-l-4 border-orange-500 bg-white/60 rounded-r-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-orange-600 transition-all duration-300`}
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-orange-500 text-orange-500 text-sm font-semibold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-gray-800 font-medium">{item}</p>
                </div>
              ))}
            </div>

            {/* Link is the button itself (a <button> inside an <a> is invalid HTML) */}
            <Link
              href="/infrastructure-facilities/classrooms"
              className={`${up} group relative overflow-hidden mt-8 px-7 py-3 inline-flex items-center gap-2
                bg-white/5 text-primary font-semibold tracking-wide
                border border-primary/30 rounded-2xl backdrop-blur-xl
                hover:text-white hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-lg
                active:scale-95 shadow-sm
                transition-all duration-500`}
              style={{ animationDelay: "0.6s" }}
            >
              {/* Animated Background */}
              <span className="absolute inset-0 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-2xl"></span>

              {/* Text */}
              <span className="relative z-10">Explore Campus</span>

              {/* Arrow */}
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 🔷 RIGHT SIDE - Animated Mind Map */}
        <div className="relative flex items-center justify-center w-full">
          <UXMindMapping />
        </div>
      </div>

      <style jsx global>{`
        @keyframes infraSlideLeft {
          from { opacity: 0; transform: translate3d(-40px, 0, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes infraFadeUp {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .infra-slide-left {
          animation: infraSlideLeft 0.5s ease-out backwards;
        }
        .infra-fade-up {
          animation: infraFadeUp 0.5s ease-out backwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .infra-slide-left,
          .infra-fade-up {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}