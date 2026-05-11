import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode, useEffect, useRef, useState } from "react";

export function PageHeader({
    title,
    subtitle,
    breadcrumbs,
    children,
}: {
    title: string;
    subtitle?: string;
    breadcrumbs: string[];
    children?: ReactNode;
}) {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const { scrollY } = useScroll();
    const [scrollProgress, setScrollProgress] = useState(0);
    const heroRef = useRef<HTMLElement>(null);

    // Parallax effect on background elements
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollProgress(latest);
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

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
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const floatingVariants = {
        animate: (i: number) => ({
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
            },
        }),
    };

    const breadcrumbVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                staggerChildren: 0.05,
            },
        },
    };

    const breadcrumbItemVariants = {
        hidden: { x: -10, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
        },
    };

    return (
        <>
            {/* HERO SECTION - Pure Secondary Color with CBSE Pattern */}
            <motion.section
                ref={heroRef}
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                className="relative bg-gradient-to-br from-secondary via-secondary/80 to-primary/20 text-white overflow-hidden"
            >
                {/* CBSE Pattern Background - Darker accents on pure secondary */}
                <div className="absolute inset-0 opacity-15">
                    {/* Notebook ruled lines */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                to bottom,
                                transparent,
                                transparent 28px,
                                rgba(0,0,0,0.3) 28px,
                                rgba(0,0,0,0.3) 29px
                            )`,
                            transformOrigin: "left",
                        }}
                    />

                    {/* Red margin line */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="absolute top-0 bottom-0 w-12 left-8"
                        style={{
                            borderRight: "1px solid rgba(0,0,0,0.3)",
                        }}
                    />

                    {/* Exam grid pattern */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(
                                    90deg,
                                    transparent,
                                    transparent 28px,
                                    rgba(0,0,0,0.15) 28px,
                                    rgba(0,0,0,0.15) 29px
                                ),
                                repeating-linear-gradient(
                                    0deg,
                                    transparent,
                                    transparent 28px,
                                    rgba(0,0,0,0.15) 28px,
                                    rgba(0,0,0,0.15) 29px
                                )
                            `,
                        }}
                    />

                    {/* OMR bubbles with floating animation */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={floatingVariants}
                                animate="animate"
                                className="absolute rounded-full border border-black/30"
                                style={{
                                    width: `${20 + (i % 3) * 8}px`,
                                    height: `${20 + (i % 3) * 8}px`,
                                    left: `${5 + (i * 7) % 90}%`,
                                    top: `${15 + (i * 13) % 70}%`,
                                    opacity: 0.2 + (i % 5) * 0.05,
                                }}
                            />
                        ))}
                    </div>

                    {/* CBSE Circular emblem with rotation */}
                    <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 1, delay: 0.6, type: "spring" }}
                        className="absolute top-12 right-12"
                    >
                        <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-25">
                            <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2" fill="none" />
                            <circle cx="50" cy="50" r="35" stroke="black" strokeWidth="1.5" fill="none" />
                            <circle cx="50" cy="50" r="25" stroke="black" strokeWidth="1" fill="none" />
                            <path d="M50 50 L50 5" stroke="black" strokeWidth="1.5" />
                            <path d="M50 50 L95 50" stroke="black" strokeWidth="1.5" />
                            <path d="M50 50 L88 88" stroke="black" strokeWidth="1.5" />
                            <path d="M50 50 L12 88" stroke="black" strokeWidth="1.5" />
                            <path d="M50 50 L12 12" stroke="black" strokeWidth="1.5" />
                        </svg>
                    </motion.div>

                    {/* Open book icon with floating */}
                    <motion.div
                        custom={1}
                        variants={floatingVariants}
                        animate="animate"
                        className="absolute bottom-16 left-10 opacity-20"
                    >
                        <svg width="50" height="40" viewBox="0 0 100 80" fill="none">
                            <rect x="10" y="10" width="35" height="60" rx="3" stroke="black" strokeWidth="2" fill="none" />
                            <rect x="55" y="10" width="35" height="60" rx="3" stroke="black" strokeWidth="2" fill="none" />
                            <line x1="45" y1="10" x2="55" y2="10" stroke="black" strokeWidth="2" />
                            <line x1="45" y1="70" x2="55" y2="70" stroke="black" strokeWidth="2" />
                        </svg>
                    </motion.div>

                    {/* Certificate/seal accent with pulse */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7, type: "spring", bounce: 0.5 }}
                        className="absolute top-24 left-12 opacity-20"
                    >
                        <svg width="45" height="45" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2" fill="none" strokeDasharray="4 3" />
                            <polygon points="50,15 65,35 85,35 70,55 75,75 50,65 25,75 30,55 15,35 35,35" stroke="black" strokeWidth="1.5" fill="none" />
                        </svg>
                    </motion.div>

                    {/* Diagonal academic stripes */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 40px,
                                rgba(0,0,0,0.08) 40px,
                                rgba(0,0,0,0.08) 80px
                            )`,
                        }}
                    />
                </div>

                {/* Content with parallax effect */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    className="relative max-w-7xl mx-auto px-4 pt-24 pb-20 text-center"
                    style={{
                        y: scrollProgress * 0.3, // Parallax effect
                    }}
                >
                    {children ? (
                        <motion.div variants={itemVariants}>
                            {children}
                        </motion.div>
                    ) : (
                        <>
                            <motion.div variants={itemVariants}>
                                <motion.h1
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 15,
                                        delay: 0.2,
                                    }}
                                    className="text-4xl md:text-5xl font-semibold tracking-wide mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent leading-tight py-2"   >
                                    {title}
                                </motion.h1>
                            </motion.div>

                            {subtitle && (
                                <motion.div
                                    variants={itemVariants}
                                    transition={{ delay: 0.3 }}
                                >
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="text-base text-white/80 italic"
                                    >
                                        {subtitle}
                                    </motion.p>
                                </motion.div>
                            )}
                        </>
                    )}
                </motion.div>

                {/* LAYERED WAVE */}
                {/* WAVE DIVIDER with animated path */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none"
                >
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-16"
                        preserveAspectRatio="none"
                    >
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L0,120Z"
                            className="fill-background"
                        />
                    </svg>
                </motion.div>
            </motion.section>

            {/* BREADCRUMB with slide-in animation */}
            <motion.div
                initial="hidden"
                animate={controls}
                variants={breadcrumbVariants}
                className="relative max-w-7xl mx-auto px-4 z-10 -mt-6"
            >
                <motion.nav
                    variants={breadcrumbVariants}
                    className="inline-flex items-center gap-2 bg-white shadow-lg py-2 px-4 border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HomeIcon className="w-4 h-4 text-gray-600" />
                    </motion.div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {breadcrumbs.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={breadcrumbItemVariants}
                                custom={i}
                                className="flex items-center gap-2"
                                whileHover={{ x: i !== breadcrumbs.length - 1 ? 3 : 0 }}
                            >
                                <motion.span
                                    whileHover={{ scale: i !== breadcrumbs.length - 1 ? 1.05 : 1 }}
                                    className={
                                        i === breadcrumbs.length - 1
                                            ? "text-gray-900 font-medium text-sm"
                                            : "text-gray-600 hover:text-gray-900 transition cursor-pointer text-sm"
                                    }
                                >
                                    {item}
                                </motion.span>

                                {i !== breadcrumbs.length - 1 && (
                                    <motion.div
                                        initial={{ x: -5, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.nav>
            </motion.div>
        </>
    );
}