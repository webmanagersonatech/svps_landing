import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Bars3Icon,
  HomeIcon,
  PhotoIcon,
  NewspaperIcon,
  ArrowRightOnRectangleIcon,
  GlobeAltIcon,
  XMarkIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { AdminUser, clearSession, getToken, getUser } from "../../lib/adminApi";
import { ToastProvider } from "./Toast";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
  { href: "/admin/activities", label: "Activities", icon: PhotoIcon },
  { href: "/admin/news-events", label: "News & Events", icon: NewspaperIcon },
  { href: "/admin/visits", label: "Campus Visits", icon: CalendarDaysIcon },
  { href: "/admin/contacts", label: "Contact Messages", icon: EnvelopeIcon },
];

export default function AdminLayout({ title, subtitle, actions, children }: { title: string; subtitle?: string; actions?: ReactNode; children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin");
      return;
    }
    setUser(getUser());
    setReady(true);
  }, [router]);

  useEffect(() => setOpen(false), [router.pathname]);

  const logout = () => {
    clearSession();
    router.replace("/admin");
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
      </div>
    );
  }

  const initials = `${user?.firstname?.[0] || "A"}${user?.lastname?.[0] || ""}`.toUpperCase();

  return (
    <ToastProvider>
      <Head>
        <title>{`${title} • SVPS Admin`}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        {open && <div className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden" onClick={() => setOpen(false)} />}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gradient-to-b from-[#18596d] to-[#0b2f3b] text-white transition-transform lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/android-chrome-192x192.png" alt="SVPS" className="h-10 w-10 rounded-lg" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">SVPS Admin</p>
                <p className="text-[11px] text-white/60">Content manager</p>
              </div>
            </div>
            <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-2 flex-1 space-y-1 px-3">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = router.pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white">
              <GlobeAltIcon className="h-5 w-5" />
              View website
            </a>
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold">{initials}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user ? `${user.firstname} ${user.lastname}` : "Admin"}</p>
                <p className="truncate text-xs capitalize text-white/60">{user?.role}</p>
              </div>
              <button onClick={logout} title="Log out" className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="lg:pl-64">
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-8">
            <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-semibold text-slate-800 sm:text-xl">{title}</h1>
              {subtitle && <p className="hidden truncate text-xs text-slate-500 sm:block">{subtitle}</p>}
            </div>
            {actions}
          </header>
          <main className="px-4 py-6 sm:px-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
