import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function F1HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Cinematic grid overlay */}
      <div className="absolute inset-0 opacity-30">
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
      </div>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-[200%] h-40 bg-gradient-to-r from-transparent via-primary/20 to-transparent rotate-45 origin-center"
          style={{ transform: 'rotate(-35deg) translateY(-50%)' }}
        />
      </div>

      {/* Main content - asymmetric layout */}
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 z-10 relative"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left side - Editorial text */}
          <div className="lg:col-span-8 lg:col-start-1">
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

            {/* Main name - cinematic split */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 60, skewY: 3 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.5rem,12vw,11rem)] font-bold uppercase leading-[0.85] tracking-tight text-foreground"
              >
                DHRIMAN
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 60, skewY: 3 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-end gap-4"
              >
                <h2 className="text-[clamp(3.5rem,12vw,11rem)] font-bold uppercase leading-[0.85] tracking-tight text-primary">
                  DEKA
                </h2>
                {/* Accent badge */}
                <div className="hidden sm:block mb-4 lg:mb-8">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-primary/20 blur-lg" />
                    <span className="relative px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">
                      '25
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tagline - offset */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 lg:mt-12 max-w-xl lg:ml-4"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Transforming complex data into{" "}
                <span className="text-foreground font-semibold">intelligent systems</span>.
                <br className="hidden sm:block" />
                NLP, deep learning & production ML.
              </p>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4 lg:ml-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm overflow-hidden"
              >
                <span className="relative z-10">View Work</span>
                <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-border font-bold uppercase tracking-wider text-sm text-foreground hover:border-primary transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Right side - HUD data readout */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3 lg:col-start-10 hidden lg:block"
          >
            <div className="space-y-8 text-right">
              <div className="border-r-2 border-primary/30 pr-6">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">Focus</span>
                <span className="text-sm font-semibold text-foreground">NLP & LLMs</span>
              </div>
              <div className="border-r-2 border-primary/30 pr-6">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">Base</span>
                <span className="text-sm font-semibold text-foreground">Bengaluru</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
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
          <div className="w-px h-12 bg-border relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-primary"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
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
      <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden opacity-[0.03] select-none">
        <span className="text-[30vw] font-bold uppercase leading-none text-foreground">
          DD
        </span>
      </div>
    </section>
  );
}
