import Head from "next/head";
import Image from "next/image";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    LightBulbIcon,
    AcademicCapIcon,
    HeartIcon,
    ChatBubbleLeftRightIcon,
    SparklesIcon,
    UsersIcon,
    TrophyIcon,
    BookOpenIcon,
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
   MAIN PAGE - PRINCIPAL'S MESSAGE
========================= */
export default function PrincipalMessagePage() {
    // Principal's core values / guiding principles
    const guidingPrinciples = [
        {
            icon: HeartIcon,
            title: "With Love & Care",
            description:
                "Every child is nurtured in a safe, supportive environment that values emotional well-being.",
        },
        {
            icon: SparklesIcon,
            title: "Innovation First",
            description:
                "We embrace modern pedagogies, technology, and creative thinking to prepare global citizens.",
        },
        {
            icon: UsersIcon,
            title: "Holistic Growth",
            description:
                "Academic excellence, sports, arts, and life skills – we develop complete individuals.",
        },
        {
            icon: ChatBubbleLeftRightIcon,
            title: "Open Communication",
            description:
                "Strong parent-teacher partnership ensures every child's unique potential is realized.",
        },
    ];

    // Principal's credentials / stats
    const principalStats = [
        ["28+", "Years of Experience", "In Education Leadership"],
        ["12+", "Years at Sona Group", "Driving Excellence"],
        ["5000+", "Students Mentored", "Towards Bright Futures"],
        ["15+", "Awards & Recognitions", "For Innovative Leadership"],
    ];

    return (
        <>
            <Head>
                <title>Principal's Message | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="Hear from our Principal – the vision, values, and commitment that shape Sona Valliappa Public School's nurturing environment."
                />
            </Head>

            <main className="bg-gradient-to-b from-background/60 via-white to-background/50">
                {/* HERO SECTION */}
                <PageHeader
                    title="Message from the Principal"
                    subtitle='"Education is not just about filling minds, but about lighting them up."'
                    breadcrumbs={["Home", "About", "Principal's Message"]}
                />

                {/* INTRO SECTION - PHOTO + WELCOME */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-12 items-stretch">

                        {/* LEFT: PRINCIPAL PHOTO */}
                        {/* LEFT: PRINCIPAL PHOTO - DIAGONAL HEXAGONAL SHAPE */}
                        <Reveal>
                            <div className="relative group h-full">
                                <div className="bg-white p-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                                    {/* Polygonal Image Container */}
                                    <div
                                        className="relative overflow-hidden h-full min-h-[320px]"
                                        style={{
                                            clipPath: "polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)"
                                        }}
                                    >
                                        {/* Image */}
                                        <Image
                                            src="/about/principal-message/principal-message-banner.svg"
                                            alt="Principal - Sona Valliappa Public School"
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                                        {/* Decorative Border (adapts to clip-path) */}
                                        <div className="absolute inset-0 border-2 border-primary/30 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Badge repositioned for the new shape */}
                                <div className="absolute -bottom-3 left-6 bg-secondary text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-10">
                                    Our Guiding Light
                                </div>
                            </div>
                        </Reveal>

                        {/* RIGHT: CONTENT */}
                        <div className="h-full flex flex-col justify-center space-y-5">

                            <Reveal>


                                <p className="text-gray-700 leading-relaxed font-medium text-lg">
                                    Greetings!
                                </p>

                                <p className="text-primary font-medium italic">
                                    “ The Journey of thousand miles begins with a single step…..”
                                </p>
                            </Reveal>

                            <Reveal delay={100}>
                                <p className="text-gray-700 leading-relaxed">
                                    The Sona Group of Institutions has built a reputation for the quality of its work for more than 60 years in the field of Education and Industry.
                                </p>

                                <p className="text-gray-700 leading-relaxed mt-2">
                                    Our school provides an exciting and safe atmosphere, where the needs of the children are nurtured. The school prides itself on its stimulating curriculum and provides a happy environment, so that the children become independent learners in future.
                                </p>
                            </Reveal>

                        </div>
                    </div>
                </div>



                {/* FULL MESSAGE / PHILOSOPHY SECTION - CLIENT CONTENT (exactly as provided) */}
                <div className="max-w-7xl mx-auto px-4 space-y-5 text-gray-700 leading-relaxed">
                    <Reveal delay={0}>
                        <p>
                            The Institution strongly believes that when children develop practical learning as a life skill and see the real life applications of the knowledge they gather, they will become lifelong learners.
                        </p>
                    </Reveal>
                    <Reveal delay={100}>
                        <p>
                            This is an Institution where our children have become a part of a greater family, who have come to us seeking education and leave an impression of empowerment not only towards themselves but also to the society around them.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <p>
                            We heartily welcome the young ones to climb the ladder of success…………
                        </p>
                    </Reveal>

                    <Reveal delay={300}>
                        <div className="mt-4 pt-2">
                            <p className="font-semibold text-primary text-lg">
                                Best Wishes!
                            </p>
                            {/* Removed principal signature as it was not in client content */}
                            <div className="mt-2 w-32 h-0.5 bg-primary/40" />
                        </div>
                    </Reveal>
                </div>


                {/* FINAL CTA SECTION - CONNECT WITH US */}
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div
                        className="relative bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center overflow-hidden shadow-lg"
                        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)" }}
                    >
                        <Reveal>
                            <AcademicCapIcon className="w-14 h-14 mx-auto text-primary mb-5" />
                        </Reveal>

                        <Reveal delay={150}>
                            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                                Walk-in for a Personal Conversation
                            </h3>
                        </Reveal>

                        <Reveal delay={250}>
                            <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                                I personally invite you to visit our campus, meet our dedicated team,
                                and experience the nurturing environment at Sona Valliappa Public School.
                                Let's work together to shape your child's bright future.
                            </p>
                        </Reveal>

                        <Reveal delay={350}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-primary text-white px-8 py-2.5 rounded-r-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                    Schedule a Meeting
                                </button>
                                <button className="border-2 border-primary text-primary px-8 py-2.5 rounded-r-full hover:bg-primary/5 transition-all">
                                    Enquire Now
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </main>
        </>
    );
}