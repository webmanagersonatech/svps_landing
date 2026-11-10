import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Quill touches `document`, so it must only load in the browser.
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-[260px] animate-pulse rounded-lg bg-slate-100" />,
});

const escapeHtml = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Existing records may hold plain text (with line breaks) or basic HTML.
 * Plain text is converted to paragraphs so it keeps its line breaks inside Quill;
 * anything that already looks like HTML is passed through unchanged.
 */
export const normalizeForEditor = (value?: string) => {
  const v = (value || "").trim();
  if (!v) return "";
  if (/<[a-z][\s\S]*>/i.test(v)) return v;
  return v
    .split(/\n{2,}/)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
    .join("");
};

/** Quill reports an empty editor as "<p><br></p>" - store that as an empty string. */
const isEmptyHtml = (html: string) => !html || html.replace(/<(?!img|iframe|video)[^>]*>/gi, "").replace(/&nbsp;|\s/g, "") === "";

const MODULES = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "link"],
    ["clean"],
  ],
  clipboard: { matchVisual: false },
};

const FORMATS = [
  "header", "bold", "italic", "underline", "strike", "color", "background",
  "list", "bullet", "indent", "align", "blockquote", "link",
];

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  // Convert the incoming value once (when the form opens). Later changes come from typing.
  const initial = useMemo(() => normalizeForEditor(value), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rich-editor">
      <ReactQuill
        theme="snow"
        defaultValue={initial}
        onChange={(html: string, _delta: any, source: string) => {
          // Ignore the programmatic change Quill fires while loading existing content,
          // so opening a record and saving it never rewrites the stored HTML by accident.
          if (source !== "user") return;
          onChange(isEmptyHtml(html) ? "" : html);
        }}
        modules={MODULES}
        formats={FORMATS}
        placeholder={placeholder}
      />
    </div>
  );
}
