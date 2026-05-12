import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Reveal Component and Hook
export function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
}

export function Reveal({
    children,
    delay = 0,
}) {
    const { ref, visible } = useReveal();

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${visible
                    ? "opacity-100 translate-y-0 scale-100 blur-0"
                    : "opacity-0 translate-y-12 scale-[0.98] blur-sm"
                }`}
        >
            {children}
        </div>
    );
}

const achievementsData = [
    {
        id: 1,
        studentName: "AYAAN GUPTA",
        className: "CLASS I",
        achievement: "RANK 1 IN OLYMPIAD",
        subTitle: "ENGLISH & SCIENCE",
        description:
            "Outstanding performance in English and Science Olympiad with exceptional academic excellence.",
        parent:
            "Parents: Mrs. Aanchal Gupta & Mr. Aditya Gupta",
        image:
            "https://img.magnific.com/premium-photo/girl-holding-trophy-that-says-year-it_1277828-30302.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        bgImage:
            "https://img.magnific.com/premium-photo/girl-holding-trophy-that-says-year-it_1277828-30302.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    },
    {
        id: 2,
        studentName: "RIYA SHARMA",
        className: "CLASS III",
        achievement: "STATE LEVEL WINNER",
        subTitle: "DRAWING COMPETITION",
        description:
            "Creative excellence and artistic brilliance showcased at state-level competition.",
        parent:
            "Parents: Mrs. Neha Sharma & Mr. Rahul Sharma",
        image:
            "https://img.magnific.com/premium-photo/happy-young-indian-woman-school-uniform-holdi-1719088463-2_979520-94437.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        bgImage:
            "https://img.magnific.com/premium-photo/happy-young-indian-woman-school-uniform-holdi-1719088463-2_979520-94437.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    },
    {
        id: 3,
        studentName: "ARJUN MENON",
        className: "CLASS V",
        achievement: "NATIONAL CHESS CHAMPION",
        subTitle: "UNDER 12 CATEGORY",
        description:
            "Achieved national recognition with strategic brilliance and confidence.",
        parent:
            "Parents: Mrs. Lakshmi Menon & Mr. Raj Menon",
        image:
            "https://img.magnific.com/premium-photo/boy-holding-trophy-with-words-year-2012-it_1277828-30093.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        bgImage:
            "https://img.magnific.com/premium-photo/boy-holding-trophy-with-words-year-2012-it_1277828-30093.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    },
    {
        id: 4,
        studentName: "SANA KHAN",
        className: "CLASS II",
        achievement: "BEST SPEAKER AWARD",
        subTitle: "INTER SCHOOL EVENT",
        description:
            "Exceptional communication skills and stage confidence at inter-school competition.",
        parent:
            "Parents: Mrs. Farah Khan & Mr. Imran Khan",
        image:
            "https://img.magnific.com/premium-photo/happy-young-indian-boy-school-uniform-holding-crest_979520-49596.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        bgImage:
            "https://img.magnific.com/premium-photo/happy-young-indian-boy-school-uniform-holding-crest_979520-49596.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    },
];

const StudentAchievements = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === achievementsData.length - 1 ? 0 : prev + 1
            );
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const item = achievementsData[currentIndex];

    return (
        <section className="w-full py-6 md:py-10 overflow-hidden bg-white relative">
            {/* Light Gray Background with School-themed Patterns */}
            {/* Premium Modern School Background */}
            <div className="absolute inset-0 overflow-hidden bg-white">

                {/* Large Gradient Glow Effects */}
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-violet-200/30 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-3xl" />

                {/* Abstract Curved Lines */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.08]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 120 Q300 40 600 120 T1200 120"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                    />
                    <path
                        d="M0 300 Q300 220 600 300 T1200 300"
                        fill="none"
                        stroke="#7c3aed"
                        strokeWidth="2"
                    />
                    <path
                        d="M0 500 Q300 420 600 500 T1200 500"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                    />
                </svg>
                {/* Achievement Themed Floating Elements */}

                {/* Trophy */}
                <div className="absolute top-[12%] left-[8%] w-28 h-28 rounded-[30px] bg-white/70 backdrop-blur-2xl border border-amber-100 shadow-[0_10px_40px_rgba(251,191,36,0.15)] rotate-12 flex items-center justify-center">
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
                <div className="absolute top-[18%] right-[10%] w-24 h-24 rounded-full bg-white/70 backdrop-blur-2xl border border-blue-100 shadow-[0_10px_35px_rgba(59,130,246,0.15)] -rotate-12 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-12 h-12 text-blue-500"
                    >
                        {/* Trophy cup body */}
                        <path d="M6 9H4C3 9 2 8 2 7V5C2 4 3 3 4 3H5" />
                        <path d="M18 9H20C21 9 22 8 22 7V5C22 4 21 3 20 3H19" />

                        {/* Trophy bowl */}
                        <path d="M6 9H18L16 15C16 15 15 17 12 17C9 17 8 15 8 15L6 9Z" />

                        {/* Star */}
                        <polygon points="12 5 13.5 8 17 8.5 14.5 11 15.5 14.5 12 13 8.5 14.5 9.5 11 7 8.5 10.5 8 12 5" fill="currentColor" />

                        {/* Base */}
                        <path d="M10 17V20" />
                        <path d="M14 17V20" />
                        <path d="M8 20H16" />
                    </svg>
                </div>

                {/* Achievement Badge */}
                <div className="absolute bottom-[16%] left-[12%] w-20 h-20 rounded-[24px] bg-white/70 backdrop-blur-2xl border border-violet-100 shadow-[0_10px_35px_rgba(139,92,246,0.15)] rotate-6 flex items-center justify-center">
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

                {/* Graduation Achievement */}
                <div className="absolute bottom-[12%] right-[11%] w-20 h-20 rounded-lg bg-white/70 backdrop-blur-2xl border border-emerald-100 shadow-[0_10px_40px_rgba(16,185,129,0.15)] -rotate-6 flex items-center justify-center">
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

                {/* Dot Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.08]">
                    <div className="grid grid-cols-12 gap-10 h-full w-full p-10">
                        {[...Array(120)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-slate-500"
                            />
                        ))}
                    </div>
                </div>

                {/* Modern Floating Shapes */}
                <div className="absolute top-[35%] left-[18%] w-20 h-20 border border-blue-200 rotate-45 rounded-2xl opacity-40" />
                <div className="absolute top-[50%] right-[20%] w-24 h-24 border border-violet-200 rounded-full opacity-40" />
                <div className="absolute bottom-[28%] left-1/2 w-16 h-16 bg-cyan-100/40 rotate-12 rounded-2xl blur-sm" />

                {/* Animated Blur Elements */}
                <div className="absolute top-1/4 left-1/3 w-52 h-52 bg-blue-100/30 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-violet-100/30 rounded-full blur-2xl animate-pulse" />

            </div>
            <Reveal delay={300}>
                <div className="max-w-7xl mx-auto relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="relative overflow-hidden min-h-[320px] md:min-h-[380px]"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center scale-105"
                                style={{
                                    backgroundImage: `url(${item.bgImage})`,
                                }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-[#10294d]/80" />

                            {/* Right Blue Panel */}
                            <div
                                className="absolute top-0 right-0 h-full w-[34%] backdrop-blur-sm"
                                style={{
                                    background: "linear-gradient(135deg, #18596d 0%, #0f1115 100%)",
                                }}
                            />

                            {/* Decorative Background Elements */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                                {/* Large soft gradient blob */}
                                <div className="absolute -left-32 top-10 w-[320px] h-[320px] rounded-full bg-secondary/10 blur-3xl" />

                                {/* Ring 1 */}
                                <div className="absolute left-[-140px] top-12 w-[300px] h-[300px] rounded-full border border-secondary/10" />

                                {/* Ring 2 */}
                                <div className="absolute left-[-80px] top-24 w-[220px] h-[220px] rounded-full border border-secondary/10" />

                                {/* Ring 3 (extra depth) */}
                                <div className="absolute left-[-40px] top-40 w-[160px] h-[160px] rounded-full border border-secondary/20" />

                                {/* Floating dots */}
                                <div className="absolute top-16 left-1/3 w-2 h-2 bg-secondary/40 rounded-full" />
                                <div className="absolute top-32 left-1/2 w-1.5 h-1.5 bg-secondary/30 rounded-full" />
                                <div className="absolute top-48 left-1/4 w-2.5 h-2.5 bg-secondary/20 rounded-full" />



                            </div>
                            {/* Right Side Decorative Lines */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">

                                {/* Main vertical line */}
                                <div className="absolute right-[-40px] top-0 w-px h-full bg-white/10" />

                                {/* Secondary vertical lines */}
                                <div className="absolute right-[20px] top-0 w-px h-full bg-white/5" />
                                <div className="absolute right-[60px] top-0 w-px h-full bg-white/5" />

                                {/* Diagonal accent lines */}
                                <div className="absolute right-[-80px] top-20 w-[200px] h-px bg-white/10 rotate-12" />
                                <div className="absolute right-[-60px] top-40 w-[160px] h-px bg-white/10 rotate-12" />
                                <div className="absolute right-[-40px] top-60 w-[120px] h-px bg-white/10 rotate-12" />

                                {/* Small glowing dots */}
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

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[320px] md:min-h-[380px]">

                                {/* RIGHT IMAGE */}
                                <div className="relative flex items-center justify-center py-4 sm:py-6 px-4 order-first md:order-last">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6 }}
                                        className="relative z-20 w-full flex justify-center"
                                    >
                                        {/* Student Image */}
                                        <div className="w-[160px] sm:w-[190px] md:w-[220px] lg:w-[280px] h-[210px] sm:h-[240px] md:h-[270px] lg:h-[270px] overflow-hidden shadow-2xl border-[6px] border-white">
                                            <img
                                                src={item.image}
                                                alt={item.studentName}
                                                className="w-full h-full object-cover object-top"
                                            />
                                        </div>

                                        {/* Award Ribbon */}
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center">
                                            <div className="relative min-w-[190px] sm:min-w-[210px] md:min-w-[230px] px-2">
                                                <div className="relative bg-gradient-to-r from-[#7c3f00] via-[#d89b2b] to-[#7c3f00] px-4 py-2 rounded-md shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-yellow-200/40">
                                                    <div className="absolute -left-4 top-0 w-0 h-0 border-t-[22px] border-b-[22px] border-r-[16px] border-t-transparent border-b-transparent border-r-[#8a4c0a]" />
                                                    <div className="absolute -right-4 top-0 w-0 h-0 border-t-[22px] border-b-[22px] border-l-[16px] border-t-transparent border-b-transparent border-l-[#8a4c0a]" />

                                                    <h3 className="text-white text-center font-serif text-sm md:text-lg uppercase tracking-[1px] font-semibold">
                                                        {item.studentName}
                                                    </h3>

                                                    <p className="text-center text-white  uppercase tracking-[3px] text-[9px] mt-1">
                                                        {item.className}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* LEFT CONTENT */}
                                <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 order-last md:order-first">
                                    <div className="w-full max-w-lg mx-auto md:mx-0">
                                        <h2 className="text-secondary text-[22px] sm:text-[26px] md:text-[30px] font-serif uppercase leading-tight">
                                            {item.achievement}
                                        </h2>

                                        <p className="text-[#10294d] text-sm sm:text-base uppercase tracking-[3px] mt-2">
                                            {item.subTitle}
                                        </p>

                                        <p className="mt-4 text-secondary text-sm sm:text-base leading-relaxed uppercase tracking-wide">
                                            {item.description}
                                        </p>

                                        <p className="mt-4 text-secondary/80 text-[11px] sm:text-xs uppercase tracking-wide">
                                            {item.parent}
                                        </p>
                                    </div>
                                </div>
                            </div>

                       

                            {/* Indicators */}
                            <div className="absolute bottom-2 right-6 flex gap-2 z-20">
                                {achievementsData.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-8 bg-white" : "w-2 bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </Reveal>
        </section>
    );
};

export default StudentAchievements;