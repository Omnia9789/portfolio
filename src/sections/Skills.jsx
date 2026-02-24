export default function Skills({ skills }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14" id="skills">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <p className="mt-2 text-white/60">
        Tools and strengths relevant to AI training, evaluation, and ML projects.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="font-medium">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((it) => (
                <span
                  key={it}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
