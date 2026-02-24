import SectionTitle from "../components/SectionTitle";
import GlowCard from "../components/GlowCard";

export default function Education({ profile }) {
  const education = Array.isArray(profile?.education) ? profile.education : [];
  const image = profile?.images?.edu;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16" id="education">
      <SectionTitle title="Education" />

      <div className="grid items-start gap-8 md:grid-cols-2">
        <GlowCard>
          {education.length > 0 ? (
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div
                  key={`${edu.school}-${i}`}
                  className={i !== 0 ? "border-t border-white/10 pt-6" : ""}
                >
                  <h3 className="text-xl font-semibold text-white">
                    {edu.school}
                  </h3>
                  <p className="mt-1 text-white/75">{edu.university}</p>
                  <p className="mt-2 text-sm text-white/60">{edu.period}</p>

                  {edu.coursework ? (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm font-semibold text-fuchsia-200">
                        Relevant Coursework:
                      </p>
                      <p className="mt-2 text-white/75">{edu.coursework}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/65">
              Education details are not available yet.
            </p>
          )}
        </GlowCard>

        <GlowCard className="p-0">
          <div className="aspect-[4/3] overflow-hidden rounded-[24px] border border-white/10">
            {image ? (
              <img
                src={image}
                alt="Education"
                className="block h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                Education image is not available.
              </div>
            )}
          </div>
        </GlowCard>
      </div>
    </section>
  );
}