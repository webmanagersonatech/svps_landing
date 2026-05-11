
import Hero from '../components/Hero'
import GrowthSkillsComponent from '../components/homesection1'
import GrowthSkillsComponent2 from '../components/homesection2'
import NewsEventsComponent from '../components/newsandeventscomponents'
import SchoolInfrastructure from '../components/infrastructure'
import LayeredSlider from '../components/activitesslider'
import StudentAchievements from '../components/StudentAchievements'

export default function Home() {
  return (
    <>

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
