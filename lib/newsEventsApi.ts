import api, { PaginatedResponse, fileUrl, getAllPages, stripHtml, toApiError, toHtml, truncate } from "./apiClient";

/* =======================
   Types
======================= */

/** Document exactly as the backend returns it */
export interface NewsEventData {
    _id: string;
    category: "event" | "news";
    title: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    galleries?: string[];
    pressRelease?: string[];
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface EventDay {
    dayNumber: number;
    title?: string;
    description: string;
    images: string[];
}

/** Shape the website components use (full image URLs, html content, excerpt) */
export interface NewsOrEvent {
    title: string;
    slug: string;
    excerpt: string;
    contentHtml: string;
    startDate: string;
    endDate: string;
    category: "news" | "event";
    thumbnail: string;
    galleries?: string[];
    pressrelease?: string[];
    videoLinks?: string[];
    days?: EventDay[];
}

export type NewsEventListResponse = PaginatedResponse<NewsEventData>;

export interface HomeNewsEvents {
    news: NewsOrEvent[];
    events: NewsOrEvent[];
    upcoming: NewsOrEvent[];
    newsCount: number;
    eventsCount: number;
}

/* =======================
   Mapper + helpers
======================= */

export const mapNewsEvent = (d: NewsEventData): NewsOrEvent => {
    const start = d.startDate || d.createdAt;
    return {
        title: d.title,
        slug: d.slug,
        excerpt: truncate(stripHtml(d.description), 200),
        contentHtml: toHtml(d.description),
        startDate: start,
        endDate: d.endDate || start,
        category: d.category,
        thumbnail: fileUrl(d.thumbnail),
        galleries: (d.galleries || []).map(fileUrl),
        pressrelease: (d.pressRelease || []).map(fileUrl),
    };
};

const time = (item: NewsOrEvent) => new Date(item.startDate).getTime();
export const byNewest = (a: NewsOrEvent, b: NewsOrEvent) => time(b) - time(a);
export const byOldest = (a: NewsOrEvent, b: NewsOrEvent) => time(a) - time(b);

/** Today's date (YYYY-MM-DD) in India, so "today" does not flip at the server's UTC midnight */
const todayIST = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

/**
 * Upcoming event = category is "event" AND startDate is today or later.
 * News is never upcoming. Used on the home page and the News & Events page.
 */
export const isUpcomingEvent = (item: Pick<NewsOrEvent, "category" | "startDate">): boolean =>
    item.category === "event" && !!item.startDate && item.startDate.slice(0, 10) >= todayIST();

/* =======================
   News & Events APIs
======================= */

/** 📄 List (pagination + filters + search) */
export async function listNewsEventsRequest({
    page = 1,
    limit = 10,
    search = "",
    category = "all",
}: {
    page?: number;
    limit?: number;
    search?: string;
    category?: "all" | "news" | "event";
} = {}) {
    try {
        const params: any = { page, limit };
        if (search) params.search = search;
        if (category !== "all") params.category = category;

        const response = await api.get<NewsEventListResponse>("/api/newsandevents", { params });
        return response.data;
    } catch (error: any) {
        throw toApiError(error, "Failed to fetch news and events.");
    }
}

/** 📚 Every news item and event, newest first (all pages) */
export async function fetchAllNewsEvents(): Promise<NewsOrEvent[]> {
    try {
        const { docs } = await getAllPages<NewsEventData>("/api/newsandevents");
        return docs.map(mapNewsEvent).sort(byNewest);
    } catch (error: any) {
        throw toApiError(error, "Failed to fetch news and events.");
    }
}

/** 👤 Get single by slug */
export async function fetchNewsEvent(slug: string): Promise<NewsOrEvent> {
    try {
        const response = await api.get<NewsEventData>(`/api/newsandevents/${encodeURIComponent(slug)}`);
        return mapNewsEvent(response.data);
    } catch (error: any) {
        throw toApiError(error, "Failed to fetch news / event details.");
    }
}

/** 🔜 Upcoming events only (category "event", start date today or later), soonest first */
export async function fetchUpcomingEvents(limit?: number): Promise<NewsOrEvent[]> {
    try {
        const { docs } = await getAllPages<NewsEventData>("/api/newsandevents", { category: "event" });
        const upcoming = docs.map(mapNewsEvent).filter(isUpcomingEvent).sort(byOldest);
        return limit ? upcoming.slice(0, limit) : upcoming;
    } catch (error: any) {
        throw toApiError(error, "Failed to fetch upcoming events.");
    }
}

/** 🏠 Home page: latest news, latest events and upcoming events */
export async function fetchHomeNewsEvents(perTab = 4): Promise<HomeNewsEvents> {
    try {
        const [news, events] = await Promise.all([
            api.get<NewsEventListResponse>("/api/newsandevents", { params: { category: "news", limit: perTab } }),
            getAllPages<NewsEventData>("/api/newsandevents", { category: "event" }),
        ]);
        const allEvents = events.docs.map(mapNewsEvent);
        return {
            news: news.data.docs.map(mapNewsEvent).sort(byNewest),
            events: [...allEvents].sort(byNewest).slice(0, perTab),
            upcoming: allEvents.filter(isUpcomingEvent).sort(byOldest).slice(0, perTab),
            newsCount: news.data.totalDocs,
            eventsCount: events.totalDocs,
        };
    } catch (error: any) {
        throw toApiError(error, "Failed to fetch home news and events.");
    }
}

/** ➕ Create (admin) - send a FormData with the fields + files */
export async function createNewsEventRequest(form: FormData) {
    try {
        const response = await api.post<{ message?: string; data?: NewsEventData }>("/api/newsandevents", form);
        return response.data;
    } catch (error: any) {
        throw toApiError(error, "Failed to create news / event.");
    }
}

/** ✏️ Update (admin) */
export async function updateNewsEventRequest(id: string, form: FormData) {
    try {
        const response = await api.put<{ message?: string; data?: NewsEventData }>(`/api/newsandevents/${id}`, form);
        return response.data;
    } catch (error: any) {
        throw toApiError(error, "Failed to update news / event.");
    }
}

/** ❌ Delete (admin) */
export async function deleteNewsEventRequest(id: string) {
    try {
        const response = await api.delete<{ message: string }>(`/api/newsandevents/${id}`);
        return response.data;
    } catch (error: any) {
        throw toApiError(error, "Failed to delete news / event.");
    }
}
