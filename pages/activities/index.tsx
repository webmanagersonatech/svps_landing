import type { GetStaticProps } from "next";
import SEO from "../../components/SEO";
import SectionIndex from "../../components/SectionIndex";
import type { Activity } from "../../lib/activitiesApi";
import { fetchActivities } from "../../lib/activitiesApi";
import { REVALIDATE_SECONDS, safe, skipOptimization } from "../../lib/apiClient";

export default function ActivitiesPage({ activities }: { activities: Activity[] }) {
  return (
    <>
      <SEO
        title="Activities"
        description="Clubs, sports, arts and co-curricular activities at Sona Valliappa Public School, Salem, helping students discover new skills."
        path="/activities"
        keywords="school activities Salem, co-curricular activities, SVPS clubs, student activities"
      />
      <SectionIndex
        title="Activities"
        subtitle="Explore, create and discover new skills"
        intro="Beyond the classroom, our students take part in a wide range of activities that build confidence, creativity and teamwork."
        breadcrumbs={["Home", "Activities"]}
        emptyMessage="Activities will be listed here soon."
        cards={activities.map((a) => ({
          name: a.title,
          href: `/activities/${a.slug}`,
          description: a.shortDescription,
          image: a.thumbnail || undefined,
          unoptimized: skipOptimization(a.thumbnail),
        }))}
      />
    </>
  );
}

// Same pattern as the home page: list comes from the backend, refreshed every REVALIDATE_SECONDS.
export const getStaticProps: GetStaticProps<{ activities: Activity[] }> = async () => {
  const activities = await safe(() => fetchActivities(), [] as Activity[]);
  return { props: { activities }, revalidate: REVALIDATE_SECONDS };
};
