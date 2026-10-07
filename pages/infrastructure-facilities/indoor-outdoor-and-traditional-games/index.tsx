import Image from "next/image";
import { useState } from "react";
import SEO from "../../../components/SEO";
import { PageHeader } from "../../../components/PageHeader";
import { Reveal } from "../../../components/Reveal";

/* =========================
   HORIZONTAL SCROLL SECTION
   - Clean background (semi-transparent overlay)
   - White text for contrast
   - Title in serif font
========================= */
function GameSection({ title, desc, games, onViewClick }: any) {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-start">
        {/* LEFT CONTENT */}
        <div className="md:sticky md:top-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">{desc}</p>
          <div className="mt-3 w-10 h-1 bg-primary rounded-full"></div>
        </div>

        {/* RIGHT CARDS GRID */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {games.map((g: any, i: number) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-[120px] overflow-hidden">
                <Image
                    src={g.image}
                    alt={g.name}
                    width={1200}
                    height={800}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <span className="absolute top-2 left-2 text-[10px] bg-black/70 text-white px-2 py-1 rounded">
                  Game
                </span>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {g.name}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <div className="w-6 h-[2px] bg-primary rounded-full"></div>
                  <span
                    className="text-xs text-gray-500 group-hover:text-primary transition cursor-pointer"
                    onClick={() => onViewClick(g)}
                  >
                    View
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   MODAL COMPONENT
========================= */
function GameModal({ game, onClose }: any) {
  if (!game) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64">
          <Image
              src={game.image}
              alt={game.name}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 font-serif mb-2">
            {game.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

/* =========================
   INTRO SECTION COMPONENT
========================= */
function IntroSection() {
  return (
    <section className="pt-10 ">
      <div className="max-w-7xl mx-auto px-4 text-start">
        <Reveal delay={100}>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that learning extends beyond the classroom. Our sports and co-curricular activities provide students with opportunities to stay active, discover their talents, build confidence, and develop essential life skills.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg  text-gray-700 leading-relaxed mt-4">
            Through a variety of sports, games, cultural activities, competitions, and creative programmes, students learn the values of teamwork, discipline, leadership, perseverance, and sportsmanship. We encourage every student to participate, explore their interests, and enjoy a healthy, active, and well-balanced school life.
          </p>
        </Reveal>

        <div className="mt-8 w-20 h-1 bg-primary rounded-full mx-auto"></div>
      </div>
    </section>
  );
}

/* =========================
   PAGE
========================= */
export default function GamesPage() {
  const [modalGame, setModalGame] = useState(null);

  const openModal = (game: any) => setModalGame(game);
  const closeModal = () => setModalGame(null);

  return (
    <>
      <SEO
        title="Sports & Games"
        description="Sports, indoor and outdoor games, and traditional games at Sona Valliappa Public School, Salem – building strength, teamwork, and confidence."
        path="/infrastructure-facilities/indoor-outdoor-and-traditional-games"
      />

      <main className=" bg-gray-50">
        <PageHeader
          title=" Sports"
          subtitle="Fitness for Body and Mind"
          breadcrumbs={["Home", "Infrastructure facilities", "Sports & Games"]}
        />

        {/* INTRO SECTION */}
        <IntroSection />

        {/* GAME SECTIONS WITH REVEAL ANIMATIONS (delay=200) */}
        <div className="relative w-full">
          <div className="relative z-10 flex flex-col">

            <Reveal delay={200}>
              <GameSection
                title="Indoor Games"
                desc="Indoor games help students develop concentration, patience, strategic thinking, and mental agility"
                games={[
                  {
                    name: "Chess",
                    image:
                      "/infra/sports/chess.jpg",
                  },
                  {
                    name: "Carrom",
                    image:
                      "/infra/sports/carrom.png",
                  },
                  {
                    name: "Table Tennis",
                    image:
                      "/infra/sports/tennis.webp",
                  },
                  {
                    name: "Board Games",
                    image:
                      "/infra/sports/board.png",
                  },
                ]}
                onViewClick={openModal}
              />
            </Reveal>

            <Reveal delay={200}>
              <GameSection
                title="Outdoor Games"
                desc="Outdoor games foster persistence, teamwork, sportsmanship, and the ability to compete positively."
                games={[
                  {
                    name: "Cricket",
                    image:
                      "/infra/sports/cricket.webp",
                  },
                  {
                    name: "Football",
                    image:
                      "/infra/sports/football.webp",
                  },
                  {
                    name: "Athletics",
                    image:
                      "/infra/sports/running.webp",
                  },
                  {
                    name: "Basketball",
                    image:
                      "/infra/sports/basketball.webp",
                  },
                ]}
                onViewClick={openModal}
              />
            </Reveal>

            <Reveal delay={200}>
              <GameSection
                title="Traditional Games"
                desc="Traditional games preserve cultural values while improving mobility, endurance, and team coordination."
                games={[
                  {
                    name: "Kabaddi",
                    image:
                      "/infra/sports/Kabaddi.webp",
                  },
                  {
                    name: "Kho Kho",
                    image:
                      "/infra/sports/Kho-Kho.webp",
                  },
                  {
                    name: "Lagori",
                    image:
                      "/infra/sports/Lagori.webp",
                  },
                  {
                    name: "Gilli Danda",
                    image:
                      "/infra/sports/Gilli-Danda.webp",
                  },
                ]}
                onViewClick={openModal}
              />
            </Reveal>
          </div>
        </div>

        {/* MODAL */}
        {modalGame && (
          <GameModal game={modalGame} onClose={closeModal} />
        )}
      </main>
    </>
  );
}