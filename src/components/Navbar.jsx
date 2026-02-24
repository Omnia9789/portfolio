import { useEffect, useState } from "react";
import Brand from "./Brand";

export default function Navbar() {
  const items = [
    { id: "top", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];

  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: 0.25 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/65 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo like Malak (icon + name) */}
        <Brand name="Omnia." />

        <nav className="hidden gap-6 text-sm md:flex">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={
                active === it.id
                  ? "text-purple-400 transition"
                  : "text-white/70 hover:text-white transition"
              }
            >
              {it.label}
            </a>
          ))}
        </nav>

        <a
          href="/portfolio/files/AI resume.pdf"
          download
          className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95 transition"
        >
          Download CV
        </a>
      </div>
    </header>
  );
}
