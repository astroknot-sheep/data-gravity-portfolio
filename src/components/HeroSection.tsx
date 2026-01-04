import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Organic blob shapes - Lando Norris style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large cream/beige blobs */}
        <div 
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-stone-200/60 to-stone-300/40 blob-shape animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-stone-200/50 to-stone-300/30 blob-shape-2 animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] bg-gradient-to-tr from-stone-200/40 to-stone-300/20 blob-shape animate-float"
          style={{ animationDelay: '4s' }}
        />
        
        {/* Subtle lime accent blob */}
        <div 
          className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-primary/10 to-lime-300/10 blob-shape animate-pulse-glow"
        />
        
        {/* Organic flowing lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path 
            d="M0,450 Q360,250 720,450 T1440,450" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-stone-300"
          />
          <path 
            d="M0,550 Q360,350 720,550 T1440,550" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-stone-300"
          />
          <path 
            d="M0,350 Q360,150 720,350 T1440,350" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-stone-300"
          />
        </svg>
      </div>

      {/* Left side info panel - like Lando's "NEXT RACE" box */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute left-6 md:left-12 bottom-1/4 z-20"
      >
        <div className="border border-border p-6 bg-background/80 backdrop-blur-sm max-w-[180px]">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Current Role</p>
          <div className="border-b border-border pb-4 mb-4">
            <p className="text-sm font-semibold tracking-wide">Data Science</p>
            <p className="text-sm font-semibold tracking-wide text-primary">&amp; ML Engineer</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">IISER Bhopal</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Since 2021</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Name - massive typography like Lando's site */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tight text-foreground">
              DHRIMAN
            </h1>
            <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tight text-primary">
              DEKA
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl tracking-wide"
          >
            Specializing in Machine Learning, NLP, and Data-Driven Solutions
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-12"
          >
            <a href="#projects" className="btn-primary hover-lift">
              View Projects
            </a>
            <a href="#contact" className="btn-outline hover-lift">
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 group"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.button>

      {/* Side signature/logo area - like Lando's signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute right-6 md:right-12 bottom-12 z-20"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground writing-vertical hidden md:block" 
           style={{ writingMode: 'vertical-rl' }}>
          ML Engineer Since 2024
        </p>
      </motion.div>
    </section>
  );
}
