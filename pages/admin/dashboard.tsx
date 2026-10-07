import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { PhotoIcon, NewspaperIcon, CalendarDaysIcon, PlusIcon, EnvelopeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import AdminLayout from "../../components/admin/AdminLayout";
import { Activity, ContactStats, NewsEvent, Paginated, VisitStats, api, fileUrl, getUser } from "../../lib/adminApi";
import { formatDate } from "../../lib/adminUtils";

type Stats = { activities: number; news: number; events: number };

function StatCard({ label, value, icon, tone, href }: { label: string; value: number | string; icon: ReactNode; tone: string; href: string }) {
  return (
    <Link href={href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}>{icon}</div>
      </div>
    </Link>
  );
}

function Thumb({ src }: { src?: string }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={fileUrl(src)} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
  ) : (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
      <PhotoIcon className="h-6 w-6" />
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [recentNews, setRecentNews] = useState<NewsEvent[]>([]);
  const [visitStats, setVisitStats] = useState<VisitStats | null>(null);
  const [contactStats, setContactStats] = useState<ContactStats | null>(null);
  const [error, setError] = useState("");
  const user = getUser();

  useEffect(() => {
    (async () => {
      try {
        const [a, n, e, ra, rn] = await Promise.all([
          api<Paginated<Activity>>("/api/activities?limit=1"),
          api<Paginated<NewsEvent>>("/api/newsandevents?category=news&limit=1"),
          api<Paginated<NewsEvent>>("/api/newsandevents?category=event&limit=1"),
          api<Paginated<Activity>>("/api/activities?limit=5"),
          api<Paginated<NewsEvent>>("/api/newsandevents?limit=5"),
        ]);
        setStats({ activities: a.totalDocs, news: n.totalDocs, events: e.totalDocs });
        setRecentActivities(ra.docs);
        setRecentNews(rn.docs);
      } catch (err: any) {
        setError(err.message);
      }
    })();
    // visitor counts load separately so a problem here never hides the rest of the dashboard
    api<VisitStats>("/api/visits/stats").then(setVisitStats).catch(() => {});
    api<ContactStats>("/api/contact/stats").then(setContactStats).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your website content">
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#18596d] to-[#1f7a94] p-6 text-white shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold sm:text-2xl">Hello, {user?.firstname || "Admin"} 👋</h2>
        <p className="mt-1 text-sm text-white/80">Here&apos;s what&apos;s on your website right now.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/admin/activities?new=1" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#18596d] hover:bg-white/90">
            <PlusIcon className="h-4 w-4" /> New activity
          </Link>
          <Link href="/admin/news-events?new=1" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:brightness-95">
            <PlusIcon className="h-4 w-4" /> New news / event
          </Link>
        </div>
      </div>

      {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Activities" value={stats?.activities ?? "–"} href="/admin/activities" tone="bg-orange-100 text-primary" icon={<PhotoIcon className="h-6 w-6" />} />
        <StatCard label="News" value={stats?.news ?? "–"} href="/admin/news-events" tone="bg-sky-100 text-sky-600" icon={<NewspaperIcon className="h-6 w-6" />} />
        <StatCard label="Events" value={stats?.events ?? "–"} href="/admin/news-events" tone="bg-emerald-100 text-emerald-600" icon={<CalendarDaysIcon className="h-6 w-6" />} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Campus visit bookings" value={visitStats?.total ?? "–"} href="/admin/visits" tone="bg-violet-100 text-violet-600" icon={<UserGroupIcon className="h-6 w-6" />} />
        <StatCard label="Pending visit requests" value={visitStats?.pending ?? "–"} href="/admin/visits" tone="bg-orange-100 text-primary" icon={<CalendarDaysIcon className="h-6 w-6" />} />
        <StatCard label="Contact messages" value={contactStats?.total ?? "–"} href="/admin/contacts" tone="bg-sky-100 text-sky-600" icon={<EnvelopeIcon className="h-6 w-6" />} />
        <StatCard label="Unread messages" value={contactStats?.new ?? "–"} href="/admin/contacts" tone="bg-rose-100 text-rose-600" icon={<EnvelopeIcon className="h-6 w-6" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Recent activities</h3>
            <Link href="/admin/activities" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          {recentActivities.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">No activities yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentActivities.map((a) => (
                <li key={a._id} className="flex items-center gap-3 py-3">
                  <Thumb src={a.thumbnail || a.galleries[0]} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{a.topic}</p>
                    <p className="text-xs text-slate-400">{a.galleries.length} photo(s) · {formatDate(a.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Recent news &amp; events</h3>
            <Link href="/admin/news-events" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          {recentNews.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">Nothing published yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentNews.map((n) => (
                <li key={n._id} className="flex items-center gap-3 py-3">
                  <Thumb src={n.thumbnail || n.galleries[0]} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{n.title}</p>
                    <p className="text-xs text-slate-400">{n.startDate ? formatDate(n.startDate) : formatDate(n.createdAt)}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${n.category === "event" ? "bg-orange-100 text-primary" : "bg-sky-100 text-sky-700"}`}>
                    {n.category}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
