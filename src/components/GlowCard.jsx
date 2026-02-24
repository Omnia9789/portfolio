export default function GlowCard({ children, className = "" }) {
  return (
    <div className={`relative rounded-3xl p-[1px] ${className}`}>
      {/* outer glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-purple-500/25 blur-2xl opacity-70" />
      {/* subtle gradient ring */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/50 via-transparent to-fuchsia-400/30 opacity-60" />

      {/* actual card */}
      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        {children}
      </div>
    </div>
  );
}