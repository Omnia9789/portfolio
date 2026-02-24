import GlowCard from "../components/GlowCard";

export default function Home({ profile }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14" id="top">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* Left */}
        <div>
        

          <h1 className="mt-3 text-5xl font-extrabold leading-tight md:text-6xl">
            THIS IS <br />
            <span className="text-white">{profile.shortName.toUpperCase()}</span>{" "}
            <br />
            <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              {profile.lastNameStylized}
            </span>
          </h1>

          <p className="mt-5 text-2xl font-semibold text-white/95">
            {profile.roleLine}
          </p>
          <p className="mt-2 text-white/70">{profile.subRoleLine}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-600/20 hover:opacity-95 transition"
            >
              Work with me →
            </a>

            <a
             href="/portfolio/files/AI resume.pdf"
          download
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/90 hover:bg-white/10 transition"
            >
              Download CV →
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-2 text-white/75">
            <div className="flex items-center gap-2">
              <span className="text-purple-300">📞</span>
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-300">✉️</span>
              <span>{profile.email}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="mt-10 text-center text-white/50 md:text-left">
            Scroll Down ↓
          </div>
        </div>

        {/* Right */}
        <div className="md:justify-self-end">
          <GlowCard className="p-0">
            <div className="relative p-3">
              <div className="absolute inset-0 rounded-[26px] bg-gradient-to-r from-purple-600/35 to-fuchsia-600/25 blur-[24px]" />
              <div className="relative overflow-hidden rounded-[24px] bg-black/20 p-3">
                <div className="mx-auto h-[340px] w-[340px] overflow-hidden rounded-full border-4 border-purple-400/60 shadow-[0_0_50px_rgba(168,85,247,0.35)] md:h-[380px] md:w-[380px]">
                  <img
                    src={profile.images.hero}
                    alt={profile.shortName}
                    className="block h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
