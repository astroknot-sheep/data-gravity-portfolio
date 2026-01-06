import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function F1HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="text-center max-w-6xl mx-auto">
          {/* Pre-title badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg text-sm font-bold uppercase tracking-widest text-primary">
              Data Scientist & ML Engineer
            </span>
          </motion.div>

          {/* Main name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase text-foreground mb-4"
          >
            DHRIMAN
          </motion.h1>

          {/* Last name */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-primary mb-12"
          >
            DEKA
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Transforming complex data into{" "}
            <span className="text-primary font-semibold">actionable insights</span>{" "}
            through cutting-edge machine learning and AI solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Projects
            </a>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-card border border-border font-bold uppercase tracking-wider rounded-lg hover:border-primary/60 transition-colors text-foreground"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </motion.div>

      {/* Simple corner accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-primary/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-primary/30" />
    </section>
  );
}
