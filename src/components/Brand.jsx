export default function Brand({ name = "Omnia" }) {
  return (
    <a href="#home" className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
        <span className="text-xl font-bold text-violet-400">O</span>
      </div>
      <span className="text-lg font-semibold text-white/90">{name}</span>
    </a>
  );
}