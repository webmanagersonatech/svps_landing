// Public (no login) API helpers for the website. Works on the server (getStaticProps)
// and in the browser. Converts backend documents into the shapes the pages already use.
import type { NewsOrEvent } from "../data/newsandevents";
import type { Activity } from "../data/activities";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

/** Seconds before a statically generated page is refreshed from the API */
export const REVALIDATE_SECONDS = 60;

/* ---------- raw backend shapes ---------- */
type Paginated<T> = { docs: T[]; totalDocs: number; totalPages: number; page: number };

type ApiNewsEvent = {
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
};

type ApiActivity = {
  _id: string;
  topic: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  galleries?: string[];
};

/* ---------- helpers ---------- */
/** /uploads/x.jpg -> http://api-host/uploads/x.jpg */
export const fileUrl = (p?: string): string =>
  !p ? "" : /^https?:\/\//.test(p) ? p : `${API_URL}${p.startsWith("/") ? "" : "/"}${p}`;

/** next/image cannot optimise images from localhost (private IP), so skip optimisation there */
export const skipOptimization = (src?: string): boolean =>
  !!src && /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|\/|$)/.test(src);

const stripHtml = (html?: string) =>
  (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;

const escapeHtml = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Admin may type plain text or basic HTML. Plain text is turned into paragraphs. */
const toHtml = (text?: string) => {
  const value = (text || "").trim();
  if (!value) return "";
  if (/<[a-z][\s\S]*>/i.test(value)) return value;
  return value
    .split(/\n{2,}/)
    .map((para) => `<p>${escapeHtml(para).replace(/\n/g, "<br/>")}</p>`)
    .join("");
};

/* ---------- mappers ---------- */
export const mapNewsEvent = (d: ApiNewsEvent): NewsOrEvent => {
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

export const mapActivity = (d: ApiActivity, index: number): Activity => ({
  id: index + 1,
  title: d.topic,
  slug: d.slug,
  thumbnail: fileUrl(d.thumbnail),
  images: (d.galleries || []).map(fileUrl),
  shortDescription: truncate(stripHtml(d.description), 140),
  description: toHtml(d.description),
});

/* ---------- fetching ---------- */
export class ApiNotFound extends Error {}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { headers: { Accept: "application/json" } });
  if (res.status === 404) throw new ApiNotFound(path);
  if (!res.ok) throw new Error(`API ${path} failed (${res.status})`);
  return res.json() as Promise<T>;
}

/**
 * Wraps a fetch used inside getStaticProps.
 *  - During `next build` (or in dev) a down API just gives the fallback, so the build never breaks
 *    and sections with no data are simply hidden.
 *  - While the live site is refreshing a page, an API error is re-thrown so Next.js keeps showing
 *    the last good version instead of replacing it with an empty page.
 */
export async function safe<T>(job: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await job();
  } catch (err) {
    if (err instanceof ApiNotFound) throw err;
    const building = process.env.NEXT_PHASE === "phase-production-build";
    if (process.env.NODE_ENV === "production" && !building) throw err;
    console.warn("[publicApi]", (err as Error).message);
    return fallback;
  }
}

/** Fetches every page of a list endpoint (the API paginates, default 10 per page) */
async function getAll<T>(path: string, pageSize = 50, maxPages = 20): Promise<{ docs: T[]; totalDocs: number }> {
  const sep = path.includes("?") ? "&" : "?";
  const docs: T[] = [];
  let totalDocs = 0;
  for (let page = 1; page <= maxPages; page++) {
    const res = await get<Paginated<T>>(`${path}${sep}limit=${pageSize}&page=${page}`);
    docs.push(...res.docs);
    totalDocs = res.totalDocs;
    if (page >= res.totalPages) break;
  }
  return { docs, totalDocs };
}

const byNewest = (a: NewsOrEvent, b: NewsOrEvent) =>
  new Date(b.startDate).getTime() - new Date(a.startDate).getTime();

/** Every news item and event, newest first */
export async function fetchAllNewsEvents(): Promise<NewsOrEvent[]> {
  const { docs } = await getAll<ApiNewsEvent>("/api/newsandevents");
  return docs.map(mapNewsEvent).sort(byNewest);
}

/** One news item / event by slug */
export async function fetchNewsEvent(slug: string): Promise<NewsOrEvent> {
  return mapNewsEvent(await get<ApiNewsEvent>(`/api/newsandevents/${encodeURIComponent(slug)}`));
}

/** Latest few items for the home page: news, events and upcoming events (start date today or later) */
export async function fetchHomeNewsEvents(perTab = 4) {
  const q = (extra: string) => get<Paginated<ApiNewsEvent>>(`/api/newsandevents?limit=${perTab}&${extra}`);
  const [news, events, upcoming] = await Promise.all([
    q("category=news"),
    q("category=event"),
    q("upcoming=true"),
  ]);
  return {
    news: news.docs.map(mapNewsEvent).sort(byNewest),
    events: events.docs.map(mapNewsEvent).sort(byNewest),
    upcoming: upcoming.docs
      .map(mapNewsEvent)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
    newsCount: news.totalDocs,
    eventsCount: events.totalDocs,
  };
}

/** All activities */
export async function fetchActivities(): Promise<Activity[]> {
  const { docs } = await getAll<ApiActivity>("/api/activities");
  return docs.map(mapActivity);
}

/** One activity by slug */
export async function fetchActivity(slug: string): Promise<Activity> {
  return mapActivity(await get<ApiActivity>(`/api/activities/${encodeURIComponent(slug)}`), 0);
}
