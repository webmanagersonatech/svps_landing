import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  PencilSquareIcon,
  PhotoIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "../../components/admin/AdminLayout";
import Modal, { ConfirmDialog } from "../../components/admin/Modal";
import Pagination from "../../components/admin/Pagination";
import FileUploader from "../../components/admin/FileUploader";
import ThumbnailPicker from "../../components/admin/ThumbnailPicker";
import { useToast } from "../../components/admin/Toast";
import { NewsEvent, Paginated, api, fileUrl } from "../../lib/adminApi";
import { IMAGE_TYPES, PRESS_TYPES, formatDate, stripHtml, toDateInput } from "../../lib/adminUtils";

type Category = "news" | "event";

/* ---------------- Create / Edit form ---------------- */
function NewsEventForm({ item, defaultCategory, onClose, onSaved }: { item: NewsEvent | null; defaultCategory: Category; onClose: () => void; onSaved: () => void }) {
  const toast = useToast();
  const isEdit = !!item;
  const [category, setCategory] = useState<Category>(item?.category || defaultCategory);
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [startDate, setStartDate] = useState(toDateInput(item?.startDate));
  const [endDate, setEndDate] = useState(toDateInput(item?.endDate));
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [pressFiles, setPressFiles] = useState<File[]>([]);
  const [removedGalleries, setRemovedGalleries] = useState<string[]>([]);
  const [removedPress, setRemovedPress] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (p: string) =>
    setter((r) => (r.includes(p) ? r.filter((x) => x !== p) : [...r, p]));

  const save = async () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!isEdit && !thumbnail) return toast.error("Please choose a thumbnail image");
    if (category === "event" && !startDate) return toast.error("Start date is required for events");
    if (startDate && endDate && endDate < startDate) return toast.error("End date must be on or after the start date");

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("category", category);
      fd.append("title", title.trim());
      fd.append("description", description);
      if (startDate) fd.append("startDate", startDate);
      if (endDate) fd.append("endDate", endDate);
      if (thumbnail) fd.append("thumbnail", thumbnail);
      galleryFiles.forEach((f) => fd.append("galleries", f));
      pressFiles.forEach((f) => fd.append("pressRelease", f));
      if (isEdit) {
        removedGalleries.forEach((p) => fd.append("removeGalleries", p));
        removedPress.forEach((p) => fd.append("removePressRelease", p));
      }

      await api(isEdit ? `/api/newsandevents/${item!._id}` : "/api/newsandevents", { method: isEdit ? "PUT" : "POST", form: fd, onProgress: setProgress });
      toast.success(isEdit ? "Updated successfully" : "Created successfully");
      onSaved();
    } catch (err: any) {
      toast.error(err.message);
      setSaving(false);
    }
  };

  return (
    <Modal
      title={isEdit ? `Edit ${item!.category}` : "New news / event"}
      onClose={saving ? () => {} : onClose}
      footer={
        <>
          <button onClick={onClose} className="btn-secondary" disabled={saving}>Cancel</button>
          <button onClick={save} className="btn-primary" disabled={saving}>{saving ? (progress > 0 && progress < 100 ? `Uploading ${progress}%` : "Saving...") : isEdit ? "Save changes" : "Create"}</button>
        </>
      }
    >
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
          <div className="inline-flex rounded-lg bg-slate-100 p-1">
            {(["news", "event"] as Category[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-md px-5 py-1.5 text-sm font-medium capitalize transition ${category === c ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Title <span className="text-red-500">*</span></label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Annual Day 2026" className="input" />
          <p className="mt-1 text-xs text-slate-400">The page link (slug) is created automatically from the title.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Start date {category === "event" && <span className="text-red-500">*</span>}</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">End date</label>
            <input type="date" value={endDate} min={startDate || undefined} onChange={(e) => setEndDate(e.target.value)} className="input" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
          <textarea rows={6} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write the details... (basic HTML like <p>, <ul><li> is allowed)" className="input resize-y" />
        </div>

        <ThumbnailPicker existing={item?.thumbnail} file={thumbnail} onChange={setThumbnail} onError={toast.error} required={!isEdit} />

        <FileUploader
          label="Gallery images"
          hint="JPG, PNG, WEBP, GIF · 15MB each"
          accept={IMAGE_TYPES}
          maxSizeMB={15}
          existing={item?.galleries}
          removed={removedGalleries}
          onToggleRemoved={toggle(setRemovedGalleries)}
          files={galleryFiles}
          onFilesChange={setGalleryFiles}
          onError={toast.error}
        />

        <FileUploader
          label="Press release"
          hint="Images, PDF, DOC, DOCX · 15MB each"
          accept={PRESS_TYPES}
          maxSizeMB={15}
          existing={item?.pressRelease}
          removed={removedPress}
          onToggleRemoved={toggle(setRemovedPress)}
          files={pressFiles}
          onFilesChange={setPressFiles}
          onError={toast.error}
        />
      </div>
    </Modal>
  );
}

/* ---------------- Page content ---------------- */
const TABS: { value: "" | Category; label: string }[] = [
  { value: "", label: "All" },
  { value: "news", label: "News" },
  { value: "event", label: "Events" },
];

function dateRange(i: NewsEvent) {
  if (!i.startDate) return "No date set";
  const s = formatDate(i.startDate);
  return i.endDate && i.endDate.slice(0, 10) !== i.startDate.slice(0, 10) ? `${s} – ${formatDate(i.endDate)}` : s;
}

function NewsEventsContent() {
  const toast = useToast();
  const router = useRouter();
  const [data, setData] = useState<Paginated<NewsEvent> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<"" | Category>("");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [editing, setEditing] = useState<NewsEvent | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<NewsEvent | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (router.isReady && router.query.new) {
      setEditing(null);
      setFormOpen(true);
      router.replace("/admin/news-events", undefined, { shallow: true });
    }
  }, [router.isReady, router.query.new]); // eslint-disable-line react-hooks/exhaustive-deps

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: "8" });
      if (tab) qs.set("category", tab);
      if (debounced) qs.set("search", debounced);
      setData(await api<Paginated<NewsEvent>>(`/api/newsandevents?${qs}`));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, tab, debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load();
  }, [load]);

  const confirmDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await api(`/api/newsandevents/${deleting._id}`, { method: "DELETE" });
      toast.success("Deleted successfully");
      setDeleting(null);
      if (data && data.docs.length === 1 && page > 1) setPage(page - 1);
      else load();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex rounded-lg bg-slate-200/70 p-1">
            {TABS.map((t) => (
              <button
                key={t.label}
                onClick={() => { setTab(t.value); setPage(1); }}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${tab === t.value ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title..." className="input !pl-10" />
          </div>
        </div>
        <button onClick={openNew} className="btn-primary"><PlusIcon className="h-5 w-5" /> New news / event</button>
      </div>

      {loading && !data ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-200/70" />)}</div>
      ) : data && data.docs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <NewspaperIcon className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-medium text-slate-700">{debounced || tab ? "Nothing matches your filters" : "No news or events yet"}</p>
          {!debounced && !tab && <button onClick={openNew} className="btn-primary mt-4">Create your first one</button>}
        </div>
      ) : (
        <div className={`space-y-3 ${loading ? "opacity-60" : ""}`}>
          {data?.docs.map((n) => (
            <article key={n._id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center">
              <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-28">
                {n.thumbnail || n.galleries[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fileUrl(n.thumbnail || n.galleries[0])} alt={n.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300"><PhotoIcon className="h-8 w-8" /></div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${n.category === "event" ? "bg-orange-100 text-primary" : "bg-sky-100 text-sky-700"}`}>{n.category}</span>
                  <h3 className="truncate font-semibold text-slate-800">{n.title}</h3>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-slate-500">{stripHtml(n.description) || "No description"}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1"><CalendarDaysIcon className="h-4 w-4" />{dateRange(n)}</span>
                  <span className="inline-flex items-center gap-1"><PhotoIcon className="h-4 w-4" />{n.galleries.length} photo(s)</span>
                  <span className="inline-flex items-center gap-1"><DocumentTextIcon className="h-4 w-4" />{n.pressRelease.length} press file(s)</span>
                </div>
              </div>

              <div className="flex gap-1 self-end sm:self-center">
                <button onClick={() => { setEditing(n); setFormOpen(true); }} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-primary" title="Edit"><PencilSquareIcon className="h-5 w-5" /></button>
                <button onClick={() => setDeleting(n)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Delete"><TrashIcon className="h-5 w-5" /></button>
              </div>
            </article>
          ))}
        </div>
      )}

      {data && <Pagination page={data.page} totalPages={data.totalPages} totalDocs={data.totalDocs} onChange={setPage} />}

      {formOpen && (
        <NewsEventForm
          key={editing?._id || "new"}
          item={editing}
          defaultCategory={tab || "news"}
          onClose={() => setFormOpen(false)}
          onSaved={() => { setFormOpen(false); load(); }}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title={`Delete ${deleting.category}`}
          message={`Delete "${deleting.title}" with all its gallery images and press release files? This cannot be undone.`}
          loading={deleteLoading}
          onConfirm={confirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}

export default function NewsEventsPage() {
  return (
    <AdminLayout title="News & Events" subtitle="Publish news, events, galleries and press releases">
      <NewsEventsContent />
    </AdminLayout>
  );
}
