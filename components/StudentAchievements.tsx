import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { achievements } from "../data/achievements";

const achievementsData = achievements;
const SLIDE_MS = 8000;
const EASE = [0.22, 1, 0.36, 1]; // smooth "easeOutExpo"-like curve

// Left content: slow, staggered reveal + gentle hide
const contentVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.14, delayChildren: 0.25 },
    },
    exit: {
        opacity: 0,
        y: -14,
        filter: "blur(4px)",
        transition: { duration: 0.6, ease: "easeInOut" },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1, ease: EASE },
    },
};

const StudentAchievements = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance. Re-runs on every slide change so a manual click restarts the timer.
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === achievementsData.length - 1 ? 0 : prev + 1
            );
        }, SLIDE_MS);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const item = achievementsData[currentIndex];
    const total = achievementsData.length;
    const pad = (n) => String(n).padStart(2, "0");

    return (
        <section className="w-full py-6 md:py-10 bg-white relative overflow-hidden">
            {/* Soft page background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-violet-200/30 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="relative overflow-hidden md:min-h-[340px] bg-gradient-to-br from-white via-slate-50 to-blue-50 shadow-[0_20px_60px_-20px_rgba(16,41,77,0.35)]">
                    {/* ---------- Soft background image (crossfades) ---------- */}
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={`bg-${item.id}`}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.12 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                        >
                            <Image
                                src={item.bgImage}
                                alt=""
                                fill
                                sizes="100vw"
                                className="object-cover object-center"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Decorative rings (left) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -left-32 top-10 w-[320px] h-[320px] rounded-full bg-secondary/10 blur-3xl" />
                        <div className="absolute left-[-140px] top-12 w-[300px] h-[300px] rounded-full border border-[#10294d]/10" />
                        <div className="absolute left-[-80px] top-24 w-[220px] h-[220px] rounded-full border border-[#10294d]/10" />
                        <div className="absolute left-[-40px] top-40 w-[160px] h-[160px] rounded-full border border-[#10294d]/15" />
                    </div>

                    {/* ---------- RIGHT: full-bleed image panel ---------- */}
                    <div
                        className="
                            relative md:absolute md:inset-y-0 md:right-0
                            w-full md:w-[54%] h-[200px] sm:h-[240px] md:h-full
                            overflow-hidden bg-[#10294d]
                            md:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]
                        "
                    >
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={`img-${item.id}`}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.14 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    opacity: { duration: 1.2, ease: "easeInOut" },
                                    // slow "ken burns" zoom-out for the whole slide duration
                                    scale: { duration: SLIDE_MS / 1000 + 1.2, ease: "easeOut" },
                                }}
                            >
                                <Link
                                    href={`/student-achievements/${item.slug}`}
                                    aria-label={`View ${item.studentName} achievement`}
                                    className="absolute inset-0 block"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.studentName}
                                        fill
                                        priority
                                        sizes="(min-width: 768px) 54vw, 100vw"
                                        className="object-cover object-top"
                                    />
                                </Link>

                                {/* Gradients for depth + text legibility */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#10294d]/85 via-[#10294d]/10 to-transparent" />
                                <div className="absolute inset-0 pointer-events-none hidden md:block bg-gradient-to-r from-[#10294d]/35 via-transparent to-transparent" />

                            </motion.div>
                        </AnimatePresence>

                        {/* Right-side subtle lines */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute right-6 top-0 w-px h-full bg-white/10" />
                            <div className="absolute right-14 top-0 w-px h-full bg-white/5" />
                        </div>
                    </div>

                    {/* ---------- Ribbon ---------- */}
                    <div className="absolute left-0 top-0 z-30">
                        <div className="relative bg-primary text-white pl-5 pr-8 py-2 shadow-xl">
                            <div className="absolute top-0 -right-5 w-0 h-0 border-t-[22px] border-b-[22px] border-l-[20px] border-t-transparent border-b-transparent border-l-primary" />
                            <div className="flex items-center gap-3">
                                <div className="text-white font-black text-base leading-none"><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 21h8m-4-4v4m-5-16h10v5a5 5 0 0 1-10 0V5Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m12 7 1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L9 9.3l2-.3 1-2Z"
                                    />
                                </svg></div>
                                <div className="w-[1px] h-5 bg-white/40" />
                                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] whitespace-nowrap">
                                    Students Achievements
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ---------- LEFT: content ---------- */}
                    <div className="relative z-20 md:w-[52%] md:min-h-[340px] flex flex-col justify-center px-5 sm:px-8 md:pl-10 md:pr-6 pt-6 pb-10 md:pt-14 md:pb-10">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={`content-${item.id}`}
                                variants={contentVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="w-full max-w-xl min-w-0"
                            >
                                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
                                    <span className="h-[3px] w-10 bg-amber-500 rounded-full" />
                                    <span className="text-xs font-semibold tracking-[0.3em] text-[#10294d]/70">
                                        {pad(currentIndex + 1)} / {pad(total)}
                                    </span>
                                </motion.div>

                                {/* Name: always in the left content area on every screen size */}
                                <motion.div
                                    variants={itemVariants}
                                    className="mb-4 border-l-4 border-amber-500 pl-3"
                                >
                                    <h3 className="text-[#10294d] font-serif text-lg sm:text-xl md:text-2xl uppercase tracking-[1.5px] font-semibold leading-tight">
                                        {item.studentName}
                                    </h3>
                                    {(item.className ) && (
                                        <p className="text-amber-600 uppercase tracking-[3px] text-[10px] sm:text-xs mt-1">
                                            {item.className}
                                        </p>
                                    )}
                                </motion.div>

                                <motion.h2
                                    variants={itemVariants}
                                    className="text-[#10294d] text-xl sm:text-2xl md:text-[28px] font-serif uppercase leading-tight break-words [overflow-wrap:anywhere]"
                                >
                                    {item.achievement}
                                </motion.h2>

                                {item.subTitle && (
                                    <motion.p
                                        variants={itemVariants}
                                        className="mt-3 text-[#10294d]/80 text-xs sm:text-sm md:text-base uppercase tracking-[2px] break-words"
                                    >
                                        {item.subTitle}
                                    </motion.p>
                                )}

                                <motion.p
                                    variants={itemVariants}
                                    className="mt-3 text-[#334155] text-sm sm:text-base leading-7 break-words [overflow-wrap:anywhere] line-clamp-3"
                                >
                                    {item.description}
                                </motion.p>

                                {item.parent && (
                                    <motion.p
                                        variants={itemVariants}
                                        className="mt-3 text-[#475569] text-xs sm:text-sm leading-relaxed break-words"
                                    >
                                        {item.parent}
                                    </motion.p>
                                )}

                                <motion.div variants={itemVariants}>
                                    <Link
                                        href={`/student-achievements/${item.slug}`}
                                        className="group mt-4 inline-flex items-center gap-3 bg-primary px-5 py-2.5 text-sm uppercase tracking-wide text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:brightness-110"
                                    >
                                        Read More
                                        <span
                                            aria-hidden
                                            className="transition-transform duration-500 group-hover:translate-x-1.5"
                                        >
                                            &rarr;
                                        </span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ---------- Indicators with auto-progress ---------- */}
                    <div className="absolute bottom-4 left-5 md:left-10 flex gap-2 z-30">
                        {achievementsData.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Go to achievement ${idx + 1}`}
                                className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-700 ease-out ${currentIndex === idx
                                    ? "w-12 bg-[#10294d]/20"
                                    : "w-2.5 bg-[#10294d]/30 hover:bg-[#10294d]/50"
                                    }`}
                            >
                                {currentIndex === idx && (
                                    <motion.span
                                        key={`progress-${currentIndex}`}
                                        className="absolute inset-y-0 left-0 bg-[#10294d] rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentAchievements;