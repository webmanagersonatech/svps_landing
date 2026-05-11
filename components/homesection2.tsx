import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles, Trophy, Users, Star } from "lucide-react";
import Link from "next/link";

/* MAIN COMPONENT */
const GrowthSkillsComponent2 = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const [imageRef, imageInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div ref={ref}>
            <div className="w-full overflow-hidden bg-gradient-to-b from-[#f5dfc4] via-[#fdebd3] to-[#fff7ed] relative">
                {/* Animated Background Elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl"
                />



                {/* ================= HERO SECTION ================= */}
                <div
                    className="p-28 bg-cover bg-center"
                    style={{ backgroundImage: "url('/homeimages/canvas.png')" }}
                ></div>
                <div className="relative px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Grid with equal height columns */}
                        <div className="grid md:grid-cols-2 items-stretch gap-8 md:gap-10 lg:gap-12">
                            {/* LEFT IMAGE - Same height as right side */}
                            <motion.div
                                ref={imageRef}
                                className="relative flex  items-center justify-center md:justify-start h-full"
                                initial={{ opacity: 0, x: -80 }}
                                animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                }}
                            >
                                <div className="relative w-full flex justify-center md:justify-start">
                                    {/* Decorative circle behind image */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={imageInView ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        className="absolute inset-0 w-[300px] sm:w-[350px] md:w-[400px] lg:w-[480px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[4s80px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 -top-10 -left-10"
                                    />

                                    <motion.img
                                        src="/homeimages/group.webp"
                                        alt="Instructor"
                                        className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[420px] -mt-[230px] relative z-10"
                                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                                        animate={imageInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 90 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.3,
                                            ease: [0.21, 0.47, 0.32, 0.98],
                                        }}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                                    />


                                </div>
                            </motion.div>

                            {/* RIGHT CONTENT - Same height as left side */}
                            <motion.div
                                ref={ref}
                                className="flex flex-col justify-center text-center md:text-left h-full object-contain relative -mt-[20px]"
                                initial={{ opacity: 0, x: 80 }}
                                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                }}
                            >

                                {/* Welcome line with gradient underline */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="mt-2"
                                >
                                    <span className="text-sm sm:text-base uppercase tracking-wider text-primary font-medium">
                                        Welcome to
                                    </span>
                                </motion.div>

                                <motion.h1
                                    className="inline-block w-fit text-2xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 font-semibold mb-3 sm:mb-4 text-secondary leading-tight tracking-tight"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <span className="inline-block">
                                        Sona Valliappa <br className="hidden xs:block" /> Public School
                                    </span>

                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                                        transition={{ duration: 0.8, delay: 1 }}
                                        className="block h-0.5 w-full origin-left bg-gradient-to-r from-primary to-secondary rounded-full mt-3"
                                    />
                                </motion.h1>

                                <motion.p
                                    className="text-sm sm:text-base text-secondary mb-4 sm:mb-6  mx-auto md:mx-0 leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    Sona Valliappa Public School has its location in the heart of Salem city near to Salem Railway Junction and Central Bus Stand.
                                    Established by the benevolent management of Sona Group of Institutions, comprising of Thiagarajar Polytechnic College,
                                    Sona College of Technology and Sona College of Arts and Science, who have been rendering yeomen services in education
                                    for more than sixty six years.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                                >
                                    {/* Card 1 */}
                                    <div className="group relative bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl px-5 py-1 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300">
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">✓</div>
                                        <span className="text-secondary font-bold text-sm tracking-wide">68+ YEARS</span>
                                        <span className="block text-gray-500 text-[11px]">Legacy of Excellence</span>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="group relative bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl px-5 py-1 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300">
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">✓</div>
                                        <span className="text-secondary font-bold text-sm tracking-wide">  SMART CAMPUS</span>
                                        <span className="block text-gray-500 text-[11px]">  Modern Facilities & Digital Learning</span>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="group relative bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl px-5 py-1 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300">
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">✓</div>
                                        <span className="text-secondary font-bold text-sm tracking-wide">  CBSE CURRICULUM</span>
                                        <span className="block text-gray-500 text-[11px] "> Academic Excellence & Holistic Learning</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 1 }}
                                >
                                    <Link href="/infrastructure-facilities/classrooms">
                                        <motion.button
                                            whileHover={{
                                                y: -3,
                                                scale: 1.02,
                                            }}
                                            whileTap={{ scale: 0.96 }}
                                            className="
                relative overflow-hidden group
                mt-6 px-6 sm:px-7 py-2.5 sm:py-3
                bg-white/5
                text-primary
                font-semibold tracking-wide
                border border-primary/30
                rounded-2xl
                backdrop-blur-xl
                hover:text-white
                transition-all duration-500
                flex items-center gap-2
                mx-auto md:mx-0 w-fit
                shadow-sm hover:shadow-lg
            "
                                        >
                                            {/* Animated Hover Background */}
                                            <span className="absolute inset-0 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-2xl"></span>

                                            {/* Text */}
                                            <span className="relative z-10 text-sm sm:text-base">
                                                Explore Our School
                                            </span>

                                            {/* Arrow */}
                                            <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </motion.button>
                                    </Link>
                                </motion.div>

                                {/* Trust indicators */}

                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrowthSkillsComponent2;