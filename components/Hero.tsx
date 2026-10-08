import Image from "next/image";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Play, Star, Users, BookOpen,
  Award, ArrowRight, Clock, Globe, Shield,
  TrendingUp, Calendar, Cpu, ChevronDown, Send, CheckCircle
} from 'lucide-react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";

import AdmissionEnquiryForm from "./AdmissionEnquiryForm";

// Slides for left side cycling content
const contentSlides = [
  {
    id: 1,
    badge: "Excellence in Education",
    titlePrefix: "Shape Your",
    titleGradient: "Future with SVPS",
    description:
      "Discover a nurturing learning environment where students grow with knowledge, confidence, creativity, and strong values to become future-ready leaders.",
    ctaText: "Explore Our School",
    ctaLink: "/about-us/heritage",
    trustRating: 4.9,
    trustCount: "1k+"
  },
  {
    id: 2,
    badge: "Learn • Grow • Succeed",
    titlePrefix: "Inspiring Young",
    titleGradient: "Minds to Soar",
    description:
      "At SVPS, we empower every child through engaging learning, innovative experiences, sports, arts, and activities that bring out their unique potential.",
    ctaText: "Discover SVPS",
    ctaLink: "/infrastructure-facilities/classrooms",
    trustRating: 4.9,
    trustCount: "1k+"
  },
  {
    id: 3,
    badge: "Future Ready Education",
    titlePrefix: "Where Learning",
    titleGradient: "Meets Possibilities",
    description:
      "Build a strong foundation for tomorrow with quality education, personalized guidance, modern learning, and a vibrant school community that helps every student thrive.",
    ctaText: "Join Our School",
    ctaLink: "/admission/admission-procedure",
    trustRating: 4.9,
    trustCount: "1k+"
  }
];

// Background images for slideshow
const backgroundImages = [
  "/hero/hero3.webp",
  "/hero/hero4.webp",
  "/hero/hero2.webp",
  "/hero/hero1.webp",
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const currentSlide = contentSlides[activeSlideIndex];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle left side content every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % contentSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[70vh] md:min-h-[75vh] overflow-hidden">
      {/* Crossfading Background with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-10"></div>

        {/* STATIC first image — renders immediately, no animation on load */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: currentBgIndex === 0 ? 1 : 0 }}
        >
          <Image
            src={backgroundImages[0]}
            alt="Background"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Animated images for crossfade (skip index 0) */}
        {backgroundImages.slice(1).map((img, i) => {
          const index = i + 1;
          return (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentBgIndex === index ? 1 : 0,
                scale: currentBgIndex === index ? 1.05 : 1,
              }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 8, ease: "easeInOut" },
              }}
              style={{ zIndex: currentBgIndex === index ? 1 : 0 }}
            >
              <Image
                src={img}
                alt="Background"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          );
        })}

        <div className="absolute inset-0 bg-black/20 z-10"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ y: ["0vh", "100vh"], opacity: [0, 0.6, 0] }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* Container */}
      <div className="relative z-20 container-responsive min-h-[70vh] md:min-h-[75vh] flex items-center">
        <div className="w-full py-12 md:py-16 lg:py-20">
          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN - Cycling Content */}
            <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Main Heading */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                      <span className="text-white/90">{currentSlide.titlePrefix}</span>
                      <br />
                      <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                        {currentSlide.titleGradient}
                      </span>
                    </h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-sm md:text-base text-white/60 max-w-lg italic leading-relaxed"
                    >
                      {currentSlide.description}
                    </motion.p>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                    <Link
                      href={currentSlide.ctaLink}
                      className="group relative px-6 md:px-7 py-2.5 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl shadow-primary/20 bg-primary text-white"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {currentSlide.ctaText}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                  </motion.div>

                  {/* Slide Indicator Dots */}
                  <motion.div variants={itemVariants} className="flex gap-2 pt-4">
                    {contentSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeSlideIndex === idx ? "w-8 bg-primary" : "w-4 bg-white/30 hover:bg-white/50"}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN - Enquiry Form (imported component) */}
            <AdmissionEnquiryForm
              title="Admission Enquiry"
              subtitle="Fill the details below and we'll get back to you"
              onSuccess={(data) => {
                console.log('Hero enquiry submitted:', data);
                // Add analytics / API logic here if needed
              }}
            />
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA SIDEBAR */}
      <motion.div
        className="absolute right-2 xl:right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 z-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent"
          variants={{
            hidden: { opacity: 0, scaleY: 0 },
            visible: { opacity: 1, scaleY: 1 }
          }}
        />

        {[
          {
            Icon: FaWhatsapp,
            label: "WhatsApp",
            hoverColor: "group-hover:text-green-500",
            url: "https://wa.me/919442592159",
          },
          { Icon: FaInstagram, label: "Instagram", hoverColor: "group-hover:text-pink-500", url: "https://www.instagram.com/sonavalliappapapublicschool/" },
          { Icon: FaFacebook, label: "Facebook", hoverColor: "group-hover:text-blue-500", url: "https://www.facebook.com/sonavalliappapublicschool/" },
          { Icon: FaTwitter, label: "Twitter / X", hoverColor: "group-hover:text-black", url: "https://x.com/sona_vp_school" },
        ].map(({ Icon, label, hoverColor, url }, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center overflow-hidden w-9 hover:w-36 transition-all duration-500 ease-out rounded-full border border-white/15 bg-white/5 backdrop-blur-md hover:shadow-lg hover:shadow-black/20"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-110 ${hoverColor}`}>
                <Icon size={16} />
              </div>
              <span className="ml-2 whitespace-nowrap text-xs font-medium text-white/90 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-150">
                {label}
              </span>
            </a>
          </motion.div>
        ))}

        <motion.div
          className="h-10 w-px bg-gradient-to-t from-transparent via-white/40 to-transparent"
          variants={{
            hidden: { opacity: 0, scaleY: 0 },
            visible: { opacity: 1, scaleY: 1 }
          }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-0.5 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-white/40 text-[8px] md:text-[10px]">Scroll</span>
          <ChevronDown className="w-2.5 h-2.5 md:w-3 md:h-3 text-white/40" />
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .container-responsive {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        @media (min-width: 640px) {
          .container-responsive {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .container-responsive {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        @media (min-width: 1280px) {
          .container-responsive {
            max-width: 1280px;
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        @media (min-width: 1536px) {
          .container-responsive {
            max-width: 1470px;
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>
    </section>
  );
}