export default function ScrollDown({ href = "#about" }) {
  return (
    <a
      href={href}
      className="group absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition"
      aria-label="Scroll down"
    >
      <span className="text-sm tracking-wide">Scroll Down</span>

      {/* little animated arrow */}
      <span className="relative h-8 w-8 grid place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur">
        <span className="animate-bounce-soft text-lg leading-none">↓</span>
      </span>
    </a>
  );
}