export const stripHtml = (html?: string) =>
  (html || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

export const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
    : "";

/** ISO string -> yyyy-mm-dd for <input type="date"> */
export const toDateInput = (iso?: string) => (iso ? iso.slice(0, 10) : "");

export const isImagePath = (p: string) => /\.(jpe?g|png|webp|gif)$/i.test(p);

export const fileNameFromPath = (p: string) => p.split("/").pop() || p;

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const PRESS_TYPES = [
  ...IMAGE_TYPES,
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
