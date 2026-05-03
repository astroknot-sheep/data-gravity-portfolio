import { motion } from "framer-motion";
import developerPhoto from "@/assets/developer-photo.png";

export default function F1HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-16">
      {/* Subtle static grain — no animated orbs, no scanning beams, no parallax */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10 flex-1 flex items-center">
        <div className="grid lg:grid-cols-12 gap-10 w-full items-end">
          {/* Left — typographic statement */}
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-sm text-muted-foreground mb-10 max-w-md leading-relaxed"
            >
              Dhriman Deka — based in Bengaluru. Still learning how data and
              language models actually work in the wild.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.03em] normal-case text-foreground"
              style={{ textTransform: "none" }}
            >
              Mostly trying<br />
              to make small things <span className="text-primary italic font-light">work</span><br />
              a little better<br />
              than yesterday.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-foreground border-b border-primary pb-1 hover:text-primary transition-colors"
              >
                A few things I&rsquo;ve made
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Say hello ↗
              </a>
            </motion.div>
          </div>

          {/* Right — photo, no HUD frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="relative w-full max-w-[280px] ml-auto">
              <img
                src={developerPhoto}
                alt="Dhriman Deka"
                className="w-full rounded-full"
              />
              <p className="mt-3 text-[11px] text-muted-foreground tracking-wide">
                Bengaluru, IN — usually reading.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom meta strip — replaces "Scroll" prompt with something more bespoke */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="container mx-auto px-6 lg:px-10 relative z-10 flex flex-wrap justify-between items-end gap-4 text-[11px] text-muted-foreground"
      >
        <span>(2026 — happy to chat)</span>
        <span className="hidden md:inline">Some notes and half-finished ideas below ↓</span>
        <span>v.04</span>
      </motion.div>
    </section>
  );
}
