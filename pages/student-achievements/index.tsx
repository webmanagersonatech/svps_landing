import Image from "next/image";
import Link from "next/link";
import SEO from "../../components/SEO";
import { PageHeader } from "../../components/PageHeader";
import { Reveal } from "../../components/Reveal";
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
      />
      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <PageHeader
          title="Student Achievements"
          subtitle="Celebrating the pride of our school"
          breadcrumbs={["Home", "Student Achievements"]}
        />
        <section className="max-w-7xl mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((a, i) => (
            <Reveal key={a.slug} delay={i * 100}>
              <Link href={`/student-achievements/${a.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition">
                <div className="relative h-72 overflow-hidden">
                  <Image src={a.image} alt={a.studentName} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top transition duration-500 group-hover:scale-105" />
                  {a.level && (
                    <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      {a.level}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-primary">{a.category || a.className}</p>
                  <h2 className="mt-1 font-serif text-xl text-secondary">{titleCase(a.studentName)}</h2>
                  <p className="mt-1 text-sm font-semibold text-gray-700">{titleCase(a.achievement)}</p>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{a.description}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-secondary group-hover:text-primary transition">Read more &rarr;</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
    </>
  );
}