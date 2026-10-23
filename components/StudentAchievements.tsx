import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { achievements } from "../data/achievements";

const achievementsData = achievements;
const SLIDE_MS = 8000;

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

    return (
        <section className="w-full py-6 md:py-10 overflow-hidden bg-white relative">
            {/* Background with school-themed patterns */}
            <div className="absolute inset-0 overflow-hidden bg-white">

                {/* Large gradient glow effects */}
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-violet-200/30 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-3xl" />

                {/* Abstract curved lines */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.08]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 120 Q300 40 600 120 T1200 120" fill="none" stroke="#2563eb" strokeWidth="2" />
                    <path d="M0 300 Q300 220 600 300 T1200 300" fill="none" stroke="#7c3aed" strokeWidth="2" />
                    <path d="M0 500 Q300 420 600 500 T1200 500" fill="none" stroke="#06b6d4" strokeWidth="2" />
                </svg>

                {/* Trophy */}
                <div className="absolute top-[12%] left-[8%] w-28 h-28 rotate-12 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-14 h-14 text-amber-500"
                    >
                        <path d="M8 21h8" />
                        <path d="M12 17v4" />
                        <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
                        <path d="M5 6H3a2 2 0 0 0 2 2" />
                        <path d="M19 6h2a2 2 0 0 1-2 2" />
                    </svg>
                </div>

                {/* Medal */}
                <div className="absolute top-[18%] right-[10%] w-24 h-24 -rotate-12 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-12 h-12 text-blue-500"
                    >
                        <path d="M6 9H4C3 9 2 8 2 7V5C2 4 3 3 4 3H5" />
                        <path d="M18 9H20C21 9 22 8 22 7V5C22 4 21 3 20 3H19" />
                        <path d="M6 9H18L16 15C16 15 15 17 12 17C9 17 8 15 8 15L6 9Z" />
                        <polygon points="12 5 13.5 8 17 8.5 14.5 11 15.5 14.5 12 13 8.5 14.5 9.5 11 7 8.5 10.5 8 12 5" fill="currentColor" />
                        <path d="M10 17V20" />
                        <path d="M14 17V20" />
                        <path d="M8 20H16" />
                    </svg>
                </div>

                {/* Achievement badge */}
                <div className="absolute bottom-[16%] left-[12%] w-20 h-20 rotate-6 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-12 h-12 text-violet-500"
                    >
                        <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.2.9-5.5-4-3.9 5.5-.8L12 3Z" />
                    </svg>
                </div>

                {/* Graduation */}
                <div className="absolute bottom-[12%] right-[11%] w-20 h-20 -rotate-6 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-14 h-14 text-emerald-500"
                    >
                        <path d="M22 10L12 5 2 10l10 5 10-5Z" />
                        <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
                    </svg>
                </div>

                {/* Dot grid pattern */}
                <div className="absolute inset-0 opacity-[0.08]">
                    <div className="grid grid-cols-12 gap-10 h-full w-full p-10">
                        {[...Array(120)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        ))}
                    </div>
                </div>

                {/* Floating shapes */}
                <div className="absolute top-[35%] left-[18%] w-20 h-20 border border-blue-200 rotate-45 rounded-2xl opacity-40" />
                <div className="absolute top-[50%] right-[20%] w-24 h-24 border border-violet-200 rounded-full opacity-40" />
                <div className="absolute bottom-[28%] left-1/2 w-16 h-16 bg-cyan-100/40 rotate-12 rounded-2xl blur-sm" />

                {/* Animated blur elements */}
                <div className="absolute top-1/4 left-1/3 w-52 h-52 bg-blue-100/30 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-violet-100/30 rounded-full blur-2xl animate-pulse" />
            </div>

            {/* Slider (must stay `relative` for popLayout) */}
            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="relative overflow-hidden min-h-[260px] md:min-h-[300px]"
                    >
                        {/* Background image */}
                        <div className="absolute inset-0 scale-105">
                            <Image
                                src={item.bgImage}
                                alt=""
                                fill
                                sizes="100vw"
                                className="object-cover object-center"
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-[#10294d]/80" />

                        {/* Right blue panel */}
                        <div
                            className="absolute top-0 right-0 h-full w-[34%] backdrop-blur-sm"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(24, 89, 109, 0.7) 0%, rgba(15, 17, 21, 0.7) 100%)",
                            }}
                        />

                        {/* Decorative background elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -left-32 top-10 w-[320px] h-[320px] rounded-full bg-secondary/10 blur-3xl" />
                            <div className="absolute left-[-140px] top-12 w-[300px] h-[300px] rounded-full border border-secondary/10" />
                            <div className="absolute left-[-80px] top-24 w-[220px] h-[220px] rounded-full border border-secondary/10" />
                            <div className="absolute left-[-40px] top-40 w-[160px] h-[160px] rounded-full border border-secondary/20" />
                            <div className="absolute top-16 left-1/3 w-2 h-2 bg-secondary/40 rounded-full" />
                            <div className="absolute top-32 left-1/2 w-1.5 h-1.5 bg-secondary/30 rounded-full" />
                            <div className="absolute top-48 left-1/4 w-2.5 h-2.5 bg-secondary/20 rounded-full" />
                        </div>

                        {/* Right side decorative lines */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute right-[-40px] top-0 w-px h-full bg-white/10" />
                            <div className="absolute right-[20px] top-0 w-px h-full bg-white/5" />
                            <div className="absolute right-[60px] top-0 w-px h-full bg-white/5" />
                            <div className="absolute right-[-80px] top-20 w-[200px] h-px bg-white/10 rotate-12" />
                            <div className="absolute right-[-60px] top-40 w-[160px] h-px bg-white/10 rotate-12" />
                            <div className="absolute right-[-40px] top-60 w-[120px] h-px bg-white/10 rotate-12" />
                            <div className="absolute right-10 top-24 w-2 h-2 bg-white/20 rounded-full blur-[1px]" />
                            <div className="absolute right-20 top-52 w-1.5 h-1.5 bg-white/15 rounded-full" />
                            <div className="absolute right-32 top-80 w-2.5 h-2.5 bg-white/10 rounded-full" />
                        </div>

                        {/* Ribbon */}
                        <div className="absolute left-0 z-20">
                            <div className="relative bg-primary text-white pl-5 pr-8 py-2 shadow-xl">
                                <div className="absolute top-0 -right-5 w-0 h-0 border-t-[22px] border-b-[22px] border-l-[20px] border-t-transparent border-b-transparent border-l-primary" />
                                <div className="flex items-center gap-3">
                                    <div className="text-white font-black text-base leading-none">
                                        SA
                                    </div>
                                    <div className="w-[1px] h-5 bg-white/40" />
                                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] whitespace-nowrap">
                                        Students Achievements
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[260px] md:min-h-[300px]">

                            {/* RIGHT IMAGE */}
                            <div className="relative flex items-center justify-center py-4 sm:py-6 px-4 order-first md:order-last">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="relative z-20 w-full flex justify-center"
                                >
                                    {/* Student image */}
                                    <Link
                                        href={`/student-achievements/${item.slug}`}
                                        aria-label={`View ${item.studentName} achievement`}
                                        className="block w-[140px] sm:w-[170px] md:w-[190px] lg:w-[230px] h-[180px] sm:h-[210px] md:h-[230px] overflow-hidden shadow-2xl border-[6px] border-white"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.studentName}
                                            width={1200}
                                            height={800}
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </Link>

                                    {/* Award ribbon */}
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center">
                                        <div className="relative min-w-[190px] sm:min-w-[210px] md:min-w-[230px] px-2">
                                            <div className="relative bg-gradient-to-r from-[#7c3f00] via-[#d89b2b] to-[#7c3f00] px-4 py-2 rounded-md shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-yellow-200/40">
                                                <div className="absolute -left-4 top-0 w-0 h-0 border-t-[22px] border-b-[22px] border-r-[16px] border-t-transparent border-b-transparent border-r-[#8a4c0a]" />
                                                <div className="absolute -right-4 top-0 w-0 h-0 border-t-[22px] border-b-[22px] border-l-[16px] border-t-transparent border-b-transparent border-l-[#8a4c0a]" />

                                                <h3 className="text-white text-center font-serif text-sm md:text-lg uppercase tracking-[1px] font-semibold">
                                                    {item.studentName}
                                                </h3>

                                                {(item.className || item.category) && (
                                                    <p className="text-center text-white uppercase tracking-[3px] text-[9px] mt-1">
                                                        {item.className || item.category}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* LEFT CONTENT */}
                            <div className="flex flex-col justify-center py-4 order-last md:order-first min-w-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="w-full max-w-lg mx-auto md:mx-0 min-w-0 bg-white/95 md:bg-transparent shadow-sm md:shadow-none"
                                >
                                    <h2 className="p-2 text-[#10294d] text-xl sm:text-2xl md:text-[30px] font-serif uppercase leading-snug break-words [overflow-wrap:anywhere]">
                                        {item.achievement}
                                    </h2>

                                    {item.subTitle && (
                                        <p className="p-2 text-[#10294d] text-xs sm:text-sm md:text-base uppercase tracking-[1.5px] mt-2 break-words">
                                            {item.subTitle}
                                        </p>
                                    )}

                                    <p className="p-2 mt-3 sm:mt-4 text-[#334155] text-sm sm:text-base leading-7 tracking-normal break-words [overflow-wrap:anywhere]">
                                        {item.description}
                                    </p>

                                    {item.parent && (
                                        <p className="p-2 mt-3 text-[#475569] text-xs sm:text-sm leading-relaxed break-words">
                                            {item.parent}
                                        </p>
                                    )}

                                    <Link
                                        href={`/student-achievements/${item.slug}`}
                                        className="group mt-4 inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm uppercase tracking-wide text-white shadow-md transition hover:brightness-95"
                                    >
                                        Read More
                                        <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Indicators with auto-progress */}
                        <div className="absolute bottom-2 right-6 flex gap-2 z-20">
                            {achievementsData.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-label={`Go to achievement ${idx + 1}`}
                                    className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${currentIndex === idx ? "w-10 bg-white/40" : "w-2 bg-white/50"}`}
                                >
                                    {currentIndex === idx && (
                                        <motion.span
                                            key={`progress-${currentIndex}`}
                                            className="absolute inset-y-0 left-0 bg-white rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default StudentAchievements;