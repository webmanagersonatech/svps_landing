import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Play, Star, Users, BookOpen,
  Award, ArrowRight, Clock, Globe, Shield,
  TrendingUp, Calendar, Cpu, ChevronDown, Send, CheckCircle
} from 'lucide-react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";

// Slides for left side cycling content (changes every 5 seconds)
const contentSlides = [
  {
    id: 1,
    badge: "Premium Platform",
    titlePrefix: "Transform Your",
    titleGradient: "Future with SVPS",
    description: "Join the leading online learning platform and unlock your potential with expert-led courses, hands-on projects, and global certification.",
    ctaText: "Start Learning Now",
    ctaLink: "/courses",
    trustRating: 4.9,
    trustCount: "10k+"
  },
  {
    id: 2,
    badge: "Global Community",
    titlePrefix: "Connect &",
    titleGradient: "Learn Together",
    description: "Join millions of learners worldwide. Participate in live sessions, group projects, and network with industry experts who share your passion.",
    ctaText: "Join Community",
    ctaLink: "/community",
    trustRating: 4.8,
    trustCount: "25k+"
  },
  {
    id: 3,
    badge: "Career Focused",
    titlePrefix: "Launch Your",
    titleGradient: "Dream Career",
    description: "Get job-ready with our career-focused programs. Receive 1-on-1 mentoring, build a portfolio, and get hired at top companies worldwide.",
    ctaText: "Explore Careers",
    ctaLink: "/careers",
    trustRating: 4.9,
    trustCount: "15k+"
  }
];

// Background images for slideshow
const backgroundImages = [
  "https://img.freepik.com/premium-photo/child-students-school_198067-1070401.jpg?ga=GA1.1.747278850.1765974059&semt=ais_hybrid&w=740&q=80",
  "https://img.freepik.com/premium-photo/classmates-friends-bag-school-education_198067-1070642.jpg?ga=GA1.1.747278850.1765974059&semt=ais_hybrid&w=740&q=80",
  "https://img.freepik.com/premium-photo/students-with-backpacks-smiles-their-faces-walking-through-school-gates-into-colorful_25996-10173.jpg?ga=GA1.1.747278850.1765974059&semt=ais_hybrid&w=740&q=80",
  "https://www.sonavalliappapublicschool.com/assets/img/homeslider/homeslide5.webp",
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

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentSlide = contentSlides[activeSlideIndex];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle left side content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % contentSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s+()-]{10,}$/.test(formData.phone.replace(/[\s+()-]/g, ''))) newErrors.phone = 'Valid phone number required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', country: '', state: '', city: '' });
    }, 3000);
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[75vh] overflow-hidden">
      {/* Crossfading Background with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-10"></div>

        {backgroundImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: currentBgIndex === index ? 1 : 0,
              scale: currentBgIndex === index ? 1 : 1.1,
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 8, ease: "easeInOut" }
            }}
            style={{ zIndex: currentBgIndex === index ? 1 : 0 }}
          >
            <img
              src={img}
              alt="Background"
              className="w-full h-full object-cover"
              style={{
                transform: currentBgIndex === index ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 8s ease-in-out',
              }}
            />
          </motion.div>
        ))}
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

      {/* UPDATED CONTAINER - Now matching Navbar's container-responsive */}
      <div className="relative z-20 container-responsive min-h-[70vh] md:min-h-[75vh] flex items-center">
        <div className="w-full py-12 md:py-16 lg:py-20">
          {/* TWO COLUMN LAYOUT - Left Content & Right Form */}
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

            {/* RIGHT COLUMN - Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md mx-auto lg:ml-auto relative"
            >
              {/* Foldable Corner Accent - Top Left */}
              <div className="absolute -top-2 -left-2 w-8 h-8 z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-white/10 backdrop-blur-sm border-r border-b border-white/20 rounded-br-lg" />
              </div>

              {/* Foldable Corner Accent - Top Right */}
              <div className="absolute -top-2 -right-2 w-8 h-8 z-10">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/40 to-transparent rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 bg-white/10 backdrop-blur-sm border-l border-b border-white/20 rounded-bl-lg" />
              </div>

              {/* Fold Line Effect - Diagonal Fold Crease */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-12 z-10 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full blur-sm" />
              </div>

              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Glassmorphism Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

                <div className="relative p-5 md:p-6 backdrop-blur-sm">
                  {/* Corner Fold Shadow Effect */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-white/5 to-transparent rounded-tr-xl border-t border-r border-white/10" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-tl from-white/5 to-transparent rounded-bl-xl border-b border-l border-white/10" />

                  {/* Form Header */}
                  <div className="text-center mb-6 relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-full mb-3 shadow-lg">
                      <Send className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl text-white mb-1 font-semibold tracking-tight">
                      Admission Enquiry
                    </h3>
                    <p className="text-white/60 italic text-sm">Fill the details below and we'll get back to you</p>
                  </div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-4 p-3 bg-green-500/20 backdrop-blur-md border border-green-500/40 rounded-xl flex items-center gap-3 text-green-300 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Thank you! Our team will contact you soon.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-4 relative">
                    {/* Row 1: Name and Email - Two columns on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative group">
                        <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border ${errors.name ? 'border-red-400' : 'border-white/20 group-hover:border-white/40'
                            } text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-200 text-sm shadow-inner`}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>
                        )}
                      </div>

                      <div className="relative group">
                        <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border ${errors.email ? 'border-red-400' : 'border-white/20 group-hover:border-white/40'
                            } text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-200 text-sm shadow-inner`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone Number */}
                    <div className="relative group">
                      <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border ${errors.phone ? 'border-red-400' : 'border-white/20 group-hover:border-white/40'
                          } text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-200 text-sm shadow-inner`}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Row 3: Country and State - Two columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative group">
                        <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                          Country *
                        </label>
                        <div className="relative">
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border ${errors.country ? 'border-red-400' : 'border-white/20 group-hover:border-white/40'
                              } text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-200 appearance-none text-sm cursor-pointer`}
                          >
                            <option value="" className="bg-gray-900">Select Country</option>
                            <option value="India" className="bg-gray-900">🇮🇳 India</option>
                            <option value="USA" className="bg-gray-900">🇺🇸 USA</option>
                            <option value="UK" className="bg-gray-900">🇬🇧 UK</option>
                            <option value="Canada" className="bg-gray-900">🇨🇦 Canada</option>
                            <option value="Australia" className="bg-gray-900">🇦🇺 Australia</option>
                            <option value="Other" className="bg-gray-900">🌍 Other</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.country && (
                          <p className="text-red-400 text-xs mt-1 ml-1">{errors.country}</p>
                        )}
                      </div>

                      <div className="relative group">
                        <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="California"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border ${errors.state ? 'border-red-400' : 'border-white/20 group-hover:border-white/40'
                            } text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-200 text-sm shadow-inner`}
                        />
                        {errors.state && (
                          <p className="text-red-400 text-xs mt-1 ml-1">{errors.state}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 4: City */}
                    <div className="relative group">
                      <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Los Angeles"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border ${errors.city ? 'border-red-400' : 'border-white/20 group-hover:border-white/40'
                          } text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-200 text-sm shadow-inner`}
                      />
                      {errors.city && (
                        <p className="text-red-400 text-xs mt-1 ml-1">{errors.city}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 text-sm mt-2 relative overflow-hidden group"
                    >
                      {/* Button Glass Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Enquiry
                        </>
                      )}
                    </button>

                    <p className="text-white/30 text-xs text-center mt-3">
                      By submitting, you agree to our <span className="text-primary/70 hover:text-primary/90 cursor-pointer transition-colors">Terms</span> &{' '}
                      <span className="text-primary/70 hover:text-primary/90 cursor-pointer transition-colors">Privacy Policy</span>
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
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
        {/* TOP LINE */}
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
          { Icon: FaInstagram, label: "Instagram", hoverColor: "group-hover:text-pink-500", url: "https://www.instagram.com/sonavalliappapublicschool/" },
          { Icon: FaFacebook, label: "Facebook", hoverColor: "group-hover:text-blue-500", url: "https://www.facebook.com/sonavalliappapublicschool/" },
          { Icon: FaTwitter, label: "Twitter / X", hoverColor: "group-hover:text-black", url: "https://x.com/sona_vp_school" },
        ].map(({ Icon, label, hoverColor, url }, i, arr) => (
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

        {/* BOTTOM LINE */}
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
        
        /* Container responsive - matching Navbar */
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