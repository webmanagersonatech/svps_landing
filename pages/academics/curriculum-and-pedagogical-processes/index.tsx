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
   SUBJECT-WISE CURRICULUM DATA
   Grouped the way a parent actually thinks
   about a school week, not an arbitrary list.
========================= */
type Subject = { name: string; description: string };
type Category = {
    id: string;
    title: string;
    tagline: string;
    icon: React.ElementType;
    subjects: Subject[];
};

const categories: Category[] = [
    {
        id: "languages",
        title: "Languages",
        tagline: "Reading, writing and speaking with confidence",
        icon: ChatBubbleLeftRightIcon,
        subjects: [
            {
                name: "English",
                description:
                    "Reading, writing, grammar, vocabulary, literature, and communication skills.",
            },
            {
                name: "Tamil / Second Language",
                description: "Language development, literature, reading, and writing.",
            },
            {
                name: "Japanese",
                description:
                    "Introduction to the Japanese language, vocabulary, communication, and cultural awareness.",
            },
        ],
    },
    {
        id: "core",
        title: "Mathematics & Science",
        tagline: "Understanding the world through logic and inquiry",
        icon: BeakerIcon,
        subjects: [
            {
                name: "Mathematics",
                description:
                    "Conceptual understanding, logical reasoning, problem-solving, and application.",
            },
            {
                name: "Mathematics Lab",
                description:
                    "Hands-on activities and practical exploration of mathematical concepts.",
            },
            {
                name: "Science",
                description:
                    "Observation, experimentation, exploration, and understanding of scientific concepts.",
            },
            {
                name: "Social Science",
                description:
                    "History, Geography, Civics, and awareness of society and the world.",
            },
        ],
    },
    {
        id: "technology",
        title: "Technology & Computational Thinking",
        tagline: "Building, coding, and solving with logic",
        icon: ComputerDesktopIcon,
        subjects: [
            {
                name: "Computer Science",
                description: "Digital literacy, coding, programming, and technology skills.",
            },
            {
                name: "Computer Lab",
                description:
                    "Hands-on learning through coding, digital applications, and practical activities.",
            },
            {
                name: "Computational Thinking",
                description:
                    "Logical reasoning, pattern recognition, algorithms, and structured problem-solving.",
            },
            {
                name: "Robotics",
                description:
                    "Designing, building, coding, and programming robots through hands-on learning.",
            },
        ],
    },
    {
        id: "enrichment",
        title: "Skills, Sports & the Arts",
        tagline: "Growing confident, well-rounded individuals",
        icon: SparklesIcon,
        subjects: [
            {
                name: "Handwriting",
                description: "Developing neat, legible, and confident handwriting.",
            },
            {
                name: "General Knowledge & Current Affairs",
                description: "Awareness of important events and the world around us.",
            },
            {
                name: "Physical Education & Sports",
                description: "Fitness, coordination, teamwork, and healthy habits.",
            },
            {
                name: "Art & Craft",
                description: "Creativity, imagination, and artistic expression.",
            },
            {
                name: "Music & Performing Arts",
                description: "Creativity, confidence, expression, and appreciation of the arts.",
            },
            {
                name: "Life Skills",
                description:
                    "Communication, collaboration, decision-making, problem-solving, and responsible behaviour.",
            },
        ],
    },
];

/* =========================
   SUBJECT-WISE CURRICULUM SECTION
   Card-based layout: one card per subject
   group, grid of subjects inside — no clicks
   required, everything is visible at once.
========================= */
const accentStyles: Record<
    string,
    { badge: string; ring: string; chip: string }
> = {
    languages: {
        badge: "bg-primary/10 text-primary",
        ring: "hover:border-primary/40",
        chip: "bg-primary/5",
    },
    core: {
        badge: "bg-secondary/10 text-secondary",
        ring: "hover:border-secondary/40",
        chip: "bg-secondary/5",
    },
    technology: {
        badge: "bg-primary/10 text-primary",
        ring: "hover:border-primary/40",
        chip: "bg-primary/5",
    },
    enrichment: {
        badge: "bg-secondary/10 text-secondary",
        ring: "hover:border-secondary/40",
        chip: "bg-secondary/5",
    },
};

function SubjectCurriculum() {
    return (
        <div className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Reveal>
                    <div className="max-w-2xl mb-12">
                        <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">
                            What students study
                        </p>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-snug mb-4">
                            Subject-wise Curriculum
                        </h2>
                      
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-6">
                    {categories.map((category, idx) => {
                        const Icon = category.icon;
                        const accent = accentStyles[category.id];

                        return (
                            <Reveal key={category.id} delay={idx * 80}>
                                <div
                                    className={`h-full bg-white border border-gray-200  p-6 md:p-7 shadow-sm hover:shadow-lg transition-all duration-300 ${accent.ring}`}
                                >
                                    {/* CARD HEADER */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <span
                                            className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${accent.badge}`}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </span>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                                                {category.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {category.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    {/* SUBJECT LIST */}
                                    <div className="space-y-2.5">
                                        {category.subjects.map((subject) => (
                                            <div
                                                key={subject.name}
                                                className={`rounded-xl p-3.5 ${accent.chip}`}
                                            >
                                                <p className="font-medium text-gray-800 text-sm mb-0.5">
                                                    {subject.name}
                                                </p>
                                                <p className="text-sm text-gray-500 leading-relaxed">
                                                    {subject.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
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
                    subtitle='"Learning today, shaping tomorrow."'
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
                    Our curriculum is designed to build a strong academic foundation
                    through conceptual and meaningful learning. We encourage students
                    to understand concepts deeply rather than simply memorising
                    information.
                </p>
            </Reveal>

            <Reveal delay={175}>
                <p className="text-gray-600 leading-relaxed">
                    The learning experience focuses on curiosity, creativity, critical
                    thinking, problem-solving, and practical application. Through
                    academics, technology, co-curricular activities, sports, and life
                    skills, students are given opportunities to explore, question,
                    apply, and learn from real-world experiences. Our aim is to help
                    every student become a confident, independent, and lifelong
                    learner.
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

                {/* SUBJECT-WISE CURRICULUM */}
                <SubjectCurriculum />

            </main>
            
        </>
    );
}