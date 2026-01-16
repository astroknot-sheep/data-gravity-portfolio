import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function F1HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Main content - asymmetric layout */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left column - main content */}
          <div className="lg:col-span-8 lg:col-start-1">
            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-muted-foreground mb-6 font-medium tracking-wide"
            >
              Data Scientist & ML Engineer
            </motion.p>

            {/* Main name - stacked asymmetrically */}
            <div className="space-y-2 mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[clamp(3rem,12vw,9rem)] font-bold uppercase text-foreground leading-[0.9] -ml-1"
              >
                Dhriman
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[clamp(3rem,12vw,9rem)] font-bold uppercase text-primary leading-[0.9] -ml-1"
              >
                Deka
              </motion.h2>
            </div>

            {/* Tagline - left aligned, more casual */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              I build ML systems that make sense of messy data. 
              Currently obsessed with NLP and making models actually work in production.
            </motion.p>

            {/* CTA Buttons - left aligned, different sizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold tracking-wide rounded-lg hover:bg-primary/90 transition-all hover:translate-y-[-2px]"
              >
                See my work
              </a>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 text-foreground font-medium hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* Right column - decorative element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex lg:col-span-4 justify-end items-center"
          >
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border border-primary/20 rounded-full" />
              <div className="absolute inset-4 border border-primary/30 rounded-full" />
              <div className="absolute inset-8 bg-primary/10 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-primary/40">ML</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-6 z-20"
      >
        <button
          onClick={scrollToAbout}
          className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </button>
      </motion.div>
    </section>
  );
}
