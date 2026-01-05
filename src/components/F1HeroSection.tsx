import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";

export default function F1HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background layers */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute inset-0 f1-grid opacity-30"
      />
      
      {/* Floating amber blobs */}
      <motion.div
        style={{ 
          y: y1,
          x: mousePos.x * 30,
        }}
        className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl blob-morph"
      />
      <motion.div
        style={{ 
          y: y2,
          x: mousePos.x * -20,
        }}
        className="absolute bottom-40 left-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl blob-morph"
        initial={{ animationDelay: '2s' }}
      />

      {/* Main content */}
      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto px-6 z-10 relative"
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Pre-title badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 hud-glass hud-corners text-sm font-bold uppercase tracking-widest text-amber-400">
              <Zap className="w-4 h-4" />
              Data Scientist & ML Engineer
              <Zap className="w-4 h-4" />
            </span>
          </motion.div>

          {/* Main name - 3D layered effect */}
          <div className="relative mb-8">
            {/* Back layer - outlined */}
            <motion.h1
              initial={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
              animate={{ opacity: 0.15, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0 text-outlined text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-intro uppercase"
              style={{ 
                transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
              }}
            >
              DHRIMAN
            </motion.h1>
            
            {/* Middle layer */}
            <motion.h1
              initial={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
              animate={{ opacity: 0.3, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute inset-0 text-outlined-thin text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-intro uppercase"
              style={{ 
                transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
              }}
            >
              DHRIMAN
            </motion.h1>

            {/* Front layer - solid */}
            <motion.h1
              initial={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-intro uppercase text-gradient-glow"
              style={{ 
                transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
              }}
            >
              DHRIMAN
            </motion.h1>
          </div>

          {/* Last name */}
          <motion.h2
            initial={{ opacity: 0, x: 100, filter: 'blur(20px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-intro uppercase text-foreground/80 mb-12"
            style={{ 
              transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)`,
            }}
          >
            DEKA
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-league"
          >
            Transforming complex data into{" "}
            <span className="text-gradient font-bold">actionable insights</span>{" "}
            through cutting-edge machine learning and AI solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="magnetic-btn px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-background font-bold uppercase tracking-wider rounded-lg hud-corners neon-glow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Projects</span>
            </motion.a>
            
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 hud-glass font-bold uppercase tracking-wider rounded-lg hud-corners border border-primary/30 hover:border-primary/60 transition-all duration-300 text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* HUD corner decorations */}
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
    </section>
  );
}
