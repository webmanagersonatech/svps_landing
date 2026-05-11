import Head from "next/head";
import Image from "next/image";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    AcademicCapIcon,
    BeakerIcon,
    BookOpenIcon,
    ChatBubbleLeftRightIcon,
    LightBulbIcon,
    PuzzlePieceIcon,
    RocketLaunchIcon,
    SparklesIcon,
    UserGroupIcon,
    ChartBarIcon,
    CpuChipIcon,
    HeartIcon,
    TrophyIcon,
    GlobeAltIcon,
    CalendarIcon,
    MusicalNoteIcon,
    ComputerDesktopIcon,
    ArrowPathIcon,
    EyeIcon,
    FingerPrintIcon,
    CameraIcon,
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

// Custom shape component for overlapping image frames
const ShapeImage = ({ src, alt, shape, className }: { src: string; alt: string; shape: "circle"; className?: string }) => {
    const shapeClasses = {
        circle: "rounded-full",
        hexagon: "clip-path-hexagon",
        blob: "clip-path-blob",
        diamond: "clip-path-diamond rotate-45 group-hover:rotate-0 transition-transform duration-500",
        parallelogram: "clip-path-parallelogram skew-y-2 group-hover:skew-y-0 transition-all duration-500",
    };

    return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 ${shapeClasses[shape]} ${className || ""}`}>

            <img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

        </div>
    );
};

export default function MethodologyPage() {
    // Core pedagogical pillars
    const methodologyPillars = [
        {
            icon: LightBulbIcon,
            title: "Inquiry‑Based Learning",
            description:
                "Students learn by asking questions, investigating real problems, and constructing their own understanding.",
            image: "https://img.magnific.com/free-photo/smart-student-with-blackboard_23-2147650764.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
            shape: "circle" as const,
        },
        {
            icon: UserGroupIcon,
            title: "Collaborative Learning",
            description:
                "Group discussions, peer teaching, and team projects build communication and teamwork skills.",
            image: "https://img.magnific.com/premium-photo/team-indian-students-working-science-project-together-showcasing-teamwork-collaboration-mutual-support-conducting-experiments-presenting-findings_748982-3248.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
            shape: "circle" as const,
        },
        {
            icon: BeakerIcon,
            title: "Experiential & Hands‑On",
            description:
                "Laboratory work, field visits, and maker sessions turn abstract concepts into tangible experiences.",
            image: "https://img.magnific.com/premium-photo/young-boy-stands-awe-before-table-overflowing-with-colorful-delicious-candy-treats_431161-77367.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
            shape: "circle" as const,
        },
        {
            icon: CpuChipIcon,
            title: "Technology Integrated",
            description:
                "Digital tools, smart classrooms, and AI‑driven adaptive platforms personalise the learning journey.",
            image: "https://img.magnific.com/premium-photo/male-students-engaging-with-modern-technology-overlaying-traditional-values-full-white_1142544-7117.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
            shape: "circle" as const,
        },
    ];

    // Learning journey steps with distinct shapes
    const learningSteps = [
        { title: "Question", icon: ChatBubbleLeftRightIcon, description: "Curiosity-driven prompts", color: "from-blue-500 to-cyan-500", shape: "circle" },
        { title: "Explore", icon: GlobeAltIcon, description: "Multi-disciplinary research", color: "from-emerald-500 to-teal-500", shape: "parallelogram" },
        { title: "Create", icon: RocketLaunchIcon, description: "Project-based application", color: "from-orange-500 to-amber-500", shape: "blob" },
        { title: "Reflect", icon: ArrowPathIcon, description: "Continuous feedback loops", color: "from-purple-500 to-pink-500", shape: "hexagon" },
    ];

    return (
        <>
            <Head>
                <title>Teaching Methodology | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="Discover how we teach at Sona Valliappa Public School – inquiry‑based, collaborative, technology‑enriched, and designed for lifelong learning."
                />
            </Head>

            <main className="bg-gradient-to-b from-background/60 via-white to-background/50 overflow-x-hidden">
                {/* HERO SECTION */}
                <PageHeader
                    title="Our Teaching Methodology"
                    subtitle='"We don’t fill a bucket, we light a fire – every child learns how to learn."'
                    breadcrumbs={["Home", "Academics", "Methodology"]}
                />

                {/* PHILOSOPHY & PILLARS SECTION with organic shapes */}
                <div className="max-w-7xl mx-auto px-4 py-16 relative">
                    {/* Decorative background blobs */}
                    <div className="absolute top-20 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-20 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* LEFT: METHODOLOGY PHILOSOPHY */}
                        <div className="space-y-6">


                            <Reveal delay={100}>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary leading-tight">
                                    From “Chalk & Talk” <br />to “Guide on the Side”
                                </h2>
                            </Reveal>
                            <Reveal delay={150}>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    At Sona Valliappa Public School, we believe that true learning happens when students
                                    are active participants, not passive listeners. Our methodology moves away from
                                    one‑way lectures and embraces dynamic, student‑centred strategies that respect
                                    individual pace, interest, and potential.
                                </p>
                            </Reveal>
                            <Reveal delay={200}>
                                <p className="text-gray-700 leading-relaxed">
                                    Every classroom is a thinking ecosystem – built on <span className="font-semibold text-primary">curiosity</span>,{" "}
                                    <span className="font-semibold text-primary">dialogue</span>, and{" "}
                                    <span className="font-semibold text-primary">reflection</span>. Our teachers are facilitators
                                    who design experiences, not just deliver content.
                                </p>
                            </Reveal>
                        </div>
                        <Reveal delay={100}>
                            <div className="flex flex-wrap justify-center gap-y-12 gap-x-16 md:gap-x-24">
                                {methodologyPillars.map((pillar, idx) => (
                                    <div key={idx} className="flex flex-col items-center w-40 group animate-float" style={{ animationDelay: `${idx * 0.15}s` }}>
                                        <div className="relative w-32 h-32 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                                            <ShapeImage src={pillar.image} alt={pillar.title} shape={pillar.shape} className="w-full h-full filter drop-shadow-xl" />
                                            <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all">
                                                <pillar.icon className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-secondary text-center">{pillar.title}</h3>
                                    </div>
                                ))}
                            </div>
                            {/* quote */}
                        </Reveal>
                    </div>
                </div>



                <div className="relative w-full py-20">

                    {/* BACKGROUND IMAGE */}
                    <img
                        src="/acadamics/bgimage.jpg" // <-- replace with your image path
                        alt="Learning Journey Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* BLACK OVERLAY */}
                    <div className="absolute inset-0 bg-black/70"></div>

                    {/* CONTENT */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4">

                        <Reveal>
                            <div className="text-center mb-12 text-white">
                                <h2 className="text-3xl md:text-4xl font-serif font-bold">
                                    The Learning Journey
                                </h2>
                                <p className="mt-2 max-w-2xl mx-auto text-gray-200">
                                    Our unique pedagogical cycle that nurtures lifelong learners
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid md:grid-cols-4 gap-6 relative">

                            {/* Line */}
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 -translate-y-1/2"></div>

                            {learningSteps.map((step, idx) => (
                                <Reveal key={idx} delay={idx * 150}>
                                    <div className="relative group">

                                        <div className="relative z-10 bg-white/90 backdrop-blur-md p-6 shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl rounded-xl">

                                            {/* ICON */}
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition">
                                                <step.icon className="w-6 h-6 text-gray-700" />
                                            </div>

                                            <div className="mt-6 text-center">
                                                <h3 className="text-gray-800 font-bold text-xl mb-2">
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {step.description}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                    </div>
                </div>



            </main>

        </>
    );
}