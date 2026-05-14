export default function StatusTicker() {
  const items = [
    "available — feb 2026",
    "based in bengaluru, in",
    "currently — llm eval & retrieval",
    "open to small, careful work",
    "writing a little, more often",
  ];
  const loop = [...items, ...items, ...items];
  return (
    <div className="fixed top-0 left-0 right-0 z-[55] border-b border-border/40 bg-background/80 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-[ticker_60s_linear_infinite] whitespace-nowrap py-1.5">
        {loop.map((t, i) => (
          <span
            key={i}
            className="text-[10px] font-mono-ui text-muted-foreground/70 tracking-[0.18em] uppercase px-6 flex items-center gap-6"
          >
            <span className="inline-block w-1 h-1 bg-primary" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}