import SEO from "../../../components/SEO";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    CpuChipIcon,
    CodeBracketIcon,
    AcademicCapIcon,
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
   DATA — image-led sections instead of icon cards
========================= */
const stations = [
    {
        title: "Modern Workstations",
        desc: "Updated systems with the latest configurations for smooth, uninterrupted learning.",
        img: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=1200&h=900&fit=crop",
    },
    {
        title: "Programming & Coding",
        desc: "Age-appropriate coding curriculum that builds logical and computational thinking, one working program at a time.",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=900&fit=crop",
    },
    {
        title: "Trained Faculty, Every Step",
        desc: "Dedicated computer teachers guiding students through every concept, from first login to first program.",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=900&fit=crop",
    },
    {
        title: "Full Lab Support",
        desc: "Printers, scanners, and peripherals that let projects go from screen to reality.",
        img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=900&fit=crop",
    },
];

const gallery = [
    "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=1000&fit=crop",
];

export default function ComputerLabPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <SEO
                title="Computer Lab"
                description="The Computer Lab at Sona Valliappa Public School — modern workstations, coding curriculum, and a safe digital environment for future-ready learners."
                path="/infrastructure-facilities/computer-lab"
            />

            <main className="bg-white overflow-x-hidden">
                <PageHeader
                    title="Computer Lab"
                    subtitle='"Preparing students for a digital future through technology, logic, and curiosity."'
                    breadcrumbs={["Home", "Infrastructure Facilities", "Computer Lab"]}
                />

                {/* INTRO */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-2 gap-10 items-stretch">
                        <Reveal>
                            <div className="h-full flex flex-col justify-center space-y-4">
                                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wide uppercase">
                                    <CpuChipIcon className="w-5 h-5" /> Technology at School
                                </span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-tight">
                                    A Lab Built for <span className="text-primary">Tomorrow</span>
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Our Computer Lab is equipped with modern systems and high-speed connectivity,
                                    giving students hands-on access to technology from an early age. Structured
                                    sessions cover everything from basic digital literacy to programming and
                                    problem-solving.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Guided by trained faculty, students learn to use technology safely, think
                                    logically, and build the computational skills they will carry into higher
                                    studies and beyond.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <div className="relative h-full min-h-[10rem] md:min-h-[12rem]">
                                {/* offset accent frame behind image */}
                                <div className="absolute -top-3 -right-3 w-full h-full rounded-[2rem] bg-primary/10 -z-10" />
                                <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-xl bg-primary -z-10" />

                                {/* main image with asymmetric rounded corners */}
                                <div className="relative w-full h-full max-h-72 md:max-h-80 overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl shadow-xl">
                                    <img
                                        src="https://img.magnific.com/free-photo/empty-lecture-hall-with-modern-projection-equipment-generated-by-ai_188544-26095.jpg?uid=R224290380&ga=GA1.1.1847424523.1777460742&semt=ais_test_b&w=740&q=80"
                                        alt="Students working in the computer lab"
                                        className="w-full h-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* floating accent badge */}
                                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <CpuChipIcon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="leading-tight">
                                        <p className="text-sm font-bold text-secondary">Modern Setup</p>
                                        <p className="text-xs text-gray-500">High-speed access</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>


                {/* FULL-BLEED SIGNATURE BAND */}
                <Reveal>
                    <section className="relative w-full h-[60vh] min-h-[420px]">
                        {/* Background image (optional, remove if you want just the collage) */}
                        <img
                            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop"
                            alt="Rows of computers in the school lab"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Content container with split layout */}
                        <div className="relative h-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-0">

                            {/* LEFT: Text Content */}
                            <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center h-full md:pr-8">
                                <p className="text-white/70 text-sm font-semibold tracking-wide uppercase mb-2">
                                    Inside the Lab
                                </p>
                                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-2xl leading-tight">
                                    Every seat, a workstation. Every session, a step forward.
                                </h2>
                            </div>

                            {/* RIGHT: Image Collage */}
                            <div className="relative w-full md:w-1/2 h-[440px] md:h-[500px] mt-6 md:mt-0">
                                {/* Back photo */}
                                <div className="absolute top-0 right-0 w-[70%] h-[62%] rotate-[4deg] shadow-xl overflow-hidden border-4 border-white">
                                    <img
                                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=900&fit=crop"
                                        alt="Rows of computers in the school lab"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Front photo, overlapping bottom-left */}
                                <div className="absolute bottom-0 left-0 w-[62%] h-[55%] -rotate-[3deg] shadow-xl overflow-hidden border-4 border-white">
                                    <img
                                        src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=1100&fit=crop"
                                        alt="Student focused on coding assignment"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Small accent card, tucked between */}
                                <div className="absolute top-[52%] left-[8%] w-[38%] h-[30%] rotate-[6deg] shadow-lg overflow-hidden border-4 border-white z-10">
                                    <img
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=700&fit=crop"
                                        alt="Close-up of student hands typing"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                            
                            </div>
                        </div>
                    </section>
                </Reveal>





            </main>
        </>
    );
}