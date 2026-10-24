
const apiUrl = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000"
).replace(/\/$/, "");

let apiPattern = null;

try {
  const u = new URL(apiUrl);

  apiPattern = {
    protocol: u.protocol.replace(":", ""),
    hostname: u.hostname,
    ...(u.port ? { port: u.port } : {}),
    pathname: "/uploads/**",
  };
} catch (e) {
  // Invalid URL - ignore
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "www.sonavalliappapublicschool.com",
      },
      {
        protocol: "https",
        hostname: "sonavalliappapublicschool.com",
      },
      ...(apiPattern ? [apiPattern] : []),
    ],
    formats: ["image/webp"],
  },

  async redirects() {
    return [
      // Admission
      {
        source: "/admission/admission-procedure.html",
        destination: "/admission/admission-procedure",
        permanent: true,
      },

      {
        source: "/events",
        destination: "/news-and-events",
        permanent: true,
      },

      // Contact and careers
      {
        source: "/contact-us.html",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/careers/job-openings.html",
        destination: "/",
        permanent: true,
      },

      // Activities
      {
        source: "/activities/yoga.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/activities/rythmic-songs.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/activities/aerobics.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/academics/teacher-training-programme-workshops.html",
        destination: "/academics/teacher-training-programme-workshops",
        permanent: true,
      },

      {
        source: "/activities/exciting-games.html",
        destination: "/activities/sports-activities",
        permanent: true,
      },
      {
        source: "/activities/value-calendar.html",
        destination: "/activities/value-calendar",
        permanent: true,
      },
      {
        source: "/activities/public-speaking.html",
        destination: "/activities/public-speaking",
        permanent: true,
      },
      {
        source: "/activities/sonaria-music-club.html",
        destination: "/activities/sonaria-music-club",
        permanent: true,
      },
      {
        source: "/activities/information-communication-tech.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/activities/english-reading-program.html",
        destination: "/",
        permanent: true,
      },

      // Infrastructure
      {
        source: "/infrastructure-facilities/classrooms.html",
        destination: "/infrastructure-facilities/classrooms",
        permanent: true,
      },
      {
        source: "/infrastructure-facilities/library.html",
        destination: "/infrastructure-facilities/library",
        permanent: true,
      },
      {
        source: "/infrastructure-facilities/pantry-and-dining.html",
        destination: "/infrastructure-facilities/pantry-and-dining",
        permanent: true,
      },
      {
        source: "/infrastructure-facilities/montessori-room.html",
        destination: "/",
        permanent: true,
      },

      // About us
      {
        source: "/about-us/management-team-committee.html",
        destination: "/about-us/management-team-committee",
        permanent: true,
      },
      {
        source: "/about-us/the-sona-story.html",
        destination: "/",
        permanent: true,
      },

      {
        source: "/about-us/rules-and-regulations/school-timings",
        destination: "/about-us/rules-and-regulations",
        permanent: true,
      },

      {
        source: "/about-us/rules-and-regulations/school-timings.html",
        destination: "/about-us/rules-and-regulations",
        permanent: true,
      },

      {
        source: "/public-disclosure/documents/FEE%20STRUCTURE.pdf",
        destination: "/",
        permanent: true,
      },
      {
        source: "/public-disclosure/documents/copies-of-valid-water-health-and-sanitation-certificates.pdf",
        destination: "/",
        permanent: true,
      },
      {
        source: "/public-disclosure/documents/FEE%20STRUCTURE.pdf",
        destination: "/",
        permanent: true,
      },

      {
        source: "/about-us/rules-and-regulations/school-timings.html",
        destination: "/about-us/rules-and-regulations",
        permanent: true,
      },
      {
        source: "/about-us/rules-and-regulations/for-students.html",
        destination: "/about-us/rules-and-regulations",
        permanent: true,
      },
      {
        source: "/calendar/school_calendar_2024_2025.pdf",
        destination: "/",
        permanent: true,
      },

      {
        source: "/resources/bal-ganesh-virtual-contest",
        destination: "/news-and-events/vinayagar-chaturthi-2025",
        permanent: true,
      },

      {
        source: "/resources/videos.html",
        destination: "/",
        permanent: true,
      },

      {
        source: "/resources/student-achievements.html",
        destination: "/student-achievements",
        permanent: true,
      },

      {
        source: "/admission.html",
        destination: "/admission/admission-procedure",
        permanent: true,
      },

      {
        source: "/public-disclosure",
        destination: "/mandatory-disclosure",
        permanent: true,
      },

      // Resources
      {
        source: "/resources/bal-ganesh-virtual-contest.html",
        destination: "/resources/bal-ganesh-virtual-contest",
        permanent: true,
      },

      // Academics
      {
        source: "/academics/curriculum-and-pedagogical-processes.html",
        destination: "/academics/curriculum-and-pedagogical-processes",
        permanent: true,
      },
      {
        source: "/chairmanbook/index.php",
        destination: "/about-us/chairman-books",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
