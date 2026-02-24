export default function SectionTitle({ title, accent }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold tracking-tight">
        {title}{" "}
        {accent ? (
          <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
            {accent}
          </span>
        ) : null}
      </h2>
      <div className="mt-3 h-px w-20 bg-gradient-to-r from-purple-500/70 to-fuchsia-500/40" />
    </div>
  );
}
