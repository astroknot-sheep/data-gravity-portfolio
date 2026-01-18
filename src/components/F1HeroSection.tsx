import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

export default function F1HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Dynamic grid that reacts to mouse */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ x: springX, y: springY }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px),
              linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />
      </motion.div>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-[200%] h-40 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{ 
            transform: 'rotate(-35deg) translateY(-50%)',
            x: springX,
          }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 z-10 relative"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left side - Editorial text */}
          <div className="lg:col-span-9 lg:col-start-1">
            {/* Floating HUD element */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-px w-16 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Data Science • ML • AI
              </span>
            </motion.div>

            {/* Main name - split with staggered animation */}
            <div className="relative">
              {/* First name with letter-by-letter reveal */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3.5rem,14vw,13rem)] font-bold uppercase leading-[0.85] tracking-tight text-foreground"
                >
                  DHRIMAN
                </motion.h1>
              </div>
              
              {/* Last name with offset */}
              <div className="overflow-hidden flex items-end gap-4">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3.5rem,14vw,13rem)] font-bold uppercase leading-[0.85] tracking-tight text-primary"
                >
                  DEKA
                </motion.h2>
              </div>

              {/* Floating accent number - Lando style */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -right-4 md:right-0 top-0 md:top-4"
              >
                <span className="text-[8rem] md:text-[12rem] font-bold text-primary/10 leading-none select-none">
                  01
                </span>
              </motion.div>
            </div>

            {/* Tagline - minimal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 lg:mt-12 max-w-xl"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Transforming complex data into{" "}
                <span className="text-foreground font-semibold">intelligent systems</span>.
              </p>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Work
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-8 py-4 border border-border font-bold uppercase tracking-wider text-sm text-foreground hover:border-primary transition-colors relative overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>

          {/* Right side - Vertical text accent */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 lg:col-start-11 hidden lg:flex items-center justify-end"
          >
            <div className="writing-vertical text-xs font-bold uppercase tracking-[0.5em] text-muted-foreground">
              NLP • Deep Learning • MLOps
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom scroll indicator - Lando style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <div className="relative w-6 h-12 border border-border rounded-full overflow-hidden group-hover:border-primary/50 transition-colors">
            <motion.div 
              className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-primary rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </button>
      </motion.div>

      {/* Corner HUD accents */}
      <div className="absolute top-8 right-8 flex items-start gap-2">
        <div className="w-8 h-px bg-primary/50" />
        <div className="w-px h-8 bg-primary/50" />
      </div>
      <div className="absolute bottom-8 left-8 flex items-end gap-2">
        <div className="w-px h-8 bg-primary/50" />
        <div className="w-8 h-px bg-primary/50" />
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden opacity-[0.02] select-none">
        <span className="text-[35vw] font-bold uppercase leading-none text-foreground">
          DD
        </span>
      </div>
    </section>
  );
}
