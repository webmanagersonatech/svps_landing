
import Hero from '../components/Hero'
import GrowthSkillsComponent from '../components/homesection1'
import GrowthSkillsComponent2 from '../components/homesection2'
import NewsEventsComponent from '../components/newsandeventscomponents'
import SchoolInfrastructure from '../components/infrastructure'
import LayeredSlider from '../components/activitesslider'
import StudentAchievements from '../components/StudentAchievements'
import SEO from '../components/SEO'

export default function Home() {
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
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/homeimages/canvas-2.png')", // Change this path
          }}
        />

        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10">
          <GrowthSkillsComponent />
        </div>
      </div>
      <StudentAchievements/>
      <NewsEventsComponent />
      <SchoolInfrastructure />
      <LayeredSlider />

    </>
  )
}
