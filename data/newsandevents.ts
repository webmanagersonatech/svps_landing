

export type EventDay = {
    dayNumber: number;
    title?: string;
    description: string;
    images: string[];
};

export type NewsOrEvent = {
    title: string;
    slug: string;
    excerpt: string;
    contentHtml: string;
    startDate: string;
    endDate: string;
    category: "news" | "event";
    thumbnail: string;
    galleries: string[];
    pressrelease?: string[];
    videoLinks?: string[];
    days?: EventDay[];
};

// ==============================
// sample data
// ==============================

export const newsAndEvents: NewsOrEvent[] = [
    // ========== NEWS (6 total) ==========
    {
        title: "School Wins National Green Award",
        slug: "national-green-award-2025",
        excerpt: "Our school received the 'Green School of the Year' award for sustainable practices and environmental education.",
        contentHtml: `
      <p>We are proud to announce that our institution has been honoured with the <strong>National Green Award 2025</strong> by the Ministry of Environment. The award recognises our waste management, solar energy adoption, and eco‑club initiatives.</p>
      <p>The ceremony took place in New Delhi on 5th April. Principal Dr. S. Mehta received the trophy from the Minister.</p>
      <p>Students and staff worked together on tree planting, plastic‑free campus drives, and water harvesting projects.</p>
    `,
        startDate: "2025-04-05",
        endDate: "2025-04-05",
        category: "news",
        thumbnail: "https://img.magnific.com/free-photo/collage-city-committed-education_23-2149886993.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        galleries: [
            "https://img.magnific.com/premium-photo/indian-girl-practicing-her-presentation-skills-her-determination-succeed-academics-reflected-her-efforts-refine-her-public-speaking-abilities_748982-27460.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
            "https://img.magnific.com/premium-photo/close-up-laptop-computer-workplace-with-different-objects-creative-polygonal-breaking-news-globe-hologram-television-online-news-digital-communication-concept-3d-rendering_670147-57928.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
            "https://img.magnific.com/premium-photo/girl-is-holding-microphone-yelling-into-it_248459-79349.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
        ],

        videoLinks: ["https://youtu.be/abc123", "https://youtu.be/xyz789"],
    },
    {
        title: "Students Excel at National Robotics Championship",
        slug: "robotics-championship-2025",
        excerpt: "Our robotics team won second prize at the National Robotics Championship held in Bangalore.",
        contentHtml: `
      <p>Six students from grades 9 and 10 represented our school at the National Robotics Championship. Their innovative disaster management robot earned them the silver medal.</p>
      <p>The team was mentored by Mr. K. Venkatesh, Head of the ICT department. The winners received trophies and a cash prize of ₹50,000.</p>
    `,
        startDate: "2025-03-20",
        endDate: "2025-03-22",
        category: "news",
        thumbnail: "https://example.com/images/robotics-thumb.jpg",
        galleries: [
            "https://example.com/images/robotics-1.jpg",
            "https://example.com/images/robotics-2.jpg",
        ],
        videoLinks: ["https://youtu.be/robotics-highlight"],
    },
    {
        title: "New School Building Inaugurated",
        slug: "new-building-inauguration",
        excerpt: "The new state-of-the-art academic block was inaugurated by the Education Minister.",
        contentHtml: `
      <p>On March 30, 2025, the Honourable Education Minister inaugurated the new five-story academic block. The building houses 20 smart classrooms, 4 science labs, and a modern library.</p>
      <p>The project was completed in 18 months at a cost of ₹15 crores. The new block will accommodate 800 additional students.</p>
    `,
        startDate: "2025-03-30",
        endDate: "2025-03-30",
        category: "news",
        thumbnail: "https://example.com/images/new-building-thumb.jpg",
        galleries: [
            "https://example.com/images/new-building-1.jpg",
            "https://example.com/images/new-building-2.jpg",
            "https://example.com/images/new-building-3.jpg",
        ],
    },
    {
        title: "100% Results in Board Examinations",
        slug: "board-results-2025",
        excerpt: "Our school achieved 100% pass rate in both Class 10 and Class 12 board exams.",
        contentHtml: `
      <p>We are thrilled to announce that all 250 students who appeared for the CBSE Class 10 and Class 12 board examinations have passed with flying colours. 35 students scored above 95%, and 12 students secured a perfect 100 in Mathematics.</p>
      <p>The Principal congratulated the students and teachers for their hard work.</p>
    `,
        startDate: "2025-05-10",
        endDate: "2025-05-10",
        category: "news",
        thumbnail: "https://example.com/images/board-result-thumb.jpg",
        galleries: [
            "https://example.com/images/result-1.jpg",
            "https://example.com/images/result-2.jpg",
        ],
        videoLinks: ["https://youtu.be/result-celebration"],
    },
    {
        title: "Exchange Program with Japanese School",
        slug: "japan-exchange-program",
        excerpt: "Ten students and two teachers will visit our sister school in Tokyo for a cultural exchange.",
        contentHtml: `
      <p>Our school has signed a Memorandum of Understanding with Sakura High School, Tokyo. Starting June 2025, ten students and two teachers will participate in a two-week exchange program. They will learn Japanese language, calligraphy, and share Indian culture.</p>
      <p>The Japanese delegation will visit our school in August 2025.</p>
    `,
        startDate: "2025-04-25",
        endDate: "2025-04-25",
        category: "news",
        thumbnail: "https://example.com/images/japan-exchange-thumb.jpg",
        galleries: [
            "https://example.com/images/exchange-1.jpg",
            "https://example.com/images/exchange-2.jpg",
        ],
    },
    {
        title: "Annual Sports Day Sets New Records",
        slug: "sports-day-2025-records",
        excerpt: "Three school records were broken at the Annual Sports Day 2025.",
        contentHtml: `
      <p>The 45th Annual Sports Day was held on February 15, 2025. Three new school records were set in 100m sprint, long jump, and 4x100m relay. The House Cup was won by Gandhi House.</p>
      <p>Former Olympian Ms. P. T. Usha graced the occasion as chief guest.</p>
    `,
        startDate: "2025-02-15",
        endDate: "2025-02-15",
        category: "news",
        thumbnail: "https://example.com/images/sports-day-thumb.jpg",
        galleries: [
            "https://example.com/images/sports-day-1.jpg",
            "https://example.com/images/sports-day-2.jpg",
            "https://example.com/images/sports-day-3.jpg",
        ],
        videoLinks: ["https://youtu.be/sports-day-2025"],
    },

    // ========== EVENTS (10 total) ==========
    // Existing events
    {
        title: "Annual Science Fair 2025",
        slug: "annual-science-fair-2025",
        excerpt: "Students showcase innovative STEM projects – robotics, renewable energy models, and chemistry experiments.",
        contentHtml: `
      <p>The Annual Science Fair will be held in the school auditorium. All classes from 6 to 12 will participate.</p>
      <p>Special lectures by guest scientists, interactive workshops, and a prize distribution ceremony.</p>
      <p>Parents and alumni are cordially invited.</p>
    `,
        startDate: "2025-05-15",
        endDate: "2025-05-15",
        category: "event",
        thumbnail: "https://example.com/images/science-fair-thumb.jpg",
        galleries: [
            "https://example.com/images/science-fair-1.jpg",
            "https://example.com/images/science-fair-2.jpg",
        ],
        videoLinks: ["https://youtu.be/prerelease_science"],
    },
    {
        title: "Cultural Fest: Utsav 2025",
        slug: "utsav-2025",
        excerpt: "Three days of music, dance, drama, art competitions, and food festival.",
        contentHtml: `
      <p>Utsav 2025 is our annual cultural extravaganza. Each day features different themes and competitions.</p>
      <p>Open to students, parents, and neighbouring schools. Entry free for all.</p>
    `,
        startDate: "2025-06-10",
        endDate: "2025-06-12",
        category: "event",
        thumbnail: "https://example.com/images/utsav-thumb.jpg",
        galleries: [
            "https://example.com/images/utsav-overall-1.jpg",
            "https://example.com/images/utsav-overall-2.jpg",
        ],
        videoLinks: ["https://youtu.be/utsav2025_teaser"],
        days: [
            {
                dayNumber: 1,
                title: "Inauguration & Classical Night",
                description: `
          <p>Chief guest: renowned classical dancer Smt. Anjali Sharma. Performances in Bharatanatyam, Odissi, and Hindustani vocal.</p>
          <p>Opening ceremony at 5:00 PM in the open-air theatre.</p>
        `,
                images: [
                    "https://example.com/images/utsav-day1-1.jpg",
                    "https://example.com/images/utsav-day1-2.jpg",
                ],
            },
            {
                dayNumber: 2,
                title: "Western Music & Dance Battle",
                description: `
          <p>Band performances, solo singing, hip‑hop and contemporary dance competition. Inter‑school showdown from 9 AM to 4 PM.</p>
        `,
                images: [
                    "https://example.com/images/utsav-day2-1.jpg",
                    "https://example.com/images/utsav-day2-2.jpg",
                    "https://example.com/images/utsav-day2-3.jpg",
                ],
            },
            {
                dayNumber: 3,
                title: "Folk Day & Prize Ceremony",
                description: `
          <p>Folk dances from different states, traditional costume parade, followed by the grand valedictory and prize distribution.</p>
        `,
                images: [
                    "https://example.com/images/utsav-day3-1.jpg",
                ],
            },
        ],
    },
    // New events (8 more)
    {
        title: "Parent-Teacher Meet (Q2 2025)",
        slug: "parent-teacher-meet-q2-2025",
        excerpt: "Quarterly parent-teacher interaction to discuss student progress.",
        contentHtml: `
      <p>The second quarterly Parent-Teacher Meet will be held in the school auditorium. Parents can collect report cards and meet subject teachers between 9 AM and 2 PM.</p>
      <p>Online appointments are mandatory. Please register via the parent portal.</p>
    `,
        startDate: "2025-07-20",
        endDate: "2025-07-20",
        category: "event",
        thumbnail: "https://example.com/images/ptm-thumb.jpg",
        galleries: [
            "https://example.com/images/ptm-1.jpg",
            "https://example.com/images/ptm-2.jpg",
        ],
    },
    {
        title: "Inter-House Debate Competition",
        slug: "inter-house-debate-2025",
        excerpt: "Theme: 'Artificial Intelligence – Boon or Bane?' Open to students from grades 8 to 12.",
        contentHtml: `
      <p>The English Literary Association organises the annual Inter-House Debate Competition. Each house can send two speakers. The topic will be announced 30 minutes before the event.</p>
      <p>Judges include university professors and alumni. Best speaker and winning house trophies to be awarded.</p>
    `,
        startDate: "2025-08-05",
        endDate: "2025-08-05",
        category: "event",
        thumbnail: "https://example.com/images/debate-thumb.jpg",
        galleries: [
            "https://example.com/images/debate-1.jpg",
            "https://example.com/images/debate-2.jpg",
        ],
        videoLinks: ["https://youtu.be/debate-preview"],
    },
    {
        title: "Workshop on Cyber Safety",
        slug: "cyber-safety-workshop",
        excerpt: "A one-day workshop for students and parents on safe internet practices.",
        contentHtml: `
      <p>Cyber crime experts from the city police will conduct an interactive workshop on online safety, phishing, social media privacy, and cyber bullying. Separate sessions for students (morning) and parents (afternoon).</p>
      <p>Certificates will be provided to all attendees.</p>
    `,
        startDate: "2025-08-18",
        endDate: "2025-08-18",
        category: "event",
        thumbnail: "https://example.com/images/cyber-thumb.jpg",
        galleries: [
            "https://example.com/images/cyber-1.jpg",
            "https://example.com/images/cyber-2.jpg",
        ],
    },
    {
        title: "Teacher's Day Celebration 2025",
        slug: "teachers-day-2025",
        excerpt: "Students honour teachers with cultural performances and a special assembly.",
        contentHtml: `
      <p>On the occasion of Dr. Sarvepalli Radhakrishnan's birth anniversary, students will organise a special assembly, cultural performances, and a token of gratitude for all teachers. Senior students will take on the role of teachers for select periods.</p>
    `,
        startDate: "2025-09-05",
        endDate: "2025-09-05",
        category: "event",
        thumbnail: "https://example.com/images/teachers-day-thumb.jpg",
        galleries: [
            "https://example.com/images/teachers-day-1.jpg",
            "https://example.com/images/teachers-day-2.jpg",
            "https://example.com/images/teachers-day-3.jpg",
        ],
    },
    {
        title: "Annual Art Exhibition",
        slug: "art-exhibition-2025",
        excerpt: "Display of paintings, sculptures, and craftwork by students from all grades.",
        contentHtml: `
      <p>The Fine Arts department presents the Annual Art Exhibition titled "Colours of Imagination". Over 300 artworks including watercolours, acrylics, clay models, and recycled art will be on display. Visitors can also participate in live pottery and canvas painting workshops.</p>
      <p>Entry free for parents and alumni. The exhibition will remain open from 10 AM to 5 PM.</p>
    `,
        startDate: "2025-09-20",
        endDate: "2025-09-21",
        category: "event",
        thumbnail: "https://example.com/images/art-exhibition-thumb.jpg",
        galleries: [
            "https://example.com/images/art-exhibition-1.jpg",
            "https://example.com/images/art-exhibition-2.jpg",
        ],
        videoLinks: ["https://youtu.be/art-expo-teaser"],
    },
    {
        title: "Diwali Mela (Charity Fair)",
        slug: "diwali-mela-2025",
        excerpt: "A vibrant fair with food stalls, games, and handicrafts – proceeds go to an orphanage.",
        contentHtml: `
      <p>The Student Council organises the annual Diwali Mela. There will be over 20 stalls selling traditional sweets, diyas, rangoli powders, and accessories. Fun games, magic show, and a lucky draw. All proceeds will be donated to "Asha Kiran" orphanage.</p>
      <p>Entry ₹20 per person. Food coupons available at the gate.</p>
    `,
        startDate: "2025-10-18",
        endDate: "2025-10-18",
        category: "event",
        thumbnail: "https://example.com/images/diwali-mela-thumb.jpg",
        galleries: [
            "https://example.com/images/mela-1.jpg",
            "https://example.com/images/mela-2.jpg",
            "https://example.com/images/mela-3.jpg",
        ],
    },
    {
        title: "Sports Meet – Winter Championship",
        slug: "winter-sports-2025",
        excerpt: "Two-day sports competition including athletics, basketball, and throwball.",
        contentHtml: `
      <p>The Winter Sports Championship will be held on the school grounds. Events include 100m, 200m, 4x100m relay, long jump, shot put, basketball (boys & girls), and throwball. Inter-house and individual medals.</p>
      <p>Registration closes on October 30. All participants must bring their own sports kit.</p>
    `,
        startDate: "2025-11-10",
        endDate: "2025-11-11",
        category: "event",
        thumbnail: "https://example.com/images/winter-sports-thumb.jpg",
        galleries: [
            "https://example.com/images/sports-1.jpg",
            "https://example.com/images/sports-2.jpg",
        ],
        videoLinks: ["https://youtu.be/winter-sports-promo"],
    },
    {
        title: "Graduation Ceremony 2025 (Class 12 Farewell)",
        slug: "graduation-2025",
        excerpt: "Farewell and certificate distribution for the outgoing batch of Class 12.",
        contentHtml: `
      <p>The Graduation Ceremony for the batch of 2024-25 will be held in the school auditorium. Chief guest: Dr. S. Krishnan, Dean of Engineering, Anna University. Awards for academic excellence and leadership will be presented.</p>
      <p>Dress code: Formal. Parents are requested to arrive by 4:30 PM.</p>
    `,
        startDate: "2026-09-25",
        endDate: "2026-09-25",
        category: "event",
        thumbnail: "https://example.com/images/graduation-thumb.jpg",
        galleries: [
            "https://example.com/images/grad-1.jpg",
            "https://example.com/images/grad-2.jpg",
        ],
        videoLinks: ["https://youtu.be/graduation-live"],
    },
];