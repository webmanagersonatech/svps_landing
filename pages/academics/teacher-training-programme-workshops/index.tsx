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
    CalendarIcon,
    ComputerDesktopIcon,
    ShieldCheckIcon,
    ClipboardDocumentListIcon,
    MegaphoneIcon,
    PresentationChartLineIcon,
    ScaleIcon,
    StarIcon,
    CpuChipIcon,
    FaceSmileIcon,
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

// Simple image component for uniform styling
const RoundedImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <div className={`overflow-hidden rounded-2xl shadow-lg ${className || ""}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover transition duration-500 hover:scale-105" />
    </div>
);

/* =========================
   TEACHER TRAINING PAGE
========================= */
export default function TeacherTrainingPage() {
    // Workshop categories with images
    const workshopCategories = [
        {
            icon: AcademicCapIcon,
            title: "Pedagogy & Subject Mastery",
            description: "Modern teaching strategies, lesson planning, and deep content knowledge.",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
        },
        {
            icon: ComputerDesktopIcon,
            title: "EdTech & Digital Tools",
            description: "Smartboards, LMS, AI tools, coding platforms – making classrooms future‑ready.",
            image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop",
        },
        {
            icon: HeartIcon,
            title: "Social‑Emotional Learning (SEL)",
            description: "Managing student behaviour, building empathy, and teacher self‑care.",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
        },
        {
            icon: ShieldCheckIcon,
            title: "Inclusive Education",
            description: "Differentiated instruction, learning disabilities awareness, and IEPs.",
            image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
        },
        {
            icon: ClipboardDocumentListIcon,
            title: "Assessment & Feedback",
            description: "Competency‑based assessment, rubrics, and constructive feedback loops.",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
        },
        {
            icon: MegaphoneIcon,
            title: "Leadership & Communication",
            description: "Parent‑teacher communication, team building, and leadership skills.",
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop",
        },
    ];

    // Impact statistics (unchanged, but now with supporting icons)
    const impactStats = [
        { value: "150+", label: "Teacher Hours Trained", sub: "Per academic year", icon: CalendarIcon },
        { value: "98%", label: "Teacher Satisfaction", sub: "PD programme survey", icon: FaceSmileIcon },
        { value: "12+", label: "External Experts", sub: "Annual guest faculty", icon: UserGroupIcon },
        { value: "100%", label: "CBSE Mandates Met", sub: "With excellence", icon: ShieldCheckIcon },
    ];

    // Testimonials from teachers with photos
    const testimonials = [
        {
            quote: "The SEL workshop transformed how I handle student anxiety in my class. I feel more equipped and less stressed myself.",
            name: "Priya K., Middle School English",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
        },
        {
            quote: "Learning to use AI tools has cut my lesson planning time in half – and made my lessons far more engaging.",
            name: "Ramesh S., High School Science",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        },
        {
            quote: "The Inclusive Education workshop gave me practical strategies to help my special needs students succeed.",
            name: "Meera N., Primary School",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
        },
    ];

    return (
        <>
            <Head>
                <title>Workshops for Teacher Training and Transformation
                    | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="Empowering our educators with continuous professional development – workshops, certifications, and collaborative learning."
                />
            </Head>

            <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/40 overflow-x-hidden">
                {/* HERO SECTION */}
                <PageHeader
                    title="Workshops for Teacher Training and Transformation
"
                    subtitle='"Great teachers never stop learning – we invest in ours so they can invest in every child."'
                    breadcrumbs={["Home", "Academics", "Teacher Training"]}
                />

                {/* PHILOSOPHY SECTION with image */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                    <div className="absolute top-20 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-20 -right-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-secondary leading-tight">
                                    Teachers as <span className="text-primary">Lifelong Learners</span>
                                </h2>

                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Great teachers are lifelong learners. At SVPS, we empower our teachers
                                    so they can inspire and nurture every student.
                                </p>

                                <p className="text-gray-700 leading-relaxed text-lg font-semibold text-secondary">
                                    Teachers as Lifelong Learners
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    We conduct Teacher Facilitation Programmes to develop highly skilled
                                    educators. Continuous professional development forms the foundation
                                    of student success.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Our comprehensive training programmes equip teachers with subject
                                    expertise, psychological understanding, technological knowledge,
                                    and modern teaching skills.
                                </p>

                                <div className="bg-white  shadow-sm border border-gray-100 p-6">
                                    <p className="text-gray-700 leading-relaxed text-lg font-semibold text-secondary mb-3">
                                        SVPS Teaching Methodologies
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-2">
                                        {[
                                            "Teaching Students with Psychological Approach",
                                            "Application oriented with demonstration Method",


                                            "Chalk and talk Method",
                                            "Student Centric Method",
                                            "Best Teaching Practices",
                                            "Innovative Method",
                                            "Motivating Students to get interest in the Subjects that explained with Inductive Approach and Deductive Approach",
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-700 text-lg">
                                                <span className="text-primary mt-1">✦</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={100}>
                            <div className="relative max-w-lg mx-auto group">
                                {/* Background Accent Card */}
                                <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-[#18596d]/40"></div>

                                {/* Main Image Card */}
                                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                                    <RoundedImage
                                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                                        alt="Teachers in a workshop"
                                        className="w-full h-80 md:h-96 lg:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Soft overlay */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>
                                </div>

                                {/* Floating Info Card */}
                                <div className="absolute -bottom-6 left-6 right-6 bg-white shadow-md px-4 py-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            Teacher Workshop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Training & Transformation
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


    {/* --- ADDED: TEACHER TRAINING PROGRAMMES & WORKSHOPS --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <AcademicCapIcon className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-gray-700 text-lg font-semibold text-secondary">
                                    Teacher Training Programmes & Workshops
                                </p>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-primary mt-1">•</span>
                                    <span>At SVPS, we conduct Teacher Training Programmes by Skillful Experts.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-primary mt-1">•</span>
                                    <span>It enables every Teacher Educator to be well-versed in the Subject Knowledge and Psychological Approach.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Workshops for Teachers are conducted regularly. Workshops teach and train the teachers with new methods and information to make Teaching-Learning Process, interesting and interactive.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-primary mt-1">•</span>
                                    <span>The new syllabus and curriculum is made familiar and easy to comprehend.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Teachers are encouraged to participate in various Inter-School and Intra-School Workshops and improve their Skills.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 border border-primary/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <LightBulbIcon className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-gray-700 text-lg font-semibold text-secondary">
                                    Employing Various Teaching Methodologies
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-700 leading-relaxed">
                                    Regular teacher workshops, including inter-school and intra-school
                                    programmes with certification, are conducted, and participation is
                                    encouraged for all teachers.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    These workshops promote a positive learning culture, collaborative
                                    teaching, and innovative educational practices.
                                </p>
                                <div className="bg-white/80 rounded-lg p-4 border-l-4 border-primary">
                                    <p className="text-gray-700 leading-relaxed italic">
                                        "The result is dynamic, inclusive, and future-ready classrooms."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WORKSHOP CATEGORIES */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Reveal>
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-3">
                                <SparklesIcon className="w-4 h-4" />
                                Our Workshops
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
                                Professional Development <span className="text-primary">Programmes</span>
                            </h2>
                            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                                Comprehensive training modules designed to empower our educators
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workshopCategories.map((category, idx) => (
                            <Reveal key={idx} delay={idx * 100}>
                                <div className="group bg-white shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <category.icon className="w-6 h-6 text-primary group-hover:text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-secondary mb-2">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* TEACHER TESTIMONIALS with photos */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Reveal>
                        <div className="text-center mb-12">
                            <HeartIcon className="w-10 h-10 text-primary mx-auto mb-2" />
                            <h2 className="text-3xl font-serif font-bold text-secondary">What Our Teachers Say</h2>
                            <p className="text-gray-600">Real experiences from our learning community</p>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-6 mt-10">
                        {testimonials.map((t, idx) => (
                            <Reveal key={idx} delay={idx * 150}>

                                <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 pt-12 p-6">

                                    {/* Floating Avatar */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-50">
                                            <img
                                                src={t.image}
                                                alt={t.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <p className="text-gray-700 leading-relaxed text-center mt-2">
                                        "{t.quote}"
                                    </p>

                                    {/* Name */}
                                    <div className="mt-5 text-center">
                                        <p className="font-medium text-gray-900">
                                            — {t.name}
                                        </p>
                                    </div>

                                </div>

                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* CALL TO ACTION with background image */}
                <div className="relative py-20  overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop" alt="Teachers collaborating" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                        <Reveal>
                            <MegaphoneIcon className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-3xl font-serif font-bold mb-4">Inviting External Educators</h3>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                Many of our workshops are open to teachers from other schools. Join our professional learning
                                community – together we raise the bar for education.
                            </p>
                            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                                Register for Next Workshop
                            </button>
                        </Reveal>
                    </div>
                </div>
            </main>
        </>
    );
}