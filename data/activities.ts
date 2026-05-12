export type Activity = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  images: string[];
  shortDescription?: string;
  description: string;
};

export const activities: Activity[] = [
  {
    id: 1,
    title: "Dramatics and Role Play",
    slug: "dramatics-role-play",
    thumbnail: "/activities/Dramatics-1.jpg",
    images: [
      "/activities/Dramatics-3.webp",
      "/activities/Dramatics-2.jpg",
      "/activities/Dramatics-4.webp",
      "/activities/Dramatics-5.webp",
    ],
    shortDescription: "Build confidence and creativity through acting, storytelling, and stage performances.",
    description: `
      <p>Dramatics and role play help students build confidence, creativity, and communication skills. Through acting and storytelling, students learn to express emotions and work as a team.</p>
      <ul>
        <li>Stage performances and skits</li>
        <li>Character acting and improvisation</li>
        <li>Creative storytelling and script writing</li>
      </ul>
    `,
  },
  {
    id: 2,
    title: "Sonaria Music Club",
    slug: "sonaria-music-club",
    thumbnail: "https://img.magnific.com/premium-photo/young-students-playing-violins-orchestra_1236347-132.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/sonaria-music-club/1.jpg",
      "/images/activities/sonaria-music-club/2.jpg",
      "/images/activities/sonaria-music-club/3.jpg",
    ],
    shortDescription: "Nurture musical talent through vocal training and instrumental practice.",
    description: `
      <p>Sonaria Music Club nurtures musical talent in vocal and instrumental areas. Students learn rhythm, melody, and performance skills while enjoying group and solo practice.</p>
      <ul>
        <li>Vocal training and ear training</li>
        <li>Instrumental practice (guitar, keyboard, drums)</li>
        <li>Band performances and music theory</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: "Yoga",
    slug: "yoga",
    thumbnail: "https://img.magnific.com/premium-photo/positive-children-performing-yoga-exercises-kids-doing-gymnastic-exercises-family-health-concept_89223-15942.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/yoga/1.jpg",
      "/images/activities/yoga/2.jpg",
      "/images/activities/yoga/3.jpg",
    ],
    shortDescription: "Promote physical fitness, flexibility, and mental peace through asanas and meditation.",
    description: `
      <p>Yoga promotes physical fitness, flexibility, and mental peace. Students practice asanas, pranayama, and meditation to improve concentration and reduce stress.</p>
      <ul>
        <li>Daily asana practice (sun salutation, standing & seated poses)</li>
        <li>Breathing exercises (pranayama)</li>
        <li>Mindfulness and relaxation techniques</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: "Sports Activities",
    slug: "sports-activities",
    thumbnail: "https://img.magnific.com/premium-photo/boy-wearing-red-jersey-with-number-4-it_1206963-63117.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/sports-activities/1.jpg",
      "/images/activities/sports-activities/2.jpg",
      "/images/activities/sports-activities/3.jpg",
    ],
    shortDescription: "Build physical strength, teamwork, and sportsmanship through competitive games.",
    description: `
      <p>Indoor and outdoor sports build physical strength, teamwork, and sportsmanship. Students engage in competitive and recreational games.</p>
      <ul>
        <li>Cricket, football, basketball, and volleyball</li>
        <li>Table tennis, badminton, and kho-kho</li>
        <li>Fitness drills and inter-house tournaments</li>
      </ul>
    `,
  },
  {
    id: 5,
    title: "Dance",
    slug: "dance",
    thumbnail: "https://img.magnific.com/premium-photo/3d-icon-desk-fan-water-bottle-vector-illustration-white-background-ideal-home-office-com_980716-500750.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/dance/1.jpg",
      "/images/activities/dance/2.jpg",
      "/images/activities/dance/3.jpg",
    ],
    shortDescription: "Explore classical, folk, and modern dance forms to improve coordination and rhythm.",
    description: `
      <p>Students explore classical, folk, and modern dance forms. Dance improves coordination, rhythm, and self-expression.</p>
      <ul>
        <li>Classical (Bharatanatyam, Kathak)</li>
        <li>Folk and contemporary styles</li>
        <li>Choreography for school events</li>
      </ul>
    `,
  },
  {
    id: 6,
    title: "Swimming",
    slug: "swimming",
    thumbnail: "/images/activities/swimming/thumb.jpg",
    images: [
      "/images/activities/swimming/1.jpg",
      "/images/activities/swimming/2.jpg",
      "/images/activities/swimming/3.jpg",
    ],
    shortDescription: "Learn professional swimming strokes and essential water safety skills.",
    description: `
      <p>Professional swimming training ensures fitness and water safety. Students learn different strokes and rescue techniques.</p>
      <ul>
        <li>Freestyle, backstroke, breaststroke, butterfly</li>
        <li>Breathing control and floating</li>
        <li>Water safety and basic rescue skills</li>
      </ul>
    `,
  },
  {
    id: 7,
    title: "Pottery",
    slug: "pottery",
    thumbnail: "https://img.magnific.com/free-photo/talented-child-doing-pottery_23-2151693891.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/pottery/1.jpg",
      "/images/activities/pottery/2.jpg",
      "/images/activities/pottery/3.jpg",
    ],
    shortDescription: "Boost creativity and fine motor skills through clay modeling and wheel throwing.",
    description: `
      <p>Clay modeling and pottery boost creativity and fine motor skills. Students learn hand-building, wheel throwing, and glazing.</p>
      <ul>
        <li>Hand-building techniques (pinch, coil, slab)</li>
        <li>Potter's wheel basics</li>
        <li>Glazing and kiln firing</li>
      </ul>
    `,
  },
  {
    id: 8,
    title: "Art and Craft",
    slug: "art-and-craft",
    thumbnail: "https://img.magnific.com/premium-photo/group-young-girls-are-seated-long-wooden-table-painting-with-their-hands-they-are-surrounded-by-colorful-paint-have-smiles-their-faces_1148129-40233.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/art-and-craft/1.jpg",
      "/images/activities/art-and-craft/2.jpg",
      "/images/activities/art-and-craft/3.jpg",
    ],
    shortDescription: "Nurture visual expression and design thinking through drawing, painting, and crafts.",
    description: `
      <p>Drawing, painting, and craft activities nurture visual expression and design thinking.</p>
      <ul>
        <li>Sketching, watercolours, acrylics</li>
        <li>Origami, paper crafts, and collage</li>
        <li>Seasonal and festival-themed projects</li>
      </ul>
    `,
  },
  {
    id: 9,
    title: "Story Telling",
    slug: "story-telling",
    thumbnail: "https://img.magnific.com/premium-photo/girl-reads-book-group-children_670382-11477.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/story-telling/1.jpg",
      "/images/activities/story-telling/2.jpg",
      "/images/activities/story-telling/3.jpg",
    ],
    shortDescription: "Improve imagination, vocabulary, and public speaking through the art of narration.",
    description: `
      <p>Storytelling improves imagination, vocabulary, and public speaking. Students learn to narrate tales with voice modulation and gestures.</p>
      <ul>
        <li>Folk tales, fables, and personal stories</li>
        <li>Voice modulation and facial expressions</li>
        <li>Creating and narrating own stories</li>
      </ul>
    `,
  },
  {
    id: 10,
    title: "Public Speaking",
    slug: "public-speaking",
    thumbnail: "https://img.magnific.com/premium-photo/indian-girl-practicing-her-presentation-skills-her-determination-succeed-academics-reflected-her-efforts-refine-her-public-speaking-abilities_748982-28032.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/public-speaking/1.jpg",
      "/images/activities/public-speaking/2.jpg",
      "/images/activities/public-speaking/3.jpg",
    ],
    shortDescription: "Build confidence in speaking and presenting ideas clearly before an audience.",
    description: `
      <p>Builds confidence in speaking and presenting ideas clearly. Students practice speeches, debates, and extempore.</p>
      <ul>
        <li>Structured speech writing</li>
        <li>Debate and elocution</li>
        <li>Overcoming stage fear with practice sessions</li>
      </ul>
    `,
  },
  {
    id: 11,
    title: "Field Trips",
    slug: "field-trips",
    thumbnail: "https://img.magnific.com/free-photo/asian-boy-little-girls-sitting-wooden-bridge-joyful-playing-with-banana-leaves-head-smile-laughting-with-funny-together-copy-space-rural-scene-style-concept_1150-55885.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/field-trips/1.jpg",
      "/images/activities/field-trips/2.jpg",
      "/images/activities/field-trips/3.jpg",
    ],
    shortDescription: "Real-world learning experiences through visits to museums, farms, and nature parks.",
    description: `
      <p>Educational trips to museums, farms, factories, and nature parks provide real-world learning experiences.</p>
      <ul>
        <li>Science centre and planetarium visits</li>
        <li>Historical monuments and heritage walks</li>
        <li>Nature trails and industrial visits</li>
      </ul>
    `,
  },
  {
    id: 12,
    title: "Activities On Special Days",
    slug: "special-day-activities",
    thumbnail: "/images/activities/special-day-activities/thumb.jpg",
    images: [
      "/images/activities/special-day-activities/1.jpg",
      "/images/activities/special-day-activities/2.jpg",
      "/images/activities/special-day-activities/3.jpg",
    ],
    shortDescription: "Celebrate national festivals and cultural days with themed activities and projects.",
    description: `
      <p>Celebrate national festivals, cultural days, and important events with themed activities, dress‑ups, and projects.</p>
      <ul>
        <li>Independence Day, Republic Day, Gandhi Jayanti</li>
        <li>Diwali, Christmas, Eid, Pongal celebrations</li>
        <li>Earth Day, Yoga Day, and Science Day events</li>
      </ul>
    `,
  },
  {
    id: 13,
    title: "Exciting Games",
    slug: "exciting-games",
    thumbnail: "https://img.magnific.com/premium-photo/students-playing-carrom-school_1613570-225.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/exciting-games/1.jpg",
      "/images/activities/exciting-games/2.jpg",
      "/images/activities/exciting-games/3.jpg",
    ],
    shortDescription: "Fun, energetic games that promote physical activity, teamwork, and quick thinking.",
    description: `
      <p>Fun and energetic games that promote physical activity, teamwork, and quick thinking.</p>
      <ul>
        <li>Treasure hunts and relay races</li>
        <li>Team‑building challenges (rope pulling, sack race)</li>
        <li>Indoor games like chess, carrom, and puzzles</li>
      </ul>
    `,
  },
  {
    id: 14,
    title: "Traditional Games",
    slug: "traditional-games",
    thumbnail: "/images/activities/traditional-games/thumb.jpg",
    images: [
      "/images/activities/traditional-games/1.jpg",
      "/images/activities/traditional-games/2.jpg",
      "/images/activities/traditional-games/3.jpg",
    ],
    shortDescription: "Promote cultural heritage through indigenous games like Gilli-danda and Lagori.",
    description: `
      <p>Promote cultural heritage through indigenous games like Gilli‑danda, Lagori, and Pallanguzhi.</p>
      <ul>
        <li>Outdoor traditional games</li>
        <li>Indoor board games from different regions</li>
        <li>Learning the history and rules of each game</li>
      </ul>
    `,
  },
  {
    id: 15,
    title: "English Reading Program",
    slug: "english-reading-program",
    thumbnail: "/images/activities/english-reading-program/thumb.jpg",
    images: [
      "/images/activities/english-reading-program/1.jpg",
      "/images/activities/english-reading-program/2.jpg",
      "/images/activities/english-reading-program/3.jpg",
    ],
    shortDescription: "Improve reading fluency, comprehension, and vocabulary through guided sessions.",
    description: `
      <p>Improves reading fluency, comprehension, and vocabulary. Students explore age‑appropriate books and stories.</p>
      <ul>
        <li>Guided reading sessions</li>
        <li>Book reviews and reading challenges</li>
        <li>Phonics and word games for younger learners</li>
      </ul>
    `,
  },
  {
    id: 16,
    title: "Aerobics",
    slug: "aerobics",
    thumbnail: "/images/activities/aerobics/thumb.jpg",
    images: [
      "/images/activities/aerobics/1.jpg",
      "/images/activities/aerobics/2.jpg",
      "/images/activities/aerobics/3.jpg",
    ],
    shortDescription: "High-energy fitness sessions to improve stamina, heart health, and coordination.",
    description: `
      <p>High‑energy fitness sessions to improve stamina, heart health, and coordination.</p>
      <ul>
        <li>Cardio dance and step aerobics</li>
        <li>Bodyweight exercises (jumping jacks, lunges, squats)</li>
        <li>Cool‑down and flexibility stretches</li>
      </ul>
    `,
  },
  {
    id: 17,
    title: "Japanese Language",
    slug: "japanese-language",
    thumbnail: "https://img.magnific.com/free-photo/close-up-pupils-doing-japanese-calligraphy-called-shodo_23-2149105367.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/japanese-language/1.jpg",
      "/images/activities/japanese-language/2.jpg",
      "/images/activities/japanese-language/3.jpg",
    ],
    shortDescription: "Learn basic Japanese language, script, and cultural etiquette.",
    description: `
      <p>Learn basic Japanese language and cultural etiquette. Students practice Hiragana, Katakana, and simple conversations.</p>
      <ul>
        <li>Greetings, numbers, and everyday phrases</li>
        <li>Introduction to Kanji</li>
        <li>Japanese festivals, origami, and calligraphy</li>
      </ul>
    `,
  },
  {
    id: 18,
    title: "Information and Communication Technology",
    slug: "ict",
    thumbnail: "/images/activities/ict/thumb.jpg",
    images: [
      "/images/activities/ict/1.jpg",
      "/images/activities/ict/2.jpg",
      "/images/activities/ict/3.jpg",
    ],
    shortDescription: "Computer and digital skills training including coding and safe internet use.",
    description: `
      <p>Computer and digital skills training, including coding, safe internet use, and basic troubleshooting.</p>
      <ul>
        <li>Typing, MS Office, and Google Workspace</li>
        <li>Introduction to programming (Scratch, Python)</li>
        <li>Cyber safety and digital citizenship</li>
      </ul>
    `,
  },
  {
    id: 19,
    title: "Value Calendar",
    slug: "value-calendar",
    thumbnail: "https://img.magnific.com/premium-photo/man-girl-are-doing-homework-classroom_1206963-86038.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
    images: [
      "/images/activities/value-calendar/1.jpg",
      "/images/activities/value-calendar/2.jpg",
      "/images/activities/value-calendar/3.jpg",
    ],
    shortDescription: "Monthly value-based activities focusing on honesty, empathy, and responsibility.",
    description: `
      <p>Monthly value‑based learning activities that focus on virtues like honesty, empathy, and responsibility.</p>
      <ul>
        <li>Story discussions and role plays on values</li>
        <li>Classroom pledges and gratitude journaling</li>
        <li>Community service projects</li>
      </ul>
    `,
  },
];