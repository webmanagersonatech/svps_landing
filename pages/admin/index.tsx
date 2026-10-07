import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { api, getToken, PASSWORD_KEY, setSession, AdminUser } from "../../lib/adminApi";

export default function AdminLogin() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Already logged in? Go straight to the dashboard.
  useEffect(() => {
    if (getToken()) router.replace("/admin/dashboard");
    else setChecked(true);
  }, [router]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api<{ token: string; user: AdminUser }>("/api/auth/login", {
        method: "POST",
        withAuth: false,
        // backend expects the password AES-encrypted
        json: { email: email.trim(), password: CryptoJS.AES.encrypt(password, PASSWORD_KEY).toString() },
      });
      setSession(data.token, data.user);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  if (!checked) return <div className="min-h-screen bg-slate-50" />;

  return (
    <>
      <Head>
        <title>Admin Login • SVPS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#18596d] to-[#0b2f3b] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/android-chrome-192x192.png" alt="SVPS" className="h-12 w-12 rounded-xl" />
            <span className="text-lg font-semibold">Sona Valliappa Public School</span>
          </div>
          <div className="relative">
            <h2 className="text-4xl font-bold leading-tight">Manage your school website,<br />all in one place.</h2>
            <p className="mt-4 max-w-md text-white/70">Publish activities, news and events with photo galleries and press releases in a few clicks.</p>
          </div>
          <p className="relative text-xs text-white/50">© {new Date().getFullYear()} SVPS. Admin access only.</p>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center bg-slate-50 px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/android-chrome-192x192.png" alt="SVPS" className="h-11 w-11 rounded-xl" />
              <span className="font-semibold text-slate-800">SVPS Admin</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-500">Sign in to your admin account to continue.</p>

            <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@school.com" className="input !pl-10" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input !pl-10 !pr-10" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Toggle password">
                    {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full !py-2.5">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
