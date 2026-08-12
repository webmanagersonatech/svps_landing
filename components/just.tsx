import Head from "next/head";
import { PageHeader } from "./PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  UsersIcon,
  SpeakerWaveIcon,
  LightBulbIcon,
  VideoCameraIcon,
  SunIcon,
  MicrophoneIcon,
  TicketIcon,
  StarIcon,
  BuildingLibraryIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
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
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

/* =========================
   FILMSTRIP GALLERY
========================= */
interface ShotImage {
  src: string;
  alt: string;
  title: string;
}

function AuditoriumFilmstrip() {
  const [selectedImage, setSelectedImage] = useState<ShotImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const shots: ShotImage[] = [
    {
      src: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=900&q=80",
      alt: "Auditorium stage",
      title: "The Main Stage",
    },
    {
      src: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=900&q=80",
      alt: "Tiered auditorium seating",
      title: "Tiered Seating",
    },
    {
      src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&q=80",
      alt: "Concert lighting rig",
      title: "Stage Lighting",
    },
    {
      src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&q=80",
      alt: "School event on stage",
      title: "Annual Day",
    },
    {
      src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&q=80",
      alt: "Auditorium hall wide shot",
      title: "The Grand Hall",
    },
    {
      src: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80",
      alt: "Award ceremony",
      title: "Award Ceremony",
    },
    {
      src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80",
      alt: "Empty stage with curtains",
      title: "Centre Stage",
    },
  ];

  const openLightbox = (image: ShotImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigate = (direction: "prev" | "next") => {
    let newIndex = currentIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? shots.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === shots.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(shots[newIndex]);
  };

  return (
    <div className="relative">
      <div className="flex gap-5 overflow-x-auto pb-6 px-4 md:px-[calc((100%-1280px)/2+1rem)] snap-x snap-mandatory scrollbar-thin">
        {shots.map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(img, idx)}
            className="group relative flex-shrink-0 w-[220px] md:w-[280px] h-[340px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer snap-start shadow-2xl"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <div className="h-[2px] w-8 bg-primary mb-2 transition-all duration-500 group-hover:w-14" />
              <p className="text-white font-semibold text-lg font-serif">
                {img.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white hover:text-primary transition-colors"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("prev");
            }}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-white/10 rounded-full p-2"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("next");
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-white/10 rounded-full p-2"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>
          <div
            className="max-w-4xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="text-white text-center font-serif text-lg mt-4">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function AuditoriumPage() {
  const stats = [
    { value: "1200+", label: "Seats" },
    { value: "5000", label: "Sq. Ft. Stage" },
    { value: "100%", label: "Air Conditioned" },
    { value: "360°", label: "Sound Coverage" },
  ];

  const rows = [
    {
      icon: MicrophoneIcon,
      title: "Professional Acoustics",
      desc: "Acoustically engineered walls and ceilings deliver crystal-clear sound to every seat in the house, from a whispered dialogue to a full orchestra.",
      img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=900&q=80",
    },
    {
      icon: LightBulbIcon,
      title: "Dynamic Stage Lighting",
      desc: "A programmable lighting rig sets the mood for dance, drama and cultural performances — turning every act into a spectacle.",
      img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&q=80",
    },
    {
      icon: VideoCameraIcon,
      title: "Audio-Visual & Recording",
      desc: "HD projection, LED screens and live recording capability ensure no moment on stage goes uncaptured.",
      img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80",
    },
  ];

  const chips = [
    { icon: UsersIcon, label: "Grand Seating" },
    { icon: TicketIcon, label: "Events & Ceremonies" },
    { icon: BuildingLibraryIcon, label: "Green Rooms" },
    { icon: SunIcon, label: "Climate Controlled" },
  ];

  return (
    <>
      <Head>
        <title>Auditorium | Sona Valliappa Public School</title>
      </Head>

      <main className="bg-white">
        {/* HEADER */}
        <PageHeader
          title="Auditorium"
          subtitle="A grand stage where talent shines and memories are made."
          breadcrumbs={["Home", "Infrastructure facilities", "Auditorium"]}
        />

        {/* CINEMATIC HERO BAND */}
        <section className="relative bg-secondary overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <img
              src="https://images.unsplash.com/photo-1503095396549-807759245b35?w=1600&q=80"
              alt="Auditorium stage"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/40" />

          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
            <Reveal>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {chips.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {c.label}
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
              {stats.map((s, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div>
                    <p className="text-3xl md:text-5xl font-bold text-white font-serif mb-1">
                      {s.value}
                    </p>
                    <div className="h-[2px] w-8 bg-primary mx-auto mb-2" />
                    <p className="text-white/70 text-xs md:text-sm uppercase tracking-[0.2em]">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INTRO — asymmetric split */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-12 gap-10 items-center">
          <Reveal>
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-[2px] bg-primary"></div>
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary">
                  Infrastructure
                </p>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-secondary font-serif mb-5 leading-tight">
                Where Every
                <br />
                Voice Finds
                <br />
                Its Stage
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Our spacious, air-conditioned auditorium is the heartbeat of
                school life — a place where academics meet the arts.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                From annual day celebrations to investiture ceremonies and
                inter-school competitions, it brings the entire school
                community together under one roof.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="md:col-span-7 relative">
              <div className="grid grid-cols-5 gap-4 h-[420px] md:h-[480px]">
                <div className="col-span-3 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=900&q=80"
                    alt="Auditorium stage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-4">
                  <div className="flex-1 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80"
                      alt="Auditorium hall"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&q=80"
                      alt="School event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl px-6 py-4 flex items-center gap-3 border border-gray-100">
                <SparklesIcon className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold text-secondary text-sm">
                    Every Seat, a Front Row
                  </p>
                  <p className="text-xs text-gray-500">
                    Unobstructed sightlines, tier to tier
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ALTERNATING FEATURE ROWS */}
        <section className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <Reveal>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-14 h-[2px] bg-primary"></div>
                  <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary">
                    Built For Performance
                  </p>
                  <div className="w-14 h-[2px] bg-primary"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif">
                  Engineered For The Spotlight
                </h2>
              </div>
            </Reveal>

            <div className="space-y-16 md:space-y-24">
              {rows.map((row, i) => {
                const Icon = row.icon;
                const reversed = i % 2 === 1;
                return (
                  <Reveal key={i}>
                    <div
                      className={`grid md:grid-cols-2 gap-10 items-center ${
                        reversed ? "md:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                        <img
                          src={row.img}
                          alt={row.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-700"
                        />
                      </div>
                      <div>
                        <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-secondary font-serif mb-3">
                          {row.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {row.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* FILMSTRIP GALLERY */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-10">
            <Reveal>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-[2px] bg-primary"></div>
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary">
                  In Frame
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif">
                Moments on the Big Stage
              </h2>
            </Reveal>
          </div>
          <AuditoriumFilmstrip />
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-secondary text-white p-10 md:p-16 text-center shadow-xl">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1600&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative">
                <StarIcon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-2xl md:text-4xl font-bold font-serif mb-3">
                  Host Your Next School Event With Us
                </h3>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">
                  From cultural fests to academic ceremonies, our auditorium
                  is equipped to make every occasion memorable.
                </p>
                <a
                  href="/contact-us"
                  className="inline-block bg-primary hover:bg-primary/90 transition text-white font-semibold px-8 py-3 rounded-full"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}