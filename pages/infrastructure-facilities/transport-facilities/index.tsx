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

function Reveal({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
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
          breadcrumbs={["Home", "Infrastructure facilities", "Transport"]}
        />

        {/* INTRO */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 font-serif leading-snug">
                Safe Journeys,
                <span className="text-primary block">Every Single Day</span>
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed text-justify ">
                Our safe, reliable, and comfortable school transport service is designed
                to provide students with a smooth and convenient journey to and from
                school. Our buses are maintained with care and operated with a strong
                focus on student safety, comfort, and punctuality.
              </p>

              <p className="text-gray-600 leading-relaxed text-justify ">
                With responsible drivers and supportive staff, we strive to create a
                secure and pleasant travel experience for every student. Our transport
                service gives parents peace of mind while ensuring students reach school
                and return home comfortably and safely.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative group ">
              {/* back layers */}
              <div className="absolute top-4 left-4 w-full h-full bg-primary/10 rounded-2xl"></div>
              <div className="absolute top-2 left-2 w-full h-full bg-primary/20 rounded-2xl"></div>

              {/* main */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/infra/transport.webp"
                  alt="School Bus"
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-[240px] object-cover"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* =========================
            LOCAL VIDEO REEL
        ========================= */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
              {/* TEXT SIDE */}
              <div className="order-2 md:order-1">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <PlayIcon className="w-3.5 h-3.5" />
                  Watch the Reel
                </span>

                <h2 className="mt-3 text-2xl md:text-3xl font-bold text-secondary font-serif leading-snug">
                  A Glimpse of Our
                  <span className="text-primary block">Transport in Action</span>
                </h2>

                <p className="mt-3 text-gray-600 leading-relaxed">
                  Watch how our buses, drivers, and support staff work together every
                  day to keep students safe on the road. Real moments from our campus
                  transport, captured on film.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheckIcon className="w-4 h-4 text-primary" />
                    Safety-first
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4 text-primary" />
                    On time
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UserGroupIcon className="w-4 h-4 text-primary" />
                    Trained staff
                  </span>
                </div>
              </div>

              {/* VIDEO SIDE */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-full max-w-[260px]">
                  {/* back decorative layers */}
                  <div className="absolute top-3 -left-3 w-full h-full bg-primary/10 rounded-2xl" />
                  <div className="absolute top-1.5 -left-1.5 w-full h-full bg-primary/20 rounded-2xl" />

                  {/* video card */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-[9/16] group/video">
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

                    <h3 className=" font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}