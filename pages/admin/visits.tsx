import { useCallback, useEffect, useState } from "react";
import { CalendarDaysIcon, EnvelopeIcon, MagnifyingGlassIcon, PencilSquareIcon, PhoneIcon, TrashIcon } from "@heroicons/react/24/outline";
import AdminLayout from "../../components/admin/AdminLayout";
import Modal, { ConfirmDialog } from "../../components/admin/Modal";
import Pagination from "../../components/admin/Pagination";
import { useToast } from "../../components/admin/Toast";
import { Paginated, Visit, VisitStats, VisitStatus, api } from "../../lib/adminApi";
import { formatDate, toDateInput } from "../../lib/adminUtils";

const STATUS_STYLE: Record<VisitStatus, string> = {
  pending: "bg-orange-100 text-primary",
  confirmed: "bg-sky-100 text-sky-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-slate-200 text-slate-600",
};

const TABS: { value: "" | VisitStatus; label: string }[] = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function Stat({ label, value, tone }: { label: string; value: number | string; tone: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}

/* ---------- Schedule / update a booking ---------- */
function ScheduleModal({ visit, onClose, onSaved }: { visit: Visit; onClose: () => void; onSaved: () => void }) {
  const toast = useToast();
  const [status, setStatus] = useState<VisitStatus>(visit.status);
  const [scheduledDate, setScheduledDate] = useState(toDateInput(visit.scheduledDate || visit.preferredDate));
  const [adminNote, setAdminNote] = useState(visit.adminNote || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (status === "confirmed" && !scheduledDate) return toast.error("Pick the date you are confirming for the visit");
    setSaving(true);
    try {
      await api(`/api/visits/${visit._id}`, {
        method: "PATCH",
        json: { status, scheduledDate: scheduledDate || null, adminNote },
      });
      toast.success("Visit updated");
      onSaved();
    } catch (err: any) {
      toast.error(err.message);
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Schedule campus visit"
      size="md"
      onClose={saving ? () => {} : onClose}
      footer={
        <>
          <button onClick={onClose} className="btn-secondary" disabled={saving}>Cancel</button>
          <button onClick={save} className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          <p className="font-medium text-slate-800">{visit.name}</p>
          <p>{visit.email} · {visit.phone}</p>
          <p className="mt-1 text-xs text-slate-500">Requested date: {formatDate(visit.preferredDate)}</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as VisitStatus)} className="input">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Visit date</label>
          <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} className="input" />
          <p className="mt-1 text-xs text-slate-400">Change this if you are offering a different day than the one requested.</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Internal note</label>
          <textarea rows={3} value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Only visible to admins" className="input resize-y" />
        </div>
      </div>
    </Modal>
  );
}

function VisitsContent() {
  const toast = useToast();
  const [data, setData] = useState<Paginated<Visit> | null>(null);
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<"" | VisitStatus>("");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [editing, setEditing] = useState<Visit | null>(null);
  const [deleting, setDeleting] = useState<Visit | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const loadStats = useCallback(() => {
    api<VisitStats>("/api/visits/stats").then(setStats).catch(() => {});
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: "8" });
      if (tab) qs.set("status", tab);
      if (debounced) qs.set("search", debounced);
      setData(await api<Paginated<Visit>>(`/api/visits?${qs}`));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, tab, debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load(); }, [load]);
  useEffect(() => { loadStats(); }, [loadStats]);

  const confirmDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await api(`/api/visits/${deleting._id}`, { method: "DELETE" });
      toast.success("Booking deleted");
      setDeleting(null);
      if (data && data.docs.length === 1 && page > 1) setPage(page - 1);
      else load();
      loadStats();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Total bookings" value={stats?.total ?? "–"} tone="text-slate-800" />
        <Stat label="People who booked a visit" value={stats?.uniquePeople ?? "–"} tone="text-primary" />
        <Stat label="Pending approval" value={stats?.pending ?? "–"} tone="text-orange-600" />
        <Stat label="Upcoming visits" value={stats?.upcoming ?? "–"} tone="text-emerald-600" />
      </div>
      {stats && (
        <p className="mb-6 text-xs text-slate-500">
          Confirmed {stats.confirmed} · Completed {stats.completed} · Cancelled {stats.cancelled} · Visiting today {stats.today}
        </p>
      )}

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="inline-flex flex-wrap rounded-lg bg-slate-200/70 p-1">
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
        <div className="relative w-full sm:w-72">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, phone..." className="input !pl-10" />
        </div>
      </div>

      {loading && !data ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200/70" />)}</div>
      ) : data && data.docs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <CalendarDaysIcon className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-medium text-slate-700">{debounced || tab ? "Nothing matches your filters" : "No campus visit bookings yet"}</p>
        </div>
      ) : (
        <div className={`space-y-3 ${loading ? "opacity-60" : ""}`}>
          {data?.docs.map((v) => (
            <article key={v._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-800">{v.name}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLE[v.status]}`}>{v.status}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <a href={`mailto:${v.email}`} className="inline-flex items-center gap-1 hover:text-primary"><EnvelopeIcon className="h-4 w-4" />{v.email}</a>
                    <a href={`tel:${v.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-primary"><PhoneIcon className="h-4 w-4" />{v.phone}</a>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(v)} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-primary" title="Schedule / update"><PencilSquareIcon className="h-5 w-5" />Schedule</button>
                  <button onClick={() => setDeleting(v)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Delete"><TrashIcon className="h-5 w-5" /></button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1 text-slate-600"><CalendarDaysIcon className="h-4 w-4 text-slate-400" />Requested: <b className="font-medium">{formatDate(v.preferredDate)}</b></span>
                {v.scheduledDate && <span className="text-slate-600">Scheduled: <b className="font-medium text-sky-700">{formatDate(v.scheduledDate)}</b></span>}
                {v.purpose && <span className="text-slate-400">From: {v.purpose}</span>}
              </div>
              {v.message && <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-600">{v.message}</p>}
              {v.adminNote && <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">Note: {v.adminNote}</p>}
            </article>
          ))}
        </div>
      )}

      {data && <Pagination page={data.page} totalPages={data.totalPages} totalDocs={data.totalDocs} onChange={setPage} />}

      {editing && (
        <ScheduleModal
          key={editing._id}
          visit={editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); loadStats(); }}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete booking"
          message={`Delete the visit booking from "${deleting.name}"? This cannot be undone.`}
          loading={deleteLoading}
          onConfirm={confirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}

export default function VisitsPage() {
  return (
    <AdminLayout title="Campus Visits" subtitle="Visit bookings from the website – confirm, reschedule or cancel">
      <VisitsContent />
    </AdminLayout>
  );
}
