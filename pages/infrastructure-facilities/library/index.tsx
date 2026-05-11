import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  BookOpenIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ClockIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ComputerDesktopIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

/* =========================
   REVEAL (same as yours)
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
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {children}
    </div>
  );
}

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  category?: "interior" | "students" | "collection" | "Technology";
  height: string;
}

function LibraryGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const galleryImages: GalleryImage[] = [
    {
      src: "/infra/library/canvas.png",
      alt: "Modern library interior",
      title: "Grand Reading Hall",
      description:
        "A spacious and peaceful environment designed for focused reading and learning.",
      category: "interior",
      height: "h-[260px]",
    },
    {
      src: "/infra/library/canvas2.png",
      alt: "Students reading",
      title: "Students Exploring Knowledge",
      description:
        "Students deeply engaged in books and collaborative academic activities.",
      category: "students",
      height: "h-[430px]",
    },
    {
      src: "/infra/library/canvas3.png",
      alt: "Children books",
      title: "Children's Collection",
      description:
        "Colorful storytelling and learning resources for young readers.",
      category: "collection",
      height: "h-[320px]",
    },
    {
      src: "/infra/library/canvas4.png",
      alt: "Digital library",
      title: "Digital Learning Hub",
      description:
        "Modern computers and digital resources supporting smart learning.",
      category: "Technology",
      height: "h-[500px]",
    },
    {
      src: "/infra/library/canvas5.png",
      alt: "Study area",
      title: "Focused Study Zones",
      description:
        "Quiet study spaces designed for concentration and academic success.",
      category: "interior",
      height: "h-[300px]",
    },
    {
      src: "/infra/library/canvas6.png",
      alt: "Reference books",
      title: "Reference Section",
      description:
        "Extensive collection of encyclopedias and academic reference materials.",
      category: "collection",
      height: "h-[420px]",
    },
    {
      src: "/infra/library/canvas7.png",
      alt: "Group study",
      title: "Collaborative Learning",
      description:
        "Interactive spaces where students learn and grow together.",
      category: "students",
      height: "h-[340px]",
    },
    {
      src: "/infra/library/canvas2.png",
      alt: "Library architecture",
      title: "Architectural Beauty",
      description:
        "Elegant architecture creating an inspiring educational atmosphere.",
      category: "interior",
      height: "h-[500px]",
    },
  ];

  const openLightbox = (image: GalleryImage, index: number) => {
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
      newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Reveal>


        <div className="flex justify-end mb-14">
          <div className="max-w-2xl text-right">

            <div className="flex justify-end mb-4">
              <div className="h-[2px] w-20 bg-primary"></div>
            </div>

            <p className="uppercase tracking-[0.35em] text-xs text-primary font-semibold mb-3">
              LIBRARY GALLERY
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif mb-3">
              Our Library in Pictures
            </h2>
            <p className="text-gray-600 max-w-2xl  text-end">
              Step inside our vibrant library where knowledge meets inspiration
            </p>



          </div>
        </div>
      </Reveal>
      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">

        {galleryImages.map((img, idx) => (
          <Reveal key={idx}>
            <div
              onClick={() => openLightbox(img, idx)}
              className="group relative overflow-hidden rounded-[28px] cursor-pointer break-inside-avoid shadow-lg bg-white"
            >

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full ${img.height} object-cover transition duration-[1200ms] group-hover:scale-110`}
                />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition duration-500"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">

                <div className="mb-4">
                  <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[11px] uppercase tracking-[0.25em]">
                    {img.category}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold mb-3 translate-y-4 group-hover:translate-y-0 transition duration-500">
                  {img.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-200 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition duration-500">
                  {img.description}
                </p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/20 blur-2xl group-hover:left-[120%] transition-all duration-1000"></div>
              </div>

            </div>
          </Reveal>
        ))}

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
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
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-2"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("next");
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-2"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-b-lg mt-2">
              <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
              <p className="text-gray-300 text-sm">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* =========================
   MAIN PAGE
========================= */
export default function LibraryPage() {
  const features = [
    {
      icon: BookOpenIcon,
      title: "Extensive Collection",
      desc: "Books, journals, and reference materials across all subjects.",
    },
    {
      icon: AcademicCapIcon,
      title: "Learning Culture",
      desc: "Encouraging curiosity and lifelong reading habits.",
    },
    {
      icon: ComputerDesktopIcon,
      title: "Digital Library",
      desc: "Access to e-books, research papers, and online resources.",
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Research Support",
      desc: "Helping students explore and expand academic knowledge.",
    },
    {
      icon: UserGroupIcon,
      title: "Quiet Study Zone",
      desc: "Peaceful environment designed for focus and productivity.",
    },
    {
      icon: ClockIcon,
      title: "Flexible Access",
      desc: "Library open throughout school hours for all students.",
    },
  ];

  return (
    <>
      <Head>
        <title>Library | Sona Valliappa Public School</title>
      </Head>

      <main className="bg-gradient-to-b from-slate-50 to-white">

        {/* HEADER */}
        <PageHeader
          title="Library"
          subtitle="A quiet world of knowledge, imagination, and discovery."
          breadcrumbs={["Home", "Facilities", "Library"]}
        />

        {/* INTRO (more premium layout like your medical page) */}
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <Reveal>
            <div className="relative">

              {/* BACK LAYER (decorative frame) */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl" />

              {/* MAIN IMAGE CARD */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl group aspect-[4/3]">

                <img
                  src="https://img.magnific.com/premium-photo/school-library-with-kids-reading_198067-1080624.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                  alt="Library"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* FLOATING TEXT */}
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-lg font-semibold">Reading Environment</p>
                  <p className="text-sm text-white/80">
                    A peaceful space for learning & imagination
                  </p>
                </div>

              </div>

              {/* SIDE BADGES */}
              <div className="absolute -right-3 top-10 flex flex-col gap-3">

                <div className="bg-white shadow-md px-3 py-2 rounded-lg text-xs font-medium">
                  Books & Journals
                </div>

                <div className="bg-white shadow-md px-3 py-2 rounded-lg text-xs font-medium">
                  Digital Access
                </div>

                <div className="bg-white shadow-md px-3 py-2 rounded-lg text-xs font-medium">
                  Research Hub
                </div>

              </div>

            </div>
          </Reveal>

          {/* CONTENT */}
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif mb-4">
                The Heart of Learning
              </h2>

              <p className="text-gray-600 leading-relaxed mb-5">
                Our library is a vibrant knowledge hub where students explore books,
                research materials, and digital resources in a calm and focused environment.
              </p>

              {/* KEY POINTS */}
              <div className="space-y-3 mb-5">
                <p className="text-gray-700 flex gap-2">
                  <span className="text-primary">•</span>
                  Encourages independent learning and curiosity beyond textbooks.
                </p>

                <p className="text-gray-700 flex gap-2">
                  <span className="text-primary">•</span>
                  Supports academic excellence with curated reference materials.
                </p>

                <p className="text-gray-700 flex gap-2">
                  <span className="text-primary">•</span>
                  Provides access to digital resources, e-books, and journals.
                </p>

                <p className="text-gray-700 flex gap-2">
                  <span className="text-primary">•</span>
                  Promotes reading habits and intellectual growth from early age.
                </p>

                <p className="text-gray-700 flex gap-2">
                  <span className="text-primary">•</span>
                  Offers a peaceful study space for focused learning and research.
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                With a balance of traditional books and modern digital learning tools,
                the library empowers students to explore knowledge in every form.
              </p>
            </div>
          </Reveal>
        </div>

        {/* FEATURES (more modern card style like medical page) */}
        <div className="max-w-7xl mx-auto px-4 ">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif mb-4">
            Library Features
          </h2>


          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-[2px] bg-primary"></div>

            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary">
              Explore
            </p>

          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i}>
                  <div className="bg-white border rounded-xl p-5 flex gap-4 items-start hover:shadow-md transition hover:-translate-y-1">

                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>


        <LibraryGallery />
      </main>
    </>
  );
}