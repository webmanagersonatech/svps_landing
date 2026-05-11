import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    LightBulbIcon,
    EyeIcon,
    AcademicCapIcon,
    UserGroupIcon,
    RocketLaunchIcon,
    HeartIcon,
    GlobeAltIcon,

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
   VISION & MISSION PAGE
========================= */
export default function VisionMissionPage() {
    const coreValues = [
        {
            icon: <HeartIcon className="w-6 h-6" />,
            title: "Compassion",
            description: "Fostering empathy and kindness in every interaction.",
        },
        {
            icon: <RocketLaunchIcon className="w-6 h-6" />,
            title: "Innovation",
            description: "Encouraging creative thinking and problem-solving.",
        },
        {
            icon: <UserGroupIcon className="w-6 h-6" />,
            title: "Collaboration",
            description: "Building strong communities through teamwork.",
        },
        {
            icon: <GlobeAltIcon className="w-6 h-6" />,
            title: "Integrity",
            description: "Upholding ethical practices and honesty.",
        },
    ];

    const strategicGoals = [
        {
            title: "Academic Excellence",
            description:
                "Achieve top-tier academic outcomes through innovative pedagogy and continuous improvement.",
        },
        {
            title: "Holistic Development",
            description:
                "Nurturing intellectual, emotional, social, and physical growth in every student.",
        },
        {
            title: "Global Citizenship",
            description:
                "Preparing students to thrive in a diverse, interconnected world with cultural awareness.",
        },
    ];

    return (
        <>
            <Head>
                <title>Vision & Mission | Sona Valliappa Public School</title>
            </Head>

            <main className="bg-gradient-to-b from-background/60 via-white to-background/50 relative">

                {/* HERO */}
                <PageHeader
                    title="Vision & Mission"
                    subtitle="Shaping Tomorrow's Leaders Through Purpose and Excellence"
                    breadcrumbs={["Home", "About", "Vision & Mission"]}
                />

                {/* VISION SECTION with Background Image */}
                <div className="relative">
                    {/* Background Image for Vision Section */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            backgroundImage: "url('/about/visionandmission/sona-valliappa-public-school-vertical.png')",
                            backgroundPosition: "center center",
                            backgroundSize: "50%",  // Reduced from "cover" to 50%
                            backgroundRepeat: "no-repeat",
                            opacity: 0.05,
                        }}
                    />

                    <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-stretch">
                            {/* Left side - Vision Icon Block */}
                            <Reveal>
                                <div className="grid grid-cols-2 gap-2 h-full">
                                    <div className="bg-secondary/20 rounded-l-3xl flex items-center justify-center p-6">
                                        <EyeIcon className="w-32 h-32 text-primary opacity-80" />
                                    </div>
                                    <div className="bg-primary/10 rounded-r-3xl flex items-center justify-center p-6">
                                        <p className="text-center font-serif text-xl md:text-2xl font-bold text-secondary leading-relaxed italic">
                                            "Empowering minds to envision a better tomorrow."
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Right side - Vision Text */}
                            <div className="h-full flex flex-col justify-center space-y-4">
                                <Reveal>
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary flex items-center gap-3">
                                        <EyeIcon className="w-8 h-8 text-primary" />
                                        Our Vision
                                    </h2>
                                </Reveal>

                                <Reveal delay={100}>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        To nurture and develop young minds by providing a conducive and stimulating learning ambience, with balanced emphasis on curriculum, innovation and physical activity and make them responsible global citizens.
                                    </p>
                                </Reveal>

                                <Reveal delay={200}>
                                    <p className="text-gray-700 leading-relaxed">
                                        We envision a future where every student discovers their unique potential and
                                        is empowered with the knowledge, skills, and values to shape a sustainable and
                                        equitable world. Through excellence in teaching, groundbreaking research, and
                                        strong community partnerships, we strive to create an environment where
                                        curiosity thrives and dreams take flight.
                                    </p>
                                </Reveal>
                            </div>
                        </div>
                    </div>



                    <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-stretch">

                            {/* Left side */}
                            <div className="space-y-4 flex flex-col justify-center">
                                <Reveal>
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary flex items-center gap-3">
                                        <AcademicCapIcon className="w-8 h-8 text-primary" />
                                        Our Mission
                                    </h2>
                                </Reveal>

                                <Reveal delay={150}>
                                    <ul className="space-y-3 mt-4">
                                        {[
                                            "To offer the best quality education with international emergent learning curriculum that is child-focused and teacher-facilitated.",
                                            "To provide a conducive, safe and stimulating environment fostering learning by doing with innovation.",
                                            "To serve together in synergy with teachers and parents to create responsible global citizens.",
                                            "To impart equal importance to co-scholastic and physical activities and develop their overall personality.",
                                            "To imbibe strong values and ethics with a desire to care for the environment and the society.",
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-primary font-bold text-lg mt-0.5">✓</span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            </div>

                            {/* Right side */}
                            <Reveal>
                                <div className="grid grid-cols-2 gap-2 h-full min-h-full">

                                    {/* Icon block */}
                                    <div className="bg-secondary/20 rounded-l-3xl flex items-center justify-center p-6 h-full">
                                        <GlobeAltIcon className="w-28 h-28 text-primary opacity-80" />
                                    </div>

                                    {/* Quote block */}
                                    <div className="bg-primary/10 rounded-r-3xl flex items-center justify-center p-6 h-full">
                                        <p className="text-center font-serif text-xl md:text-2xl font-bold text-secondary leading-relaxed italic">
                                            "Shaping young minds with purpose, passion, and integrity."
                                        </p>
                                    </div>

                                </div>
                            </Reveal>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}