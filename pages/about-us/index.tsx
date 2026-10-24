import SEO from "../../components/SEO";
import SectionIndex from "../../components/SectionIndex";
import { aboutLinks } from "../../data/siteMenu";

export default function AboutUsPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Sona Valliappa Public School, Salem: our heritage, vision and mission, management, principal's message and school rules."
        path="/about-us"
        keywords="about SVPS Salem, Sona Valliappa Public School heritage, vision and mission, school management"
      />
      <SectionIndex
        title="About Us"
        subtitle="Our legacy, purpose and the people behind the school"
        intro="Discover the story of Sona Valliappa Public School: where we come from, what we stand for, and the leadership guiding our students every day."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about-us" },
        ]}
        cards={aboutLinks}
      />
    </>
  );
}
