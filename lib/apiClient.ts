import axios from "axios";

/* =======================
   Config
======================= */

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

/** Seconds before a statically generated page is refreshed from the API */
export const REVALIDATE_SECONDS = 60;

/** Same key the admin panel uses to store the login token */
const TOKEN_KEY = "svps_admin_token";

/* =======================
   Axios Instance
======================= */

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
    },
});

// Public calls need no token. Admin calls (create / update / delete) send it when present.
api.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/* =======================
   Shared types + helpers
======================= */

export interface PaginatedResponse<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

/** Thrown when the API answers 404, so pages can return notFound */
export class ApiNotFound extends Error { }

/** Converts an axios error into an Error with a readable message */
export function toApiError(error: any, fallback: string): Error {
    if (error?.response?.status === 404) return new ApiNotFound(fallback);
    return new Error(error?.response?.data?.message || fallback);
}

/** /uploads/x.jpg -> http://api-host/uploads/x.jpg */
export const fileUrl = (p?: string): string =>
    !p ? "" : /^https?:\/\//.test(p) ? p : `${API_URL}${p.startsWith("/") ? "" : "/"}${p}`;

/** next/image cannot optimise images from localhost (private IP), so skip optimisation there */
export const skipOptimization = (src?: string): boolean =>
    !!src && /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|\/|$)/.test(src);

export const stripHtml = (html?: string) =>
    (html || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();

export const truncate = (text: string, max: number) =>
    text.length <= max ? text : `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;

const escapeHtml = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Admin may type plain text or basic HTML. Plain text is turned into paragraphs. */
export const toHtml = (text?: string) => {
    const value = (text || "").trim();
    if (!value) return "";
    if (/<[a-z][\s\S]*>/i.test(value)) return value;
    return value
        .split(/\n{2,}/)
        .map((para) => `<p>${escapeHtml(para).replace(/\n/g, "<br/>")}</p>`)
        .join("");
};

/** Fetches every page of a list endpoint (the API paginates, default 10 per page) */
export async function getAllPages<T>(
    path: string,
    params: Record<string, any> = {},
    pageSize = 50,
    maxPages = 20
): Promise<{ docs: T[]; totalDocs: number }> {
    const docs: T[] = [];
    let totalDocs = 0;
    for (let page = 1; page <= maxPages; page++) {
        const res = await api.get<PaginatedResponse<T>>(path, { params: { ...params, limit: pageSize, page } });
        docs.push(...res.data.docs);
        totalDocs = res.data.totalDocs;
        if (page >= res.data.totalPages) break;
    }
    return { docs, totalDocs };
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
        console.warn("[api]", (err as Error).message);
        return fallback;
    }
}

export default api;
