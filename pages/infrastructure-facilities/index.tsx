import SEO from "../../components/SEO";
import SectionIndex from "../../components/SectionIndex";
import { infrastructureLinks } from "../../data/siteMenu";

export default function InfrastructurePage() {
  return (
    <>
      <SEO
        title="Infrastructure & Facilities"
        description="Smart classrooms, library, computer lab, auditorium, sports, transport, medical and dining facilities at Sona Valliappa Public School, Salem."
        path="/infrastructure-facilities"
        keywords="school infrastructure Salem, smart classrooms, school library, school transport, SVPS facilities"
      />
      <SectionIndex
        title="Infrastructure & Facilities"
        subtitle="Modern, safe spaces built for learning and growth"
        intro="Our campus is designed to support every part of school life, from technology-enabled classrooms to sports, health and dining."
        breadcrumbs={["Home", "Infrastructure"]}
        cards={infrastructureLinks}
      />
    </>
  );
}
