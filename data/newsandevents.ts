

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
    galleries?: string[];
    pressrelease?: string[];
    videoLinks?: string[];
    days?: EventDay[];
};

export const newsAndEvents: NewsOrEvent[] = [
    // ========== NEWS (6 total) ==========

    {
        "title": "Kindergarten Reopening Day 2025 – A Colorful Comeback to Joyful Beginnings",
        "slug": "kindergarten-reopening-day-2025",
        "excerpt": "A grand red carpet welcome for our youngest learners on June 9th, 2025, featuring Magot, recreation zones, and a day filled with laughter and joy.",
        "contentHtml": `
        <p>On Monday, 9th June, our vibrant kindergarten campus came alive with laughter, cheers, and bright smiles as we reopened our doors to a grand red carpet welcome! </p>
        <p>Children were greeted with warmth and love by none other than Magot, setting the tone for a day filled with fun, laughter, and delightful takeaways. From exciting recreation zones to picture-perfect moments, it was a celebration to remember! 🎈📸</p>
        <p>Our heartfelt thanks to our Respected Chairman Shri C. VALLIAPPA, Sona Institutions, Mr. Varun, Director Dr. V. Karthikeyan, Principal Ms. E.J. Kavitha, and our dedicated staff for making this day truly magical. 💫</p>
        <p>The presence and joy of our little stars rejuvenated the campus, bringing back the spirit of learning, laughter, and love. </p>
        <p>Here's to a year filled with curiosity, creativity, and countless memories! </p>
    `,
        "startDate": "2025-06-09",
        "endDate": "2025-06-09",
        "category": "news",
        "thumbnail": "/newsandevents/kindergarden-reopening-2025.webp",

    },
    {
        "title": "House Wise Competition July 2025",
        "slug": "house-wise-competition-july-2025",
        "excerpt": "An exciting inter-house competition featuring singing, dancing, storytelling, drawing, relay races, and games with participation from Ruby, Sapphire, Emerald, and Topaz houses.",
        "contentHtml": `
        <p>The spirit of camaraderie and healthy competition was at its peak during our exciting House Wise Competition held in July 2025! 🏆🎉</p>
        <p>With enthusiastic participation from all houses — Ruby, Sapphire, Emerald, and Topaz — our students showcased their unique talents in various events ranging from singing, dancing, storytelling, and drawing to fun-filled relay races and games. 🖌️🎤🏃‍♂️</p>
        <p>The energy and excitement in the air were contagious as students cheered for their teammates, displaying wonderful team spirit and sportsmanship. Our little stars left everyone amazed with their confidence, creativity, and competitive zeal! 🌟</p>
        <p>A special thanks to our beloved Chairman Shri C. VALLIAPPA, Director Mr. Varun, Principal Dr. V. Karthikeyan, Vice Principal Ms. E.J. Kavitha, and our dedicated staff for organizing such a vibrant and enriching event. 💐</p>
        <p>Congratulations to all the young champions who participated with heart and soul. Every child was a winner, and every moment was a celebration of learning through joy! 🎊</p>
    `,
        "startDate": "2025-07-15",
        "endDate": "2025-07-15",
        "category": "news",
        "thumbnail": "/newsandevents/hosue_com_2.webp",

    },
    {
        "title": "Primary & Middle School Reopening Day 2025 – Reopening with Responsibility & Renewal",
        "slug": "primary-middle-school-reopening-2025",
        "excerpt": "A meaningful reopening on World Environment Day, inspiring students to be stewards of a greener tomorrow with special assembly and anti-plastic awareness.",
        "contentHtml": `
        <p>On June 5th, our Primary & Middle School students returned to a vibrant campus — just in time to celebrate World Environment Day!</p>
        <p>The reopening was marked with a special assembly that not only welcomed our young learners back but also inspired them to be stewards of a greener tomorrow. </p>
        <p>Students were guided on the harmful impact of plastic and how small actions can lead to big environmental changes. Thought-provoking messages and engaging programmes helped rejuvenate their spirit and reconnect them with values of responsibility and sustainability. 🌱♻️</p>
        <p>We were honored by the presence of Director Dr. V. Karthikeyan, Principal Ms. E.J. Kavitha, and our passionate team of educators, who made the day truly meaningful. </p>
        <p>🗣️: "A fresh start. A greener tomorrow. A school year with purpose!" </p>
    `,
        "startDate": "2025-06-05",
        "endDate": "2025-06-05",
        "category": "news",
        "thumbnail": "/newsandevents/primary-and-middle-school-reopening-2025.webp",

    },
    {
        "title": "Faculty Development Programme 2025",
        "slug": "faculty-development-programme-2025",
        "excerpt": "A vibrant FDP on curriculum planning, innovative pedagogy, AI integration, and research-based practices to transform classroom experiences.",
        "contentHtml": `
        <p>A vibrant Faculty Development Programme was held on May 30 at 10:30 AM at Sona Valliappa Public School, Salem.</p>
        <p>Dr. V. Karthikeyan, Director, inaugurated the session, emphasizing the shift towards teacher-centric, student-focused, and process-driven learning.</p>
        <p>Principal Ms. E.J. Kavitha welcomed the gathering and highlighted the value of continuous professional growth.</p>
        <p>Teachers engaged in sessions on curriculum planning, innovative pedagogy, AI integration, and research-based practices—gearing up to transform classroom experiences.</p>
        <p>Chairman Shri. C. Valliappa, Sona Institutions, appreciated the efforts and presented certificates to all participants.</p>
        <p>The programme was effectively coordinated by Ms. W. Sherin and Ms. C. Karthika, and was proudly led by the school's own team of passionate educators.</p>
    `,
        "startDate": "2025-05-30",
        "endDate": "2025-05-30",
        "category": "news",
        "thumbnail": "/newsandevents/faculty-development-programme.webp",

    },
    // events
    {
        "title": "Annual Sports Meet 2026",
        "slug": "annual-sports-meet-2026",
        "excerpt": "A grand day of athletic excellence, teamwork, and sportsmanship featuring sprints, relays, long jump, and fun games.",
        "contentHtml": `
        <p>Sona Valliappa Public School proudly celebrated its Annual Sports Meet 2026 with great enthusiasm and vibrant participation from students, teachers, and parents. The event was a grand display of athletic excellence, teamwork, and sportsmanship.</p>
        <p>The sports meet featured a wide range of track and field events, including sprints, relays, long jump, and various fun games. Students showcased remarkable energy, discipline, and determination, making each event exciting and competitive.</p>
        <p>The school campus was filled with cheers and encouragement as parents and teachers actively supported the participants. The spirit of unity and healthy competition was clearly visible throughout the event.</p>
        <p>The event concluded with a prize distribution ceremony, where winners were honored for their outstanding performances. The Annual Sports Meet 2026 was a memorable occasion that promoted physical fitness, confidence, and team spirit among students.</p>
    `,
        "startDate": "2026-01-15",
        "endDate": "2026-01-15",
        "category": "event",
        "thumbnail": "/newsandevents/Annual-Sports-1.webp",
        "galleries": [
            "/newsandevents/Annual-Sports-2.webp",
            "/newsandevents/Annual-Sports-3.webp",
            "/newsandevents/Annual-Sports-4.webp",
            "/newsandevents/Annual-Sports-5.webp",
            "/newsandevents/Annual-Sports-6.webp",
            "/newsandevents/Annual-Sports-7.webp",

        ],
        "videoLinks": [
            "https://youtu.be/sports_meet_2026_highlights"
        ]
    },

    {
        "title": "Vinayagar Chaturthi 2025",
        "slug": "vinayagar-chaturthi-2025",
        "excerpt": "A joyful celebration of Lord Ganesha's birthday with traditional pooja, bhajans, creative activities, and community spirit.",
        "contentHtml": `
        <p>Sona Valliappa Public School joyfully celebrated Vinayagar Chaturthi with the wholehearted participation of students, teachers, and parents. A beautifully decorated idol of Lord Ganesha was installed on the school premises, creating an atmosphere of devotion, positivity, and togetherness.</p>
        <p>The celebration began with a traditional pooja and the chanting of slokas, seeking the blessings of Lord Vinayagar, the remover of obstacles and the symbol of wisdom and prosperity. Parents, teachers, and students came together in the rituals, making the occasion spiritually enriching and memorable.</p>
        <p>Students expressed their devotion through bhajans and creative activities, while parents actively encouraged and supported the young learners. These activities not only strengthened the bond between school and parents but also instilled cultural values and spiritual awareness among the children.</p>
        <p>The event concluded with the distribution of prasadam, spreading joy, harmony, and blessings to everyone present. The celebration was a wonderful blend of tradition, creativity, and community spirit, leaving lasting impressions on all who participated.</p>
    `,
        "startDate": "2025-08-27",
        "endDate": "2025-08-27",
        "category": "event",
        "thumbnail": "/newsandevents/Vinayagar-Chaturthi-1.webp",
        "galleries": [
            "/newsandevents/Vinayagar-Chaturthi-1.webp",
            "/newsandevents/Vinayagar-Chaturthi-2.webp",
            "/newsandevents/Vinayagar-Chaturthi-3.webp",
            "/newsandevents/Vinayagar-Chaturthi-5.webp",
            "/newsandevents/Vinayagar-Chaturthi-6.webp",
            "/newsandevents/Vinayagar-Chaturthi-8.webp",
        ],
        "videoLinks": [
            "https://youtu.be/vinayagar_chaturthi_2025"
        ]
    },
    {
        "title": "Krishna Janmashtami 2025",
        "slug": "krishna-janmashtami-2025",
        "excerpt": "A grand celebration featuring cultural programs, classical dance, bhajans, fancy dress, and children dressed as little Krishna and Radha.",
        "contentHtml": `
        <p>Sona Valliappa Public School celebrated Krishna Janmashtami with devotion and grandeur. The occasion was marked by vibrant cultural programs, including storytelling, classical dance, bhajans, and fancy dress presentations, which showcased the enthusiasm and creativity of our students.</p>
        <p>Children dressed as little Krishnas and Radhas added charm to the celebration, spreading the message of love, peace, and unity. The event not only commemorated the birth of Lord Krishna but also provided students with an opportunity to imbibe cultural values, appreciate traditions, and develop a sense of spiritual belonging.</p>
        <p>The celebration created a joyful atmosphere on campus, leaving a lasting impression on both students and parents.</p>
    `,
        "startDate": "2025-08-16",
        "endDate": "2025-08-16",
        "category": "event",
        "thumbnail": "/newsandevents/Krishna-Janmastami-1.webp",
        "galleries": [
            "/newsandevents/Krishna-Janmastami-2.webp",
            "/newsandevents/Krishna-Janmastami-3.webp",
            "/newsandevents/Krishna-Janmastami-4.webp",
            "/newsandevents/Krishna-Janmastami-5.webp",
            "/newsandevents/Krishna-Janmastami-6.webp",
            "/newsandevents/Krishna-Janmastami-7.webp",
        ],
        "videoLinks": [
            "https://youtu.be/krishna_janmashtami_2025"
        ]
    },

    {
        "title": "Annual Day 2024",
        "slug": "annual-day-2024",
        "excerpt": "A spectacular evening of talent, celebration, and achievements featuring cultural performances, student awards, and a grand finale.",
        "contentHtml": `
        <p>Sona Valliappa Public School celebrated its Annual Day 2024 with great pomp and splendor. The evening was a magnificent showcase of student talent, featuring mesmerizing cultural performances, including classical and western dances, skits, musical presentations, and a vibrant fashion show.</p>
        <p>The event was graced by our beloved Chairman Shri C. VALLIAPPA, Director Mr. Varun, Principal Dr. V. Karthikeyan, Vice Principal Ms. E.J. Kavitha, along with distinguished guests, parents, and well-wishers. Their encouraging presence added immense value to the celebration.</p>
        <p>The highlight of the evening was the prize distribution ceremony, where students were honored for their academic excellence, sports achievements, and co-curricular accomplishments. The young achievers walked with pride as they received their well-deserved accolades.</p>
        <p>The grand finale left the audience spellbound, creating memories that will be cherished for years to come. Annual Day 2024 was truly a celebration of learning, growth, and the bright future of our students.</p>
    `,
        "startDate": "2024-12-20",
        "endDate": "2024-12-20",
        "category": "event",
        "thumbnail": "/newsandevents/Annual-Day-1.webp",
        "galleries": [

            "/newsandevents/Annual-Day-2.webp",
            "/newsandevents/Annual-Day-3.webp",
            "/newsandevents/Annual-Day-4.webp",
            "/newsandevents/Annual-Day-5.webp",
            "/newsandevents/Annual-Day-6.webp",
            "/newsandevents/Annual-Day-7.webp"
        ],
        "videoLinks": [
            "https://youtu.be/annual_day_2024"
        ]
    }


    // multiday event

    // {
    //     title: "Cultural Fest: Utsav 2025",
    //     slug: "utsav-2025",
    //     excerpt: "Three days of music, dance, drama, art competitions, and food festival.",
    //     contentHtml: `
    //   <p>Utsav 2025 is our annual cultural extravaganza. Each day features different themes and competitions.</p>
    //   <p>Open to students, parents, and neighbouring schools. Entry free for all.</p>
    // `,
    //     startDate: "2025-06-10",
    //     endDate: "2025-06-12",
    //     category: "event",
    //     thumbnail: "https://example.com/images/utsav-thumb.jpg",
    //     galleries: [
    //         "https://example.com/images/utsav-overall-1.jpg",
    //         "https://example.com/images/utsav-overall-2.jpg",
    //     ],
    //     videoLinks: ["https://youtu.be/utsav2025_teaser"],
    //     days: [
    //         {
    //             dayNumber: 1,
    //             title: "Inauguration & Classical Night",
    //             description: `
    //       <p>Chief guest: renowned classical dancer Smt. Anjali Sharma. Performances in Bharatanatyam, Odissi, and Hindustani vocal.</p>
    //       <p>Opening ceremony at 5:00 PM in the open-air theatre.</p>
    //     `,
    //             images: [
    //                 "https://example.com/images/utsav-day1-1.jpg",
    //                 "https://example.com/images/utsav-day1-2.jpg",
    //             ],
    //         },
    //         {
    //             dayNumber: 2,
    //             title: "Western Music & Dance Battle",
    //             description: `
    //       <p>Band performances, solo singing, hip‑hop and contemporary dance competition. Inter‑school showdown from 9 AM to 4 PM.</p>
    //     `,
    //             images: [
    //                 "https://example.com/images/utsav-day2-1.jpg",
    //                 "https://example.com/images/utsav-day2-2.jpg",
    //                 "https://example.com/images/utsav-day2-3.jpg",
    //             ],
    //         },
    //         {
    //             dayNumber: 3,
    //             title: "Folk Day & Prize Ceremony",
    //             description: `
    //       <p>Folk dances from different states, traditional costume parade, followed by the grand valedictory and prize distribution.</p>
    //     `,
    //             images: [
    //                 "https://example.com/images/utsav-day3-1.jpg",
    //             ],
    //         },
    //     ],
    // },

];