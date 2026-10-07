import Image from "next/image";
import type { GetStaticProps } from "next";

import Hero from '../components/Hero'
import GrowthSkillsComponent from '../components/homesection1'
import GrowthSkillsComponent2 from '../components/homesection2'
import NewsEventsComponent from '../components/newsandeventscomponents'
import SchoolInfrastructure from '../components/infrastructure'
import LayeredSlider from '../components/activitesslider'
import StudentAchievements from '../components/StudentAchievements'
import SEO from '../components/SEO'
import type { NewsOrEvent } from '../lib/newsEventsApi'
import type { Activity } from '../lib/activitiesApi'
import { fetchActivities } from '../lib/activitiesApi'
import { fetchHomeNewsEvents } from '../lib/newsEventsApi'
import { safe, REVALIDATE_SECONDS } from '../lib/apiClient'

type HomeProps = {
  news: NewsOrEvent[]
  events: NewsOrEvent[]
  upcoming: NewsOrEvent[]
  newsCount: number
  eventsCount: number
  activities: Activity[]
}

export default function Home({ news, events, upcoming, newsCount, eventsCount, activities }: HomeProps) {
  return (
    <>
      <SEO
        title="Sona Valliappa Public School | Best CBSE School in Salem, Tamil Nadu"
        description="Sona Valliappa Public School (SVPS), Salem – a CBSE-affiliated school nurturing young minds with innovation through modern infrastructure, holistic academics and value-based education."
        path="/"
        keywords="CBSE school Salem, best school in Salem, Sona Valliappa Public School, SVPS Salem, top schools Tamil Nadu, Sona Group of Institutions"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Sona Valliappa Public School",
          url: "https://www.sonavalliappapublicschool.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.sonavalliappapublicschool.com/news-and-events?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Hero />
      <GrowthSkillsComponent2 />
      {/* Section with fixed background image and black overlay */}
      <div className="relative">
        {/* Fixed background image */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/homeimages/canvas-2.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10">
          <GrowthSkillsComponent />
        </div>
      </div>
      <StudentAchievements/>
      <NewsEventsComponent
        news={news}
        events={events}
        upcoming={upcoming}
        newsCount={newsCount}
        eventsCount={eventsCount}
      />
      <SchoolInfrastructure />
      <LayeredSlider activities={activities} />

    </>
  )
}

// Home sections read from the backend. A section with no data is hidden by its component.
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [home, activities] = await Promise.all([
    safe(() => fetchHomeNewsEvents(4), { news: [], events: [], upcoming: [], newsCount: 0, eventsCount: 0 }),
    safe(() => fetchActivities(), [] as Activity[]),
  ])
  return { props: { ...home, activities }, revalidate: REVALIDATE_SECONDS }
}
