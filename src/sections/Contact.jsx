import { useMemo, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import GlowCard from "../components/GlowCard";

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9A3.5 3.5 0 0 1 16.5 20h-9A3.5 3.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7 8l5 4 5-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9.2 6.2 7.9 4.4c-.5-.7-1.4-.9-2.1-.5l-1.1.6c-.8.4-1.2 1.4-.9 2.2 1.2 3.4 3.5 7.1 6.4 9.9 2.8 2.8 6.4 5 9.7 6.2.9.3 1.8-.1 2.3-.9l.6-1.1c.4-.7.2-1.6-.5-2.1l-1.8-1.3c-.6-.4-1.5-.4-2.1.1l-.8.7c-.4.4-1 .5-1.6.3-1.3-.6-2.9-1.8-4.4-3.3-1.5-1.5-2.7-3.2-3.3-4.5-.2-.6-.1-1.2.3-1.6l.7-.8c.5-.6.5-1.4.1-2.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21s6-4.2 6-10a6 6 0 1 0-12 0c0 5.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.5 9.5V18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 6.4a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
        fill="currentColor"
      />
      <path
        d="M10.5 18v-5.2c0-1.8 1-3 2.7-3 1.9 0 2.6 1.3 2.6 3.1V18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGitHub(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2.7a9.3 9.3 0 0 0-2.9 18.2c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.2-4.5-1.1-4.5-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.9-.3 2.8 1a9.7 9.7 0 0 1 5.2 0c1.9-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.8-4.5 5 .4.3.8 1 .8 2.1v3c0 .3.2.6.7.5A9.3 9.3 0 0 0 12 2.7Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 8.7V7.6c0-.8.4-1.3 1.4-1.3H17V3.8h-2.2c-2.6 0-3.8 1.5-3.8 3.7v1.2H9.3v2.5H11V20h3v-8.8h2.3l.4-2.5H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SocialIcon({ label, className }) {
  const map = {
    LinkedIn: IconLinkedIn,
    GitHub: IconGitHub,
    Facebook: IconFacebook,
  };
  const Cmp = map[label] || IconLinkedIn;
  return <Cmp className={className} />;
}

export default function Contact({ profile }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const socials = useMemo(() => {
    const list = Array.isArray(profile?.socials) ? profile.socials : [];
    return list.filter((s) => s?.href);
  }, [profile]);

  const location = profile?.location || "Cairo, Egypt";

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // Frontend-only: you can connect EmailJS, Formspree, or your backend later.
    // For now, just open mail client with a prefilled email.
    const to = encodeURIComponent(profile?.email || "");
    const subject = encodeURIComponent(form.subject || "Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16" id="contact">
      <SectionTitle title="Contact Me" />

      <div className="grid items-start gap-8 md:grid-cols-2">
        {/* LEFT: FORM */}
        <GlowCard className="p-0">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-fuchsia-200">
              Get In Touch
            </h3>
            <p className="mt-1 text-sm text-white/65">
              Have a project in mind or want to discuss a collaboration? Feel
              free to reach out through the form or my contact details.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-white/80">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80">
                    Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="your.email@example.com"
                    type="email"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white/80">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="What is this regarding?"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white/80">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Your message here..."
                  rows={6}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/20 transition hover:brightness-110 active:scale-[0.99]"
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11.5 21 3l-8.5 18-2.6-6.2L3 11.5Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 3 9.9 14.8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </GlowCard>

        {/* RIGHT: CONTACT INFO */}
        <GlowCard className="p-0">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-fuchsia-200">
              Contact Information
            </h3>
            <p className="mt-1 text-sm text-white/65">
              Feel free to reach out through any of these channels.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-fuchsia-500/15 text-fuchsia-200">
                  <IconMail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/85">
                    Email
                  </div>
                  <div className="text-sm text-white/65">{profile?.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-fuchsia-500/15 text-fuchsia-200">
                  <IconPhone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/85">
                    Phone
                  </div>
                  <div className="text-sm text-white/65">{profile?.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-fuchsia-500/15 text-fuchsia-200">
                  <IconPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/85">
                    Location
                  </div>
                  <div className="text-sm text-white/65">{location}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-sm font-semibold text-white/80">
                Connect with me
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    <SocialIcon label={s.label} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}