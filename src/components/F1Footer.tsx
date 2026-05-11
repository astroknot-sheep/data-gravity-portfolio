export default function F1Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="container mx-auto px-6 lg:px-10 flex flex-wrap justify-between items-center gap-4 text-[11px] text-muted-foreground font-mono-ui">
        <span>© {new Date().getFullYear()} dhriman deka</span>
        <span className="hidden md:inline">made slowly, in bengaluru</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-foreground transition-colors lowercase"
        >
          back to top ↑
        </button>
      </div>
    </footer>
  );
}
