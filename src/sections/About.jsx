import SectionTitle from "../components/SectionTitle";
import GlowCard from "../components/GlowCard";

export default function About({ profile }) {
  const aboutText = profile?.aboutText ?? "No about text available yet.";
  const aboutBadges = Array.isArray(profile?.aboutBadges)
    ? profile.aboutBadges
    : [];
  const aboutImage = profile?.images?.about;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16" id="about">
      <SectionTitle title="About" accent="Me" />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Card */}
        <GlowCard className="p-0">
          <div className="h-[420px] md:h-[560px] overflow-hidden rounded-[32px] border-2 border-white/20">
            {aboutImage ? (
              <img
                src={aboutImage}
                alt="About"
                className="h-full w-full object-cover object-[50%_12%]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                About image is not available.
              </div>
            )}
          </div>
        </GlowCard>

        {/* Text Card */}
        <GlowCard>
          <p className="whitespace-pre-line leading-relaxed text-white/80">
            {aboutText}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {aboutBadges.length > 0 ? (
              aboutBadges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80"
                >
                  {b}
                </span>
              ))
            ) : (
              <span className="text-sm text-white/60">
                No highlights added yet.
              </span>
            )}
          </div>
        </GlowCard>
      </div>
    </section>
  );
}