import Head from "next/head";
import Image from "next/image";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    AcademicCapIcon,
    BookOpenIcon,
    BeakerIcon,
    GlobeAltIcon,
    ChatBubbleLeftRightIcon,
    SparklesIcon,
    UsersIcon,
    TrophyIcon,
    LightBulbIcon,
    PuzzlePieceIcon,
    MusicalNoteIcon,
    ComputerDesktopIcon,
    CalendarIcon,
    RocketLaunchIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";

/* =========================
   SCROLL REVEAL HOOK
========================= */
function useReveal() {
    const ref = useRef<HTMLDivElement | null>(null);
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

function Reveal({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
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

/* =========================
   MAIN PAGE - CURRICULUM
========================= */
export default function CurriculumPage() {


    return (
        <>
            <Head>
                <title>Curriculum | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="Explore our comprehensive curriculum at Sona Valliappa Public School - blending academic excellence with innovation, life skills, and global perspectives."
                />
            </Head>

            <main className="bg-gradient-to-b from-background/60 via-white to-background/50">
                {/* HERO SECTION */}
                <PageHeader
                    title="Our Curriculum"
                    subtitle='"Empowering minds with knowledge, skills, and values for a changing world."'
                    breadcrumbs={["Home", "Academics", "Curriculum"]}
                />

                {/* CURRICULUM PHILOSOPHY SECTION */}
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="grid md:grid-cols-2 gap-16 items-center">

                        {/* LEFT CONTENT */}
                        <div className="space-y-6">
                          

                            <Reveal delay={100}>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-snug">
                                    Learning Beyond Classrooms
                                </h2>
                            </Reveal>

                            <Reveal delay={150}>
                                <p className="text-gray-600 leading-relaxed">
                                    Our CBSE-aligned curriculum blends strong academic foundations with
                                    real-world skills. We move beyond memorization to build curiosity,
                                    creativity, and confidence in every learner.
                                </p>
                            </Reveal>

                            <Reveal delay={200}>
                                <div className="grid grid-cols-2 gap-4 pt-4">

                                    {[
                                        { icon: AcademicCapIcon, label: "Academic Strength" },
                                        { icon: LightBulbIcon, label: "Critical Thinking" },
                                        { icon: GlobeAltIcon, label: "Global Awareness" },
                                        { icon: HeartIcon, label: "Values & Ethics" },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-sm hover:shadow-md transition"
                                        >
                                            <item.icon className="w-6 h-6 text-primary" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* RIGHT VISUAL DESIGN */}
                        <Reveal delay={100}>
                            <div className="relative flex items-center justify-center">

                                {/* MAIN BLOB IMAGE */}
                                <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px]">

                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[60%_40%_50%_70%/60%_60%_40%_40%] blur-2xl"></div>

                                    <div className="relative w-full h-full overflow-hidden rounded-[60%_40%_50%_70%/60%_60%_40%_40%] border border-white/30 shadow-2xl">
                                        <img
                                            src="https://img.magnific.com/premium-photo/indian-school-kid-science-student-using-molecular-model-kit-studying-physics-selective-focus_466689-50220.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                                            alt="Curriculum"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* FLOATING ICONS */}
                                <div className="absolute -top-6 left-10 bg-white p-3 rounded-xl shadow-lg animate-float">
                                    <BookOpenIcon className="w-6 h-6 text-primary" />
                                </div>

                                <div className="absolute bottom-0 -left-4 bg-white p-3 rounded-xl shadow-lg animate-float delay-200">
                                    <BeakerIcon className="w-6 h-6 text-secondary" />
                                </div>

                                <div className="absolute top-10 -right-6 bg-white p-3 rounded-xl shadow-lg animate-float delay-300">
                                    <SparklesIcon className="w-6 h-6 text-primary" />
                                </div>

                            </div>
                        </Reveal>

                    </div>
                </div>


            </main>
        </>
    );
}