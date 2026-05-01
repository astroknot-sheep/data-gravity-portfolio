export default function SpeedLinesBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* base */}
      <div className="absolute inset-0 bg-background" />

      {/* subtle gradient mesh */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/2 -right-1/4 w-[55vw] h-[55vw] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--accent)) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* faint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
}
