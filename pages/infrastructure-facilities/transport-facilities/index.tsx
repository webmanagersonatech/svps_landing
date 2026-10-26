import Image from "next/image";
import SEO from "../../../components/SEO";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  TruckIcon,
  MapIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  PhoneIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MapPinIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

/* =========================
   REVEAL
========================= */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================
   LOCAL VIDEO PATH
========================= */
const REEL_VIDEO_SRC = "/infra/Bus.webm";

/* =========================
   ROUTE DATA
========================= */
type RouteGroup = {
  id: string;
  label: string;
  icon: typeof TruckIcon;
  accent: string;
  accentBg: string;
  accentBorder: string;
  headerBg: string;
  routes: {
    name: string;
    stops: string[];
  }[];
};

const routeGroups: RouteGroup[] = [
  {
    id: "bus",
    label: "Bus Routes",
    icon: TruckIcon,
    accent: "text-primary",
    accentBg: "bg-primary",
    accentBorder: "border-primary",
    headerBg: "bg-orange-50 border-orange-200",
    routes: [
      {
        name: "Tharamangalam",
        stops: ["Tharamangalam", "Omalur Main Rd", "Sona Valliappa School"],
      },
      {
        name: "Omalur",
        stops: ["Omalur", "Salem Bypass", "Sona Valliappa School"],
      },
      {
        name: "Elampillai",
        stops: ["Elampillai", "Mettur Rd", "Sona Valliappa School"],
      },
    ],
  },
  {
    id: "cab",
    label: "Cab Routes",
    icon: MapIcon,
    accent: "text-blue-600",
    accentBg: "bg-blue-600",
    accentBorder: "border-blue-500",
    headerBg: "bg-blue-50 border-blue-200",
    routes: [
      { name: "Shankar Nagar", stops: ["Shankar Nagar", "Sona Valliappa School"] },
      { name: "Seelanayakanpatti", stops: ["Seelanayakanpatti", "Sona Valliappa School"] },
      { name: "3 Roads", stops: ["3 Roads", "Sona Valliappa School"] },
      { name: "Gugai", stops: ["Gugai", "Sona Valliappa School"] },
      { name: "Gorimedu", stops: ["Gorimedu", "Sona Valliappa School"] },
      { name: "Alagapuram", stops: ["Alagapuram", "Sona Valliappa School"] },
      { name: "Mamagam", stops: ["Mamagam", "Sona Valliappa School"] },
      { name: "Steel Plant", stops: ["Steel Plant", "Sona Valliappa School"] },
      { name: "Narosothipatti", stops: ["Narosothipatti", "Sona Valliappa School"] },
      { name: "Kuranguchavadi", stops: ["Kuranguchavadi", "Sona Valliappa School"] },
      { name: "Periya Pudhur", stops: ["Periya Pudhur", "Sona Valliappa School"] },
    ],
  },
];

/* =========================
   ANIMATED BUS/CAB ICON (SVG)
========================= */
function BusSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 16V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a1 1 0 0 1-1 1h-1.05a2.5 2.5 0 0 1-4.9 0h-3.1a2.5 2.5 0 0 1-4.9 0H5a1 1 0 0 1-1-1Zm2-1h1.05a2.5 2.5 0 0 1 4.9 0h3.1a2.5 2.5 0 0 1 4.9 0H19V6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v9Zm1.5 3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  );
}

function CabSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1.05a2.5 2.5 0 0 1-4.9 0h-4.1a2.5 2.5 0 0 1-4.9 0H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Zm2.2-.5h9.6l-.9-2.6a.5.5 0 0 0-.5-.4H8.6a.5.5 0 0 0-.5.4L7.2 10.5ZM8 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  );
}

/* =========================
   ANIMATED ROUTE CARD
   Renders a horizontal path with stops.
   A vehicle icon animates left→right repeatedly.
========================= */
function AnimatedRoute({
  routeName,
  stops,
  variant,
  index,
}: {
  routeName: string;
  stops: string[];
  variant: "bus" | "cab";
  index: number;
}) {
  const isBus = variant === "bus";
  const pathColor = isBus ? "bg-primary" : "bg-blue-500";
  const dotColor = isBus ? "bg-primary" : "bg-blue-600";
  const ringColor = isBus ? "ring-orange-100" : "ring-blue-100";
  const vehicleColor = isBus ? "text-primary" : "text-blue-600";
  const Vehicle = isBus ? BusSvg : CabSvg;
  const durationSec = 4 + (index % 3); // subtle variety per card

  return (
    <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 overflow-hidden">
      {/* dotted map background */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center ${
              isBus ? "bg-orange-50" : "bg-blue-50"
            }`}
          >
            <Vehicle className={`w-4 h-4 ${vehicleColor}`} />
          </span>
          <h3 className="text-sm font-semibold text-gray-900">{routeName}</h3>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
          {isBus ? "Bus" : "Cab"}
        </span>
      </div>

      {/* Route track */}
      <div className="relative h-10 mb-3">
        {/* track line */}
        <div
          className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] ${pathColor} opacity-20 rounded-full`}
        />

        {/* animated dashed trail */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full route-dash-anim"
          style={
            {
              backgroundImage: isBus
                ? "repeating-linear-gradient(90deg,#ea580c 0 8px,transparent 8px 16px)"
                : "repeating-linear-gradient(90deg,#2563eb 0 8px,transparent 8px 16px)",
              backgroundSize: "16px 3px",
              animationDuration: `${durationSec}s`,
            } as React.CSSProperties
          }
        />

        {/* stop dots */}
        <div className="absolute inset-0 flex items-center justify-between">
          {stops.map((stop, i) => (
            <div key={i} className="flex flex-col items-center relative">
              <span
                className={`w-2.5 h-2.5 rounded-full ring-4 ${ringColor} ${dotColor} relative z-10`}
              />
            </div>
          ))}
        </div>

        {/* moving vehicle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 route-bus-anim z-20"
          style={
            {
              animationDuration: `${durationSec}s`,
            } as React.CSSProperties
          }
        >
          <div
            className={`w-7 h-7 rounded-full shadow-md flex items-center justify-center bg-white ring-2 ${
              isBus ? "ring-orange-400" : "ring-blue-500"
            }`}
          >
            <Vehicle className={`w-4 h-4 ${vehicleColor}`} />
          </div>
        </div>
      </div>

      {/* Stop labels */}
      <div className="relative flex items-start justify-between gap-1">
        {stops.map((stop, i) => (
          <div
            key={i}
            className={`text-[10px] leading-tight text-center flex-1 ${
              i === stops.length - 1
                ? "font-semibold text-gray-900"
                : "text-gray-500"
            }`}
          >
            {stop}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function TransportPage() {
  const features = [
    {
      icon: TruckIcon,
      title: "Wide Transport Network",
      desc: "School buses cover major routes ensuring easy access.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Safety First",
      desc: "GPS tracking & trained staff for student safety.",
    },
    {
      icon: ClockIcon,
      title: "Punctual Timings",
      desc: "Well-planned schedules for timely travel.",
    },
    {
      icon: MapIcon,
      title: "Route Optimization",
      desc: "Efficient routes for faster commute.",
    },
    {
      icon: UserGroupIcon,
      title: "Comfort Seating",
      desc: "Spacious buses for a relaxed journey.",
    },
    {
      icon: PhoneIcon,
      title: "Parent Updates",
      desc: "Stay informed with regular updates.",
    },
  ];

  /* ---- Video refs & state ---- */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  /* ---- Route tab state ---- */
  const [activeTab, setActiveTab] = useState<string>("bus");

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <>
      {/* ====== CSS keyframes for animations ====== */}
      <style jsx global>{`
        @keyframes routeBusDrive {
          0% {
            left: 0%;
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 1.75rem);
            opacity: 0;
          }
        }
        @keyframes routeDash {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 16px 0;
          }
        }
        .route-bus-anim {
          animation-name: routeBusDrive;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: normal;
        }
        .route-dash-anim {
          animation-name: routeDash;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          width: 100%;
        }
      `}</style>

      <SEO
        title="Transport Facilities"
        description="Safe and reliable school transport facilities connecting students across Salem to Sona Valliappa Public School."
        path="/infrastructure-facilities/transport-facilities"
      />

      <main className="bg-gradient-to-b from-slate-50 to-white">
        {/* HEADER */}
        <PageHeader
          title="Transport Facilities"
          subtitle="Safe, reliable, and efficient transportation for every student."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Infrastructure Facilities", href: "/infrastructure-facilities" },
            {
              label: "Transport",
              href: "/infrastructure-facilities/transport-facilities",
            },
          ]}
        />

        <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-12 items-stretch">
          <Reveal className="xl:col-span-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 font-serif leading-snug">
                Safe Journeys,
                <span className="text-primary block">Every Single Day</span>
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed text-justify">
                Our safe, reliable, and comfortable school transport service is designed
                to provide students with a smooth and convenient journey to and from
                school. Our buses are maintained with care and operated with a strong
                focus on student safety, comfort, and punctuality.
              </p>

              <p className="text-gray-600 mb-4 leading-relaxed text-justify">
                With responsible drivers and supportive staff, we strive to create a
                secure and pleasant travel experience for every student. Our transport
                service gives parents peace of mind while ensuring students reach school
                and return home comfortably and safely.
              </p>

              <p className="text-gray-600 leading-relaxed text-justify">
                Every bus is equipped with GPS tracking, CCTV monitoring, and a trained
                attendant on board, giving parents complete visibility and confidence
                throughout their child's daily commute.
              </p>
            </div>
          </Reveal>

          <Reveal className="xl:col-span-3">
            <div className="relative group h-full">
              {/* back layers */}
              <div className="absolute top-4 left-4 w-full h-full bg-primary/10 rounded-2xl"></div>
              <div className="absolute top-2 left-2 w-full h-full bg-primary/20 rounded-2xl"></div>

              {/* main video card — matches left column height */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black h-full min-h-[320px] group/video">
                <video
                  ref={videoRef}
                  src={REEL_VIDEO_SRC}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted={isMuted}
                  loop
                  preload="metadata"
                  poster="/infra/transport.webp"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Click-to-toggle overlay */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {!isPlaying && (
                    <span className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <PlayIcon className="w-5 h-5 text-primary ml-0.5" />
                    </span>
                  )}
                </button>

                {/* Controls bar */}
                <div className="absolute bottom-2 right-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <SpeakerXMarkIcon className="w-3.5 h-3.5" />
                    ) : (
                      <SpeakerWaveIcon className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-3.5 h-3.5" />
                    ) : (
                      <PlayIcon className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Why Choose Our Transport?
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i}>
                  <div className="bg-white rounded-xl p-5 border-t-4 border-orange-500 border-x border-b border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-50 mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* =========================
            ANIMATED ROUTES SECTION
        ========================= */}
    <section id="routes" className="relative max-w-7xl mx-auto px-4 pb-24">
  <Reveal>
    <div className="text-center mb-10">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
        <MapPinIcon className="w-4 h-4" />
        Live Routes
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Our Routes
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Watch how our buses and cabs travel from each locality straight to the
        school campus.
      </p>
    </div>
  </Reveal>

  {/* Tabs */}
  <Reveal>
    <div className="flex justify-center mb-8">
      <div
        role="tablist"
        aria-label="Route categories"
        className="inline-flex p-1 rounded-xl bg-slate-100 shadow-inner"
      >
        {routeGroups.map((group) => {
          const Icon = group.icon;
          const active = activeTab === group.id;
          return (
            <button
              key={group.id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(group.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                active
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {group.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {group.routes.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </Reveal>

  {/* MAP PANEL — single shared container, no per-route cards */}
  {routeGroups
    .filter((g) => g.id === activeTab)
    .map((group) => {
      const isBus = group.id === "bus";
      const Vehicle = isBus ? BusSvg : CabSvg;
      const accentText = isBus ? "text-primary" : "text-blue-600";
      const trackColor = isBus ? "#ea580c" : "#2563eb";

      return (
        <Reveal key={group.id}>
          <div className="relative border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* dotted map background */}
            <div
              className="absolute inset-0 opacity-[0.35] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* panel header */}
            <div className="relative flex items-center justify-between px-5 sm:px-7 py-4 border-b border-gray-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isBus ? "bg-orange-50" : "bg-blue-50"
                  }`}
                >
                  <Vehicle className={`w-5 h-5 ${accentText}`} />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {group.label}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {group.routes.length} routes • All lead to Sona Valliappa School
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live tracking
              </div>
            </div>

            {/* route rows — one per route, drawn as roads */}
            <div className="relative divide-y divide-gray-100">
              {group.routes.map((route, idx) => {
                const dur = 5 + (idx % 4); // varied speed per row
                return (
                  <div
                    key={route.name}
                    className="relative px-5 sm:px-7 py-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr] items-center gap-3 sm:gap-6">
                      {/* Route name */}
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${accentText.replace(
                            "text-",
                            "bg-"
                          )}`}
                        />
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {route.name}
                        </span>
                      </div>

                      {/* The road / track */}
                      <div className="relative h-9">
                        {/* base line */}
                        <div
                          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full"
                          style={{
                            backgroundColor: trackColor,
                            opacity: 0.18,
                          }}
                        />

                        {/* animated dashed trail */}
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full route-dash-anim"
                          style={
                            {
                              width: "100%",
                              backgroundImage: `repeating-linear-gradient(90deg,${trackColor} 0 6px,transparent 6px 14px)`,
                              backgroundSize: "14px 2px",
                              animationDuration: `${dur}s`,
                            } as React.CSSProperties
                          }
                        />

                        {/* stop dots */}
                        <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                          {route.stops.map((stop, i) => (
                            <span
                              key={i}
                              title={stop}
                              className={`w-2.5 h-2.5 rounded-full ring-4 ring-white shadow-sm ${
                                i === route.stops.length - 1
                                  ? isBus
                                    ? "bg-primary"
                                    : "bg-blue-600"
                                  : "bg-gray-400"
                              }`}
                            />
                          ))}
                        </div>

                        {/* moving vehicle */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 route-bus-anim z-10"
                          style={
                            { animationDuration: `${dur}s` } as React.CSSProperties
                          }
                        >
                          <div
                            className={`w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center ring-2 ${
                              isBus ? "ring-orange-400" : "ring-blue-500"
                            }`}
                          >
                            <Vehicle className={`w-4 h-4 ${accentText}`} />
                          </div>
                        </div>

                        {/* stop labels below */}
                        <div className="absolute top-full left-0 right-0 mt-1 flex items-start justify-between gap-1 pointer-events-none">
                          {route.stops.map((stop, i) => (
                            <span
                              key={i}
                              className={`text-[9px] leading-tight text-center flex-1 truncate ${
                                i === route.stops.length - 1
                                  ? "font-semibold text-gray-800"
                                  : "text-gray-400"
                              }`}
                            >
                              {stop}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          
          </div>
        </Reveal>
      );
    })}
</section>
      </main>
    </>
  );
}