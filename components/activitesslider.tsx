import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { activities } from "../data/activities";
import Link from "next/link";

type Activity = {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
  color: string;
};



const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.3 }
  }
};

export default function SchoolActivitiesPremium() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isAutoSliding) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoSliding]);

  const handleActivityClick = (index: number) => {
    setIsAutoSliding(false);
    setActiveIndex(index);
    setTimeout(() => setIsAutoSliding(true), 8000);
  };

  const activeActivity = activities[activeIndex];

  return (
    <div
      ref={ref}
      className="w-full bg-gradient-to-b from-[#fffaf3] via-[#fef1dc] to-[#f6e2c7] py-8 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
          className="text-left mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl mt-1 font-semibold mb-3 sm:mb-4 text-secondary leading-tight tracking-tight"
          >
            Student  <span className="text-orange-500"> Activities</span>
          </motion.h2>

          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-4 rounded-full" />

          <p className="text-secondary/70 max-w-2xl text-lg">
            Holistic development through academics, creativity, sports, and leadership programs
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT IMAGE SECTION - appears first on mobile/tablet, second on desktop */}
          <div className="order-1 lg:order-1 ">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeActivity.id}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-white"
              >
                <div className="relative h-80 md:h-96 xl:h-[460px] overflow-hidden">
                  <img
                    src={activeActivity.thumbnail}
                    alt={activeActivity.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />

                  <div className="absolute top-4 right-4 bg-secondary/60 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs font-medium">
                      {activeIndex + 1} / {activities.length}
                    </span>
                  </div>

                  {/* Glass Explore Button */}
                  <Link
                    href={`/activities/${activeActivity.slug}`}
                    className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    Explore Activity

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: "#f37d2a" }}
                  />
                </div>

                <div className="p-6 bg-white">
                  <span className="text-xs uppercase tracking-wider text-secondary/60 font-semibold">
                    Featured Activity
                  </span>

                  <h3 className="text-lg font-semibold text-secondary mt-1">
                    {activeActivity.title}
                  </h3>

                  <p className="text-secondary/80 text-sm mt-2">
                    {activeActivity.shortDescription}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT LIST SECTION - appears second on mobile/tablet, first on desktop */}
          <div className="order-2 lg:order-2 lg:pl-6 2xl:pl-12">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={textVariants}
            >
              <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Explore Activities
              </h3>

              <div className="h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                  {activities.map((activity, idx) => (
                    <motion.button
                      key={activity.id}
                      onClick={() => handleActivityClick(idx)}
                      className={`w-full text-left px-4 py-3 transition-all duration-300 group
                ${activeIndex === idx
                          ? "bg-gradient-to-r from-primary/10 to-accent/10 shadow-md"
                          : "hover:bg-background"
                        }`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: "#f37d2a" }}
                            />
                            <span className={`font-medium ${activeIndex === idx ? "text-secondary" : "text-secondary/70"}`}>
                              {activity.title}
                            </span>
                          </div>

                          <p className={`text-xs ${activeIndex === idx ? "text-secondary/80" : "text-secondary/50"}`}>
                            {activity.shortDescription.substring(0, 60)}...
                          </p>
                        </div>

                        {activeIndex === idx && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-1 h-8 rounded-full"
                            style={{ backgroundColor: "#f37d2a" }}
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-secondary/20 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-bold text-secondary">16+</div>
                  <div className="text-xs text-secondary/60">Activities</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-secondary">500+</div>
                  <div className="text-xs text-secondary/60">Students</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-secondary">10+</div>
                  <div className="text-xs text-secondary/60">Years</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #18596d;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ec8013;
        }
      `}</style>
    </div>
  );
}