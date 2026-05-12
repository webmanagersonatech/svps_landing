import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
    AcademicCapIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    GlobeAltIcon,
    TrophyIcon,
    HeartIcon,
    BriefcaseIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

/* =========================
   IMPROVED SCROLL REVEAL HOOK
========================= */
function useReveal(threshold: number = 0.2) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !visible) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            {
                threshold: threshold,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, visible]);

    return { ref, visible };
}

function Reveal({
    children,
    delay = 0,
    threshold = 0.2,
}: {
    children: React.ReactNode;
    delay?: number;
    threshold?: number;
}) {
    const { ref, visible } = useReveal(threshold);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out
                ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
        >
            {children}
        </div>
    );
}

/* =========================
   SCROLL SYNC HOOK
========================= */
function useScrollSync(totalItems: number, threshold: number = 0.6) {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingRef.current) return;

            // Clear previous timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Debounce scroll events
            scrollTimeoutRef.current = setTimeout(() => {
                let maxVisibleIndex = 0;
                let maxVisibility = 0;

                itemRefs.current.forEach((ref, idx) => {
                    if (ref) {
                        const rect = ref.getBoundingClientRect();
                        const viewportHeight = window.innerHeight;

                        // Calculate how much of the element is visible
                        const visibleTop = Math.max(0, rect.top);
                        const visibleBottom = Math.min(viewportHeight, rect.bottom);
                        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                        const visibilityRatio = visibleHeight / rect.height;

                        // Also consider the element's position relative to viewport center
                        const elementCenter = (rect.top + rect.bottom) / 2;
                        const viewportCenter = viewportHeight / 2;
                        const centerDistance = Math.abs(elementCenter - viewportCenter);
                        const centerScore = Math.max(0, 1 - (centerDistance / (viewportHeight / 2)));

                        // Combined score: visibility ratio + center proximity bonus
                        const totalScore = visibilityRatio * 0.7 + centerScore * 0.3;

                        if (totalScore > maxVisibility) {
                            maxVisibility = totalScore;
                            maxVisibleIndex = idx;
                        }
                    }
                });

                if (maxVisibility > threshold) {
                    setActiveIndex(maxVisibleIndex);
                }
            }, 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [totalItems, threshold]);

    const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
        const targetRef = itemRefs.current[index];
        if (targetRef) {
            isScrollingRef.current = true;
            targetRef.scrollIntoView({ behavior, block: 'start' });
            setActiveIndex(index);

            // Reset scrolling flag after animation completes
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 800);
        }
    }, []);

    return { activeIndex, scrollToIndex, itemRefs };
}

/* =========================
   MANAGEMENT PROFILES PAGE
========================= */

interface ManagementMember {
    name: string;
    title: string;
    role: string;
    image: string;
    description: string[];
    imageInitials: string;
    achievements?: string[];
    icon?: React.ElementType;
}

export default function ManagementProfilesPage() {
    const managementMembers: ManagementMember[] = [
        {
            name: "Sri. Karumuttu Thiagarajar",
            title: "Founder Chairman",
            role: "Textile King",
            description: [
                "who is often called as 'Textile King' was a Philanthropist, Industrialist and Educationalist founded Thiagarajar Polytechnic College, Salem in the year 1958 with the vision to offer technical education to the people of Salem.",
                "Besides being an ardent educationalist with establishing 19 Educational Institutions, Sri.Karumuttu Thiagarajar established fourteen textile mills in his lifetime. He evinced keen flair for promoting Tamil language."
            ],
            imageInitials: "KT",
            achievements: ["19 Educational Institutions", "14 Textile Mills", "Tamil Language Promoter"],
            icon: BuildingOfficeIcon,
            image: "/managementprofiles/karumuttu-thiagarajar.webp"
        },
        {
            name: "Sri. M.S.Chockalingam Chettiar",
            title: "Former Chairman",
            role: "Former Chairman of Thiagarajar Polytechnic College",
            description: [
                "with his farsighted vision took the polytechnic to the highest standards.",
                "Realizing the need for quality institution in higher education Sri. M.S.Chockalingam established Sona College of Technology in 1997 which is now proving to be the best institution in providing the first class higher education.",
                "Being a highly spiritual person, Sri.M.S.Chockalingam Chettiar served as the “Thakkar” of Sri.Rajaganapathy temple Salem during 1987-1988.",
                "It was during his tenure as Thakkar, the outer part around the temple sanctum was constructed."
            ],
            image: "/managementprofiles/chockalingam.webp",
            imageInitials: "MS",
            achievements: [
                "Former Chairman",
                "Founded Sona College of Technology (1997)",
                "Thakkar of Sri.Rajaganapathy Temple (1987-1988)"
            ],
            icon: BuildingOfficeIcon
        },
        {
            name: "Sri.C.Valliappa",
            title: "Chairman",
            role: "The Educational Evangelist of India",
            description: [
                "The Educational Evangelist of India, possesses wide portfolio from Textiles, Infrastructure and Construction, Plantation, Education and Information Technology.",
                "He was instrumental in putting on IT map when Texas Instruments decided to partner with Sona-Valliappa Group.",
                "He is the president of Industrial (Greater Mysore Chamber of Commerce and Industry) and Trade (Federation of Karnataka Chamber of Commerce and Industry), Chamber of Commerce.",
                "He is the recipient of the Engineering Watch EDUPRENEURS Award 2013.",
                "In appreciation of his commendable services, he was invited as the Guest of American Government to visit USA on futuristic development.",
                "With his far sighted vision, he leads the Sona Group of Institutions.",
                "He is the founder of Sona College of Arts and Science and it was here that the most important ideals took shape by establishing it and fulfilling the demands for quality education in Arts and Science in this region.",
                "Also, he is the founder of Sona Valliappa Public School established in 2020.",
                "The school is a boon to the people and stepping stone for the academic progress of their wards.",
                "He is the President of Association of Management’s of Aided Polytechnic Colleges, Tamilnadu."
            ],
            imageInitials: "CV",
            image: "/managementprofiles/valliappa-chairman-sona-gro.webp",
            achievements: [
                "EDUPRENEURS Award 2013",
                "Founder - Sona College of Arts and Science",
                "Founder - Sona Valliappa Public School (2020)",
                "President - Association of Management’s of Aided Polytechnic Colleges, Tamilnadu"
            ],
            icon: BuildingOfficeIcon
        },
        {
            name: "Smt.Seetha Valliappa",
            title: "Correspondent",
            image: "/managementprofiles/seetha-valliappa.webp",
            role: "Madam Chairman",
            description: [
                "The kind hearted Madam Chairman, is the lady behind the success of Sona Group of Institutions.",
                "She is an epitome of success who strives for women empowerment and has set herself as a role model in taking the Sona Group of Institutions to lofty heights.",
                "Mrs. Seetha Valliappa emphasizes the importance of carving the young minds right from the childhood, and now she continues her services as correspondent at Sona Valliappa Public School."
            ],
            imageInitials: "SV",
            achievements: [
                "Women Empowerment Advocate",
                "Correspondent - Sona Valliappa Public School",
                "Leadership - Sona Group of Institutions"
            ],
            icon: BuildingOfficeIcon
        },

        {
            name: "Sri. Chocko Valliappa",
            title: "Vice-Chairman",
            image: "/managementprofiles/chocko-valliappa.webp",
            role: "Multifaceted Industrialist",
            description: [
                "has made a triumphant venture into the highly competitive IT industry and has accumulated a vast experience in developing and exploring innovative technologies.",
                "He is a passionate and a Multifaceted Industrialist who co-founded the incubation company Valliappa Software Techpark.",
                "He is the founder of Vee Technologies which has become a gold standard Global services company focusing on Revenue cycle Management, Healthcare, & Engineering services and it features in information Week List-100 Top Global Outsourcing companies.",
                "He is one of the founders of the Young Entrepreneurs Organization (EO) Bangalore Chapter and acted as President and Area-Director for India and Nepal Region.",
                "He is a member of the YPO (Young Presidents Organization) Global 1.",
                "He cares for the society through Sona Foundation's Community Centres and \"Sona-Yukti\".",
                "His dynamism directs the group of institutions to reach the pinnacle of glorious success."
            ],
            imageInitials: "CV",
            achievements: [
                "Founder - Vee Technologies",
                "Co-founder - Valliappa Software Techpark",
                "EO Bangalore Chapter Founder & President",
                "Member - YPO Global 1"
            ],
            icon: BuildingOfficeIcon
        },

        {
            name: "Sri.Thyagu Valliappa",
            title: "Vice-Chairman",
            image: "/managementprofiles/thyagu-valliappa.webp",
            role: "Textile and Garments Sector Leader",
            description: [
                "Heads Textile and Garments sector and is very keen in elevating Sona Group to very lofty standards on par with globally renowned colleges.",
                "He is the active member of SIMA and represents it at the Confederation of Indian Textile Industry.",
                "Also, he is the founder of SIMA Committee of Young Directors (COID).",
                "His experience in Plantation and Textile has been the longest and today both these divisions from Sona Valliappa Group are major Exporters of Coffee and Textile.",
                "He is the founder and CEO of Storage and Movement (SAM) division of Valliappa Software Tech Park (VSTP), which offers a total solution in the areas of logistics and warehousing.",
                "He is also the CEO of Sona Sports & Entertainment.",
                "His constant encouragement, support and guidance help in adopting many innovative practices in all the institutions of Sona group and elevates to the International standards."
            ],
            imageInitials: "TV",
            achievements: [
                "Founder - SIMA Committee of Young Directors (COID)",
                "CEO - Storage and Movement (SAM), VSTP",
                "CEO - Sona Sports & Entertainment",
                "Exporter - Coffee and Textile"
            ],
            icon: BuildingOfficeIcon
        }
    ];

    const { activeIndex, scrollToIndex, itemRefs } = useScrollSync(managementMembers.length, 0.5);

    // Navigation button handlers
    const goToPrevious = useCallback(() => {
        if (activeIndex > 0) {
            scrollToIndex(activeIndex - 1);
        }
    }, [activeIndex, scrollToIndex]);

    const goToNext = useCallback(() => {
        if (activeIndex < managementMembers.length - 1) {
            scrollToIndex(activeIndex + 1);
        }
    }, [activeIndex, managementMembers.length, scrollToIndex]);

    return (
        <>
            <Head>
                <title>Management Profiles | Sona Valliappa Public School</title>
                <meta name="description" content="Meet the visionary leaders behind Sona Group of Institutions - Founding fathers and current management shaping educational excellence" />
            </Head>

            <main className="bg-gradient-to-b from-background/60 via-white to-background/50 to-gray-50">
                {/* HERO SECTION */}
                <PageHeader
                    title='"Leadership with Vision, Service with Heart"'
                    subtitle="- Guiding the Future of Education"
                    breadcrumbs={["Home", "About", "Management Profiles"]}
                />

                {/* INTRODUCTION SECTION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">

                    {/* SCROLL INDICATOR (Desktop Only) */}
                    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden xl:block">
                        <div className="flex flex-col gap-3">
                            {managementMembers.map((member, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToIndex(idx, 'smooth')}
                                    className="group flex items-center gap-3"
                                >
                                    <div className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx
                                        ? 'w-6 bg-amber-600'
                                        : 'w-2 bg-gray-300 group-hover:bg-amber-400 group-hover:w-3'
                                        }`} />
                                    <span className={`text-xs transition ${activeIndex === idx
                                        ? 'text-amber-600'
                                        : 'text-gray-400 group-hover:text-gray-600'
                                        }`}>
                                        {member.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CARDS */}
                    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                        {managementMembers.map((member, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    itemRefs.current[index] = el;
                                }}
                                className={`transition-all duration-500 ${activeIndex === index
                                    ? "scale-[1.02] shadow-xl"
                                    : "opacity-95 hover:opacity-100"
                                    }`}
                            >
                                <Reveal delay={Math.min(index * 150, 400)} threshold={0.1}>

                                    <div className="bg-white border border-gray-100  shadow-sm sm:shadow-md hover:shadow-xl transition p-4 sm:p-6 lg:p-8">

                                        {/* TOP SECTION */}
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

                                            {/* AVATAR */}
                                            <div className="flex-shrink-0 flex justify-center sm:justify-start">
                                                <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-gray-800 shadow-lg ${activeIndex === index ? "ring-4 ring-amber-400/40" : ""
                                                    }`}>
                                                    {member.image ? (
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-white text-xs text-center px-2">
                                                            {member.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* HEADER + TEXT */}
                                            <div className="flex-1 text-center sm:text-left">

                                                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-gray-900">
                                                    {member.name}
                                                </h3>

                                                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-1">
                                                    <span className="text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                                                        {member.role}
                                                    </span>

                                                    {member.title && (
                                                        <>
                                                            <span className="text-gray-300">•</span>
                                                            <span className="text-gray-500 text-xs sm:text-sm">
                                                                {member.title}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* DESCRIPTION */}
                                                <div className="mt-3 space-y-2 text-gray-600 text-xs sm:text-sm leading-relaxed">
                                                    {member.description.map((para, i) => (
                                                        <p key={i}>{para}</p>
                                                    ))}
                                                </div>

                                                {/* ACHIEVEMENTS */}
                                                {member.achievements?.length > 0 && (
                                                    <div className="mt-4 pt-3 border-t border-gray-100">

                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                </Reveal>
                            </div>
                        ))}
                    </div>

                    {/* NAV BUTTONS */}
                    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-3 z-30">
                        <button
                            onClick={goToPrevious}
                            disabled={activeIndex === 0}
                            className={`p-2.5 sm:p-3 rounded-full shadow-md ${activeIndex === 0
                                ? 'bg-gray-200 text-gray-400'
                                : 'bg-white hover:bg-amber-600 hover:text-white'
                                }`}
                        >
                            ←
                        </button>

                        <button
                            onClick={goToNext}
                            disabled={activeIndex === managementMembers.length - 1}
                            className={`p-2.5 sm:p-3 rounded-full shadow-md ${activeIndex === managementMembers.length - 1
                                ? 'bg-gray-200 text-gray-400'
                                : 'bg-white hover:bg-amber-600 hover:text-white'
                                }`}
                        >
                            →
                        </button>
                    </div>



                </div>
            </main>
        </>
    );
}

export { ManagementProfilesPage };