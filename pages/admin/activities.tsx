import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon, PencilSquareIcon, PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AdminLayout from "../../components/admin/AdminLayout";
import Modal, { ConfirmDialog } from "../../components/admin/Modal";
import Pagination from "../../components/admin/Pagination";
import FileUploader from "../../components/admin/FileUploader";
import ThumbnailPicker from "../../components/admin/ThumbnailPicker";
import { useToast } from "../../components/admin/Toast";
import { Activity, Paginated, api, fileUrl } from "../../lib/adminApi";
import { IMAGE_TYPES, formatDate, stripHtml } from "../../lib/adminUtils";

/* ---------------- Create / Edit form ---------------- */
function ActivityForm({ activity, onClose, onSaved }: { activity: Activity | null; onClose: () => void; onSaved: () => void }) {
  const toast = useToast();
  const isEdit = !!activity;
  const [topic, setTopic] = useState(activity?.topic || "");
  const [description, setDescription] = useState(activity?.description || "");
  const [removed, setRemoved] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleRemoved = (p: string) => setRemoved((r) => (r.includes(p) ? r.filter((x) => x !== p) : [...r, p]));

  const save = async () => {
    if (!topic.trim()) return toast.error("Topic is required");
    if (!isEdit && !thumbnail) return toast.error("Please choose a thumbnail image");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("topic", topic.trim());
      fd.append("description", description);
      if (thumbnail) fd.append("thumbnail", thumbnail);
      files.forEach((f) => fd.append("galleries", f));
      if (isEdit) removed.forEach((r) => fd.append("removeGalleries", r));

      await api(isEdit ? `/api/activities/${activity!._id}` : "/api/activities", { method: isEdit ? "PUT" : "POST", form: fd, onProgress: setProgress });
      toast.success(isEdit ? "Activity updated" : "Activity created");
      onSaved();
    } catch (err: any) {
      toast.error(err.message);
      setSaving(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit activity" : "New activity"}
      onClose={saving ? () => {} : onClose}
      footer={
        <>
          <button onClick={onClose} className="btn-secondary" disabled={saving}>Cancel</button>
          <button onClick={save} className="btn-primary" disabled={saving}>{saving ? (progress > 0 && progress < 100 ? `Uploading ${progress}%` : "Saving...") : isEdit ? "Save changes" : "Create activity"}</button>
        </>
      }
    >
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Topic <span className="text-red-500">*</span></label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Dramatics and Role Play" className="input" />
          <p className="mt-1 text-xs text-slate-400">The page link (slug) is created automatically from the topic.</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
          <textarea rows={6} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write about this activity... (basic HTML like <p>, <ul><li> is allowed)" className="input resize-y" />
        </div>
        <ThumbnailPicker existing={activity?.thumbnail} file={thumbnail} onChange={setThumbnail} onError={toast.error} required={!isEdit} />
        <FileUploader
          label="Gallery images"
          hint="JPG, PNG, WEBP, GIF"
          accept={IMAGE_TYPES}
          maxSizeMB={10}
          existing={activity?.galleries}
          removed={removed}
          onToggleRemoved={toggleRemoved}
          files={files}
          onFilesChange={setFiles}
          onError={toast.error}
        />
      </div>
    </Modal>
  );
}

/* ---------------- Page content ---------------- */
function ActivitiesContent() {
  const toast = useToast();
  const router = useRouter();
  const [data, setData] = useState<Paginated<Activity> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [editing, setEditing] = useState<Activity | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<Activity | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  // open "new" form when arriving from the dashboard button
  useEffect(() => {
    if (router.isReady && router.query.new) {
      setEditing(null);
      setFormOpen(true);
      router.replace("/admin/activities", undefined, { shallow: true });
    }
  }, [router.isReady, router.query.new]); // eslint-disable-line react-hooks/exhaustive-deps

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: "9" });
      if (debounced) qs.set("search", debounced);
      setData(await api<Paginated<Activity>>(`/api/activities?${qs}`));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load();
  }, [load]);

  const confirmDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await api(`/api/activities/${deleting._id}`, { method: "DELETE" });
      toast.success("Activity deleted");
      setDeleting(null);
      // go back a page if we just emptied this one
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
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activities..." className="input !pl-10" />
        </div>
        <button onClick={openNew} className="btn-primary"><PlusIcon className="h-5 w-5" /> New activity</button>
      </div>

      {loading && !data ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200/70" />)}
        </div>
      ) : data && data.docs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-medium text-slate-700">{debounced ? "No activities match your search" : "No activities yet"}</p>
          {!debounced && <button onClick={openNew} className="btn-primary mt-4">Create your first activity</button>}
        </div>
      ) : (
        <div className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-3 ${loading ? "opacity-60" : ""}`}>
          {data?.docs.map((a) => (
            <article key={a._id} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[16/10] bg-slate-100">
                {a.thumbnail || a.galleries[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fileUrl(a.thumbnail || a.galleries[0])} alt={a.topic} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300"><PhotoIcon className="h-12 w-12" /></div>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs text-white">{a.galleries.length} photo(s)</span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-1 font-semibold text-slate-800">{a.topic}</h3>
                <p className="mt-0.5 truncate text-xs text-slate-400">/{a.slug}</p>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-500">{stripHtml(a.description) || "No description"}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-400">{formatDate(a.createdAt)}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditing(a); setFormOpen(true); }} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-primary" title="Edit"><PencilSquareIcon className="h-5 w-5" /></button>
                    <button onClick={() => setDeleting(a)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Delete"><TrashIcon className="h-5 w-5" /></button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {data && <Pagination page={data.page} totalPages={data.totalPages} totalDocs={data.totalDocs} onChange={setPage} />}

      {formOpen && (
        <ActivityForm
          key={editing?._id || "new"}
          activity={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => { setFormOpen(false); load(); }}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete activity"
          message={`Delete "${deleting.topic}" and all its gallery images? This cannot be undone.`}
          loading={deleteLoading}
          onConfirm={confirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}

export default function ActivitiesPage() {
  return (
    <AdminLayout title="Activities" subtitle="Create and manage school activities">
      <ActivitiesContent />
    </AdminLayout>
  );
}
