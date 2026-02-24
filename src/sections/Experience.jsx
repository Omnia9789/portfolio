import SectionTitle from "../components/SectionTitle";
import GlowCard from "../components/GlowCard";

function ExperienceCard({ item }) {
  const bullets = Array.isArray(item?.bullets) ? item.bullets : [];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-semibold text-white">{item.role}</h3>
      <p className="mt-1 text-purple-200/90">{item.company}</p>
      <p className="mt-2 text-sm text-white/60">{item.period}</p>

      <ul className="mt-5 list-disc space-y-2 pl-5 text-white/75">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience({ profile }) {
  const experience = Array.isArray(profile?.experience) ? profile.experience : [];
  const image = profile?.images?.exp;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16" id="experience">
      <SectionTitle title="Experience" />

      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {experience.length > 0 ? (
            experience.map((it) => (
              <ExperienceCard key={it.role + it.company} item={it} />
            ))
          ) : (
            <GlowCard>
              <p className="text-white/65">
                Experience details are not available yet.
              </p>
            </GlowCard>
          )}
        </div>

        {/* Image Card (fills the frame) */}
        <GlowCard className="p-0 md:sticky md:top-24">
          <div className="h-[420px] md:h-[560px] overflow-hidden rounded-[32px] border-2 border-white/20">
            {image ? (
              <img
                src={image}
                alt="Experience"
                className="h-full w-full object-cover object-[50%_20%]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                Experience image is not available.
              </div>
            )}
          </div>
        </GlowCard>
      </div>
    </section>
  );
}