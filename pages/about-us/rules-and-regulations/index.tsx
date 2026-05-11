import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    ClockIcon,
    AcademicCapIcon,
    UserGroupIcon,
    HeartIcon,
    SunIcon,
    BookOpenIcon,
    ShieldCheckIcon,
    ChatBubbleLeftRightIcon,
    CalendarDaysIcon,
    ChevronRightIcon,
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
   RULES & REGULATIONS PAGE
========================= */
type TabId = "timings" | "uniform" | "students" | "parents";

export default function RulesAndRegulationsPage() {
    const [activeTab, setActiveTab] = useState<TabId>("timings");

    const tabs = [
        { id: "timings" as TabId, label: "School Timings", icon: ClockIcon },
        { id: "uniform" as TabId, label: "School Uniform", icon: SunIcon },
        { id: "students" as TabId, label: "For Students", icon: AcademicCapIcon },
        { id: "parents" as TabId, label: "For Parents", icon: HeartIcon },
    ];

    return (
        <>
            <Head>
                <title>Rules & Regulations | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="School timings, uniform guidelines, code of conduct for students, and guidelines for parents."
                />
            </Head>

            <main className="bg-gradient-to-b from-background/60 via-white to-background/50">
                <PageHeader
                    title="Rules & Regulations"
                    subtitle="Discipline, Integrity, and Excellence – The pillars of our community"
                    breadcrumbs={["Home", "About", "Rules & Regulations"]}
                />

                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Tabs */}
                    <div className="border-b border-gray-300 mb-8">
                        <nav className="flex flex-wrap gap-1 sm:gap-4">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            flex items-center gap-2 px-3 py-2 text-base font-medium
                                            border-b-2 transition-colors
                                            ${isActive
                                                ? "border-primary rounded-lg text-primary"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }
                                        `}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Tab content */}
                    <div className="mt-6">
                        {activeTab === "timings" && <TimingsPanel />}
                        {activeTab === "uniform" && <UniformPanel />}
                        {activeTab === "students" && <StudentsPanel />}
                        {activeTab === "parents" && <ParentsPanel />}
                    </div>
                </div>

                {/* Footer note */}
                <div className="border-t border-gray-200 py-10 text-center text-sm text-gray-500">
                    <ShieldCheckIcon className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                    <p>For any queries, please contact the school administration.</p>
                </div>
            </main>
        </>
    );
}

/* =========================
   TIMINGS PANEL
========================= */
function TimingsPanel() {
    return (
        <div className="space-y-10">
            <Reveal>
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* LEFT CONTENT */}
                    <div className="h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-5">
                                <CalendarDaysIcon className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Monday – Friday
                                </h2>
                            </div>

                            <table className="w-full text-base">
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="py-2.5 w-2/3 text-gray-700 font-medium">
                                            School Gates Open
                                        </td>
                                        <td className="py-2.5 text-gray-600">8:00 AM</td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            First Bell / Line Up
                                        </td>
                                        <td className="py-2.5">8:20 AM</td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Morning Assembly
                                        </td>
                                        <td className="py-2.5">8:25 AM – 8:35 AM</td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Instruction Begins
                                        </td>
                                        <td className="py-2.5">8:35 AM</td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">Short Break</td>
                                        <td className="py-2.5">
                                            10:30 AM – 10:45 AM
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Lunch Recess
                                        </td>
                                        <td className="py-2.5">
                                            12:45 PM – 1:20 PM
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Dispersal (Pre-Prim to Grade 2)
                                        </td>
                                        <td className="py-2.5">2:45 PM</td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Dispersal (Grades 3-5)
                                        </td>
                                        <td className="py-2.5">3:15 PM</td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Dispersal (Grades 6-10)
                                        </td>
                                        <td className="py-2.5">3:30 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative min-h-[420px] md:min-h-full rounded-2xloverflow-hidden">
                        <Image
                            src="/about/sctime-1.png"
                            alt="School Campus"
                            fill
                            className="object-contain object-center hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </Reveal>

            <Reveal delay={100}>
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* IMAGE */}
                    <div className="order-2 md:order-1 relative min-h-[320px] md:min-h-full group">

                        {/* Decorative Background Block */}
                        <div className="absolute top-5 left-5 w-full h-full rounded-[3rem] bg-secondary/10"></div>

                        {/* Main Image Container */}
                        <div
                            className="
            relative w-full h-full overflow-hidden
            rounded-[3rem_1rem_3rem_1rem]
            bg-white
            border border-gray-200
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            transition-all duration-500
            group-hover:-translate-y-2
        "
                        >
                            <Image
                                src="/about/sctime.png"
                                alt="School Assembly"
                                fill
                                className="object-contain object-center p-6 group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Top Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

                            {/* Floating Corner Accent */}
                            <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-secondary/20 backdrop-blur-xl border border-white/30"></div>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="order-1 md:order-2 h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-5">
                                <ClockIcon className="w-6 h-6 text-secondary" />

                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Saturday
                                </h2>
                            </div>

                            <table className="w-full text-base">
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="py-2.5 w-2/3 font-medium">
                                            Assembly
                                        </td>

                                        <td className="py-2.5">
                                            8:25 AM – 8:35 AM
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Activity / Remedial Classes
                                        </td>

                                        <td className="py-2.5">
                                            8:35 AM – 12:30 PM
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Dispersal (All Grades)
                                        </td>

                                        <td className="py-2.5">12:30 PM</td>
                                    </tr>
                                </tbody>
                            </table>

                            <p className="text-sm text-gray-500 mt-3">
                                Office hours: 9:00 AM – 1:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}

/* =========================
   UNIFORM PANEL
========================= */
function UniformPanel() {
    return (
        <div className="space-y-8">
            <Reveal>
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* CONTENT */}
                    <div className="h-full flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                                Formal Attire (Mon – Thu)
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="font-semibold text-gray-800 mb-2 text-lg">
                                        Boys (Grades 1–10)
                                    </p>

                                    <ul className="list-disc list-inside text-base text-gray-700 space-y-1.5">
                                        <li>
                                            Light blue full-sleeved shirt with
                                            monogram
                                        </li>

                                        <li>Navy blue trousers</li>

                                        <li>Navy blue tie</li>

                                        <li>
                                            Black leather belt & black lace-up
                                            shoes
                                        </li>

                                        <li>
                                            White socks & School ID card
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-2 text-lg">
                                        Girls (Grades 1–10)
                                    </p>

                                    <ul className="list-disc list-inside text-base text-gray-700 space-y-1.5">
                                        <li>
                                            Light blue full-sleeved shirt with
                                            monogram
                                        </li>

                                        <li>
                                            Navy blue skirt or tunic
                                        </li>

                                        <li>Navy blue tie</li>

                                        <li>
                                            Black belt & black closed-toe shoes
                                        </li>

                                        <li>
                                            White socks, navy hairband & ID card
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="relative min-h-[340px] md:min-h-full group flex items-center justify-center">

                        {/* Decorative Background Shape */}
                        <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-secondary/15 to-secondary/5 rotate-3"></div>

                        {/* Main Image Card */}
                        <div
                            className="
            relative w-full h-full overflow-hidden
            rounded-[3rem_1rem_3rem_1rem]
            border border-white/30
            bg-white/60 backdrop-blur-xl
            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            p-4
            -rotate-2 group-hover:rotate-0
            transition-all duration-500
        "
                        >
                            <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
                                <Image
                                    src="/about/scuniform.png"
                                    alt="School Uniform"
                                    fill
                                    className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Soft Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                            </div>
                        </div>

                        {/* Floating Dot */}
                        <div className="absolute top-6 right-6 w-6 h-6 rounded-full bg-secondary shadow-lg"></div>
                    </div>
                </div>
            </Reveal>

            <Reveal delay={100}>
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* IMAGE */}
                    <div className="order-2 md:order-1 relative min-h-[340px] md:min-h-full group flex items-center justify-center">

                        {/* Decorative Background */}
                        <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-secondary/15 to-secondary/5 rotate-3"></div>

                        {/* Main Styled Card */}
                        <div
                            className="
            relative w-full h-full overflow-hidden
            rounded-[3rem_1rem_3rem_1rem]
            border border-white/30
            bg-white/60 backdrop-blur-xl
            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            p-4
            -rotate-2 group-hover:rotate-0
            transition-all duration-500
        "
                        >
                            <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
                                <Image
                                    src="/about/scuniform-1.png"
                                    alt="Sports Uniform"
                                    fill
                                    className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Soft Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                            </div>
                        </div>

                        {/* Floating Accent */}
                        <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-secondary/80 shadow-xl"></div>
                    </div>

                    {/* CONTENT */}
                    <div className="order-1 md:order-2 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                                Sports & House Uniform
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-800 mb-2 text-lg">
                                        Boys & Girls
                                    </p>

                                    <ul className="list-disc list-inside text-base text-gray-700 space-y-1.5">
                                        <li>
                                            House colour T-shirt
                                            (Red/Blue/Green/Yellow) with logo
                                        </li>

                                        <li>Navy blue track pants</li>

                                        <li>
                                            White canvas / sports shoes & crew
                                            socks
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-2 text-lg">
                                        Winter Uniform (Nov – Jan)
                                    </p>

                                    <ul className="list-disc list-inside text-base text-gray-700 space-y-1.5">
                                        <li>
                                            Navy blue V-neck sweater with school
                                            emblem
                                        </li>

                                        <li>
                                            Optional: School blazer for events
                                        </li>

                                        <li>Plain navy blue muffler</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 mt-4 border-t border-gray-100 pt-3">
                                ⚠️ Improper uniform may lead to a warning. Full
                                uniform required on all working days.
                            </p>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}

/* =========================
   STUDENTS PANEL
========================= */
function StudentsPanel() {
    const rules = [
        "Greet teachers and peers respectfully. Maintain silence in corridors and assembly.",
        "Minimum 85% attendance required. Late arrival without valid reason invites disciplinary action.",
        "Plagiarism, cheating, or unfair means in exams is strictly prohibited.",
        "Mobile phones, smartwatches, and electronic gadgets are banned on campus.",
        "Zero tolerance for bullying, ragging, or physical/verbal abuse.",
        "Maintain silence in the library. Follow lab safety protocols strictly.",
    ];

    return (
        <div className="space-y-6">
            <Reveal>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Code of Conduct</h2>
                        <ul className="space-y-2.5">
                            {rules.map((rule, idx) => (
                                <li key={idx} className="flex gap-2 text-gray-700 text-base">
                                    <span className="text-primary font-bold text-lg">•</span> {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-64 md:h-80 group">

                        {/* Layer Background */}
                        <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-secondary/15"></div>

                        {/* Main Image Shape */}
                        <div
                            className="
            relative w-full h-full overflow-hidden
            rounded-[2.5rem_0.8rem_2.5rem_0.8rem]
            shadow-2xl border border-gray-200
            -rotate-2 group-hover:rotate-0
            transition-all duration-500
        "
                        >
                            <Image
                                src="/about/rules1.png"
                                alt="Students Studying"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/10" />

                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </div>
                </div>
            </Reveal>

            <Reveal delay={100}>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="order-2 md:order-1 relative h-64 md:h-64 group">

                        {/* Layer Background */}
                        <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-secondary/15"></div>

                        {/* Main Image Shape */}
                        <div
                            className="
            relative w-full h-full overflow-hidden
            rounded-[2.5rem_0.8rem_2.5rem_0.8rem]
            shadow-2xl border border-gray-200
            -rotate-2 group-hover:rotate-0
            transition-all duration-500
        "
                        >
                            <Image
                                src="/about/rules2.png"
                                alt="School Library"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/10" />

                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="border-l-4 border-amber-400 pl-4 py-2 bg-amber-50/30 rounded-r-lg">
                            <p className="text-base text-amber-800">
                                <span className="font-semibold">Rewards:</span> Consistent discipline is recognized through house points, merit certificates, and the annual "Student of the Year" award.
                            </p>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}

/* =========================
   PARENTS PANEL – WITH IMAGES
========================= */
function ParentsPanel() {
    const guidelines = [
        {
            title: "Parent-Teacher Communication",
            points: [
                "Monthly PTM on the second Saturday (9 AM – 1 PM).",
                "School diary must be checked and signed daily.",
                "Teachers can be reached via the official parent portal between 9 AM – 4 PM.",
            ],
        },
        {
            title: "School Pick-up & Drop-off",
            points: [
                "Follow designated car lane; do not park at main gate.",
                "Authorized pick-up card must be displayed.",
                "Inform class teacher in advance if someone else is picking the child.",
            ],
        },
        {
            title: "Attendance & Leave",
            points: [
                "Prior application required for leave of absence (minimum 3 days).",
                "Medical certificate needed for absence beyond 3 days.",
                "No leave will be granted during exams or test weeks.",
            ],
        },
        {
            title: "Fee & General Discipline",
            points: [
                "Tuition fees due by the 10th of every month; late fine applicable.",
                "Ensure child brings complete stationary and homework.",
                "Encourage eco-friendly habits: no plastic items in lunch boxes.",
            ],
        },
    ];

    return (
        <div className="space-y-8">
            <Reveal>
                <div>
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-5">
                        <HeartIcon className="w-6 h-6 text-secondary" />
                        <h2 className="text-2xl font-semibold text-gray-800">Parent Partnership Guidelines</h2>
                    </div>
                    <p className="text-gray-600 text-base mb-6">
                        We believe in a collaborative approach. Parents are requested to adhere to the following:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            {guidelines.slice(0, 2).map((section, idx) => (
                                <div key={idx} className="border-l-4 border-secondary/30 pl-4">
                                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-1 text-lg">
                                        <ChevronRightIcon className="w-5 h-5 text-secondary" />
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {section.points.map((point, i) => (
                                            <li key={i} className="text-base text-gray-600 flex gap-2">
                                                <span className="text-secondary">•</span> {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="relative group w-full flex justify-center">

                            {/* Custom Shape Container */}
                            <div className="relative overflow-hidden 
        h-52 md:h-64 w-full max-w-md
        rounded-[40px_10px_40px_10px] 
        shadow-xl border border-white/10">

                                {/* Image */}
                                <Image
                                    src="/about/rules4.png"
                                    alt="Parent Teacher Meeting"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                {/* Title */}
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white text-lg font-semibold">
                                        Parent Teacher Meeting
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="relative flex justify-center order-2 md:order-1 group">
                            <div
                                className="
                relative overflow-hidden
                h-56 md:h-72 w-full
                rounded-[60px_15px_60px_15px]
                shadow-xl border border-gray-200
            "
                            >
                                <Image
                                    src="/about/rules-3.png"
                                    alt="School Transport"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Soft Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                {/* Floating Badge */}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-md">
                                    <p className="text-xs font-semibold tracking-wide text-gray-700">
                                        SCHOOL GUIDELINES
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 order-1 md:order-2">
                            {guidelines.slice(2, 4).map((section, idx) => (
                                <div key={idx} className="border-l-4 border-secondary/30 pl-4">
                                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-1 text-lg">
                                        <ChevronRightIcon className="w-5 h-5 text-secondary" />
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {section.points.map((point, i) => (
                                            <li key={i} className="text-base text-gray-600 flex gap-2">
                                                <span className="text-secondary">•</span> {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>

            <Reveal delay={150}>
                <div className="border-t border-b border-secondary/20 py-6 text-center">
                    <h3 className="font-semibold text-secondary text-xl">
                        Parent Portal Access
                    </h3>

                    <p className="text-base text-gray-600 mt-1 max-w-xl mx-auto">
                        Access attendance, fee receipts, circulars, and academic progress via the ERP system.
                    </p>

                    <button
                        disabled
                        className="mt-3 text-base text-red-600 border border-red-300 bg-red-50 px-4 py-1.5 rounded-md cursor-not-allowed opacity-80"
                    >
                        App Will Launch Soon
                    </button>
                </div>
            </Reveal>
        </div>
    );
}