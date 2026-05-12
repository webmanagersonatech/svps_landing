import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import {
    FaChalkboardTeacher,
    FaBook,
    FaFutbol,
    FaLaptopCode,
    FaUtensils,
    FaBus,
} from "react-icons/fa";

type NodeType = {
    id: number;
    label: string;
    imageUrl: string;
    color: string;
    href?: string;
    accentIcon: React.ReactNode;
};

const nodes: NodeType[] = [
    {
        id: 1,
        label: "Classrooms",
        imageUrl:
            "https://img.magnific.com/premium-photo/capturing-serenity-exploring-empty-japanesestyle-classroom_931866-15515.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        href: "/infrastructure-facilities/classrooms",
        color: "#2563EB",
        accentIcon: <FaChalkboardTeacher />,
    },
    {
        id: 2,
        label: "Library",
        imageUrl:
            "https://img.magnific.com/premium-photo/children-are-sitting-library-with-word-bottom-book_198067-1078835.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        href: "/infrastructure-facilities/library",
        color: "#059669",
        accentIcon: <FaBook />,
    },
    {
        id: 3,
        label: "Playground",
        imageUrl:
            "https://img.magnific.com/premium-photo/boy-hanging-monkey-bars-playground_1605431-364.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        href: "/infrastructure-facilities/indoor-outdoor-and-traditional-games",
        color: "#D97706",
        accentIcon: <FaFutbol />,
    },
    {
        id: 4,
        label: "Computer Lab",
        imageUrl:
            "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
        href: "/infrastructure-facilities/computer-lab",
        color: "#7C3AED",
        accentIcon: <FaLaptopCode />,
    },
    {
        id: 5,
        label: "Cafeteria",
        imageUrl:
            "https://img.magnific.com/premium-photo/bhai-dooj-family-festive-feast-photo_960396-1003083.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        href: "/infrastructure-facilities/pantry-and-dining",
        color: "#DC2626",
        accentIcon: <FaUtensils />,
    },
    {
        id: 6,
        label: "Transport",
        imageUrl:
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
        href: "/infrastructure-facilities/transport-facilities",
        color: "#0891B2",
        accentIcon: <FaBus />,
    },
    {
        id: 7,
        label: "Auditorium",
        imageUrl:
            "https://img.magnific.com/premium-photo/hightech-school-auditorium-with-stateoftheart-audiovisual-equipment-isolated-white-background_660230-109474.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        href: "/infrastructure-facilities/auditorium",
        color: "#DB2777",
        accentIcon: <FaChalkboardTeacher />, // You can replace with a more appropriate icon like FaMicrophone or FaTheaterMasks
    },
];

export default function InfrastructureGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    const isInView = useInView(containerRef, {
        once: true,
        amount: 0.2,
    });

    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="w-full py-6 md:px-4"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="
          max-w-7xl mx-auto
          grid grid-cols-1 md:grid-cols-4
          gap-4
          auto-rows-[180px]
        "
            >
                {/* LEFT BIG CARD */}
                <motion.div
                    variants={itemVariants}
                    className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-sm"
                >
                    <Link href={nodes[0].href || "#"}>
                        <div className="w-full h-full relative">
                            <img
                                src={nodes[0].imageUrl}
                                alt={nodes[0].label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="text-4xl mb-2">
                                        {nodes[0].accentIcon}
                                    </div>
                                    <p className="text-lg font-semibold">Explore {nodes[0].label}</p>
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 text-white z-10 group-hover:opacity-0 transition-opacity duration-300">
                                <div className="text-3xl mb-2">
                                    {nodes[0].accentIcon}
                                </div>
                                <h3 className="text-2xl font-bold">
                                    {nodes[0].label}
                                </h3>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* TOP RIGHT */}
                <motion.div
                    variants={itemVariants}
                    className="md:col-span-2 group relative overflow-hidden rounded-sm"
                >
                    <Link href={nodes[1].href || "#"}>
                        <div className="w-full h-full relative">
                            <img
                                src={nodes[1].imageUrl}
                                alt={nodes[1].label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="text-3xl mb-2">
                                        {nodes[1].accentIcon}
                                    </div>
                                    <p className="text-base font-semibold">Explore {nodes[1].label}</p>
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 text-white z-10 group-hover:opacity-0 transition-opacity duration-300">
                                <div className="text-2xl mb-1">
                                    {nodes[1].accentIcon}
                                </div>
                                <h3 className="text-lg font-bold">
                                    {nodes[1].label}
                                </h3>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* MIDDLE RIGHT */}
                <motion.div
                    variants={itemVariants}
                    className="md:col-span-2 group relative overflow-hidden rounded-sm"
                >
                    <Link href={nodes[2].href || "#"}>
                        <div className="w-full h-full relative">
                            <img
                                src={nodes[2].imageUrl}
                                alt={nodes[2].label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="text-3xl mb-2">
                                        {nodes[2].accentIcon}
                                    </div>
                                    <p className="text-base font-semibold">Explore {nodes[2].label}</p>
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 text-white z-10 group-hover:opacity-0 transition-opacity duration-300">
                                <div className="text-2xl mb-1">
                                    {nodes[2].accentIcon}
                                </div>
                                <h3 className="text-lg font-bold">
                                    {nodes[2].label}
                                </h3>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* BOTTOM 3 CARDS */}
                {nodes.slice(3).map((node) => (
                    <motion.div
                        key={node.id}
                        variants={itemVariants}
                        className="group relative overflow-hidden rounded-sm"
                    >
                        <Link href={node.href || "#"}>
                            <div className="w-full h-full relative">
                                <img
                                    src={node.imageUrl}
                                    alt={node.label}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                    <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="text-2xl mb-2">
                                            {node.accentIcon}
                                        </div>
                                        <p className="text-sm font-semibold">Explore {node.label}</p>
                                    </div>
                                </div>

                                <div className="absolute bottom-3 left-3 text-white z-10 group-hover:opacity-0 transition-opacity duration-300">
                                    <div className="text-xl mb-1">
                                        {node.accentIcon}
                                    </div>
                                    <h3 className="text-sm font-semibold">
                                        {node.label}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}