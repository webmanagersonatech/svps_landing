import SEO from "../../../components/SEO";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  UsersIcon,
  SpeakerWaveIcon,
  LightBulbIcon,
  VideoCameraIcon,
  Squares2X2Icon,
  SunIcon,
  MicrophoneIcon,
  TicketIcon,
  StarIcon,
  BuildingLibraryIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

/* =========================
   REVEAL
========================= */

interface ShotImage {
  src: string;
  alt: string;
  title: string;
}
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
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {children}
    </div>
  );
}

/* =========================
   GALLERY
========================= */
interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  category?: "Stage" | "Seating" | "Events" | "Technology";
  height: string;
}


function AuditoriumFilmstrip() {
  const [selectedImage, setSelectedImage] = useState<ShotImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const shots: (ShotImage & { span?: string })[] = [
    {
      src: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=900&q=80",
      alt: "Auditorium stage",
      title: "The Main Stage",
      span: "md:row-span-2",
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
      span: "md:row-span-2",
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
      <Reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start mb-14">
            <div className="max-w-2xl text-left">
              <div className="flex justify-start mb-4">
                <div className="h-[2px] w-20 bg-primary"></div>
              </div>

              <p className="uppercase tracking-[0.35em] text-xs text-primary font-semibold mb-3">
                {"AUDITORIUM GALLERY"}
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif mb-3">
                {"Moments on the Big Stage"}
              </h2>

              <p className="text-gray-600 max-w-2xl text-left">
                {"Where performances, celebrations, and milestones come to life"}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[190px] gap-4 md:gap-5">
          {shots.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(img, idx)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500 ${img.span ?? ""
                }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-4 md:p-5 w-full">
                <div className="h-[2px] w-8 bg-primary mb-2 transition-all duration-500 group-hover:w-14" />
                <p className="text-white font-semibold text-sm md:text-lg font-serif leading-tight">
                  {img.title}
                </p>
              </div>
            </div>
          ))}
        </div>
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


  return (
    <>
      <SEO
        title="Auditorium"
        description="A state-of-the-art auditorium at Sona Valliappa Public School, Salem, hosting assemblies, cultural events and performances."
        path="/infrastructure-facilities/auditorium"
      />

      <main className="bg-gradient-to-b from-slate-50 to-white">
        {/* HEADER */}
        <PageHeader
          title="Auditorium"
          subtitle="A grand stage where talent shines and memories are made."
          breadcrumbs={["Home", "Infrastructure facilities", "Auditorium"]}
        />



        {/* INTRO */}
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <Reveal>
            <div className="relative pb-10 pr-6 md:pr-10">
              {/* corner frame accent */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary rounded-tl-2xl -translate-x-3 -translate-y-3" />

              {/* main image */}
              <div className="relative  overflow-hidden shadow-2xl group aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80"
                  alt="School auditorium stage"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-lg font-semibold">A Stage for Every Star</p>
                  <p className="text-sm text-white/80">
                    Built for performances, ceremonies & celebrations
                  </p>
                </div>
              </div>

              {/* accent secondary image, tucked bottom-right, overlapping */}
              <div className="absolute -bottom-2 -right-2 md:-right-6 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-xl ring-4 ring-secondary">
                <img
                  src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&q=80"
                  alt="Auditorium hall wide shot"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* floating capacity badge */}
              <div className="ring-4 ring-secondary absolute -top-6 -left-2 md:-left-6 bg-white shadow-xl rounded-2xl px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UsersIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg y font-bold text-secondary leading-none">1000+</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wide mt-1">
                    Seating Capacity
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CONTENT */}
          <Reveal>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-[2px] bg-primary"></div>
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary">
                  Infrastructure
                </p>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif mb-4">
                Auditorium – Where Every Voice Finds Its Stage
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Our spacious and well-equipped auditorium provides a vibrant platform for students to express themselves, showcase their talents, and celebrate their achievements. Designed to host a variety of school events, cultural programmes, seminars, competitions, performances, and special occasions, it creates an engaging experience for students and the school community.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                With a comfortable seating arrangement and a welcoming atmosphere, our auditorium encourages students to build confidence, develop communication skills, and embrace creativity while making every event a memorable experience.
              </p>
            </div>
          </Reveal>
        </div>



        {/* GALLERY */}
        <AuditoriumFilmstrip />

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <Reveal>
            <div className="relative overflow-hidden  bg-gradient-to-br from-secondary via-secondary to-primary/40 text-white p-10 md:p-14 text-center shadow-xl">
              <StarIcon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold font-serif mb-3">
                Host Your Next School Event With Us
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto mb-6">
                From cultural fests to academic ceremonies, our auditorium is equipped
                to make every occasion memorable.
              </p>
              <a
                href="/contact-us"
                className="inline-block bg-primary hover:bg-primary/90 transition text-white font-semibold px-8 py-3 rounded-full"
              >
                Get in Touch
              </a>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}