import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Activity = {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
};

const activities: Activity[] = [
  { id: 1, title: "Dramatics and Role Play", description: "Creative theatre and acting sessions.", image: "https://img.magnific.com/premium-photo/boy-girl-standing-stage-theater_236854-58201.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#FF6B6B" },
  { id: 2, title: "Sonaria Music Club", description: "Music, singing, and instruments training.", image: "https://img.magnific.com/premium-photo/young-students-playing-violins-orchestra_1236347-132.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#4ECDC4" },
  { id: 3, title: "Yoga", description: "Improving mental and physical health.", image: "https://img.magnific.com/premium-photo/positive-children-performing-yoga-exercises-kids-doing-gymnastic-exercises-family-health-concept_89223-15942.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#45B7D1" },
  { id: 4, title: "Sports Activities", description: "Indoor and outdoor sports programs.", image: "https://img.magnific.com/premium-photo/boy-wearing-red-jersey-with-number-4-it_1206963-63117.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#96CEB4" },
  { id: 5, title: "Dance", description: "Classical and modern dance activities.", image: "https://img.magnific.com/premium-photo/3d-icon-desk-fan-water-bottle-vector-illustration-white-background-ideal-home-office-com_980716-500750.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#FFEAA7" },
  { id: 6, title: "Art and Craft", description: "Painting, drawing, and crafts.", image: "https://img.magnific.com/premium-photo/group-young-girls-are-seated-long-wooden-table-painting-with-their-hands-they-are-surrounded-by-colorful-paint-have-smiles-their-faces_1148129-40233.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#DDA0DD" },
  { id: 7, title: "Story Telling", description: "Boosting imagination through stories.", image: "https://img.magnific.com/premium-photo/girl-reads-book-group-children_670382-11477.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#98D8C8" },
  { id: 8, title: "Public Speaking", description: "Confidence building sessions.", image: "https://img.magnific.com/premium-photo/indian-girl-practicing-her-presentation-skills-her-determination-succeed-academics-reflected-her-efforts-refine-her-public-speaking-abilities_748982-28032.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#F7D794" },
  { id: 9, title: "Field Trips", description: "Educational outdoor experiences.", image: "https://img.magnific.com/free-photo/asian-boy-little-girls-sitting-wooden-bridge-joyful-playing-with-banana-leaves-head-smile-laughting-with-funny-together-copy-space-rural-scene-style-concept_1150-55885.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#778BEB" },
  { id: 10, title: "Special Day Activities", description: "Cultural and national celebrations.", image: "https://img.magnific.com/free-photo/kids-having-fun-jungle-party_23-2149499049.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#E77F67" },
  { id: 11, title: "Exciting Games", description: "Fun and interactive learning games.", image: "https://img.magnific.com/premium-photo/students-playing-carrom-school_1613570-225.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#63CDDA" },
  { id: 12, title: "Rhythmic Songs", description: "Music-based learning sessions.", image: "https://img.magnific.com/premium-photo/young-boy-dressed-suit-smiles-while-playing-violin_14117-1112104.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#F8A5C2" },
  { id: 13, title: "Pottery", description: "Clay modeling and creativity.", image: "https://img.magnific.com/free-photo/talented-child-doing-pottery_23-2151693891.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#B8A9C9" },
  { id: 14, title: "Japanese Language", description: "Foreign language learning.", image: "https://img.magnific.com/free-photo/close-up-pupils-doing-japanese-calligraphy-called-shodo_23-2149105367.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#F3A683" },
  { id: 15, title: "ICT", description: "Technology and digital skills.", image: "https://img.magnific.com/free-photo/kids-with-vr-glasses-abstract-futuristic-school-classroom_23-2150892634.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#786FA6" },
  { id: 16, title: "Value Calendar", description: "Daily moral and value-based learning.", image: "https://img.magnific.com/premium-photo/man-girl-are-doing-homework-classroom_1206963-86038.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80", color: "#E1B12C" },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.3 }
  }
};

export default function SchoolActivitiesPremium() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isAutoSliding) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoSliding]);

  const handleActivityClick = (index: number) => {
    setIsAutoSliding(false);
    setActiveIndex(index);
    setTimeout(() => setIsAutoSliding(true), 8000);
  };

  const activeActivity = activities[activeIndex];

  return (
    <div
      ref={ref}
      className="w-full bg-gradient-to-b from-[#fffaf3] via-[#fef1dc] to-[#f6e2c7] py-8 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
          className="text-left mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl mt-1 font-semibold mb-3 sm:mb-4 text-secondary leading-tight tracking-tight"
          >
            Student  <span className="text-orange-500"> Activities</span>
          </motion.h2>

          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-4 rounded-full" />

          <p className="text-secondary/70 max-w-2xl text-lg">
            Holistic development through academics, creativity, sports, and leadership programs
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT IMAGE SECTION - with vertical padding on xl screens */}
          <div className="order-2 lg:order-1 xl:py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeActivity.id}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-white"
              >
                <div className="relative h-80 md:h-96 xl:h-[460px] overflow-hidden">
                  <img
                    src={activeActivity.image}
                    alt={activeActivity.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />

                  <div className="absolute top-4 right-4 bg-secondary/60 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs font-medium">
                      {activeIndex + 1} / {activities.length}
                    </span>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: activeActivity.color }}
                  />
                </div>

                <div className="p-6 bg-white">
                  <span className="text-xs uppercase tracking-wider text-secondary/60 font-semibold">
                    Featured Activity
                  </span>
                  <h3 className="text-lg font-semibold text-secondary mt-1">
                    {activeActivity.title}
                  </h3>
                  <p className="text-secondary/80 text-sm mt-2">
                    {activeActivity.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>


          </div>

          {/* RIGHT LIST SECTION - with extra padding on large screens (2xl) */}
          <div className="order-1 lg:order-2 lg:pl-6 2xl:pl-12">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={textVariants}
            >
              <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Explore Activities
              </h3>

              <div className="h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                  {activities.map((activity, idx) => (
                    <motion.button
                      key={activity.id}
                      onClick={() => handleActivityClick(idx)}
                      className={`w-full text-left px-4 py-3 transition-all duration-300 group
                        ${activeIndex === idx
                          ? "bg-gradient-to-r from-primary/10 to-accent/10 shadow-md"
                          : "hover:bg-background"
                        }`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: activity.color }}
                            />
                            <span className={`font-medium ${activeIndex === idx ? "text-secondary" : "text-secondary/70"}`}>
                              {activity.title}
                            </span>
                          </div>

                          <p className={`text-xs ${activeIndex === idx ? "text-secondary/80" : "text-secondary/50"}`}>
                            {activity.description.substring(0, 60)}...
                          </p>
                        </div>

                        {activeIndex === idx && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-1 h-8 rounded-full"
                            style={{ backgroundColor: activity.color }}
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

              </div>
              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-secondary/20 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-bold text-secondary">16+</div>
                  <div className="text-xs text-secondary/60">Activities</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-secondary">500+</div>
                  <div className="text-xs text-secondary/60">Students</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-secondary">10+</div>
                  <div className="text-xs text-secondary/60">Years</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #18596d;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ec8013;
        }
      `}</style>
    </div>
  );
}