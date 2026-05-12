import { useState } from "react";
import Head from "next/head";
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
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
                <img
                  src={g.image}
                  alt={g.name}
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
          <img
            src={game.image}
            alt={game.name}
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
   PAGE
========================= */
export default function GamesPage() {
  const [modalGame, setModalGame] = useState(null);

  const openModal = (game: any) => setModalGame(game);
  const closeModal = () => setModalGame(null);

  return (
    <>
      <Head>
        <title> Sports | Sona Valliappa Public School</title>
        <meta
          name="description"
          content="Sports, games, and physical education at Sona Valliappa Public School – building strength, teamwork, and confidence."
        />
      </Head>

      <main>
        <PageHeader
          title=" Sports"
          subtitle="Building strength, teamwork, and confidence."
          breadcrumbs={["Home", "Activities", "Games"]}
        />

     

        {/* GAME SECTIONS WITH REVEAL ANIMATIONS (delay=200) */}
        <div className="relative w-full">
          <div className="relative z-10 flex flex-col">
            <Reveal delay={200}>
              <GameSection
                title="Indoor Games"
                desc="Sharpen the mind with focus, patience, and strategic thinking."
                games={[
                  {
                    name: "Chess",
                    image:
                      "https://img.magnific.com/free-photo/young-kid-playing-chess_23-2149432866.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                  {
                    name: "Carrom",
                    image:
                      "https://img.magnific.com/premium-photo/carrom-board-maker-7_975681-261393.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                  {
                    name: "Table Tennis",
                    image:
                      "https://img.magnific.com/premium-photo/unbelievable-table-tennis-smash-rally_1079150-49183.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                  {
                    name: "Board Games",
                    image:
                      "https://img.magnific.com/premium-photo/indian-boy-girl-organizing-family-game-night-parents-day-bonding-laughter-friendly-competition-while-celebrating-their-parents-love_748982-24123.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                ]}
                onViewClick={openModal}
              />
            </Reveal>

            <Reveal delay={200}>
              <GameSection
                title="Outdoor Games"
                desc="Build endurance, teamwork, and competitive spirit."
                games={[
                  {
                    name: "Cricket",
                    image:
                      "https://img.magnific.com/free-photo/young-baseball-player-holding-bat-field_23-2150982548.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                  {
                    name: "Football",
                    image:
                      "https://img.magnific.com/premium-photo/boy-wearing-red-jersey-with-number-4-it_1206963-63117.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                  {
                    name: "Athletics",
                    image:
                      "https://img.magnific.com/premium-photo/group-kids-running-track-with-numbers-their-shirts_1206963-63245.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                  {
                    name: "Basketball",
                    image:
                      "https://img.magnific.com/premium-photo/young-student-school-uniform-smiling-while-holding-basketball-court-outdoor-activity_350874-12805.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                ]}
                onViewClick={openModal}
              />
            </Reveal>

            <Reveal delay={200}>
              <GameSection
                title="Traditional Games"
                desc="Experience culture while improving agility and coordination."
                games={[
                  {
                    name: "Kabaddi",
                    image:
                      "https://thumbs.dreamstime.com/b/women-s-kabaddi-action-9926358.jpg?w=768",
                  },
                  {
                    name: "Kho Kho",
                    image:
                      "https://img.magnific.com/premium-photo/young-student-school-uniform-smiling-while-holding-basketball-court-outdoor-activity_350874-12805.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80",
                  },
                  {
                    name: "Lagori",
                    image:
                      "https://images.unsplash.com/photo-1624880357913-a8539238245b",
                  },
                  {
                    name: "Gilli Danda",
                    image:
                      "https://images.unsplash.com/photo-1596464716127-f2a82984de30",
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