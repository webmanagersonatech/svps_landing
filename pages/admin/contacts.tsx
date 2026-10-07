import { useCallback, useEffect, useState } from "react";
import { EnvelopeIcon, MagnifyingGlassIcon, PhoneIcon, TrashIcon } from "@heroicons/react/24/outline";
import AdminLayout from "../../components/admin/AdminLayout";
import { ConfirmDialog } from "../../components/admin/Modal";
import Pagination from "../../components/admin/Pagination";
import { useToast } from "../../components/admin/Toast";
import { Contact, ContactStats, ContactStatus, Paginated, api } from "../../lib/adminApi";

const STATUS_STYLE: Record<ContactStatus, string> = {
  new: "bg-orange-100 text-primary",
  read: "bg-sky-100 text-sky-700",
  replied: "bg-emerald-100 text-emerald-700",
};

const TABS: { value: "" | ContactStatus; label: string }[] = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
];

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function Stat({ label, value, tone }: { label: string; value: number | string; tone: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}

function ContactsContent() {
  const toast = useToast();
  const [data, setData] = useState<Paginated<Contact> | null>(null);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<"" | ContactStatus>("");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [deleting, setDeleting] = useState<Contact | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const loadStats = useCallback(() => {
    api<ContactStats>("/api/contact/stats").then(setStats).catch(() => {});
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: "8" });
      if (tab) qs.set("status", tab);
      if (debounced) qs.set("search", debounced);
      setData(await api<Paginated<Contact>>(`/api/contact?${qs}`));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, tab, debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load(); }, [load]);
  useEffect(() => { loadStats(); }, [loadStats]);

  const setStatus = async (c: Contact, status: ContactStatus) => {
    try {
      await api(`/api/contact/${c._id}`, { method: "PATCH", json: { status } });
      load();
      loadStats();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await api(`/api/contact/${deleting._id}`, { method: "DELETE" });
      toast.success("Message deleted");
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
        <Stat label="Total messages" value={stats?.total ?? "–"} tone="text-slate-800" />
        <Stat label="People who contacted us" value={stats?.uniquePeople ?? "–"} tone="text-primary" />
        <Stat label="New (unread)" value={stats?.new ?? "–"} tone="text-orange-600" />
        <Stat label="Received today" value={stats?.today ?? "–"} tone="text-emerald-600" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
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
        <div className="relative w-full sm:w-72">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, message..." className="input !pl-10" />
        </div>
      </div>

      {loading && !data ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200/70" />)}</div>
      ) : data && data.docs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <EnvelopeIcon className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-medium text-slate-700">{debounced || tab ? "Nothing matches your filters" : "No contact messages yet"}</p>
        </div>
      ) : (
        <div className={`space-y-3 ${loading ? "opacity-60" : ""}`}>
          {data?.docs.map((c) => (
            <article key={c._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-800">{c.name}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLE[c.status]}`}>{c.status}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 hover:text-primary"><EnvelopeIcon className="h-4 w-4" />{c.email}</a>
                    {c.phone && <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-primary"><PhoneIcon className="h-4 w-4" />{c.phone}</a>}
                    <span className="text-slate-400">{formatDateTime(c.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={c.status}
                    onChange={(e) => setStatus(c, e.target.value as ContactStatus)}
                    className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700"
                    aria-label="Change status"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                  <button onClick={() => setDeleting(c)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Delete"><TrashIcon className="h-5 w-5" /></button>
                </div>
              </div>
              {c.subject && <p className="mt-3 text-sm font-medium text-slate-700">{c.subject}</p>}
              <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-600">{c.message}</p>
            </article>
          ))}
        </div>
      )}

      {data && <Pagination page={data.page} totalPages={data.totalPages} totalDocs={data.totalDocs} onChange={setPage} />}

      {deleting && (
        <ConfirmDialog
          title="Delete message"
          message={`Delete the message from "${deleting.name}"? This cannot be undone.`}
          loading={deleteLoading}
          onConfirm={confirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}

export default function ContactsPage() {
  return (
    <AdminLayout title="Contact Messages" subtitle="Messages sent from the Contact Us page">
      <ContactsContent />
    </AdminLayout>
  );
}
