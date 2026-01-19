import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

export default function F1HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // More dramatic parallax on scroll
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0]);

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 30);
      mouseY.set((clientY - innerHeight / 2) / 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Letter animation for name
  const firstName = "DHRIMAN";
  const lastName = "DEKA";

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-[200vh]" // Extended height for scroll-driven reveal
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Dynamic grid that reacts to mouse and fades on scroll */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: gridOpacity, x: springX, y: springY }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px),
                linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </motion.div>

        {/* Scroll-reveal diagonal lines */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: heroOpacity }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: '-10%',
                right: '-10%',
                transform: `rotate(${-5 + i * 2}deg)`,
                x: springX,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
            />
          ))}
        </motion.div>

        {/* Main content with parallax */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-6 z-10 relative"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
            {/* Left side - Editorial text */}
            <div className="lg:col-span-10 lg:col-start-1">
              {/* Floating HUD element */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-8 flex items-center gap-4 overflow-hidden"
              >
                <motion.div 
                  className="h-px bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ width: "64px" }}
                />
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-xs font-bold uppercase tracking-[0.3em] text-primary whitespace-nowrap"
                >
                  Data Science • ML • AI
                </motion.span>
              </motion.div>

              {/* Main name - letter by letter reveal */}
              <div className="relative">
                {/* First name */}
                <div className="overflow-hidden flex">
                  {firstName.split("").map((letter, index) => (
                    <motion.span
                      key={`first-${index}`}
                      initial={{ y: "120%", rotateX: -80 }}
                      animate={{ y: 0, rotateX: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.1 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="text-[clamp(3rem,12vw,11rem)] font-bold uppercase leading-[0.85] tracking-tight text-foreground inline-block"
                      style={{ transformOrigin: "bottom" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                
                {/* Last name with offset */}
                <div className="overflow-hidden flex">
                  {lastName.split("").map((letter, index) => (
                    <motion.span
                      key={`last-${index}`}
                      initial={{ y: "120%", rotateX: -80 }}
                      animate={{ y: 0, rotateX: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.4 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="text-[clamp(3rem,12vw,11rem)] font-bold uppercase leading-[0.85] tracking-tight text-primary inline-block"
                      style={{ transformOrigin: "bottom" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {/* Floating accent number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -right-4 md:right-0 top-0 md:top-4"
                >
                  <span className="text-[6rem] md:text-[10rem] font-bold text-primary/10 leading-none select-none">
                    01
                  </span>
                </motion.div>
              </div>

              {/* Tagline - reveals on scroll progress */}
              <motion.div
                style={{ y: textY }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 lg:mt-12 max-w-xl"
              >
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Transforming complex data into{" "}
                  <span className="text-foreground font-semibold">intelligent systems</span>.
                </p>
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
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
              transition={{ duration: 0.6, delay: 1.2 }}
              className="lg:col-span-2 lg:col-start-11 hidden lg:flex items-center justify-end"
            >
              <div className="writing-vertical text-xs font-bold uppercase tracking-[0.5em] text-muted-foreground">
                NLP • Deep Learning • MLOps
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute top-8 right-8 flex items-start gap-2"
        >
          <div className="w-8 h-px bg-primary/50" />
          <div className="w-px h-8 bg-primary/50" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-8 flex items-end gap-2"
        >
          <div className="w-px h-8 bg-primary/50" />
          <div className="w-8 h-px bg-primary/50" />
        </motion.div>

        {/* Large background text */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute bottom-0 right-0 pointer-events-none overflow-hidden opacity-[0.02] select-none"
        >
          <span className="text-[35vw] font-bold uppercase leading-none text-foreground">
            DD
          </span>
        </motion.div>
      </div>
    </section>
  );
}
