import ScrollDown from "./ScrollDown";

export default function Hero({ profile }) {
  return (
    <section
      className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center px-4 pt-14"
      id="top"
    >
      <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        {/* glow */}
        <div className="pointer-events-none absolute -top-24 left-10 h-56 w-56 rounded-full bg-purple-500/20 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-28 right-8 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-[110px]" />

      


        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </h1>

        <p className="mt-3 text-lg text-white/85">
          {profile.title} <span className="text-purple-300/90">•</span>{" "}
          AI Training / Data Annotation / Evaluation
        </p>

        <p className="mt-5 max-w-2xl text-white/70">{profile.hero.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {profile.hero.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-950 hover:opacity-90 transition"
          >
            GitHub
          </a>

          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          >
            LinkedIn
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          >
            Email
          </a>
        </div>
      </div>

      {/* Scroll Down centered + animated */}
      <ScrollDown href="#about" />
    </section>
  );
}