import Head from "next/head";
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
    TrophyIcon,
    HeartIcon,
    GlobeAltIcon,
    MusicalNoteIcon,
    ComputerDesktopIcon,
    CalendarIcon,
    CameraIcon,
    HandRaisedIcon,
    HomeModernIcon,
    ShieldCheckIcon,
    StarIcon,
    PaintBrushIcon,
    CpuChipIcon,
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
   CUSTOM SHAPE COMPONENT (optional, for image frames)
========================= */
const ShapeImage = ({ src, alt, shape, className }: { src: string; alt: string; shape?: "circle" | "rounded" | "soft"; className?: string }) => {
    const shapeClass = shape === "circle" ? "rounded-full" : shape === "soft" ? "rounded-3xl" : "rounded-2xl";
    return (
        <div className={`relative overflow-hidden shadow-lg ${shapeClass} ${className || ""}`}>
            <img src={src} alt={alt} className="w-full h-full object-cover transition duration-500 hover:scale-105" />
        </div>
    );
};

/* =========================
   MAIN PAGE
========================= */
export default function AllRoundDevelopmentPage() {
    // Dimensions of holistic development with images
    const devDimensions = [
        {
            icon: AcademicCapIcon,
            title: "Intellectual",
            description: "Beyond textbooks – critical thinking, research, and innovation through academic clubs and competitions.",
            color: "from-blue-500 to-cyan-500",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
        },
        {
            icon: HeartIcon,
            title: "Emotional & Social",
            description: "Empathy, leadership, teamwork, and resilience developed through group activities and counseling.",
            color: "from-pink-500 to-rose-500",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
        },
        {
            icon: TrophyIcon,
            title: "Physical",
            description: "Sports, yoga, fitness programs – building stamina, coordination, and a healthy lifestyle.",
            color: "from-green-500 to-emerald-500",
            image: "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=600&h=400&fit=crop",
        },
        {
            icon: MusicalNoteIcon,
            title: "Creative & Aesthetic",
            description: "Art, music, dance, drama, and design thinking – unleashing every child's creative potential.",
            color: "from-purple-500 to-indigo-500",
            image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
        },
        {
            icon: GlobeAltIcon,
            title: "Cultural & Global",
            description: "Exposure to diverse traditions, languages, and international exchange programs.",
            color: "from-yellow-500 to-orange-500",
            image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=400&fit=crop",
        },
        {
            icon: ShieldCheckIcon,
            title: "Ethical & Spiritual",
            description: "Value education, mindfulness, and community service – shaping responsible citizens.",
            color: "from-slate-500 to-gray-700",
            image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop",
        },
    ];

    // Clubs & activities with images
    const clubs = [
        { name: "Eco Club", icon: BeakerIcon, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop" },
        { name: "Robotics Club", icon: CpuChipIcon, image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=400&h=300&fit=crop" },
        { name: "Performing Arts", icon: MusicalNoteIcon, image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=300&fit=crop" },
        { name: "Sports Academy", icon: TrophyIcon, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop" },
        { name: "Literary Circle", icon: BookOpenIcon, image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop" },
        { name: "Art & Craft", icon: PaintBrushIcon, image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop" },
    ];

    // Testimonials with student images
    const testimonials = [
        {
            quote: "Being part of the Eco Club taught me that small actions can change the world. I now lead waste segregation at home!",
            name: "Ananya S., Grade 8",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop",
        },
        {
            quote: "The annual theatre production gave me confidence I never knew I had. Now I dream of becoming a director.",
            name: "Rohan M., Grade 10",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
        },
        {
            quote: "Robotics club made me fall in love with coding. I've built two projects already!",
            name: "Ishita V., Grade 9",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
        },
    ];

    return (
        <>
            <Head>
                <title>All Round Development | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="Holistic education at Sona Valliappa – sports, clubs, life skills, values, and endless opportunities beyond academics."
                />
            </Head>

            <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/40 overflow-x-hidden">
                {/* HERO SECTION */}
                <PageHeader
                    title="All Round Development"
                    subtitle='"Shaping scholars, athletes, artists, and leaders – because excellence is not one-dimensional."'
                    breadcrumbs={["Home", "Academics", "All Round Development"]}
                />

                {/* INTRODUCTION / PHILOSOPHY with image */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                    <div className="absolute top-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-20 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div className="space-y-6">

                                <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-secondary leading-tight">
                                    Education for the <span className="text-primary">Head, Heart & Hands</span>
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    At Sona Valliappa Public School, we believe that true success comes from a balanced
                                    development of intellectual, emotional, physical, and social capabilities. Our
                                    co-curricular and extracurricular programmes are woven into the school fabric – not
                                    an afterthought.
                                </p>
                                <p className="text-gray-700 leading-relaxed border-l-4 border-primary/40 pl-4 italic">
                                    Every student is encouraged to explore passions beyond the classroom. With 20+ clubs,
                                    competitive sports, performing arts, and value‑based initiatives, your child will
                                    discover their unique strengths and develop lifelong skills.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <div className="relative">
                                <ShapeImage
                                    src="https://img.magnific.com/premium-photo/male-students-engaging-with-modern-technology-overlaying-traditional-values-full-white_1142544-7117.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                                    alt="Students in activity"
                                    shape="rounded"
                                    className="w-full h-80 md:h-96 "
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 shadow-lg hidden md:block">
                                    <div className="flex items-center gap-3">
                                        <TrophyIcon className="w-8 h-8 text-primary" />
                                        <div>
                                            <p className="font-bold text-secondary">100%</p>
                                            <p className="text-xs text-gray-500">students participate in co-curriculars</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* CALL TO ACTION with image background */}
                <div className="relative py-20  overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&h=600&fit=crop" alt="Campus" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                        <Reveal>
                            <HandRaisedIcon className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-3xl font-serif font-bold mb-4">Every Child Deserves a Full Spectrum Education</h3>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                Come see our clubs in action, meet our coaches, and watch a rehearsal or a match.
                            </p>
                            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                                Schedule a Campus Visit
                            </button>
                        </Reveal>
                    </div>
                </div>
            </main>
        </>
    );
}