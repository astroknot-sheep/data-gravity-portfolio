import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

export default function ScrollHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values based on scroll
  const nameScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1.2, 0.8]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  const taglineOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4], [0, 1, 0]);
  const taglineY = useTransform(scrollYProgress, [0.15, 0.25, 0.4], [50, 0, -50]);
  const taglineScale = useTransform(scrollYProgress, [0.15, 0.25], [0.9, 1]);

  const secondTextOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6], [0, 1, 0]);
  const secondTextY = useTransform(scrollYProgress, [0.35, 0.45, 0.6], [100, 0, -100]);

  const thirdTextOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.85], [0, 1, 0]);
  const thirdTextScale = useTransform(scrollYProgress, [0.55, 0.65, 0.85], [0.5, 1, 1.2]);

  // Background grid parallax
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.1, 0]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Accent line animation
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

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

  // Final CTA reveal
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.8, 0.9], [50, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Sticky container - stays pinned while we scroll through 500vh */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Dynamic grid background */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: gridOpacity, scale: gridScale, x: springX, y: springY }}
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

        {/* Radial gradient that grows */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%)`,
            scale: useTransform(scrollYProgress, [0, 1], [1, 3])
          }}
        />

        {/* Corner HUD accents */}
        <div className="absolute top-8 right-8 flex items-start gap-2 z-20">
          <motion.div 
            className="h-px bg-primary/50" 
            style={{ width: lineWidth }}
          />
          <div className="w-px h-8 bg-primary/50" />
        </div>
        <div className="absolute bottom-8 left-8 flex items-end gap-2 z-20">
          <div className="w-px h-8 bg-primary/50" />
          <motion.div 
            className="h-px bg-primary/50" 
            style={{ width: lineWidth }}
          />
        </div>

        {/* Main content layers */}
        <div className="relative z-10 text-center px-6">
          {/* Layer 1: Name - starts visible, scales up, then fades */}
          <motion.div
            style={{ 
              scale: nameScale, 
              opacity: nameOpacity, 
              y: nameY 
            }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-primary mb-6 block">
                Data Science • ML • AI
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[clamp(3rem,15vw,14rem)] font-bold uppercase leading-[0.85] tracking-tight"
            >
              <span className="text-foreground">DHRIMAN</span>
              <br />
              <span className="text-primary">DEKA</span>
            </motion.h1>
          </motion.div>

          {/* Layer 2: First tagline */}
          <motion.div
            style={{ 
              opacity: taglineOpacity, 
              y: taglineY,
              scale: taglineScale
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transforming complex data into{" "}
                <span className="text-primary">intelligent systems</span>
              </h2>
            </div>
          </motion.div>

          {/* Layer 3: Skills reveal */}
          <motion.div
            style={{ 
              opacity: secondTextOpacity, 
              y: secondTextY 
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl">
              {["NLP", "Deep Learning", "LLMs", "MLOps", "PyTorch"].map((skill, i) => (
                <motion.span
                  key={skill}
                  style={{
                    opacity: useTransform(scrollYProgress, [0.38 + i * 0.02, 0.42 + i * 0.02], [0, 1])
                  }}
                  className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground"
                >
                  {skill}
                  {i < 4 && <span className="text-primary mx-2 md:mx-4">•</span>}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Layer 4: Statement */}
          <motion.div
            style={{ 
              opacity: thirdTextOpacity, 
              scale: thirdTextScale 
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-5xl">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-tight">
                <span className="text-foreground">Building</span>{" "}
                <span className="text-primary">systems</span>{" "}
                <span className="text-foreground">that</span>{" "}
                <span className="text-primary">learn</span>{" "}
                <span className="text-foreground">&</span>{" "}
                <span className="text-primary">adapt</span>
              </h2>
            </div>
          </motion.div>

          {/* Layer 5: CTA */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-10 py-5 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm overflow-hidden"
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
                className="group px-10 py-5 border border-border font-bold uppercase tracking-wider text-sm text-foreground hover:border-primary transition-colors relative overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </div>

            {/* Scroll hint at end */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-muted-foreground text-sm font-bold uppercase tracking-widest"
            >
              Continue Scrolling
            </motion.div>
          </motion.div>
        </div>

        {/* Large background text */}
        <motion.div 
          className="absolute bottom-0 right-0 pointer-events-none overflow-hidden select-none"
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.02, 0.05, 0.05, 0])
          }}
        >
          <span className="text-[35vw] font-bold uppercase leading-none text-foreground">
            DD
          </span>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="h-32 w-px bg-border relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-primary"
                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
            <motion.span 
              className="text-xs font-bold text-primary"
              style={{ opacity: useTransform(scrollYProgress, v => v > 0.1 ? 1 : 0.3) }}
            >
              {/* Dynamic percentage based on scroll */}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
