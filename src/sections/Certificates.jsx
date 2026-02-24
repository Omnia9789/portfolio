import { useEffect, useMemo, useState } from "react";

function downloadFile(url, filename = "certificate.png") {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function filenameFromTitle(title) {
  return (
    title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "certificate"
  );
}

export default function Certificates({ certificates }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const active = useMemo(
    () => certificates?.[activeIndex] ?? null,
    [certificates, activeIndex]
  );

  const openAt = (i) => {
    setActiveIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + certificates.length) % certificates.length);
  const next = () => setActiveIndex((i) => (i + 1) % certificates.length);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKeyDown);
    // prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, certificates.length]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14" id="certificates">
      <h2 className="text-2xl font-semibold">Certificates</h2>
      <p className="mt-2 text-white/60">Selected certificates and learning milestones.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, idx) => (
          <div
            key={`${c.title}-${c.date}`}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <button
              type="button"
              onClick={() => openAt(idx)}
              className="group relative block w-full"
              aria-label={`Open ${c.title}`}
            >
              <div className="aspect-[16/10] w-full bg-black/20">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              {/* hover hint */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur">
                  Click to preview
                </div>
              </div>
            </button>

            <div className="p-4">
              <h3 className="font-medium">{c.title}</h3>
              <p className="mt-1 text-sm text-white/60">{c.issuer}</p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-white/50">{c.date}</p>

                <button
                  type="button"
                  onClick={() => downloadFile(c.image, `${filenameFromTitle(c.title)}.png`)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {open && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            // close when clicking the dark background
            if (e.target === e.currentTarget) close();
          }}
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{active.title}</p>
                <p className="truncate text-xs text-white/60">{active.issuer}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    downloadFile(active.image, `${filenameFromTitle(active.title)}.png`)
                  }
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                >
                  Download
                </button>

                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src={active.image}
                alt={active.title}
                className="max-h-[80vh] w-full object-contain bg-black/30"
              />

              {/* Prev / Next */}
              {certificates.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80 hover:bg-black/60"
                    aria-label="Previous certificate"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80 hover:bg-black/60"
                    aria-label="Next certificate"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Bottom hint */}
            <div className="border-t border-white/10 px-4 py-2 text-xs text-white/50">
              Tip: Use ← / → to navigate, Esc to close.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}