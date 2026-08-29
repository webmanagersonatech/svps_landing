import SEO from "../../../components/SEO";
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
            <SEO
                title="Rules & Regulations"
                description="School timings, uniform guidelines, code of conduct for students, and guidelines for parents at Sona Valliappa Public School, Salem."
                path="/about-us/rules-and-regulations"
            />

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
                <div className="py-10 text-center text-sm text-gray-500">
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
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-3">
                                <CalendarDaysIcon className="w-6 h-6 text-primary" />
                                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                                    School Timings
                                </h2>
                            </div>

                            <p className="text-gray-600 text-base italic mb-5">
                                "Time spent learning is time invested in your future."
                            </p>

                            <p className="text-gray-600 text-base mb-5">
                                Our school follows a well-structured schedule that provides
                                students with ample time to learn, participate, interact, and
                                enjoy their school day. We believe that beginning the day on
                                time helps students settle in comfortably and be ready to make
                                the most of their learning experience.
                            </p>

                            <table className="w-full text-base">
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="py-2.5 w-2/3 text-gray-700 font-medium">
                                            Monday to Friday
                                        </td>
                                        <td className="py-2.5 text-gray-600">
                                            8:45 AM – 3:30 PM
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Extra Curricular Activities / Coaching
                                        </td>
                                        <td className="py-2.5">3:45 PM – 5:00 PM</td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">Saturday</td>
                                        <td className="py-2.5">8:45 AM – 3:30 PM</td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Working Saturdays
                                        </td>
                                        <td className="py-2.5">
                                            Second & Fourth Saturdays of every month
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <ul className="mt-5 space-y-2 text-base text-gray-600">
                                <li className="flex gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    Students are encouraged to reach school a little before the
                                    scheduled start time so that they have enough time to settle
                                    down and be ready for the day.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    Parents are kindly requested to ensure that students arrive
                                    on time and are picked up promptly at the end of the school
                                    day. Let's make every school day count!
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative min-h-[420px] md:min-h-full rounded-2xl overflow-hidden">
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

                                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                                    Office Timings
                                </h2>
                            </div>

                            <table className="w-full text-base">
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="py-2.5 w-2/3 font-medium">
                                            Monday to Friday
                                        </td>

                                        <td className="py-2.5">
                                            8:45 AM – 5:00 PM
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Saturday
                                        </td>

                                        <td className="py-2.5">
                                            8:45 AM – 5:00 PM
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-2.5 font-medium">
                                            Office Working Saturdays
                                        </td>

                                        <td className="py-2.5">
                                            Second & Fourth Saturdays of every month
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                                School Uniform
                            </h2>

                            <p className="text-gray-600 text-base italic mb-5">
                                "Wearing your uniform with pride reflects the spirit of our
                                school."
                            </p>

                            <p className="text-gray-600 text-base mb-6">
                                Students are expected to wear the prescribed uniform neatly and
                                maintain a well-groomed appearance throughout the school day.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <p className="font-semibold text-gray-800 mb-2 text-lg">
                                        Monday to Friday
                                    </p>

                                    <ul className="list-disc list-inside text-base text-gray-700 space-y-1.5">
                                        <li>Five colour T-shirt with Navy blue track pants</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-2 text-lg">
                                        Saturday
                                    </p>

                                    <ul className="list-disc list-inside text-base text-gray-700 space-y-1.5">
                                        <li>Yellow T-shirt with Navy blue track pants</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-2 text-lg">
                                        Shoes
                                    </p>

                                    <ul className="list-disc list-inside text-base text-gray-700 space-y-1.5">
                                        <li>Black shoes & White shoes with Navy blue socks</li>
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
        </div>
    );
}

/* =========================
   STUDENTS PANEL
========================= */
function StudentsPanel() {
    const rules = [
        "Students should be regular and punctual to school.",
        "Students must come in the prescribed uniform, well-groomed, and carry their ID card and required materials.",
        "Students are expected to respect teachers, staff, and fellow students and use polite language at all times.",
        "Students should maintain discipline and good behaviour in the classroom and throughout the school campus.",
        "Students must take care of school property and help keep the school premises clean.",
        "Mobile phones and other prohibited electronic devices are not permitted on the school premises.",
        "Students must follow the instructions and guidelines given by teachers and school authorities.",
        "Students are encouraged to be honest, responsible, helpful, and kind.",
    ];

    return (
        <div className="space-y-6">
            <Reveal>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">General Rules for Students</h2>
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
        </div>
    );
}

/* =========================
   PARENTS PANEL
========================= */
function ParentsPanel() {
    const rules = [
        "Ensure your child attends school regularly and arrives on time.",
        "Make sure your child comes to school in the proper uniform, well-groomed, and with the required materials.",
        "Follow the designated school drop-off and pick-up timings.",
        "Inform the school promptly in case of absence or any important concern.",
        "Maintain regular communication with teachers and attend parent-teacher meetings as scheduled.",
        "Encourage your child to follow school rules and practise respectful and responsible behaviour.",
        "Avoid sending unnecessary items or valuables with your child.",
        "Please address any concerns or grievances through the appropriate school authorities.",
    ];

    return (
        <div className="space-y-8">
            <Reveal>
                <div>
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-5">
                        <HeartIcon className="w-6 h-6 text-secondary" />
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">General Rules for Parents</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <ul className="space-y-2.5">
                            {rules.map((rule, idx) => (
                                <li key={idx} className="flex gap-2 text-gray-700 text-base">
                                    <span className="text-secondary font-bold text-lg">•</span> {rule}
                                </li>
                            ))}
                        </ul>

                        <div className="relative group w-full flex justify-center">

                            {/* Custom Shape Container */}
                            <div className="relative overflow-hidden 
        h-64 md:h-80 w-full max-w-md
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