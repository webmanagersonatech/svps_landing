

import React from "react";
import UXMindMapping from "./MindMap";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function SchoolInfrastructureComponent() {


  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.2, // Trigger when 20% of element is visible
  });


  return (
    <section className="relative px-6 border-t overflow-hidden bg-gradient-to-b from-gray-100 to-[#fffaf3]">
      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* 🔶 LEFT SIDE */}
        <div ref={ref}>
          {/* 🔶 LEFT SIDE */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl mt-1 font-semibold mb-3 sm:mb-4 text-secondary leading-tight tracking-tight"
            >
              Smart <span className="text-orange-500">Campus Infrastructure</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-gray-600 text-lg"
            >
              Our campus is designed as an intelligent ecosystem where technology,
              creativity, and learning merge to build future-ready students.
            </motion.p>

            <div className="mt-8 space-y-4">
              {[
                "25+ Acre Smart Campus",
                "AI & Robotics Labs",
                "Modern Digital Learning",
                "Sports & Creative Spaces",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
            <Link href="/infrastructure-facilities/classrooms">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.96 }}
                className="
            relative overflow-hidden
            mt-8 px-7 py-3
            bg-white/5
            text-primary
            font-semibold tracking-wide
            border border-primary/30
            rounded-2xl
            backdrop-blur-xl
            hover:text-white
            transition-all duration-500
            flex items-center gap-2
            shadow-sm hover:shadow-lg
            group
        "
              >
                {/* Animated Background */}
                <span className="absolute inset-0 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-2xl"></span>

                {/* Text */}
                <span className="relative z-10">
                  Explore Campus
                </span>

                {/* Arrow */}
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* 🔷 RIGHT SIDE - Animated Mind Map */}
        <div className="relative flex items-center justify-center  w-full">

          <UXMindMapping />
        </div>
      </div>
    </section>
  );
}