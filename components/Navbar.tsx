import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router'; // Import useRouter
import { activities } from '../data/activities';
import {
  Menu, X, ChevronDown, ChevronRight,
  Home, Info, Users, BookOpen, GraduationCap,
  MessageCircle, Calendar, Globe, Award,
  Shield, Building, Activity,
  Bus, Heart, Coffee, Music,
  Trophy, Palette, Building2, Monitor,
  FileText, Download,
  LogIn,
  Sparkles, ArrowRight, Star,
} from 'lucide-react';

// Types
interface SubmenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
}

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: SubmenuItem[];
}

interface MobileDropdownProps {
  link: NavLink;
  onClose: () => void;
}

export default function Navbar() {
  const router = useRouter(); // Get router instance
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeout = useRef(null);
  const navRef = useRef(null);

  // Helper function to check if a link is active
  const isActive = (href) => {
    if (href === '/') {
      return router.pathname === href;
    }
    return router.pathname.startsWith(href);
  };

  // Helper function to check if any submenu item is active
  const isSubmenuActive = (submenu) => {
    if (!submenu) return false;
    return submenu.some(item => router.pathname === item.href || router.pathname.startsWith(item.href + '/'));
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const handleMouseEnter = (dropdown) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      dropdownTimeout.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 200);
    }
  };

  const navLinks = [
    {
      name: 'Home',
      href: '/',
      icon: Home
    },
    {
      name: 'About',
      href: '/about',
      icon: Info,
      submenu: [
        { name: 'Heritage', href: '/about-us/heritage', icon: Info, description: 'Our legacy and history' },
        { name: 'Vision & Mission', href: '/about-us/vision-and-mission', icon: Info, description: 'Our goals and purpose' },
        { name: 'Management', href: '/about-us/management-team-committee', icon: Users, description: 'Leadership team' },
        { name: "Chairman's Books", href: '/about-us/chairman-books', icon: BookOpen, description: 'Publications by chairman' },
        { name: 'Principal Message', href: '/about-us/principal-message', icon: MessageCircle, description: 'Message from principal' },
        { name: 'Rules & Regulations', href: '/about-us/rules-and-regulations', icon: Shield, description: 'School policies' },
      ],
    },
    {
      name: 'Academics',
      href: '/academics',
      icon: GraduationCap,
      submenu: [
        { name: 'Curriculum & Pedagogical Processes', href: '/academics/curriculum-and-pedagogical-processes', icon: BookOpen, description: 'Teaching framework' },
        { name: 'Methodology', href: '/academics/methodology', icon: BookOpen, description: 'Learning approach' },
        { name: 'Creative Learning', href: '/academics/creative-learning', icon: Palette, description: 'Imagination in action' },
        { name: 'Academic Excellence', href: '/academics/academic-excellence', icon: Trophy, description: 'Strong academic foundation' },
        { name: 'All Round Development', href: '/academics/all-round-development', icon: Award, description: 'Holistic growth' },
        { name: 'Teacher Training', href: '/academics/teacher-training-programme-workshops', icon: Users, description: 'Faculty development' },
      ],
    },
    {
      name: 'Infrastructure',
      href: '/infrastructure-facilities',
      icon: Building,
      submenu: [
        { name: 'Class Rooms', href: '/infrastructure-facilities/classrooms', icon: Building, description: 'Modern learning spaces' },
        { name: 'Sports', href: '/infrastructure-facilities/indoor-outdoor-and-traditional-games', icon: Activity, description: 'Sports & recreation' },
        { name: 'Transport', href: '/infrastructure-facilities/transport-facilities', icon: Bus, description: 'Safe travel' },
        { name: 'Medical', href: '/infrastructure-facilities/medical-facilities', icon: Heart, description: 'Health support' },
        { name: 'Library', href: '/infrastructure-facilities/library', icon: BookOpen, description: 'Knowledge resources' },
        {
          name: 'Auditorium',
          href: '/infrastructure-facilities/auditorium',
          icon: Building2,
          description: 'Spacious space for events and activities'
        },
        {
          name: 'Computer Lab',
          href: '/infrastructure-facilities/computer-lab',
          icon: Monitor,
          description: 'Technology-enabled learning'
        },
        { name: 'Dining', href: '/infrastructure-facilities/pantry-and-dining', icon: Coffee, description: 'Dining area' },
      ],
    },
    {
      name: "Activities",
      href: "/activities",
      icon: Activity,
      submenu: activities.map((a) => ({
        name: a.title,
        href: `/activities/${a.slug}`,
        icon: Activity,
        description: a.title,
      })),
    },
    {
      name: 'Admission',
      href: '/admission',
      icon: FileText,
      submenu: [
        { name: 'Procedure', href: '/admission/admission-procedure', icon: FileText, description: 'Steps to apply' },
        { name: 'Online Application', href: 'https://hikaapp.sonastar.com/INS-3-ZXYXKM', icon: Globe, description: 'Apply online', badge: 'New' },
        { name: 'Contact', href: '/admission/admission-contact', icon: MessageCircle, description: 'Reach office' },
      ],
    },
    {
      name: 'Resources',
      href: '/resources',
      icon: Globe,
      submenu: [
        { name: 'News & Events', href: '/news-and-events', icon: Calendar, description: 'Updates', badge: 'New' },
      ],
    },
    {
      name: 'Contact',
      href: '/contact-us',
      icon: MessageCircle
    },
  ];

  // Animation variants
  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, transition: { duration: 0.15 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, staggerChildren: 0.03, delayChildren: 0.05 } },
    exit: { opacity: 0, y: 8, transition: { duration: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0, transition: { type: 'tween', duration: 0.3, staggerChildren: 0.03 } },
    exit: { opacity: 0, x: '100%', transition: { duration: 0.25 } }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  };

  // Mobile Dropdown Component
  const MobileDropdown = ({ link, onClose }) => {
    const [isExpanded, setIsExpanded] = useState(isSubmenuActive(link.submenu));
    const isLinkActive = isActive(link.href);

    return (
      <div className="border-b border-[#ec8013]/10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-between w-full px-4 py-3 transition-all duration-200 hover:bg-[#ec8013]/5 group ${isLinkActive ? 'bg-[#ec8013]/10' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isLinkActive ? 'bg-[#ec8013]' : 'bg-[#ec8013]/10'}`}>
              <link.icon className={`w-4 h-4 ${isLinkActive ? 'text-white' : 'text-[#ec8013]'}`} />
            </div>
            <span className={`font-medium text-sm ${isLinkActive ? 'text-[#ec8013]' : 'text-[#f5dfc4]'}`}>{link.name}</span>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3.5 h-3.5 text-[#f5dfc4]/50" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isExpanded && link.submenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pl-11 pr-3 pb-2 space-y-1">
                {link.submenu.map((item) => {
                  const isItemActive = router.pathname === item.href || router.pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-[#ec8013]/10 group ${isItemActive ? 'bg-[#ec8013]/20' : ''}`}
                      onClick={() => { setIsExpanded(false); onClose(); }}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isItemActive ? 'bg-[#ec8013]' : 'bg-[#ec8013]/5'}`}>
                        <item.icon className={`w-3.5 h-3.5 ${isItemActive ? 'text-white' : 'text-[#ec8013]'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-medium ${isItemActive ? 'text-[#ec8013]' : 'text-[#f5dfc4]'}`}>{item.name}</span>
                          {item.badge && (
                            <span className="text-[7px] px-1 py-0.5 bg-[#ec8013]/20 text-[#ec8013] rounded-full font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#f5dfc4]/40">{item.description}</div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-[#f5dfc4]/20" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        .glass-premium {
          background: rgba(24, 57, 69, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(236, 128, 19, 0.15);
        }
        
        .glass-premium-scrolled {
          background: rgba(18, 45, 55, 0.98);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(236, 128, 19, 0.25);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Custom scrollbar for Activities submenu */
        .activities-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .activities-scrollbar::-webkit-scrollbar-track {
          background: rgba(236, 128, 19, 0.05);
          border-radius: 4px;
        }
        .activities-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236, 128, 19, 0.4);
          border-radius: 4px;
        }
        .activities-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 128, 19, 0.6);
        }

        /* Responsive container */
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

      <nav ref={navRef}>
        <motion.nav
          initial="initial"
          animate="animate"
          variants={navVariants}
          className={`fixed top-0 w-full z-50 transition-all duration-400 ${scrolled ? 'bg-secondary' : ''
            }`}
        >
          <div className="container-responsive">
            <div className="flex justify-between items-center h-14 md:h-16 lg:h-16">
              {/* Logo Section - Responsive Sizing */}
              <Link href="/" className="relative z-50">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <img
                    src="/homeimages/sona-valliappa-public-school.png"
                    alt="SVPS Logo"
                    className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain"
                  />
                </motion.div>
              </Link>

              {/* Desktop Navigation - Responsive Spacing */}
              <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                {navLinks.map((link) => {
                  const isLinkActive = isActive(link.href);
                  const isSubActive = isSubmenuActive(link.submenu);

                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => link.submenu && handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {link.submenu ? (
                        <motion.button
                          whileHover={{ y: -0.5 }}
                          className={`relative flex items-center gap-1 px-2 xl:px-3 py-2 text-sm xl:text-base font-medium transition-colors duration-200 ${isLinkActive || isSubActive
                            ? 'text-[#ec8013]'
                            : 'text-[#f5dfc4]/80 hover:text-[#f5dfc4]'
                            }`}
                        >
                          <span>{link.name}</span>
                          <motion.div
                            animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                          </motion.div>
                        </motion.button>
                      ) : (
                        <Link
                          href={link.href}
                          className={`relative flex items-center gap-1 px-2 xl:px-3 py-2 text-sm xl:text-base font-medium transition-colors duration-200 ${isLinkActive
                            ? 'text-[#ec8013]'
                            : 'text-[#f5dfc4]/80 hover:text-[#f5dfc4]'
                            }`}
                        >
                          <span>{link.name}</span>
                        </Link>
                      )}

                      {/* Desktop Submenu - Responsive Width */}
                      <AnimatePresence>
                        {link.submenu && activeDropdown === link.name && (
                          <motion.div
                            className="absolute top-full left-0 mt-1"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onMouseEnter={() => handleMouseEnter(link.name)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="w-72 xl:w-80 bg-[#1a4a5c] shadow-xl border border-[#ec8013]/20 overflow-hidden">
                              <div
                                className={`p-2 ${link.name === 'Activities'
                                  ? 'max-h-[360px] overflow-y-auto activities-scrollbar'
                                  : ''
                                  }`}
                              >
                                {link.submenu.map((item) => {
                                  const isItemActive = router.pathname === item.href || router.pathname.startsWith(item.href + '/');
                                  return (
                                    <motion.div key={item.name} variants={itemVariants}>
                                      <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 p-2.5 transition-all duration-150 group ${isItemActive ? 'bg-[#ec8013]/15' : 'hover:bg-[#ec8013]/10'
                                          }`}
                                      >
                                        <div className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-md ${isItemActive ? 'bg-[#ec8013]' : 'bg-[#ec8013]/10'
                                          }`}>
                                          <item.icon className={`w-4 h-4 ${isItemActive ? 'text-white' : 'text-[#ec8013]'
                                            }`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-1.5">
                                            <span className={`text-xs xl:text-sm font-medium transition-colors ${isItemActive ? 'text-[#ec8013]' : 'text-[#f5dfc4] group-hover:text-[#ec8013]'
                                              }`}>
                                              {item.name}
                                            </span>
                                            {item.badge && (
                                              <span className="text-[8px] px-1.5 py-0.5 bg-[#ec8013]/20 text-[#ec8013] rounded-full font-semibold shrink-0">
                                                {item.badge}
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-[10px] text-[#f5dfc4]/40 truncate">
                                            {item.description}
                                          </div>
                                        </div>
                                        <ArrowRight className={`w-3 h-3 transition-all shrink-0 ${isItemActive ? 'text-[#ec8013]' : 'text-[#f5dfc4]/20 group-hover:text-[#ec8013] group-hover:translate-x-0.5'
                                          }`} />
                                      </Link>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Buttons - Responsive Sizing */}
              <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                <Link
                  href="/public-disclosure"
                  className="px-3 xl:px-4 py-1.5 text-xs xl:text-sm font-semibold rounded-full bg-gradient-to-r from-[#ec8013] to-[#f5a623] text-white shadow-md hover:shadow-lg transition-all"
                >
                  Mandatory Disclosure
                </Link>
                <Link
                  href="https://hikaapp.sonastar.com/INS-3-ZXYXKM"
                  className="px-3 xl:px-4 py-1.5 text-xs xl:text-sm font-semibold rounded-full bg-gradient-to-r from-[#ec8013] to-[#f5a623] text-white shadow-md hover:shadow-lg transition-all"
                >
                  Apply Now
                </Link>
              </div>

              {/* Mobile Menu Button - Optimized */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-8 h-8 rounded-lg flex items-center justify-center z-50 text-[#f5dfc4]"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Navigation Panel - Enhanced for Tablets */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                className="fixed right-0 top-0 bottom-0 w-80 sm:w-96 bg-gradient-to-br from-[#1a4a5c] to-[#0d3543] shadow-2xl z-40 lg:hidden"
              >
                <div className="h-full overflow-y-auto hide-scrollbar pt-16 pb-6">
                  <div className="px-3 sm:px-4">
                    {navLinks.map((link) => (
                      <motion.div key={link.name} variants={mobileItemVariants}>
                        {link.submenu ? (
                          <MobileDropdown link={link} onClose={() => setIsOpen(false)} />
                        ) : (
                          <Link
                            href={link.href}
                            className={`flex items-center justify-between gap-3 px-4 py-3 transition-all group rounded-lg ${isActive(link.href) ? 'bg-[#ec8013]/10' : 'hover:bg-[#ec8013]/5'
                              }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive(link.href) ? 'bg-[#ec8013]' : 'bg-[#ec8013]/10'
                                }`}>
                                <link.icon className={`w-4 h-4 ${isActive(link.href) ? 'text-white' : 'text-[#ec8013]'
                                  }`} />
                              </div>
                              <span className={`font-medium text-sm ${isActive(link.href) ? 'text-[#ec8013]' : 'text-[#f5dfc4]'
                                }`}>{link.name}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#f5dfc4]/30" />
                          </Link>
                        )}
                      </motion.div>
                    ))}

                    {/* Mobile Action Buttons */}
                    <motion.div
                      variants={mobileItemVariants}
                      className="pt-4 mt-4 border-t border-[#ec8013]/15 space-y-3"
                    >
                      <Link
                        href="/public-disclosure"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Mandatory Disclosure
                      </Link>
                      <Link
                        href="https://hikaapp.sonastar.com/INS-3-ZXYXKM"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 font-semibold text-sm rounded-xl bg-gradient-to-r from-[#ec8013] to-[#f5a623] text-white shadow-md hover:shadow-xl transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Apply Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}