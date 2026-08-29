import SEO from "../../../components/SEO";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    AcademicCapIcon,
    LightBulbIcon,
    ChartBarIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    BookOpenIcon,
    TrophyIcon,
    ArrowTrendingUpIcon,
    PuzzlePieceIcon,
    SparklesIcon,
    CheckCircleIcon,
    ScaleIcon,
} from "@heroicons/react/24/outline";
import PopupForm from "../../../components/bookvisit";

/* =========================
   SCROLL REVEAL
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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}
            ${visible ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-12 scale-[0.98] blur-sm"}`}
        >
            {children}
        </div>
    );
}

/* =========================
   DATA
========================= */
const pillars = [
    {
        icon: AcademicCapIcon,
        title: "Experienced Faculty",
        desc: "Dedicated teachers who bring subject mastery and genuine care for every learner.",
    },
    {
        icon: LightBulbIcon,
        title: "Conceptual Clarity",
        desc: "We teach the 'why', not just the 'what' — so learning transfers beyond the exam.",
    },
    {
        icon: PuzzlePieceIcon,
        title: "Critical Thinking",
        desc: "Structured problem-solving that builds analytical, independent minds.",
    },
    {
        icon: UserGroupIcon,
        title: "Personalised Guidance",
        desc: "Individual attention that meets each student at their own pace and level.",
    },
    {
        icon: ClipboardDocumentCheckIcon,
        title: "Regular Assessment",
        desc: "Consistent, constructive evaluation that tracks growth and closes gaps early.",
    },
    {
        icon: BookOpenIcon,
        title: "Modern Resources",
        desc: "Contemporary teaching aids and methods that keep learning current and engaging.",
    },
];

const stats = [
    { value: "100%", label: "Board Result Consistency" },
    { value: "1:20", label: "Teacher-Student Ratio" },
    { value: "360°", label: "Assessment Approach" },
    { value: "Every Child", label: "Individual Attention" },
];

const focusAreas = [
    { title: "Academic Performance", desc: "Strong outcomes built on a firm subject foundation.", icon: TrophyIcon },
    { title: "Conceptual Understanding", desc: "Depth over memorisation, at every grade level.", icon: LightBulbIcon },
    { title: "Problem-Solving", desc: "Applying knowledge to unfamiliar, real-world situations.", icon: PuzzlePieceIcon },
    { title: "Continuous Improvement", desc: "A culture of feedback that keeps students progressing.", icon: ArrowTrendingUpIcon },
];

export default function AcademicExcellencePage() {


    return (
        <>
            <SEO
                title="Academic Excellence"
                description="Academic excellence at Sona Valliappa Public School — a strong foundation built on effective teaching, personalised guidance, and continuous improvement."
                path="/academics/academic-excellence"
            />

            <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/40 overflow-x-hidden">
                <PageHeader
                    title="Academic Excellence"
                    subtitle='"A strong academic foundation that helps every student achieve their full potential."'
                    breadcrumbs={["Home", "Academics", "Academic Excellence"]}
                />

                {/* INTRO */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                    <div className="absolute top-20 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Reveal delay={100} className="order-2 md:order-1">
                            <div className="relative">
                                <div className="relative overflow-hidden rounded-3xl shadow-xl">
                                    <img
                                        src="/acadamics/bgimage.jpg"
                                        alt="Focused academic learning at SVPS"
                                        className="w-full h-80 md:h-[26rem] object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-secondary/10 p-2 rounded-lg">
                                            <TrophyIcon className="w-8 h-8 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary">Strong Foundation</p>
                                            <p className="text-xs text-gray-500">for every student's future</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-6 -left-6 bg-secondary text-white p-3 rounded-xl shadow-lg hidden md:flex items-center gap-2">
                                    <AcademicCapIcon className="w-6 h-6" />
                                    <span className="text-sm font-semibold">Purposeful Teaching</span>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal className="order-1 md:order-2">
                            <div className="space-y-6">


                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-tight">
                                    Learn with <span className="text-primary">Understanding</span>
                                </h2>

                                <p className="text-gray-700 leading-relaxed text-lg">
                                    We believe academic excellence is more than marks. Our focus is on
                                    conceptual learning, strong foundations, practical application, and
                                    individual growth.
                                </p>

                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Through engaging teaching, regular practice, and continuous assessment,
                                    we encourage students to understand, explore, and apply what they learn.
                                    We aim to help every student learn better, think independently, and
                                    achieve their best.
                                </p>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {[
                                        "Conceptual Learning",
                                        "Strong Foundations",
                                        "Practical Application",
                                        "Individual Growth",
                                    ].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>


                    </div>
                </section>

                {/* STATS BAR */}
                <section className="bg-secondary py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((s, i) => (
                                <Reveal key={s.label} delay={i * 80}>
                                    <div className="text-center">
                                        <p className="text-3xl md:text-4xl font-serif font-bold text-white">{s.value}</p>
                                        <p className="text-white/70 text-sm mt-2">{s.label}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>




                {/* COMMITMENT LIST */}
                <section className="bg-background/40 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div className="relative">
                                {/* Offset frame behind image */}
                                <div className="absolute -inset-2 bg-primary/10 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl" />

                                <div className="relative overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl shadow-xl">
                                    <img
                                        src="/infra/library/canvas1.png"
                                        alt="Supportive learning environment"
                                        className="w-full h-80 md:h-[24rem] object-cover"
                                    />
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={100}>
                            <div className="space-y-5">
                                <span className="text-primary font-semibold text-sm tracking-wide uppercase">Our Commitment</span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-tight">
                                    A Supportive Path to Every Student's Best
                                </h2>
                                <ul className="space-y-4">
                                    {[
                                        "Individual attention that adapts to each learner's pace",
                                        "Regular assessments used to guide, not just grade",
                                        "A supportive environment where questions are welcomed",
                                        "Continuous improvement built into every term",
                                    ].map((point) => (
                                        <li key={point} className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                            <span className="text-gray-700 leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </section>


            </main>
        </>
    );
}
