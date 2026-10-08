import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { fetchActivities } from "../lib/activitiesApi";
import type { Activity as ActivityItem } from "../lib/activitiesApi";
import {
  Menu, X, ChevronDown, ChevronRight,
  Home, Info, Users, BookOpen, GraduationCap,
  MessageCircle, Calendar, Globe, Award,
  Shield, Building, Activity,
  Bus, Heart, Coffee,
  Trophy, Palette, Building2, Monitor,
  FileText,
  Sparkles, ArrowRight,
} from "lucide-react";

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

// ---------- Helpers (outside component so they are stable) ----------
const isActivePath = (pathname: string, href: string) => {
  if (href === "/") return pathname === href;
  return pathname.startsWith(href);
};

const isItemActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(href + "/");

const isSubmenuActivePath = (pathname: string, submenu?: SubmenuItem[]) => {
  if (!submenu) return false;
  return submenu.some((item) => isItemActivePath(pathname, item.href));
};

// ---------- Mobile Dropdown ----------
// NOTE: defined OUTSIDE Navbar. When it was inside, every Navbar re-render
// (e.g. on scroll) created a new component type, which reset its open/close state.
function MobileDropdown({ link, onClose }: MobileDropdownProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(isSubmenuActivePath(router.pathname, link.submenu));
  const isLinkActive = isActivePath(router.pathname, link.href);

  return (
    <div className="border-b border-[#ec8013]/10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between w-full px-4 py-3 transition-all duration-200 hover:bg-[#ec8013]/5 group ${isLinkActive ? "bg-[#ec8013]/10" : ""}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isLinkActive ? "bg-[#ec8013]" : "bg-[#ec8013]/10"}`}>
            <link.icon className={`w-4 h-4 ${isLinkActive ? "text-white" : "text-[#ec8013]"}`} />
          </div>
          <span className={`text-sm ${isLinkActive ? "text-[#ec8013]" : "text-[#f5dfc4]"}`}>{link.name}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#f5dfc4]/50 transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Height animation without JS: grid-rows 0fr -> 1fr */}
      {link.submenu && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pl-11 pr-3 pb-2 space-y-1">
              {link.submenu.map((item) => {
                const isItemActive = isItemActivePath(router.pathname, item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    tabIndex={isExpanded ? 0 : -1}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-[#ec8013]/10 group ${isItemActive ? "bg-[#ec8013]/20" : ""}`}
                    onClick={() => {
                      setIsExpanded(false);
                      onClose();
                    }}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isItemActive ? "bg-[#ec8013]" : "bg-[#ec8013]/5"}`}>
                      <item.icon className={`w-3.5 h-3.5 ${isItemActive ? "text-white" : "text-[#ec8013]"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs ${isItemActive ? "text-[#ec8013]" : "text-[#f5dfc4]"}`}>{item.name}</span>
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
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Navbar ----------
export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Activities come from the backend; the menu item is hidden until there is at least one
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetchActivities()
      .then((list) => {
        if (!cancelled) setActivities(list);
      })
      .catch(() => {
        if (!cancelled) setActivities([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const isActive = (href: string) => isActivePath(router.pathname, href);
  const isSubmenuActive = (submenu?: SubmenuItem[]) => isSubmenuActivePath(router.pathname, submenu);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleMouseEnter = (dropdown: string) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      dropdownTimeout.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 200);
    }
  };

  const navLinks: NavLink[] = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "About",
      href: "/about",
      icon: Info,
      submenu: [
        { name: "Heritage", href: "/about-us/heritage", icon: Info, description: "Our legacy and history" },
        { name: "Vision & Mission", href: "/about-us/vision-and-mission", icon: Info, description: "Our goals and purpose" },
        { name: "Management", href: "/about-us/management-team-committee", icon: Users, description: "Leadership team" },
        { name: "Chairman's Books", href: "/about-us/chairman-books", icon: BookOpen, description: "Publications by chairman" },
        { name: "Principal Message", href: "/about-us/principal-message", icon: MessageCircle, description: "Message from principal" },
        { name: "Rules & Regulations", href: "/about-us/rules-and-regulations", icon: Shield, description: "School policies" },
      ],
    },
    {
      name: "Academics",
      href: "/academics",
      icon: GraduationCap,
      submenu: [
        { name: "Curriculum & Pedagogical Processes", href: "/academics/curriculum-and-pedagogical-processes", icon: BookOpen, description: "Teaching framework" },
        { name: "Methodology", href: "/academics/methodology", icon: BookOpen, description: "Learning approach" },
        { name: "Creative Learning", href: "/academics/creative-learning", icon: Palette, description: "Imagination in action" },
        { name: "Academic Excellence", href: "/academics/academic-excellence", icon: Trophy, description: "Strong academic foundation" },
        { name: "All Round Development", href: "/academics/all-round-development", icon: Award, description: "Holistic growth" },
        { name: "Teacher Training", href: "/academics/teacher-training-programme-workshops", icon: Users, description: "Faculty development" },
      ],
    },
    {
      name: "Infrastructure",
      href: "/infrastructure-facilities",
      icon: Building,
      submenu: [
        { name: "Smart Class Rooms", href: "/infrastructure-facilities/classrooms", icon: Building, description: "Modern learning spaces" },
        { name: "Sports & Games", href: "/infrastructure-facilities/indoor-outdoor-and-traditional-games", icon: Activity, description: "Sports & recreation" },
        { name: "Transport", href: "/infrastructure-facilities/transport-facilities", icon: Bus, description: "Safe travel" },
        { name: "Medical", href: "/infrastructure-facilities/medical-facilities", icon: Heart, description: "Health support" },
        { name: "Library", href: "/infrastructure-facilities/library", icon: BookOpen, description: "Knowledge resources" },
        { name: "Auditorium", href: "/infrastructure-facilities/auditorium", icon: Building2, description: "Spacious space for events and activities" },
        { name: "Computer Lab", href: "/infrastructure-facilities/computer-lab", icon: Monitor, description: "Technology-enabled learning" },
        { name: "Dining", href: "/infrastructure-facilities/pantry-and-dining", icon: Coffee, description: "Dining area" },
      ],
    },
    ...(activities.length > 0
      ? [
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
        ]
      : []),
    {
      name: "Admission",
      href: "/admission",
      icon: FileText,
      submenu: [
        { name: "Procedure", href: "/admission/admission-procedure", icon: FileText, description: "Steps to apply" },
        { name: "Online Application", href: "https://hikaapp.sonastar.com/INS-3-ZXYXKM", icon: Globe, description: "Apply online", badge: "New" },
        { name: "Contact", href: "/admission/admission-contact", icon: MessageCircle, description: "Reach office" },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      icon: Globe,
      submenu: [
        { name: "News & Events", href: "/news-and-events", icon: Calendar, description: "Updates", badge: "New" },
      ],
    },
    {
      name: "Contact",
      href: "/contact-us",
      icon: MessageCircle,
    },
  ];

  return (
    <>
      <style jsx global>{`
        /* Navbar entrance (replaces framer-motion navVariants) */
        @keyframes navIn {
          from { opacity: 0; transform: translate3d(0, -100%, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-nav-in {
          animation: navIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-nav-in { animation: none; }
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

      <div ref={navRef}>
        <nav
          className={`animate-nav-in fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-secondary" : ""}`}
        >
          <div className="container-responsive">
            <div className="flex justify-between items-center h-14 md:h-16 lg:h-16">
              {/* Logo */}
              <Link href="/" className="relative z-50">
                <div className="flex items-center gap-2 sm:gap-3 transition-transform duration-300 hover:scale-[1.02]">
                  <Image
                    src="/homeimages/sona-valliappa-public-school.png"
                    alt="SVPS Logo"
                    width={240}
                    height={60}
                    sizes="240px"
                    priority
                    className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain"
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                {navLinks.map((link) => {
                  const isLinkActive = isActive(link.href);
                  const isSubActive = isSubmenuActive(link.submenu);
                  const isDropdownOpen = activeDropdown === link.name;

                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => link.submenu && handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {link.submenu ? (
                        <button
                          className={`relative flex items-center gap-1 px-2 xl:px-3 py-2 text-sm xl:text-base transition-all duration-200 hover:-translate-y-px ${
                            isLinkActive || isSubActive
                              ? "text-[#ec8013]"
                              : "text-[#f5dfc4]/80 hover:text-[#f5dfc4]"
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className={`relative flex items-center gap-1 px-2 xl:px-3 py-2 text-sm xl:text-base transition-colors duration-200 ${
                            isLinkActive
                              ? "text-[#ec8013]"
                              : "text-[#f5dfc4]/80 hover:text-[#f5dfc4]"
                          }`}
                        >
                          <span>{link.name}</span>
                        </Link>
                      )}

                      {/* Desktop Submenu — always mounted, toggled with opacity/translate/visibility
                          so BOTH open and close are smooth (no JS animation library needed). */}
                      {link.submenu && (
                        <div
                          className={`absolute top-full left-0 pt-1 transition-[opacity,transform,visibility] duration-200 ease-out ${
                            isDropdownOpen
                              ? "opacity-100 translate-y-0 visible"
                              : "opacity-0 translate-y-2 invisible pointer-events-none"
                          }`}
                          onMouseEnter={() => handleMouseEnter(link.name)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="w-72 xl:w-80 bg-[#1a4a5c] shadow-xl border border-[#ec8013]/20 overflow-hidden">
                            <div
                              className={`p-2 ${
                                link.name === "Activities"
                                  ? "max-h-[360px] overflow-y-auto activities-scrollbar"
                                  : ""
                              }`}
                            >
                              {link.submenu.map((item) => {
                                const isItemActive = isItemActivePath(router.pathname, item.href);
                                return (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 p-2.5 transition-all duration-150 group ${
                                      isItemActive ? "bg-[#ec8013]/15" : "hover:bg-[#ec8013]/10"
                                    }`}
                                  >
                                    <div
                                      className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-md ${
                                        isItemActive ? "bg-[#ec8013]" : "bg-[#ec8013]/10"
                                      }`}
                                    >
                                      <item.icon className={`w-4 h-4 ${isItemActive ? "text-white" : "text-[#ec8013]"}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`text-xs xl:text-sm transition-colors ${
                                            isItemActive ? "text-[#ec8013]" : "text-[#f5dfc4] group-hover:text-[#ec8013]"
                                          }`}
                                        >
                                          {item.name}
                                        </span>
                                        {item.badge && (
                                          <span className="text-[8px] px-1.5 py-0.5 bg-[#ec8013]/20 text-[#ec8013] rounded-full font-semibold shrink-0">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[10px] text-[#f5dfc4]/40 truncate">{item.description}</div>
                                    </div>
                                    <ArrowRight
                                      className={`w-3 h-3 transition-all shrink-0 ${
                                        isItemActive
                                          ? "text-[#ec8013]"
                                          : "text-[#f5dfc4]/20 group-hover:text-[#ec8013] group-hover:translate-x-0.5"
                                      }`}
                                    />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                <Link
                  href="/public-disclosure"
                  className="
                    px-3 xl:px-4 py-1.5
                    text-xs xl:text-sm font-semibold
                    rounded-full
                    bg-gradient-to-r from-[#ec8013] to-[#f5a623]
                    text-white
                    shadow-md
                    transition-all duration-300 ease-out
                    hover:scale-105
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:from-[#f5a623]
                    hover:to-[#ec8013]
                    active:scale-95
                    active:translate-y-0
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#ec8013]/50
                  "
                >
                  Mandatory Disclosure
                </Link>

                <Link
                  href="https://hikaapp.sonastar.com/INS-3-ZXYXKM"
                  className="
                    px-3 xl:px-4 py-1.5
                    text-xs xl:text-sm font-semibold
                    rounded-full
                    bg-gradient-to-r from-[#ec8013] to-[#f5a623]
                    text-white
                    shadow-md
                    transition-all duration-300 ease-out
                    hover:scale-105
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:from-[#f5a623]
                    hover:to-[#ec8013]
                    active:scale-95
                    active:translate-y-0
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#ec8013]/50
                  "
                >
                  Apply Now
                </Link>
              </div>

              {/* Mobile Menu Button — both icons stacked, cross-faded with CSS */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-8 h-8 rounded-lg flex items-center justify-center z-50 text-[#f5dfc4] transition-transform duration-150 active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <Menu
                  className={`absolute w-4 h-4 transition-all duration-200 ${
                    isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute w-4 h-4 transition-all duration-200 ${
                    isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-[opacity,visibility] duration-200 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Navigation Panel — slides in/out with CSS transform */}
        <div
          className={`fixed right-0 top-0 bottom-0 w-80 sm:w-96 bg-gradient-to-br from-[#1a4a5c] to-[#0d3543] shadow-2xl z-40 lg:hidden transition-[transform,visibility] duration-300 ease-out will-change-transform ${
            isOpen ? "translate-x-0 visible" : "translate-x-full invisible"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="h-full overflow-y-auto hide-scrollbar pt-16 pb-6">
            <div className="px-3 sm:px-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.submenu ? (
                    <MobileDropdown link={link} onClose={() => setIsOpen(false)} />
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between gap-3 px-4 py-3 transition-all group rounded-lg ${
                        isActive(link.href) ? "bg-[#ec8013]/10" : "hover:bg-[#ec8013]/5"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isActive(link.href) ? "bg-[#ec8013]" : "bg-[#ec8013]/10"
                          }`}
                        >
                          <link.icon className={`w-4 h-4 ${isActive(link.href) ? "text-white" : "text-[#ec8013]"}`} />
                        </div>
                        <span className={`text-sm ${isActive(link.href) ? "text-[#ec8013]" : "text-[#f5dfc4]"}`}>
                          {link.name}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#f5dfc4]/30" />
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#ec8013]/15 space-y-3">
                <Link
                  href="/public-disclosure"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}