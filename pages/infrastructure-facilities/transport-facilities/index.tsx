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
  ArrowRightIcon,
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
   Put your file in /public/infra/ and update the name if needed.
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
  headerBg: string;
  routes: {
    name: string;
    stops?: string[];
    note?: string;
  }[];
};

const routeGroups: RouteGroup[] = [
  {
    id: "bus",
    label: "Bus Routes",
    icon: TruckIcon,
    accent: "text-primary",
    headerBg: "bg-orange-50 border-orange-200",
    routes: [
      { name: "Tharamangalam" },
      { name: "Omalur" },
      { name: "Elampillai" },
    ],
  },
  {
    id: "cab",
    label: "Cab Routes",
    icon: MapIcon,
    accent: "text-blue-600",
    headerBg: "bg-blue-50 border-blue-200",
    routes: [
      { name: "Shankar Nagar" },
      { name: "Seelanayakanpatti" },
      { name: "3 Roads" },
      { name: "Gugai" },
      { name: "Gorimedu" },
      { name: "Alagapuram" },
      { name: "Mamagam" },
      { name: "Steel Plant" },
      { name: "Narosothipatti" },
      { name: "Kuranguchavadi" },
      { name: "Periya Pudhur" },
    ],
  },
];

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
            ROUTES SECTION
        ========================= */}
        <section
          id="routes"
          className="relative max-w-7xl mx-auto px-4 pb-24"
        >
          <Reveal>
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                <MapPinIcon className="w-4 h-4" />
                Coverage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Our Routes
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We connect students across Salem and nearby localities through a
                well-planned network of bus and cab routes.
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

          {/* Active route panel */}
          {routeGroups
            .filter((g) => g.id === activeTab)
            .map((group) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.id}>
                  <div className="relative rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    {/* map-like dotted background */}
                    <div
                      className="absolute inset-0 opacity-[0.35] pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    ></div>

                    <div
                      className={`relative flex items-center gap-3 px-5 sm:px-6 py-4 border-b ${group.headerBg}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${group.accent}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {group.label}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {group.routes.length} route
                          {group.routes.length > 1 ? "s" : ""} covered
                        </p>
                      </div>
                    </div>

                    <ul className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 p-5 sm:p-6">
                      {group.routes.map((route, idx) => (
                        <li
                          key={`${group.id}-${idx}`}
                          className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          {/* timeline marker */}
                          <div className="flex flex-col items-center pt-1">
                            <span
                              className={`w-2.5 h-2.5 rounded-full ring-4 ring-white shadow ${
                                group.id === "bus"
                                  ? "bg-primary"
                                  : "bg-blue-600"
                              }`}
                            ></span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <MapPinIcon
                                className={`w-4 h-4 shrink-0 ${group.accent}`}
                              />
                              <span className="font-medium text-gray-900 text-sm">
                                {route.name}
                              </span>
                            </div>
                            {route.note && (
                              <p className="text-xs text-gray-500 mt-0.5 pl-6">
                                {route.note}
                              </p>
                            )}
                          </div>

                          <ArrowRightIcon className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors mt-1.5" />
                        </li>
                      ))}
                    </ul>

                 
                  </div>
                </Reveal>
              );
            })}
        </section>
      </main>
    </>
  );
}