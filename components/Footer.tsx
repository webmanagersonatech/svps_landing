import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaArrowRight,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const aboutLinks = [
    { name: "About Us", href: "/about-us/heritage" },
    { name: "Academics", href: "/academics/curriculum-and-pedagogical-processes" },
    { name: "Infrastructure", href: "/infrastructure-facilities/classrooms" },
    { name: "Admission", href: "/admission/admission-procedure" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const resourceLinks = [
    { name: "Student Activities", href: "/activities/dramatics-role-play" },
    { name: "Mandatory Disclosure", href: "/public-disclosure" },
    { name: "News & Events", href: "/news-and-events" },
    { name: "Admission Contact", href: "/admission/admission-contact" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "School Facilities", href: "/infrastructure-facilities/classrooms" },
    { name: "Transport", href: "/infrastructure-facilities/transport-facilities" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      {/* Top Border */}
      <div className="h-1 w-full bg-primary" />

      <div className="max-w-7xl mx-auto px-6  py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/20 pb-8 lg:pb-0 lg:pr-8">

            {/* Logo */}
            <Link href="/" className="inline-block">
              <img
                src="/homeimages/sona-valliappa-public-school-vertical-white.png"
                alt="SVP School"
                className="w-[80px] object-contain"
              />
            </Link>

            <h3 className="text-lg font-semibold text-white">
              Sona Valliappa Public School
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/80">
              Junction Main Road,
         
              Salem - 636005,
           
              Tamil Nadu, India
            </p>

            <div className="space-y-2 mt-2 text-sm">
              <div className="flex items-start gap-3">
                <FaPhone className="text-primary mt-1" />
                <div className="text-white/80">
                  <p>+91 9442592158</p>
                  <p>+91 427 2912160</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <a
                  href="mailto:svpschool@sonatech.ac.in"
                  className="text-white/80 hover:text-primary transition"
                >
                  svpschool@sonatech.ac.in
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaLocationDot className="text-primary mt-1" />
                <p className="text-white/80">Salem, Tamil Nadu</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                {
                  icon: <FaFacebookF />,
                  href: "https://www.facebook.com/sonavalliappapublicschool/",
                },
                {
                  icon: <FaXTwitter />,
                  href: "https://x.com/sona_vp_school",
                },
                {
                  icon: <FaInstagram />,
                  href: "https://www.instagram.com/sonavalliappapublicschool/",
                },
                {
                  icon: <FaYoutube />,
                  href: "https://www.youtube.com/channel/UC0RLdObcqt3cR3F7IUwd6Hw/videos",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

              {/* About */}
              <div>
                <h3 className="text-base font-bold text-primary mb-4 uppercase tracking-wide">
                  About
                </h3>

                <ul className="space-y-2">
                  {aboutLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group text-white/70 hover:text-primary transition duration-200 flex items-center gap-2 text-sm"
                      >
                        <span>{link.name}</span>
                        <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-base font-bold text-primary mb-4 uppercase tracking-wide">
                  Resources
                </h3>

                <ul className="space-y-2">
                  {resourceLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group text-white/70 hover:text-primary transition duration-200 flex items-center gap-2 text-sm"
                      >
                        <span>{link.name}</span>
                        <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-base font-bold text-primary mb-4 uppercase tracking-wide">
                  Quick Links
                </h3>

                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group text-white/70 hover:text-primary transition duration-200 flex items-center gap-2 text-sm"
                      >
                        <span>{link.name}</span>
                        <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom small note */}
            <div className="mt-8 pt-4 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/60">
                © {currentYear} Sona Valliappa Public School. All Rights Reserved.
              </p>

              <div className="flex items-center gap-5 text-xs">
                <Link
                  href="/"
                  className="text-white/60 hover:text-primary transition"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/"
                  className="text-white/60 hover:text-primary transition"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;