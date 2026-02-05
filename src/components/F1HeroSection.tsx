import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function F1HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  const gridX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const gridY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const floatX = useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]);
  const floatY = useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const firstName = "DHRIMAN";
  const lastName = "DEKA";

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Reactive grid background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          x: gridX,
          y: gridY,
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px),
            linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating gradient orbs that follow mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          x: floatX,
          y: floatY,
          left: '10%',
          top: '20%',
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
          right: '15%',
          bottom: '25%',
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 60%)',
        }}
      />

      {/* Animated diagonal lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              top: `${15 + i * 18}%`,
              left: '-20%',
              right: '-20%',
              transform: `rotate(${-2 + i * 0.5}deg)`,
              background: `linear-gradient(90deg, transparent 0%, hsl(var(--primary) / ${0.1 + i * 0.05}) 50%, transparent 100%)`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
          />
        ))}
      </div>

      {/* Scanning beam effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
          animate={{ y: ["-100%", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-6 z-10 relative py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-10">
            {/* HUD indicator with typing effect */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 flex items-center gap-4"
            >
              <motion.div 
                className="h-px bg-primary"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.span 
                className="text-xs font-bold uppercase tracking-[0.3em] text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Data Science • ML • AI
              </motion.span>
              <motion.div
                className="w-2 h-4 bg-primary"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>

            {/* Name with enhanced letter reveal */}
            <div className="relative mb-8">
              <div className="overflow-hidden flex">
                {firstName.split("").map((letter, index) => (
                  <motion.span
                    key={`first-${index}`}
                    initial={{ y: "120%", opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.4 + index * 0.05,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="text-[clamp(3rem,11vw,10rem)] font-bold uppercase leading-[0.9] tracking-tight text-foreground inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              
              <div className="overflow-hidden flex">
                {lastName.split("").map((letter, index) => (
                  <motion.span
                    key={`last-${index}`}
                    initial={{ y: "120%", opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.7 + index * 0.05,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="text-[clamp(3rem,11vw,10rem)] font-bold uppercase leading-[0.9] tracking-tight text-primary inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Glitchy accent number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -right-2 md:right-4 top-0"
              >
                <motion.span 
                  className="text-[5rem] md:text-[8rem] font-bold text-primary/10 leading-none select-none"
                  animate={{ 
                    textShadow: [
                      "0 0 0px hsl(var(--primary) / 0)",
                      "0 0 20px hsl(var(--primary) / 0.3)",
                      "0 0 0px hsl(var(--primary) / 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  01
                </motion.span>
              </motion.div>
            </div>

            {/* Tagline with reveal */}
            <motion.div
              className="overflow-hidden mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.p
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl"
              >
                Transforming complex data into{" "}
                <motion.span 
                  className="text-foreground font-semibold inline-block"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  intelligent systems
                </motion.span>.
              </motion.p>
            </motion.div>

            {/* Animated CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="relative z-10 flex items-center gap-2"
                >
                  View Work
                  <motion.span 
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-accent"
                  initial={{ x: "-101%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative px-8 py-4 border border-border font-bold uppercase tracking-wider text-sm text-foreground overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get In Touch</span>
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </div>

          {/* Vertical text with animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="lg:col-span-2 hidden lg:flex items-center justify-end"
          >
            <motion.div 
              className="writing-vertical text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              NLP • Deep Learning • MLOps
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <motion.span 
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <div className="relative w-6 h-12 border border-border/60 rounded-full group-hover:border-primary/50 transition-colors overflow-hidden">
            <motion.div 
              className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </button>
      </motion.div>

      {/* Animated corner accents */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, type: "spring" }}
        className="absolute top-8 right-8 flex items-start gap-2"
      >
        <motion.div 
          className="w-8 h-px bg-primary/40"
          animate={{ scaleX: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="w-px h-8 bg-primary/40"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
        className="absolute bottom-8 left-8 flex items-end gap-2"
      >
        <motion.div 
          className="w-px h-8 bg-primary/40"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="w-8 h-px bg-primary/40"
          animate={{ scaleX: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>

      {/* Pulsing background monogram */}
      <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden">
        <motion.span 
          className="text-[30vw] font-bold uppercase leading-none text-foreground select-none"
          animate={{ 
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          DD
        </motion.span>
      </div>
    </section>
  );
}
