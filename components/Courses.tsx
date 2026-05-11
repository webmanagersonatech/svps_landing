export default function Courses() {
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl text-center font-bold text-secondary mb-10">Courses</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
          <h3 className="text-primary font-bold">MERN Stack</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
          <h3 className="text-primary font-bold">UI/UX</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
          <h3 className="text-primary font-bold">Data Science</h3>
        </div>
      </div>
    </section>
  )
}