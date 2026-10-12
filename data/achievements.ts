/**
 * STUDENT ACHIEVEMENTS - edit this file to add / change achievements.
 * Each item automatically gets its own page: /student-achievements/<slug>
 * and shows on the home page slider. Images go in /public/achievements/.
 *
 * Text below is exactly as supplied by the client.
 * TODO: replace image "/achievements/placeholder.svg" with each student's photo
 *       (e.g. "/achievements/sathyan-m.webp") and fill className / parent if wanted.
 */
export type Achievement = {
  id: number;
  slug: string; // used in the URL - lowercase, hyphens only
  studentName: string;
  className?: string; // optional, e.g. "CLASS III"
  achievement: string; // main title (sport)
  subTitle?: string;
  description: string; // short text (home slider + SEO)
  parent?: string; // optional
  image: string;
  bgImage: string;
  date?: string;
  category?: string;
  level?: string;
  story?: string[]; // optional long paragraphs
  highlights?: string[]; // full achievements list (shown on detail page)
  quote?: string;
  quoteBy?: string;
  gallery?: string[]; // extra photos
};

export const achievements: Achievement[] = [
  {
    id: 1,
    slug: "sathyan-m-finswimming",
    studentName: "SATHYAN M",
    achievement: "FINSWIMMING",
    category: "Finswimming",
    description: "1st Place – 50-metre Bi-Fins, 6th National Finswimming Championship 2026 (33.96 seconds).",
    image: "/achievements/Sathyan.webp",
    bgImage: "/achievements/Sathyan.web",
    highlights: [
      "1st Place – 50-metre Bi-Fins, 6th National Finswimming Championship 2026 (33.96 seconds).",
      "1st Place – 100-metre Bi-Fins, 6th National Finswimming Championship 2026 (1 minute 14.46 seconds).",
      "2nd Place – 50-metre Surface, 6th National Finswimming Championship 2026 (41.20 seconds).",
    ],
  },
  {
    id: 2,
    slug: "sn-sakthi-swimming",
    studentName: "S. N. SAKTHI",
    achievement: "SWIMMING",
    category: "Swimming",
    description: "Overall Achievement: 6 Gold, 8 Silver and 1 Bronze Medal.",
    image: "/achievements/Shakthi.webp",
    bgImage: "/achievements/Shakthi.webp",
    highlights: [
      "National Finswimming Championship 2026: 1 Gold and 2 Silver Medals.",
      "23rd Tamil Nadu State-Level Meet: 1 Gold and 2 Silver Medals.",
      "22nd State-Level Swimming Competition (VIBGYOR): 4 Gold and 1 Silver Medal.",
      "42nd Sub-Junior Aquatic Championship: 3 Silver and 1 Bronze Medal.",
      "Overall Achievement: 6 Gold, 8 Silver and 1 Bronze Medal.",
    ],
  },
  {
    id: 3,
    slug: "nitharssana-sri-archery",
    studentName: "NITHARSSANA SRI",
    achievement: "ARCHERY",
    category: "Archery",
    description: "3rd Place – Fourth National Barbo Championships 2026, Recurve Under-10 Female category.",
    image: "/achievements/NITHARSSANA-SRI.webp",
    bgImage: "/achievements/NITHARSSANA-SRI.webp",
    highlights: [
      "3rd Place – Fourth National Barbo Championships 2026, Recurve Under-10 Female category.",
      "3rd Place – RGBI Federation Cup National Archery Championship, Recurve Under-10 Female category.",
      "1st Place – Third International Traditional Archery Championship 2025–26, Recurve Under-10 Girls category.",
    ],
  },
  {
    id: 4,
    slug: "lithika-shree-badminton",
    studentName: "LITHIKA SHREE",
    achievement: "BADMINTON",
    category: "Badminton",
    description: "Secured a ranking under the Tamil Nadu Badminton Association in the Under-11 Girls category in both Singles and Doubles.",
    image: "/achievements/Lithika-shree.webp",
    bgImage: "/achievements/Lithika-shree.webp",
    highlights: [
      "Secured a ranking under the Tamil Nadu Badminton Association in the Under-11 Girls category in both Singles and Doubles.",
    ],
  },
  {
    id: 5,
    slug: "mirdula-gymnastics",
    studentName: "MIRDULA",
    achievement: "GYMNASTICS",
    category: "Gymnastics",
    description: "State-Level Gymnastics: 7 Gold, 5 Silver and 2 Bronze Medals.",
    image: "/achievements/Mirdula.webp",
    bgImage: "/achievements/Mirdula.webp",
    highlights: [
      "State-Level Gymnastics: 7 Gold, 5 Silver and 2 Bronze Medals.",
      "Overall Achievement: 14 Medals — 7 Gold, 5 Silver and 2 Bronze",
    ],
  },
];

export const getAchievement = (slug: string) =>
  achievements.find((a) => a.slug === slug);