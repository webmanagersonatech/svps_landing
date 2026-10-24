
import type { GetStaticProps } from "next";
import SEO from "../../components/SEO";
import SectionIndex from "../../components/SectionIndex";
import { achievements } from "../../data/achievements";

const titleCase = (s: string) =>
  s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export default function StudentAchievementsPage() {
  return (
    <>
      <SEO
        title="Student Achievements"
        description="Celebrating the Olympiad, arts, sports and academic achievements of the students of Sona Valliappa Public School, Salem."
        path="/student-achievements"
        keywords="student achievements Salem, school awards, academic achievements, sports achievements, SVPS students"
      />

      <SectionIndex
        title="Student Achievements"
        subtitle="Celebrating the pride of our school"
        intro="Discover the outstanding accomplishments of our students in academics, sports, arts, Olympiads and other competitions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          {
            label: "Student Achievements",
            href: "/student-achievements",
          },
        ]}
        emptyMessage="Student achievements will be listed here soon."
        cards={achievements.map((a) => ({
          name: titleCase(a.studentName),
          href: `/student-achievements/${a.slug}`,
          description: `${a.category || a.className} • ${a.achievement}${
            a.description ? ` — ${a.description}` : ""
          }`,
          image: a.image,
        }))}
      />
    </>
  );
}
