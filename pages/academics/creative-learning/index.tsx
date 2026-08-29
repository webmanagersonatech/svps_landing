import SEO from "../../../components/SEO";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    LightBulbIcon,
    PuzzlePieceIcon,
    ChatBubbleLeftRightIcon,
    PaintBrushIcon,
    SparklesIcon,
    RocketLaunchIcon,
    HandRaisedIcon,
    BeakerIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    TrophyIcon,
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
        icon: PaintBrushIcon,
        title: "Hands-on Projects",
        desc: "Students build, craft, and create — turning classroom concepts into tangible, real-world outcomes.",
    },
    {
        icon: ChatBubbleLeftRightIcon,
        title: "Open Discussions",
        desc: "Guided debates and conversations that let every child voice ideas and challenge assumptions.",
    },
    {
        icon: PuzzlePieceIcon,
        title: "Problem Solving",
        desc: "Puzzles, case studies, and challenges that train young minds to think their way through obstacles.",
    },
    {
        icon: BeakerIcon,
        title: "Experiential Learning",
        desc: "Labs, field visits, and demonstrations that make abstract ideas visible and memorable.",
    },
    {
        icon: SparklesIcon,
        title: "Imagination First",
        desc: "Storytelling, art, and design thinking that give students room to dream before they refine.",
    },
    {
        icon: MagnifyingGlassIcon,
        title: "Discover Talent",
        desc: "Multiple avenues — arts, science, sport, and more — for every child to find what they're good at.",
    },
];

const cycle = [
    { step: "01", title: "Question", desc: "Every lesson opens with curiosity, not conclusions.", icon: LightBulbIcon },
    { step: "02", title: "Explore", desc: "Students investigate through activity, discussion, and play.", icon: MagnifyingGlassIcon },
    { step: "03", title: "Create", desc: "Ideas take shape as projects, models, art, or writing.", icon: PencilSquareIcon },
    { step: "04", title: "Share", desc: "Work is presented, discussed, and celebrated with peers.", icon: HandRaisedIcon },
];

export default function CreativeLearningPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <SEO
                title="Creative Learning"
                description="Creative learning at Sona Valliappa Public School — where imagination, projects, discussions and hands-on discovery bring the classroom to life."
                path="/academics/creative-learning"
            />

            <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/40 overflow-x-hidden">
                <PageHeader
                    title="Creative Learning"
                    subtitle='"We encourage students to think beyond textbooks, explore new ideas, and learn through creativity."'
                    breadcrumbs={["Home", "Academics", "Creative Learning"]}
                />

                {/* INTRO */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                    <div className="absolute top-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-20 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div className="space-y-6">
                                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wide uppercase">
                                    <SparklesIcon className="w-5 h-5" /> Beyond the Textbook
                                </span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-tight">
                                    Learning that Sparks <span className="text-primary">Imagination</span>
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Our creative learning approach combines classroom knowledge with practical activities,
                                    projects, discussions, and hands-on experiences that make learning enjoyable and
                                    meaningful. Students are encouraged to ask questions, express their ideas, solve
                                    problems, and discover their individual talents.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    By nurturing imagination and independent thinking, we help students develop the
                                    confidence and skills they need to become innovative, curious, and lifelong learners.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    {["Curiosity", "Imagination", "Confidence", "Independent Thinking"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={100}>
                            <div className="group">
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src="/activities/Dramatics-2.jpg"
                                        alt="Students engaged in creative activity"
                                        className="w-full h-80 md:h-[26rem] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Thin accent border on hover */}
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                                </div>

                                {/* Info row below the image, not floating */}
                                <div className="flex items-center justify-between mt-4 px-1">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <RocketLaunchIcon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary text-sm leading-tight">Every Child</p>
                                            <p className="text-xs text-gray-500">given room to imagine &amp; create</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-secondary">
                                        <PaintBrushIcon className="w-4 h-4" />
                                        <span className="text-xs font-semibold">Learn by Doing</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>




                {/* GALLERY STRIP */}
                <section className="bg-background/40 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-primary font-semibold text-sm tracking-wide uppercase">In Action</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mt-2">
                                Creativity Around Campus
                            </h2>
                        </Reveal>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { src: "/activities/Dramatics-1.jpg", label: "Dramatics & Expression" },
                                { src: "/activities/Dramatics-3.webp", label: "Stage & Storytelling" },
                                { src: "/activities/Dramatics-4.webp", label: "Team Projects" },
                                { src: "/activities/Dramatics-5.webp", label: "Performance & Confidence" },
                            ].map((g, i) => (
                                <Reveal key={g.label} delay={i * 90}>
                                    <div className="group relative overflow-hidden rounded-2xl shadow-sm h-56">
                                        <img
                                            src={g.src}
                                            alt={g.label}
                                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/10 to-transparent opacity-80" />
                                        <span className="absolute bottom-3 left-3 text-white text-sm font-semibold">{g.label}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>



            </main>
        </>
    );
}
