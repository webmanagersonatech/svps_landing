import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    BookOpenIcon,
    AcademicCapIcon,
    HeartIcon,
    LightBulbIcon,
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
      ${visible ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-12 scale-[0.98] blur-sm"}`}
        >
            {children}
        </div>
    );
}

const books = [
    {
        title: "Verum Vizhuthugalum",
        subtitle: "The Inspiring Biography of Mr. C. Valliappa (Tamil)",
        desc: "A deeply personal biography capturing the journey, values, and legacy of Mr. C. Valliappa.",
        icon: HeartIcon,
        image: "/about/chairmanbooks/verum-vizhuthugalum.webp",
        link: "https://www.sonatech.ac.in/about-sona/read/?book=verum-vizhudhugalum",
    },
    {
        title: "The Sona Story",
        subtitle: "The Textile to Tech Journey of Chettiar Industrialist C. Valliappa",
        desc: "An inspiring transformation story of the Sona Group from textile roots to a tech-driven educational empire.",
        icon: LightBulbIcon,
        image: "/about/chairmanbooks/the-sona-story.webp",
        link: "https://www.sonatech.ac.in/about-sona/read/?book=the-sona-story",
    },
];

export default function ChairmanBooksPage() {
    return (
        <>
            <Head>
                <title>Chairman\'s Books | Sona Valliappa Public School</title>
                <meta name="description" content="Explore books authored by our Chairman." />
            </Head>

            <main className="bg-gradient-to-b from-background/60 via-white to-background/50">
                <PageHeader
                    title="Chairman\'s Books"
                    subtitle="Wisdom, Vision, and Legacy – penned by our founder"
                    breadcrumbs={["Home", "About", "Chairman\'s Books"]}
                />


                {/* BOOKS SECTION */}
                <div className="max-w-7xl mx-auto px-4 py-16">


                    <div className="space-y-24">
                        {books.map((book, i) => {
                            const Icon = book.icon;
                            const isEven = i % 2 === 0;

                            return (
                                <Reveal key={i} delay={i * 120}>
                                    <div
                                        className={`grid md:grid-cols-2 gap-10 items-center`}
                                    >
                                        {/* IMAGE SIDE */}
                                        <div className={`${isEven ? "md:order-1" : "md:order-2"}`}>
                                            <div className="relative group">
                                                {/* Card container with new shape and structure */}
                                                <div className="relative bg-white/5 backdrop-blur-sm rounded-[2rem] rounded-br-[4rem] rounded-tl-[4rem] shadow-2xl overflow-hidden border border-white/20 transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2">

                                                    {/* Image with diagonal clip shape effect */}
                                                    <div className="relative overflow-hidden">
                                                        <img
                                                            src={book.image}
                                                            alt={book.title}
                                                            className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1"
                                                        />

                                                        {/* Modern gradient overlay - diagonal style */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />

                                                        {/* Bottom info bar - new structural element */}
                                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                            <h3 className="text-white font-bold text-xl   mb-1">{book.title}</h3>
                                                            <p className="text-white/70 text-sm">Click to explore</p>
                                                        </div>

                                                        {/* Floating icon - repositioned to bottom right with new shape */}
                                                        <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-md p-3 rounded-2xl rounded-bl-3xl shadow-lg border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                                                            <Icon className="w-6 h-6 text-white" />
                                                        </div>

                                                        {/* Corner accent - decorative shape element */}
                                                        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/40 to-transparent rounded-br-3xl" />
                                                    </div>
                                                </div>

                                                {/* New structural element: floating badge below the card */}
                                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-bottom-4">
                                                    <span className="text-sm font-semibold text-gray-800"> New Arrival</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CONTENT SIDE */}
                                        <div className={`${isEven ? "md:order-2" : "md:order-1"}`}>
                                            <span className="text-primary font-semibold tracking-wide text-sm uppercase">
                                                Chairman Author Series
                                            </span>

                                            <h3 className="text-3xl font-bold font-serif text-secondary mt-2">
                                                {book.title}
                                            </h3>

                                            <p className="text-primary font-medium mt-2">
                                                {book.subtitle}
                                            </p>

                                            <div className="w-20 h-1 bg-primary/40 rounded-full my-5" />

                                            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                                                {book.desc}
                                            </p>

                                            <div className="mt-8 flex items-center gap-6">
                                                <a
                                                    href={book.link}
                                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                                >
                                                    Open Book →
                                                </a>

                                                <span className="text-sm text-gray-500">
                                                    Written Legacy Edition
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center rounded-2xl shadow-lg">
                        <Reveal>
                            <AcademicCapIcon className="w-14 h-14 mx-auto text-primary mb-5" />
                        </Reveal>

                        <Reveal delay={150}>
                            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                                Bring Home a Piece of Wisdom
                            </h3>
                        </Reveal>

                        <Reveal delay={250}>
                            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                                Books are available at the school resource center and online stores.
                            </p>
                        </Reveal>

                        <Reveal delay={350}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-primary text-white px-8 py-2.5 rounded-full hover:bg-primary/90 transition">
                                    <BookOpenIcon className="w-5 h-5 inline mr-2" />
                                    Check Availability
                                </button>
                                <button className="border-2 border-primary text-primary px-8 py-2.5 rounded-full hover:bg-primary/5 transition">
                                    Browse Online Store
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </main>
        </>
    );
}
