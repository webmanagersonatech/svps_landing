import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, Briefcase, Award, ArrowRight, Trophy, Sparkles, Library } from "lucide-react";
import Link from "next/link";

const FeatureCard = ({
    image,
    title,
    description,
    href,
    index,
}: {
    image: string;
    title: string;
    description: string;
    href: string;
    index: number;
}) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <Link href={href} className="block">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                }}
                whileHover={{ scale: 1.02 }}
                className="
                    group relative h-56 overflow-hidden
                    rounded-[2rem]
                    bg-black cursor-pointer
                    shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                "
            >
                {/* Image */}
                <img
                    src={image}
                    alt={title}
                    className="
                        absolute inset-0 w-full h-full object-cover
                        group-hover:scale-110 transition-transform duration-700
                    "
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80"></div>

                {/* Top Number */}
                <div className="absolute top-5 left-5 z-20">
                    <span className="text-white/40 text-4xl font-bold">
                        0{index + 1}
                    </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-5 left-5 right-5 z-20">
                    <h3 className="text-white text-xl font-semibold leading-tight">
                        {title}
                    </h3>

                    <p className="mt-2 text-sm text-white/70 line-clamp-2">
                        {description}
                    </p>

                    {/* Arrow Button */}
                    <div className="mt-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:translate-x-1 transition-transform duration-300">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>

                        <span className="text-xs tracking-[2px] uppercase text-white/60">
                            Explore
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const GrowthSkillsComponent = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="relative max-w-8xl overflow-hidden">

            {/* TOP LIGHT SECTION */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="pt-20 pb-40 px-4 relative"

            >
                {/* Animated background pattern */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#ec8013] blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#18596d] blur-3xl"></div>
                </motion.div>


                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-2xl sm:text-3xl md:text-4xl  mt-1 font-semibold mb-3 sm:mb-4 text-white leading-tight tracking-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Build better growth skills,
                            <br className="hidden xs:block" /> faster

                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="block h-0.5 bg-gradient-to-r from-primary to-white rounded-full mt-3"
                            />
                        </motion.h1>
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-4"
                            style={{ color: "#e3eaec" }}
                        >
                            Explore new skills, deepen existing passions, and get
                            lost in creativity. What you find just might surprise
                            and inspire you.
                        </motion.p>

                        <motion.button
                            whileHover={{ x: 8 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 font-medium hover:gap-3 transition-all group relative overflow-hidden"
                            style={{ color: "#e3eaec" }}
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="relative z-10"
                            >
                                Read More
                            </motion.span>
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                            >
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            {/* DARK SECTION */}
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="pt-32 pb-20 px-4 relative"
                style={{ background: "linear-gradient(135deg, #18596d 0%, #0f1115 100%)" }}
            >
                {/* IMAGE 3 - Bottom Left Corner */}
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 50 }}
                    animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -50, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20"
                >
                    <img
                        src="/homeimages/book-elements.png"
                        alt="Decorative bottom left"
                        className="w-24 h-24 md:w-32 md:h-32 object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50, y: -50 }}
                    animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 50, y: -50 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute top-4 right-4 md:top-8 md:right-8 z-20"
                >
                    <img
                        src="/homeimages/book-elements-1.png"
                        alt="Decorative top right"
                        className="w-24 h-24 md:w-32 md:h-32 object-cover"
                    />
                </motion.div>


                <div className="max-w-7xl mx-auto relative z-10">

                    {/* FLOATING CARDS */}
                    <div className="grid md:grid-cols-3 gap-6 -mt-[200px]">
                        <FeatureCard
                            image="https://img.magnific.com/free-photo/ordinary-human-job-performed-by-robot_23-2151008311.jpg?uid=R224290380&ga=GA1.1.1847424523.1777460742&semt=ais_incoming&w=740&q=80"
                            title="Smart Classrooms"
                            description="Interactive digital classrooms that make learning engaging, creative, and future-ready."
                            index={0}
                            href="/infrastructure-facilities/classrooms"
                        />

                        <FeatureCard
                            image="https://img.magnific.com/premium-photo/young-girl-yellow-dress-seated-desk-art-project-holds-red-pencil-right-hand-blue_1299716-5550.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                            title="Creative Learning"
                            description="Encouraging curiosity, imagination, and innovation through activity-based education."
                            index={1}
                            href="/academics/all-round-development"
                        />

                        <FeatureCard
                            image="https://img.magnific.com/premium-photo/girl-with-her-arms-crossed-front-chalkboard-with-word-peace-it_1277828-30404.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                            title="Academic Excellence"
                            description="Providing strong academic foundations with personalized attention for every student."
                            href="/academics/curriculum-and-pedagogical-processes"
                            index={2}
                        />

                        <FeatureCard
                            image="https://img.magnific.com/premium-photo/children-playing-gym-with-balloons-sign-that-says-kids_875765-5570.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                            title="Sports & Activities"
                            description="Building teamwork, confidence, and leadership through sports and co-curricular activities."
                            index={3}
                            href="/infrastructure-facilities/indoor-outdoor-and-traditional-games"
                        />

                        <FeatureCard
                            image="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                            title="Expert Teachers"
                            description="Experienced and passionate educators dedicated to nurturing every child's potential."
                            href="/academics/teacher-training-programme-workshops"
                            index={4}
                        />

                        <FeatureCard
                            image="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop"
                            title="Smart Library"
                            description="A modern library with digital resources, reading spaces, and knowledge-driven learning."
                            index={5}
                            href="/infrastructure-facilities/library"
                        />
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="h-px bg-gradient-to-r from-transparent via-[#ec8013] to-transparent mt-16"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default GrowthSkillsComponent;