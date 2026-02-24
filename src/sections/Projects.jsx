import SectionTitle from "../components/SectionTitle";

function ProjectCard({ p }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{p.title}</h3>
        {p.featured ? (
          <span className="rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-3 py-1 text-xs font-medium">
            Featured
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-white/70">{p.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        {p.github ? (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          >
            GitHub
          </a>
        ) : null}
        {p.demo ? (
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-950 hover:opacity-90 transition"
          >
            Demo
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16" id="projects">
      <SectionTitle title="Projects" />

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}
