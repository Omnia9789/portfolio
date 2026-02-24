export default function FloatingAssistantButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 z-50 grid h-14 w-14 place-items-center rounded-full
                 bg-violet-600/90 hover:bg-violet-600 text-white shadow-xl
                 ring-1 ring-white/10 backdrop-blur transition
                 after:content-[''] after:absolute after:inset-0 after:rounded-full
                 after:bg-violet-500/30 after:blur-xl after:-z-10"
      aria-label="Open AI assistant"
      type="button"
    >
      {/* simple thick icon */}
      <span className="text-2xl">💬</span>
    </button>
  );
}