import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
    Calendar,
    Newspaper,

    ArrowRight,

} from "lucide-react";

import { newsAndEvents } from "../data/newsandevents";



// Main Component
const NewsEventsComponent = () => {
    const [activeTab, setActiveTab] = useState("news");
    const [loading, setLoading] = useState(false);
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const today = new Date();

    const newsItems = newsAndEvents
        .filter((item) => item.category === "news")
        .sort(
            (a, b) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
        )
        .slice(0, 4);

    const eventItems = newsAndEvents
        .filter((item) => item.category === "event")
        .sort(
            (a, b) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
        )
        .slice(0, 4);

    const upcomingItems = newsAndEvents
        .filter(
            (item) =>
                item.category === "event" &&
                new Date(item.startDate).getTime() > today.getTime()
        )
        .sort(
            (a, b) =>
                new Date(a.startDate).getTime() -
                new Date(b.startDate).getTime()
        )
        .slice(0, 4);

    const getActiveData = () => {
        switch (activeTab) {
            case "news":
                return newsItems;
            case "events":
                return eventItems;
            case "upcoming":
                return upcomingItems;
            default:
                return [];
        }
    };


    const data = getActiveData();


    return (
        <div className="w-full overflow-hidden bg-gradient-to-b from-[#fef9f0] via-white to-[#f5f7fa] relative">
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#ec8013]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#18596d]/5 rounded-full blur-3xl"></div>

            {/* CBSE Header Pattern - Redesigned with Left Text & Right Images */}
            <div className="relative bg-gradient-to-b from-[#f5dfc4] via-[#fdebd3] to-[#fff7ed] text-white overflow-hidden">


                {/* Floating Orbs */}
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-20 w-64 h-64 bg-[#ec8013]/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 left-20 w-80 h-80 bg-[#ec8013]/5 rounded-full blur-3xl"
                />

                <div ref={headerRef} className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="text-center md:text-left"
                        >

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-2xl sm:text-3xl md:text-4xl mt-1 font-semibold mb-3 sm:mb-4 text-secondary leading-tight tracking-tight"
                            >
                                News &
                                <span className="text-[#ec8013]"> Events</span>

                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={headerInView ? { width: "100%" } : { width: 0 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                    className="block h-0.5 bg-gradient-to-r from-[#ec8013] to-secondary rounded-full mt-3"
                                />
                            </motion.h1>

                            <div className="flex gap-2 mb-6 justify-center md:justify-start bg-white/5 backdrop-blur-sm w-fit mx-auto md:mx-0">
                                {["news", "events", "upcoming"].map((tab) => (
                                    <motion.button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative px-6 py-2.5 text-sm font-medium  transition-all duration-300 capitalize
                ${activeTab === tab
                                                ? "text-white"
                                                : "text-secondary  hover:text-secondary/80 "
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Active tab background with bend */}
                                        {activeTab === tab && (
                                            <motion.span
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-gradient-to-r from-[#ec8013] to-orange-500 shadow-lg shadow-orange-500/30"
                                                style={{
                                                    clipPath: "polygon(0% 0%, 100% 0%, 97% 100%, 3% 100%)",
                                                    borderRadius: "8px 8px 4px 4px",
                                                    transform: "perspective(400px) rotateX(2deg)",
                                                    transformOrigin: "bottom"
                                                }}
                                                transition={{ type: "spring", duration: 0.5 }}
                                            />
                                        )}

                                        {/* Tab text */}
                                        <span className="relative z-10">
                                            {tab === "upcoming" ? "Upcoming Events" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                            {/* Underline Decoration */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={headerInView ? { width: "80px" } : { width: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="h-1 bg-gradient-to-r from-[#ec8013] to-transparent rounded-full mb-6 mx-auto md:mx-0"
                            />

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-secondary  text-lg italic mb-8 leading-relaxed"
                            >
                                Stay updated with the latest happenings, achievements,
                                and upcoming events at Sona Valliappa Public School
                            </motion.p>

                            {/* Stats Row */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-wrap gap-6 justify-center md:justify-start"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/10 rounded-full p-2">
                                        <Calendar className="w-5 h-5 text-[#ec8013]" />
                                    </div>
                                    <div className="text-secondary ">
                                        <div className="text-2xl font-bold">50+</div>
                                        <div className="text-sm ">Events Yearly</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/10 rounded-full p-2">
                                        <Newspaper className="w-5 h-5 text-[#ec8013]" />
                                    </div>
                                    <div className="text-secondary ">
                                        <div className="text-2xl font-bold">100+</div>
                                        <div className="text-sm ">News Updates</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Button */}
                            <AnimatePresence mode="wait">
                                <Link href="/news-and-events">
                                    <motion.button
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: [0.25, 0.8, 0.25, 1],
                                        }}
                                        whileHover={{
                                            y: -3,
                                            scale: 1.02,
                                        }}
                                        whileTap={{ scale: 0.96 }}
                                        className="
                relative overflow-hidden
                mt-8 px-7 py-3
                bg-white/5
                text-primary
                font-semibold tracking-wide
                border border-primary/30
                rounded-2xl
                backdrop-blur-xl
                hover:text-white
                transition-all duration-500
                flex items-center gap-2
                mx-auto md:mx-0 group
                shadow-sm hover:shadow-lg
            "
                                    >
                                        {/* Hover Background */}
                                        <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-2xl"></span>

                                        {/* Text */}
                                        <span className="relative z-10">
                                            {activeTab === "news" && "View All News"}
                                            {activeTab === "events" && "View All Events"}
                                            {activeTab === "upcoming" && "View All Upcoming Events"}
                                        </span>

                                        {/* Icon */}
                                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </motion.button>
                                </Link>
                            </AnimatePresence>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="relative"
                        >


                            <div className="grid grid-cols-2 gap-6 gap-y-8">
                                {loading && (
                                    <div className="grid grid-cols-2 gap-6 gap-y-8">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="animate-pulse">
                                                <div className="h-48 bg-gray-200 rounded-2xl"></div>
                                                <div className="h-4 bg-gray-200 mt-3 w-3/4 rounded"></div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {data.map((item, index) => {
                                    const effects = {
                                        rotate: index % 2 === 0 ? -5 : 5,
                                        rotateHover: index % 2 === 0 ? -3 : 3,
                                        delay: index * 0.1,
                                        mt: index % 2 === 0 ? 0 : 8
                                    };

                                    return (
                                        <Link key={item.slug} href={`/news-and-events/${item.slug}`}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20, rotate: effects.rotate }}
                                                animate={
                                                    headerInView
                                                        ? { opacity: 1, y: 0, rotate: effects.rotate }
                                                        : { opacity: 0, y: 20, rotate: effects.rotate }
                                                }
                                                transition={{ duration: 0.6, delay: effects.delay }}
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotate: effects.rotateHover,
                                                    transition: { duration: 0.3 }
                                                }}
                                                className="group cursor-pointer"
                                                style={{ marginTop: `${effects.mt}px` }}
                                            >
                                                <div className="relative rounded-2xl overflow-hidden shadow-xl">

                                                    {/* IMAGE */}
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />

                                                    {/* DATE */}
                                                    <div className="absolute top-3 left-3 z-10">
                                                        <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                                                            <p className="text-xs font-semibold text-[#e68a2e] tracking-wide">
                                                                {new Date(item.startDate).toLocaleDateString("en-US", {
                                                                    month: "long",
                                                                    day: "2-digit",
                                                                    year: "numeric"
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* TITLE */}
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                        <h4 className="text-sm font-bold text-white text-center">
                                                            {item.title}
                                                        </h4>
                                                    </div>

                                                    {/* OVERLAY */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                </div>
                                            </motion.div>
                                        </Link>
                                    );
                                })}

                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[220px] overflow-hidden">

                    {/* Curved container */}
                    <div className="w-full h-full 
                  [clip-path:polygon(0_100%,100%_0,100%_100%,0_100%)]
                  bg-gray-100 relative">

                        {/* Images grid */}
                        <div className="absolute inset-0 grid grid-cols-6 gap-6 p-6 opacity-30">

                            <img src="/homeimages/school-1.png" className="w-14 h-14" />
                            <img src="/homeimages/school-2.png" className="w-14 h-14" />
                            <img src="/homeimages/school-3.png" className="w-14 h-14" />
                            <img src="/homeimages/school-4.png" className="w-14 h-14" />
                            <img src="/homeimages/school-5.png" className="w-14 h-14" />
                            <img src="/homeimages/school-6.png" className="w-14 h-14" />

                            {/* repeat */}
                            <img src="/homeimages/school-1.png" className="w-14 h-14" />
                            <img src="/homeimages/school-2.png" className="w-14 h-14" />
                            <img src="/homeimages/school-3.png" className="w-14 h-14" />
                            <img src="/homeimages/school-7.png" className="w-14 h-14" />
                            <img src="/homeimages/school-8.png" className="w-14 h-14" />
                            <img src="/homeimages/school-9.png" className="w-14 h-14" />







                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsEventsComponent;

