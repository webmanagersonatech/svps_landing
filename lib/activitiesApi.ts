import api, { PaginatedResponse, fileUrl, getAllPages, stripHtml, toApiError, toHtml, truncate } from "./apiClient";

/* =======================
   Types
======================= */

/** Document exactly as the backend returns it */
export interface ActivityData {
    _id: string;
    topic: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    galleries?: string[];
    createdAt?: string;
    updatedAt?: string;
}

/** Shape the website components use (full image URLs, html description) */
export interface Activity {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    images: string[];
    shortDescription?: string;
    description: string;
}

export type ActivityListResponse = PaginatedResponse<ActivityData>;

/* =======================
   Mapper
======================= */

export const mapActivity = (d: ActivityData, index = 0): Activity => ({
    id: index + 1,
    title: d.topic,
    slug: d.slug,
    thumbnail: fileUrl(d.thumbnail),
    images: (d.galleries || []).map(fileUrl),
    shortDescription: truncate(stripHtml(d.description), 140),
    description: toHtml(d.description),
});

/* =======================
   Activities APIs
======================= */

/** 📄 List (pagination + search) */
export async function listActivitiesRequest({
    page = 1,
    limit = 10,
    search = "",
}: {
    page?: number;
    limit?: number;
    search?: string;
} = {}) {
    try {
        const params: any = { page, limit };
        if (search) params.search = search;

        const response = await api.get<ActivityListResponse>("/api/activities", { params });
        return response.data;
    } catch (error: any) {
        throw toApiError(error, "Failed to fetch activities.");
    }
}

/** 📚 All activities (all pages) */
export async function fetchActivities(): Promise<Activity[]> {
    try {
        const { docs } = await getAllPages<ActivityData>("/api/activities");
        return docs.map((d, i) => mapActivity(d, i));
    } catch (error: any) {
        throw toApiError(error, "Failed to fetch activities.");
    }
}

/** 👤 Get single by slug */
export async function fetchActivity(slug: string): Promise<Activity> {
    try {
        const response = await api.get<ActivityData>(`/api/activities/${encodeURIComponent(slug)}`);
        return mapActivity(response.data);
    } catch (error: any) {
        throw toApiError(error, "Failed to fetch activity details.");
    }
}

/** ➕ Create (admin) - send a FormData with the fields + files */
export async function createActivityRequest(form: FormData) {
    try {
        const response = await api.post<{ message?: string; data?: ActivityData }>("/api/activities", form);
        return response.data;
    } catch (error: any) {
        throw toApiError(error, "Failed to create activity.");
    }
}

/** ✏️ Update (admin) */
export async function updateActivityRequest(id: string, form: FormData) {
    try {
        const response = await api.put<{ message?: string; data?: ActivityData }>(`/api/activities/${id}`, form);
        return response.data;
    } catch (error: any) {
        throw toApiError(error, "Failed to update activity.");
    }
}

/** ❌ Delete (admin) */
export async function deleteActivityRequest(id: string) {
    try {
        const response = await api.delete<{ message: string }>(`/api/activities/${id}`);
        return response.data;
    } catch (error: any) {
        throw toApiError(error, "Failed to delete activity.");
    }
}
