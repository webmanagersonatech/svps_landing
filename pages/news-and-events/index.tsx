import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { PageHeader } from "../../components/PageHeader";
import { NewsOrEvent, newsAndEvents } from "../../data/newsandevents";
import Link from 'next/link';
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// Helper: Format date to readable string
function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// Helper: Check if event is upcoming (startDate > today)
function isUpcoming(item: NewsOrEvent): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(item.startDate);
    return item.category === "event" && start > today;
}

// Pagination hook
function usePagination<T>(items: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
    return { paginatedItems, currentPage, totalPages, setCurrentPage };
}

// Tab component
type TabId = "news" | "events" | "upcoming";
function TabButton({
    id,
    active,
    onClick,
    children,
}: {
    id: TabId;
    active: boolean;
    onClick: (id: TabId) => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={() => onClick(id)}
            className={`py-3 px-6 text-base font-medium transition-all border-b-2 ${active
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
        >
            {children}
        </button>
    );
}

export default function NewsEventsPage() {
    const [activeTab, setActiveTab] = useState<TabId>("news");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterMonth, setFilterMonth] = useState<string>("");
    const [filterYear, setFilterYear] = useState<string>("");

    // Base data
    const allNews = newsAndEvents.filter((item) => item.category === "news");
    const allEvents = newsAndEvents.filter((item) => item.category === "event");
    const allUpcoming = allEvents.filter(isUpcoming);

    // Extract unique years and months from all items (for dropdowns)
    const availableYears = useMemo(() => {
        const years = new Set<string>();
        [...allNews, ...allEvents].forEach((item) => {
            const year = new Date(item.startDate).getFullYear().toString();
            years.add(year);
        });
        return Array.from(years).sort().reverse();
    }, [allNews, allEvents]);

    const months = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    // Filtering function
    const filterItems = (items: NewsOrEvent[]) => {
        return items.filter((item) => {
            // Title search
            const matchesSearch =
                !searchTerm ||
                item.title.toLowerCase().includes(searchTerm.toLowerCase());

            // Month & Year filter (based on startDate)
            const itemDate = new Date(item.startDate);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear().toString();

            const matchesMonth = !filterMonth || itemMonth === parseInt(filterMonth);
            const matchesYear = !filterYear || itemYear === filterYear;

            return matchesSearch && matchesMonth && matchesYear;
        });
    };

    // Apply filters to each tab's base list
    const filteredNews = useMemo(
        () => filterItems(allNews),
        [allNews, searchTerm, filterMonth, filterYear]
    );
    const filteredEvents = useMemo(
        () => filterItems(allEvents),
        [allEvents, searchTerm, filterMonth, filterYear]
    );
    const filteredUpcoming = useMemo(
        () => filterItems(allUpcoming),
        [allUpcoming, searchTerm, filterMonth, filterYear]
    );

    // Pagination (3 items per page)
    const {
        paginatedItems: paginatedNews,
        currentPage: newsPage,
        totalPages: newsTotal,
        setCurrentPage: setNewsPage,
    } = usePagination(filteredNews, 3);

    const {
        paginatedItems: paginatedEvents,
        currentPage: eventsPage,
        totalPages: eventsTotal,
        setCurrentPage: setEventsPage,
    } = usePagination(filteredEvents, 3);

    const {
        paginatedItems: paginatedUpcoming,
        currentPage: upcomingPage,
        totalPages: upcomingTotal,
        setCurrentPage: setUpcomingPage,
    } = usePagination(filteredUpcoming, 3);

    // Reset page to 1 whenever filters or active tab changes
    useEffect(() => {
        if (activeTab === "news") setNewsPage(1);
        if (activeTab === "events") setEventsPage(1);
        if (activeTab === "upcoming") setUpcomingPage(1);
    }, [activeTab, searchTerm, filterMonth, filterYear]);

    // Helper to render list
    const renderList = (items: NewsOrEvent[]) => {
        if (items.length === 0) {
            return (
                <div className="text-center py-16 text-gray-500">
                    No {activeTab === "upcoming" ? "upcoming events" : activeTab} found
                    with the selected filters.
                </div>
            );
        }

        return (
            <div className="space-y-8">
                {items.map((item) => (
                    <article
                        key={item.slug}
                        className="border-b border-gray-100 pb-8 last:border-0 group hover:bg-gray-50/30 transition px-2 rounded-lg"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {item.thumbnail && (
                                <div className="md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="text-sm text-primary font-medium flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        {formatDate(item.startDate)}
                                        {item.startDate !== item.endDate &&
                                            ` – ${formatDate(item.endDate)}`}
                                    </span>
                                    {item.category === "event" && (
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                            Event
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {item.excerpt}
                                </p>
                                <Link
                                    href={`/news-and-events/${item.slug}`}
                                    className="inline-block mt-3 text-primary text-sm font-medium hover:underline"
                                >
                                    Read more →
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        );
    };

    const renderPagination = (
        current: number,
        total: number,
        setPage: (page: number) => void
    ) => {
        if (total <= 1) return null;
        return (
            <div className="flex justify-center items-center gap-2 mt-12">
                <button
                    onClick={() => setPage(current - 1)}
                    disabled={current === 1}
                    className="p-2 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600">
                    Page {current} of {total}
                </span>
                <button
                    onClick={() => setPage(current + 1)}
                    disabled={current === total}
                    className="p-2 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>News & Events | Sona Valliappa Public School</title>
                <meta
                    name="description"
                    content="Latest news, events and upcoming activities at Sona Valliappa Public School"
                />
            </Head>

            <main className="bg-white">
                <PageHeader
                    title="News & Events"
                    subtitle="Stay updated with the latest happenings at school"
                    breadcrumbs={["Home", "News & Events"]}
                />

                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                    {/* Filter Bar */}
                    <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* Month & Year Selectors */}
                        <div className="flex gap-3">
                            <select
                                value={filterMonth}
                                onChange={(e) => setFilterMonth(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="">All Months</option>
                                {months.map((m) => (
                                    <option key={m.value} value={m.value}>
                                        {m.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="">All Years</option>
                                {availableYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="flex flex-wrap gap-2">
                            <TabButton
                                id="news"
                                active={activeTab === "news"}
                                onClick={setActiveTab}
                            >
                                News ({filteredNews.length})
                            </TabButton>
                            <TabButton
                                id="events"
                                active={activeTab === "events"}
                                onClick={setActiveTab}
                            >
                                All Events ({filteredEvents.length})
                            </TabButton>
                            <TabButton
                                id="upcoming"
                                active={activeTab === "upcoming"}
                                onClick={setActiveTab}
                            >
                                Upcoming ({filteredUpcoming.length})
                            </TabButton>
                        </nav>
                    </div>

                    {/* Content for each tab */}
                    {activeTab === "news" && (
                        <>
                            {renderList(paginatedNews)}
                            {renderPagination(newsPage, newsTotal, setNewsPage)}
                        </>
                    )}
                    {activeTab === "events" && (
                        <>
                            {renderList(paginatedEvents)}
                            {renderPagination(eventsPage, eventsTotal, setEventsPage)}
                        </>
                    )}
                    {activeTab === "upcoming" && (
                        <>
                            {renderList(paginatedUpcoming)}
                            {renderPagination(upcomingPage, upcomingTotal, setUpcomingPage)}
                        </>
                    )}
                </div>
            </main>
        </>
    );
}