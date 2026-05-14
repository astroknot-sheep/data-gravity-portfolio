import { useEffect, useState } from "react";

const sections = [
  { id: "about", n: "01" },
  { id: "skills", n: "02" },
  { id: "projects", n: "03" },
  { id: "publications", n: "04" },
  { id: "experience", n: "05" },
  { id: "contact", n: "06" },
];

export default function SideRails() {
  const [active, setActive] = useState("01");

  useEffect(() => {
    const onScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 220) {
          setActive(sections[i].n);
          return;
        }
      }
      setActive("00");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Left rail — vertical brand */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 text-[10px] font-mono-ui text-muted-foreground/70 tracking-[0.3em] pointer-events-none select-none">
        <span className="writing-vertical uppercase">Dhriman Deka — Portfolio MMXXVI</span>
        <span className="block w-px h-16 bg-border/60" />
      </div>

      {/* Right rail — section index */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 text-[10px] font-mono-ui pointer-events-none select-none">
        {sections.map((s) => (
          <div key={s.n} className="flex items-center gap-2">
            <span
              className={`tabular-nums transition-colors ${
                active === s.n ? "text-primary" : "text-muted-foreground/50"
              }`}
            >
              {s.n}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                active === s.n ? "w-6 bg-primary" : "w-2 bg-border/60"
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
}