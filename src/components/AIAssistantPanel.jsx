export default function AIAssistantPanel({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close AI assistant"
      />

      {/* panel */}
      <div className="absolute right-6 bottom-24 w-[360px] max-w-[90vw] rounded-2xl border border-white/10 bg-gray-950/80 backdrop-blur p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-white/90">AI Assistant</p>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-white/70 hover:text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="h-56 overflow-auto rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/70">
          <p className="text-white/80">Hi 👋 Ask me about anthing in portfolio.</p>
          <p className="mt-2 opacity-70">(coming soon!)</p>
        </div>

        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-purple-400/60"
            placeholder="Type a message..."
          />
          <button className="rounded-xl bg-purple-600/90 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}