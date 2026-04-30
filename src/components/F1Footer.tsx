export default function F1Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="container mx-auto px-6 lg:px-10 flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground" style={{ textTransform: "none" }}>
        <span>© {new Date().getFullYear()} Dhriman Deka</span>
        <span>Made slowly, in Bengaluru.</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-foreground transition-colors"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
