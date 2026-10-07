// Public form submissions (no login): contact-us form + "book a campus visit" popup.
import api from "./apiClient";

export type ContactPayload = { name: string; email: string; phone?: string; subject?: string; message: string; website?: string };
export type VisitPayload = { name: string; email: string; phone: string; preferredDate: string; purpose?: string; message?: string; website?: string };

const errorMessage = (err: any, fallback: string) =>
  err?.response?.status === 429
    ? "Too many requests. Please try again in a few minutes."
    : err?.response?.data?.message || (err?.response ? fallback : "Cannot reach the server. Please try again later.");

export async function submitContact(payload: ContactPayload): Promise<string> {
  try {
    const res = await api.post<{ message: string }>("/api/contact", payload);
    return res.data.message;
  } catch (err) {
    throw new Error(errorMessage(err, "Could not send your message. Please try again."));
  }
}

export async function submitVisit(payload: VisitPayload): Promise<string> {
  try {
    const res = await api.post<{ message: string }>("/api/visits", payload);
    return res.data.message;
  } catch (err) {
    throw new Error(errorMessage(err, "Could not send your request. Please try again."));
  }
}
