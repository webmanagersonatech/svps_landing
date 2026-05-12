// pages/news-events/[slug].tsx
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";
import { newsAndEvents, NewsOrEvent, EventDay } from "../../data/newsandevents";
import { Reveal } from "../../components/Reveal";
import {
    CalendarIcon,
    ArrowLeftIcon,
    PhotoIcon,
    VideoCameraIcon,
    DocumentIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaWhatsapp,
    FaShareAlt,
} from "react-icons/fa";

// Helper: Format date range
function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// Helper: Convert YouTube watch URL to embed URL
function getYouTubeEmbedUrl(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
}

// Simple image lightbox
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <img src={src} alt="Full size" className="max-w-full max-h-full object-contain" />
            <button
                className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition"
                onClick={onClose}
            >
                ×
            </button>
        </div>
    );
}

// Component to render a grid of images with lightbox
function ImageGrid({ images }: { images: string[] }) {
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    if (!images.length) return null;

    return (
        <div className="my-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PhotoIcon className="w-5 h-5" /> Gallery
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
                        onClick={() => setLightboxSrc(img)}
                    >
                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
        </div>
    );
}

// Component for video links
function VideoList({ links }: { links?: string[] }) {
    if (!links || links.length === 0) return null;

    const validEmbeds = links.map(getYouTubeEmbedUrl).filter(Boolean) as string[];

    if (validEmbeds.length === 0) return null;

    return (
        <div className="my-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <VideoCameraIcon className="w-5 h-5" /> Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {validEmbeds.map((embed, idx) => (
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                        <iframe
                            src={embed}
                            title={`Video ${idx + 1}`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Component for press release downloads
function PressReleaseList({ files }: { files?: string[] }) {
    if (!files || files.length === 0) return null;

    return (
        <div className="my-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <DocumentIcon className="w-5 h-5" /> Press Releases
            </h3>
            <ul className="space-y-2">
                {files.map((file, idx) => {
                    const fileName = file.split("/").pop() || `Press Release ${idx + 1}`;
                    return (
                        <li key={idx}>
                            <a
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-2"
                            >
                                <DocumentIcon className="w-4 h-4" />
                                {fileName}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

// Component for multi-day event schedule
function EventDays({ days }: { days?: EventDay[] }) {
    const [openDay, setOpenDay] = useState<number | null>(null);

    if (!days || days.length === 0) return null;

    const toggleDay = (dayNum: number) => {
        setOpenDay(openDay === dayNum ? null : dayNum);
    };

    return (
        <div className="my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Event Schedule</h3>
            <div className="space-y-4">
                {days.map((day) => (
                    <div key={day.dayNumber} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleDay(day.dayNumber)}
                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition text-left"
                        >
                            <div>
                                <span className="font-semibold text-gray-900">Day {day.dayNumber}</span>
                                {day.title && <span className="ml-2 text-gray-600">– {day.title}</span>}
                            </div>
                            {openDay === day.dayNumber ? (
                                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                        {openDay === day.dayNumber && (
                            <div className="p-4 border-t border-gray-200">
                                <p className="text-gray-700 mb-3">{day.description}</p>
                                {day.images && day.images.length > 0 && (
                                    <div className="mt-3">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Day {day.dayNumber} Gallery</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {day.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`Day ${day.dayNumber} - ${idx + 1}`}
                                                    className="rounded-md object-cover w-full h-24 cursor-pointer hover:opacity-80 transition"
                                                    onClick={() => window.open(img, "_blank")}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------- STICKY SOCIAL SHARE SIDEBAR (Desktop only) ----------


function StickyShareSidebar({
    url,
    title,
}: {
    url: string;
    title: string;
}) {
    const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(
        `${title} - ${url}`
    )}`;

    const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
    )}`;

    const shareLinkedIn = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
    )}&title=${encodeURIComponent(title)}`;

    const socialLinks = [
        {
            href: shareFacebook,
            label: "Facebook",
            icon: <FaFacebookF />,
            bg: "hover:bg-[#1877F2]",
            text: "text-[#1877F2]",
        },
        {
            href: shareLinkedIn,
            label: "LinkedIn",
            icon: <FaLinkedinIn />,
            bg: "hover:bg-[#0A66C2]",
            text: "text-[#0A66C2]",
        },
        {
            href: shareWhatsApp,
            label: "WhatsApp",
            icon: <FaWhatsapp />,
            bg: "hover:bg-[#25D366]",
            text: "text-[#25D366]",
        },
    ];

    return (
        <div className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-50">
            <div className="relative flex flex-col items-center gap-4">

                {/* Vertical Line */}
                <div className="absolute top-12 bottom-12 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />

                {/* Main Share Button */}
                <div className="relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-4 border-white">
                        <FaShareAlt className="text-sm md:text-base" />
                    </div>
                </div>

                {/* Social Buttons */}
                <div className="flex flex-col gap-3">
                    {socialLinks.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                            className={`
                                group relative
                                w-11 h-11 md:w-12 md:h-12
                                rounded-full
                                bg-white
                                border border-gray-200
                                flex items-center justify-center
                                shadow-lg
                                transition-all duration-300
                                hover:scale-110
                                hover:-translate-y-1
                                ${item.bg}
                            `}
                        >
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-md transition duration-300" />

                            {/* Icon */}
                            <span
                                className={`
                                    relative z-10
                                    text-base md:text-lg
                                    transition-colors duration-300
                                    ${item.text}
                                    group-hover:text-white
                                `}
                            >
                                {item.icon}
                            </span>

                            {/* Tooltip */}
                            <div className="absolute left-14 md:left-16 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                                <div className="px-3 py-1.5 rounded-xl bg-gray-900 text-white text-xs font-medium whitespace-nowrap shadow-xl">
                                    {item.label}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
// ----------------------------------------------------------------

export default function NewsEventDetailPage({ item }: { item: NewsOrEvent | null }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [absoluteUrl, setAbsoluteUrl] = useState("");

    // Get absolute URL for sharing (client-side only)
    useEffect(() => {
        if (window) {
            setAbsoluteUrl(window.location.href);
        }
    }, []);

    // Derive recent items from actual data, sorted by startDate descending, excluding current item
    const recentItems = useMemo(() => {
        if (!item) return [];
        return newsAndEvents
            .filter((ni) => ni.slug !== item.slug)
            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            .slice(0, 6);
    }, [item]);

    // Filter recent items based on search query (title or excerpt)
    const filteredRecentItems = useMemo(() => {
        if (!searchQuery.trim()) return recentItems;
        const query = searchQuery.toLowerCase();
        return recentItems.filter(
            (ni) =>
                ni.title.toLowerCase().includes(query) ||
                ni.excerpt.toLowerCase().includes(query)
        );
    }, [recentItems, searchQuery]);

    if (router.isFallback) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Item not found</h1>
                    <Link href="/news-and-events" className="text-primary hover:underline mt-4 inline-block">
                        ← Back to News & Events
                    </Link>
                </div>
            </div>
        );
    }

    const pageTitle = `${item.title} | Sona Valliappa Public School`;
    const metaDescription = item.excerpt;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={item.title} />
                <meta property="og:description" content={metaDescription} />
                {item.thumbnail && <meta property="og:image" content={item.thumbnail} />}
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <main className="bg-white relative">
                <PageHeader
                    title={item.title}
                    subtitle={item.category === "event" ? "Event Details" : "News Article"}
                    breadcrumbs={["Home", "News & Events", item.title]}
                />

                {/* Sticky share sidebar - only when we have the absolute URL */}
                {absoluteUrl && <StickyShareSidebar url={absoluteUrl} title={item.title} />}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    {/* Back link */}
                    <Reveal delay={200}>
                        <div className="mb-8">
                            <Link
                                href="/news-and-events"
                                className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition gap-1 group"
                            >
                                <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
                                Back to all news & events
                            </Link>
                        </div>
                    </Reveal>

                    {/* Hero section: Thumbnail + Recent Updates */}
                    <Reveal delay={200}>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                            {/* Left: Thumbnail with fixed height 500px */}
                            <div className="lg:col-span-3 h-[500px] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                                {item.thumbnail ? (
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No image available
                                    </div>
                                )}
                            </div>

                            {/* Right: Recent Updates container with scroll */}
                            <div className="bg-gray-50 shadow-sm flex flex-col h-[500px]">
                                <div className="p-5 border-b border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900">Recent Updates</h3>
                                    <input
                                        type="text"
                                        placeholder="Search by title..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full mt-3 px-4 py-2 border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition bg-white"
                                    />
                                </div>
                                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                    {filteredRecentItems.length === 0 ? (
                                        <div className="text-center text-gray-500 py-6 text-sm">
                                            No matching news or events found.
                                        </div>
                                    ) : (
                                        filteredRecentItems.map((relatedItem) => (
                                            <Link
                                                key={relatedItem.slug}
                                                href={`/news-and-events/${relatedItem.slug}`}
                                                className="block group"
                                            >
                                                <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 hover:shadow-sm transition-all duration-200 hover:border-gray-200">
                                                    <div className="flex gap-2.5 items-start">
                                                        {relatedItem.thumbnail && (
                                                            <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden bg-gray-100">
                                                                <img
                                                                    src={relatedItem.thumbnail}
                                                                    alt={relatedItem.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-primary transition">
                                                                {relatedItem.title}
                                                            </h4>
                                                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                                                <CalendarIcon className="w-3 h-3 text-gray-400" />
                                                                <p className="text-[11px] text-gray-500">
                                                                    {formatDate(relatedItem.startDate)}
                                                                </p>
                                                                <span
                                                                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${relatedItem.category === "event"
                                                                        ? "bg-primary/10 text-primary"
                                                                        : "bg-blue-100 text-blue-600"
                                                                        }`}
                                                                >
                                                                    {relatedItem.category === "event"
                                                                        ? "Event"
                                                                        : "News"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <div className="space-y-6">
                        {/* Date and category */}
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-gray-500 flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                {formatDate(item.startDate)}
                                {item.startDate !== item.endDate && ` – ${formatDate(item.endDate)}`}
                            </span>
                            <span
                                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${item.category === "event"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                {item.category === "event" ? "Event" : "News"}
                            </span>
                        </div>

                        <Reveal delay={300}>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-gray-900 leading-tight">
                                {item.title}
                            </h1>
                        </Reveal>

                        <Reveal delay={300}>
                            <div
                                className="prose prose-lg max-w-none text-gray-700 prose-headings:font-semibold prose-a:text-primary"
                                dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                            />
                        </Reveal>

                        {/* Event days schedule (only for events) */}
                        {item.category === "event" && item.days && <EventDays days={item.days} />}


                        {item.galleries && item.galleries.length > 0 && <ImageGrid images={item.galleries} />}


                        {/* Video links */}
                        {item.videoLinks && <VideoList links={item.videoLinks} />}

                        {/* Press releases */}
                        {item.pressrelease && <PressReleaseList files={item.pressrelease} />}

                        {/* Footer publish date */}
                        <div className="pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-400">
                                Published on {formatDate(item.startDate)}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = newsAndEvents.map((item) => ({
        params: { slug: item.slug },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const item = newsAndEvents.find((ni) => ni.slug === slug) || null;
    if (!item) return { notFound: true };
    return { props: { item } };
};