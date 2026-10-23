import SEO from "../../components/SEO";
import SectionIndex from "../../components/SectionIndex";
import { academicsLinks } from "../../data/siteMenu";

export default function AcademicsPage() {
  return (
    <>
      <SEO
        title="Academics"
        description="Explore the CBSE curriculum, teaching methodology, creative learning and all-round development programmes at Sona Valliappa Public School, Salem."
        path="/academics"
        keywords="CBSE curriculum Salem, academic excellence, teaching methodology, SVPS academics"
      />
      <SectionIndex
        title="Academics"
        subtitle="A strong foundation for curious, confident learners"
        intro="From our curriculum framework to creative learning and teacher development, see how we nurture academic excellence and holistic growth."
        breadcrumbs={["Home", "Academics"]}
        cards={academicsLinks}
      />
    </>
  );
}
