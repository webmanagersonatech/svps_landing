import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    BookOpenIcon,
    ComputerDesktopIcon,
    UserGroupIcon,
    LightBulbIcon,
    ChatBubbleLeftRightIcon,
    AcademicCapIcon,
    CalendarDaysIcon,
    MapPinIcon,
    GlobeAltIcon,
    SparklesIcon,
    StarIcon,
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
            style={{
                transitionDelay: `${delay}ms`,
            }}
            className={`transition-all duration-700
            ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
        >
            {children}
        </div>
    );
}
const galleryImages = [
    "https://img.magnific.com/free-photo/view-modern-classroom-school_23-2150911424.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
];
const stats = [
    { value: "24:1", label: "Student-Teacher Ratio", icon: UserGroupIcon },
    { value: "100%", label: "Smart Classrooms", icon: ComputerDesktopIcon },
    { value: "8+", label: "Awards for Excellence", icon: StarIcon },
    { value: "15+", label: "Clubs & Activities", icon: SparklesIcon },
];
/* =========================
   MAIN PAGE
========================= */
export default function ClassroomPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    return (
        <>
            <Head>
                <title>Classrooms | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="Modern classrooms with interactive and student-focused learning."
                />
            </Head>

            <main className="bg-gradient-to-b from-slate-50 to-white">
                {/* HEADER */}
                <PageHeader
                    title="Classrooms"
                    subtitle="Creating an engaging and interactive learning environment for every student."
                    breadcrumbs={["Home", "Academics", "Classrooms"]}
                />

                {/* INTRO */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <Reveal>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary mb-4">
                                    A Space Where Learning Comes Alive
                                </h2>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Our classrooms are designed to be interactive, inclusive, and
                                    student-centered. We combine traditional teaching with modern
                                    techniques to make learning meaningful.

                                </p>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Our classrooms are designed to be interactive, inclusive, and
                                    student-centered. We combine traditional teaching with modern
                                    techniques to make learning meaningful.
                                </p>

                                <p className="text-gray-600 leading-relaxed">
                                    With smart boards, collaborative seating, and engaging
                                    teaching methods, students actively participate and enjoy
                                    the learning process.

                                </p>

                            </div>
                        </Reveal>

                        <Reveal>
                            <div className="group relative max-w-xl mx-auto">

                                {/* Main Image Card */}
                                <div className="rounded-t-2xl overflow-hidden shadow-md">
                                    <img
                                        src="https://img.magnific.com/premium-photo/classroom-with-green-chalkboard-group-children-front-them_198067-1056701.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                                        alt="Classroom"
                                        className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Floating Shape (design element) */}
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#18596d]/10 rounded-2xl blur-xl"></div>

                                {/* Bottom Info Card */}
                                <div className="absolute -bottom-6 left-6 right-6 bg-white 
                                 shadow-lg px-4 py-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            Smart Classroom
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Interactive & Digital Learning
                                        </p>
                                    </div>

                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#18596d]/10">
                                        <div className="w-2 h-2 bg-[#18596d] rounded-full"></div>
                                    </div>
                                </div>

                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* STATS SECTION */}
                <div className="bg-gray-100 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <Reveal key={idx} delay={idx * 80}>
                                        <div className="text-center group">
                                            <div className="mx-auto w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mb-4 
                              group-hover:scale-110 transition-transform duration-300 
                              group-hover:shadow-[0_10px_25px_rgba(24,89,109,0.2)]">

                                                <Icon className="w-7 h-7 text-[#18596d]" />
                                            </div>

                                            <div className="text-3xl md:text-4xl font-bold text-gray-900">
                                                {stat.value}
                                            </div>

                                            <div className="text-sm text-gray-500 mt-1">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* IMMERSIVE GALLERY SECTION - new visual showcase */}

                <div className=" py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <Reveal>
                            <div className="text-center mb-14">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    A Glimpse Inside Our{" "}
                                    <span className="text-[#18596d]">
                                        Learning Spaces
                                    </span>
                                </h2>

                                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                                    See how our classrooms transform into dynamic hubs of discovery.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {galleryImages.map((img, idx) => (
                                <Reveal key={idx} delay={idx * 100}>
                                    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300">

                                        {/* Image */}
                                        <div className="overflow-hidden">
                                            <img
                                                src={img}
                                                alt={`Classroom gallery ${idx + 1}`}
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-[#18596d]/0 group-hover:bg-[#18596d]/40 transition duration-300 flex items-center justify-center">
                                            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition duration-300">
                                                View Space
                                            </p>
                                        </div>

                                        {/* Bottom label */}
                                        <div className="p-4 text-center border-t border-gray-100">
                                            <p className="text-sm font-medium text-gray-700">
                                                {idx === 0 && "Interactive Session"}
                                                {idx === 1 && "Group Discovery"}
                                                {idx === 2 && "Smart Lab"}
                                                {idx === 3 && "Creative Corner"}
                                            </p>

                                            {/* Accent line */}
                                            <div className="mt-2 w-8 h-1 mx-auto bg-[#18596d] rounded-full"></div>
                                        </div>

                                    </div>
                                </Reveal>
                            ))}
                        </div>

                    </div>
                </div>

                {/* CTA SECTION */}
                <section className="relative py-20 overflow-hidden">

                    {/* Background */}
                    <div className="absolute inset-0">
                        <img
                            src="https://img.magnific.com/premium-photo/public-school-underfunded-urban-area-with-outdated-classrooms_1271419-32940.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                            className="w-full h-full object-cover"
                            alt="Campus background"
                        />

                        {/* Clean dark overlay */}
                        <div className="absolute inset-0 bg-black/70" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">

                        <Reveal>
                            {/* Top Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-5">
                                <CalendarDaysIcon className="w-4 h-4 text-white" />
                                <span className="text-white/80 text-sm">
                                    Open House Every Saturday
                                </span>
                            </div>

                            {/* Heading */}
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                Experience the Difference
                            </h3>

                            {/* Description */}
                            <p className="text-white/70 text-base mb-6 max-w-xl mx-auto">
                                Walk through our classrooms, meet our educators, and discover why
                                parents choose SVS for their child’s future.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap justify-center gap-3">

                                {/* Primary */}
                                <button onClick={() => setIsPopupOpen(true)} className="group bg-[#18596d] text-white px-6 py-2.5 rounded-full text-sm font-semibold 
                          shadow-md hover:shadow-lg hover:bg-[#154a59] transition-all duration-300 flex items-center gap-2">
                                    Book a Visit
                                    <MapPinIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Secondary */}
                                <button className="border border-white/40 text-white px-6 py-2.5 rounded-full text-sm font-medium 
                          hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                                    <GlobeAltIcon className="w-4 h-4" />
                                    Virtual Tour
                                </button>

                            </div>

                            {/* Footer note */}
                            <p className="text-white/50 text-xs mt-6">
                                Limited slots available — register early.
                            </p>
                        </Reveal>

                    </div>
                </section>

                <PopupForm
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    title="Schedule Your Campus Visit"
                    subtitle="Fill out the form below and our admissions team will get back to you within 24 hours."
                />
            </main>
        </>
    )
}