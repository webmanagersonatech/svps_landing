import { useEffect, useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import { PageHeader } from './PageHeader';
import { Reveal } from './Reveal';
import {
    AcademicCapIcon,
    BookOpenIcon,
    BeakerIcon,
    GlobeAltIcon,
    ChatBubbleLeftRightIcon,
    SparklesIcon,
    UsersIcon,
    TrophyIcon,
    LightBulbIcon,
    PuzzlePieceIcon,
    MusicalNoteIcon,
    ComputerDesktopIcon,
    CalendarIcon,
    RocketLaunchIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";
export default function TestApiPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    'https://sonacas.edu.in/sonacasapi/Sonacasevents/getWithRelations?dept=Department%20of%20Computer%20Applications&page=1&path=/department/computer-application/events'
                );
                const data = await response.json();
                setEvents(data.result || []);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <Head>
                <title>Curriculum | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="Explore our comprehensive curriculum at Sona Valliappa Public School - blending academic excellence with innovation, life skills, and global perspectives."
                />
            </Head>

            <main className="bg-gradient-to-b from-background/60 via-white to-background/50">
                {/* HERO SECTION */}
                <PageHeader
                    title="Our Curriculum"
                    subtitle='"Empowering minds with knowledge, skills, and values for a changing world."'
                    breadcrumbs={["Home", "Academics", "Curriculum"]}
                />

                {/* CURRICULUM PHILOSOPHY SECTION */}
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="grid md:grid-cols-2 gap-16 items-center">

                        {/* LEFT CONTENT */}
                        <div className="space-y-6">
                            <Reveal delay={100}>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-snug">
                                    Learning Beyond Classrooms
                                </h2>
                            </Reveal>

                            <Reveal delay={150}>
                                <p className="text-gray-600 leading-relaxed">
                                    We follow the CBSE curriculum, which promotes conceptual understanding 
                                    along with effective learning and retention. Students gain knowledge and 
                                    develop skills that help them become valuable contributors in today's world.
                                </p>
                            </Reveal>

                            <Reveal delay={175}>
                                <p className="text-gray-600 leading-relaxed">
                                    Learning begins with strong fundamentals both inside and outside the classroom, 
                                    enabling students to face challenges confidently and meet future requirements.
                                </p>
                            </Reveal>

                            {/* EVENTS SECTION - DISPLAYING TITLES ONLY */}
                            <Reveal delay={200}>
                                <div className="pt-4">
                                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                                        <CalendarIcon className="w-6 h-6 text-primary" />
                                        Upcoming Events
                                    </h3>
                                    
                                    {loading ? (
                                        <div className="text-gray-500">Loading events...</div>
                                    ) : events.length > 0 ? (
                                        <ul className="space-y-3">
                                            {events.map((event:any) => (
                                                <li 
                                                    key={event.event_id}
                                                    className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-sm hover:shadow-md transition group"
                                                >
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition"></div>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition">
                                                            {event.event_name}
                                                        </span>
                                                        {event.event_date && (
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                {new Date(event.event_date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-gray-500">No events available</div>
                                    )}
                                </div>
                            </Reveal>

                            <Reveal delay={225}>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    {[
                                        { icon: AcademicCapIcon, label: "Academic Strength" },
                                        { icon: LightBulbIcon, label: "Critical Thinking" },
                                        { icon: GlobeAltIcon, label: "Global Awareness" },
                                        { icon: HeartIcon, label: "Values & Ethics" },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-sm hover:shadow-md transition"
                                        >
                                            <item.icon className="w-6 h-6 text-primary" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* RIGHT VISUAL DESIGN */}
                        <Reveal delay={100}>
                            <div className="relative flex items-center justify-center">
                                {/* MAIN BLOB IMAGE */}
                                <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px]">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[60%_40%_50%_70%/60%_60%_40%_40%] blur-2xl"></div>
                                    <div className="relative w-full h-full overflow-hidden rounded-[60%_40%_50%_70%/60%_60%_40%_40%] border border-white/30 shadow-2xl">
                                        <img
                                            src="https://img.magnific.com/premium-photo/indian-school-kid-science-student-using-molecular-model-kit-studying-physics-selective-focus_466689-50220.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                                            alt="Curriculum"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* FLOATING ICONS */}
                                <div className="absolute -top-6 left-10 bg-white p-3 rounded-xl shadow-lg animate-float">
                                    <BookOpenIcon className="w-6 h-6 text-primary" />
                                </div>
                                <div className="absolute bottom-0 -left-4 bg-white p-3 rounded-xl shadow-lg animate-float delay-200">
                                    <BeakerIcon className="w-6 h-6 text-secondary" />
                                </div>
                                <div className="absolute top-10 -right-6 bg-white p-3 rounded-xl shadow-lg animate-float delay-300">
                                    <SparklesIcon className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </Reveal>

                    </div>
                </div>
            </main>
        </>
    );
}