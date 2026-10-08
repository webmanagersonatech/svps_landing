import SEO from "../../../components/SEO";
import Image from "next/image";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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

            <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

        </div>
    );
};

export default function MethodologyPage() {


    const [activePillar, setActivePillar] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePillar((prev) => (prev + 1) % methodologyPillars.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);
    // Core pedagogical pillars
    const methodologyPillars = [
        {
            icon: LightBulbIcon,
            title: "Inquiry‑Based Learning",
            description:
                "Students learn by asking questions, investigating real problems, and constructing their own understanding.",
            image: "/acadamics/inquiry-based.webp",
            shape: "circle" as const,
        },
        {
            icon: UserGroupIcon,
            title: "Collaborative Learning",
            description:
                "Group discussions, peer teaching, and team projects build communication and teamwork skills.",
            image: "/acadamics/Collaborative-Learning.webp",
            shape: "circle" as const,
        },
        {
            icon: BeakerIcon,
            title: "Experiential & Hands‑On",
            description:
                "Laboratory work, field visits, and maker sessions turn abstract concepts into tangible experiences.",
            image: "/acadamics/Experiential-Hands-On.webp",
            shape: "circle" as const,
        },
        {
            icon: CpuChipIcon,
            title: "Technology Integrated",
            description:
                "Digital tools, smart classrooms, and AI‑driven adaptive platforms personalise the learning journey.",
            image: "/acadamics/Technology-Integrated.webp",
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
            <SEO
                title="Teaching Methodology"
                description="Discover how we teach at Sona Valliappa Public School – inquiry‑based, collaborative, technology‑enriched, and designed for lifelong learning."
                path="/academics/methodology"
            />

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
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-tight">
                                    From “Chalk & Talk” <br />to “Guide on the Side”
                                </h2>
                            </Reveal>
                            <Reveal delay={150}>
                                <p className="text-gray-700 leading-relaxed ">
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
                            <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">

                                {/* ================= MAIN BANNER ================= */}
                                <div className="
            relative
            w-full
            h-[230px]
            sm:h-[250px]
            md:h-[285px]
            overflow-hidden
            
        
            bg-white
            shadow-xl
        ">

                                    {/* ================= BACKGROUND IMAGE ================= */}
                                    <Image
                                        src={methodologyPillars[activePillar].image}
                                        alt={methodologyPillars[activePillar].title}
                                        width={1200}
                                        height={800}
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    object-center
                "
                                    />

                                    {/* ================= YELLOW TOP ACCENT ================= */}
                                    <div
                                        className="
                    absolute
                    z-[2]
                    -top-[70px]
                    left-[27%]
                    w-[145px]
                    h-[190px]
                    rotate-[27deg]
                    rounded-[30px]
                    bg-[#FDBB30]
                "
                                    />

                                    {/* ================= BLUE BOTTOM RIGHT ACCENT ================= */}
                                    <div
                                        className="
                    absolute
                    z-[2]
                    -right-[45px]
                    -bottom-[70px]
                    w-[210px]
                    h-[125px]
                    rotate-[-8deg]
                    rounded-[40px]
                    bg-[#1559A5]
                "
                                    />

                                    {/* ================= LEFT WHITE PANEL ================= */}
                                    <div
                                        className="
                    absolute
                    z-10
                    left-0
                    top-0
                    bottom-0
                    w-[49%]
                    sm:w-[47%]
                    md:w-[44%]
                    bg-white
                "
                                        style={{
                                            clipPath:
                                                "polygon(0 0, 67% 0, 76% 7%, 83% 23%, 100% 42%, 96% 60%, 82% 69%, 88% 84%, 72% 100%, 0 100%)",
                                        }}
                                    >

                                        {/* ================= SOFT BLUE TOP LEFT SHAPE ================= */}
                                        <div
                                            className="
                        absolute
                        -left-[55px]
                        -top-[65px]
                        w-[150px]
                        h-[150px]
                        rotate-[32deg]
                        rounded-[28px]
                        bg-[#DCEEFF]
                    "
                                        />

                                        {/* ================= YELLOW BOTTOM LEFT SHAPE ================= */}
                                        <div
                                            className="
                        absolute
                        -left-[25px]
                        -bottom-[48px]
                        w-[75px]
                        h-[90px]
                        rotate-[-18deg]
                        rounded-[22px]
                        bg-[#FDBB30]
                    "
                                        />

                                        {/* ================= CONTENT ================= */}
                                        <div className="
                    relative
                    z-20
                    h-full
                    flex
                    flex-col
                    justify-center
                    pl-7
                    sm:pl-9
                    md:pl-12
                    pr-4
                ">

                                            {/* ================= NUMBER BADGE ================= */}
                                            <div className="
                        relative
                        w-[54px]
                        h-[40px]
                        sm:w-[58px]
                        sm:h-[43px]
                        md:w-[64px]
                        md:h-[46px]
                        mb-2.5
                    ">

                                                {/* Yellow Offset */}
                                                <div className="
                            absolute
                            inset-0
                            translate-x-1.5
                            translate-y-1.5
                            rounded-[8px]
                            bg-[#FDBB30]
                        " />

                                                {/* Blue Number */}
                                                <div className="
                            relative
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                            rounded-[8px]
                            bg-[#1559A5]
                            text-white
                            text-lg
                            sm:text-xl
                            md:text-[22px]
                            font-bold
                            italic
                        ">
                                                    {String(activePillar + 1).padStart(2, "0")}
                                                </div>
                                            </div>

                                            {/* ================= SMALL LABEL ================= */}
                                            <p className="
                        mb-1
                        text-[#3568A9]
                        text-[8px]
                        sm:text-[9px]
                        md:text-[10px]
                        tracking-[0.15em]
                        uppercase
                        font-medium
                    ">
                                                Methodology Pillar
                                            </p>

                                            {/* ================= TITLE ================= */}
                                            <h3 className="
                        max-w-[270px]
                        text-[#123B73]
                        text-[19px]
                        sm:text-[22px]
                        md:text-[27px]
                        leading-[1.08]
                        font-bold
                    ">
                                                {methodologyPillars[activePillar].title}
                                            </h3>

                                            {/* ================= YELLOW LINE ================= */}
                                            <div className="
                        mt-3
                        w-10
                        sm:w-12
                        md:w-14
                        h-[3px]
                        rounded-full
                        bg-[#FDBB30]
                    " />

                                        </div>
                                    </div>


                                    {/* ================= BOTTOM DOT NAVIGATION ================= */}
                                    <div className="
                absolute
                z-40
                left-1/2
                bottom-2.5
                -translate-x-1/2
                flex
                items-center
                gap-1.5
                px-4
                py-2
                rounded-full
                bg-white
                shadow-md
            ">
                                        {methodologyPillars.map((_, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setActivePillar(idx)}
                                                aria-label={`Go to methodology pillar ${idx + 1}`}
                                                className={`
                            h-2
                            rounded-full
                            transition-all
                            duration-300
                            ${activePillar === idx
                                                        ? "w-8 bg-[#1763AD]"
                                                        : "w-2 bg-[#C7D4E5] hover:bg-[#9DB4CF]"
                                                    }
                        `}
                                            />
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>


                <div className="relative w-full overflow-hidden">

                    {/* BACKGROUND IMAGE */}
                    <Image
                        src="/acadamics/bgimage.webp"
                        alt="Learning Journey Background"
                        width={1200}
                        height={800}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="block w-full h-auto"
                    />

                    {/* BLACK OVERLAY */}
                    <div className="absolute inset-0 bg-black/70"></div>

                    {/* CONTENT */}
                    {/* HERO OVERLAY CONTENT */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8">
                        <Reveal>
                            <div className="text-center text-white max-w-3xl mx-auto">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-5 sm:mb-6 md:mb-8 leading-tight">
                                    The Learning Journey
                                </h2>

                                <Link
                                    href="/admission/admission-contact"
                                    className="inline-block bg-white text-primary 
                           text-sm sm:text-base md:text-lg 
                           px-6 sm:px-8 md:px-10 
                           py-2.5 sm:py-3 md:py-3.5 
                           rounded-full font-medium 
                           hover:bg-white/90 hover:scale-105 active:scale-95 
                           transition-all duration-300 
                           shadow-md hover:shadow-lg 
                           whitespace-nowrap"
                                >
                                    Enquiry Now
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>

            </main>

        </>
    );
}