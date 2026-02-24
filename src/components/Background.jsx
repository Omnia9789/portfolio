export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#070A15]" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_10%,rgba(124,58,237,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_80%_30%,rgba(236,72,153,0.14),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_50%_90%,rgba(99,102,241,0.10),transparent_60%)]" />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />
    </div>
  );
}
