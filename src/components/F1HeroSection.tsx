import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="pill-badge">
                <MapPin className="w-3 h-3 text-primary" />
                Based in Bengaluru
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.03em] normal-case text-foreground"
              style={{ textTransform: "none" }}
            >
              Mostly trying<br />
              to make small things <span className="text-primary italic font-light amber-glow">work</span><br />
              a little better<br />
              than yesterday.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
              style={{ textTransform: "none" }}
            >
              Still learning how data and language models actually work in the wild.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4 text-sm"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground hover:-translate-y-0.5 transition-transform"
                style={{ boxShadow: "0 10px 40px hsl(var(--primary) / 0.25)" }}
              >
                View my work
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary hover:text-primary text-foreground transition-colors"
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
              <div
                className="relative p-[1px] rounded-[20px]"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.7), transparent 60%)",
                }}
              >
                <img
                  src={developerPhoto}
                  alt="Dhriman Deka"
                  className="w-full rounded-[19px] grayscale opacity-95"
                />
              </div>
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
