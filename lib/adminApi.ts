// API helper for the admin panel (axios). Token is kept in localStorage.
import axios from "axios";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
// Must match SECRET_KEY used by the backend login (auth.controller.ts)
export const PASSWORD_KEY = process.env.NEXT_PUBLIC_PASSWORD_KEY || "sonacassecretkey@2025";

const TOKEN_KEY = "svps_admin_token";
const USER_KEY = "svps_admin_user";

export type AdminUser = { id: string; firstname: string; lastname: string; email: string; role: string };

export type Paginated<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type Activity = {
  _id: string;
  topic: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  galleries: string[];
  createdAt: string;
  updatedAt: string;
};

export type NewsEvent = {
  _id: string;
  category: "event" | "news";
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  galleries: string[];
  pressRelease: string[];
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type ContactStatus = "new" | "read" | "replied";
export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
};
export type ContactStats = { total: number; new: number; read: number; replied: number; today: number; uniquePeople: number };

export type VisitStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type Visit = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  scheduledDate?: string | null;
  purpose?: string;
  message?: string;
  status: VisitStatus;
  adminNote?: string;
  createdAt: string;
};
export type VisitStats = { total: number; pending: number; confirmed: number; completed: number; cancelled: number; upcoming: number; today: number; uniquePeople: number };

export const getToken = (): string | null =>
  typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);

export const getUser = (): AdminUser | null => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const setSession = (token: string, user: AdminUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/** Turns a stored path like /uploads/activities/x.jpg into a full URL */
export const fileUrl = (p?: string) => (!p ? "" : /^https?:\/\//.test(p) ? p : `${API_URL}${p}`);

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/** Shared axios instance for the admin panel */
export const http = axios.create({ baseURL: API_URL });

type Options = {
  method?: string;
  json?: unknown;
  form?: FormData;
  /** set false for public calls such as login (no Authorization header) */
  withAuth?: boolean;
  /** 0-100 upload progress (for file uploads) */
  onProgress?: (percent: number) => void;
};

/**
 * Thin wrapper over axios: returns response data, throws ApiError with a readable message.
 * NOTE: do not pass an `auth` key to axios - that is axios' own HTTP Basic option and
 * it would overwrite the Bearer token header.
 */
export async function api<T = any>(path: string, { method = "GET", json, form, withAuth = true, onProgress }: Options = {}): Promise<T> {
  const token = withAuth ? getToken() : null;
  try {
    const res = await http.request<T>({
      url: path,
      method,
      data: form ?? json,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      onUploadProgress: onProgress
        ? (e) => e.total && onProgress(Math.round((e.loaded * 100) / e.total))
        : undefined,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? 0;
      // Token rejected by the server -> log out (only when we actually sent one)
      if (status === 401 && token) {
        clearSession();
        if (typeof window !== "undefined") window.location.href = "/admin";
      }
      if (!err.response) throw new ApiError("Cannot reach the server. Please check your connection or API URL.", 0);
      throw new ApiError((err.response.data as any)?.message || `Request failed (${status})`, status);
    }
    throw err;
  }
}
