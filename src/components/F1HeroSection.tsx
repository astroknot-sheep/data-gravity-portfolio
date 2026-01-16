import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import MagneticElement from "./MagneticElement";

export default function F1HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Text animation variants
  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    }),
  };

  const nameLetters = "DHRIMAN".split("");
  const lastNameLetters = "DEKA".split("");

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="container mx-auto px-6 z-10 relative">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left column - main content */}
          <div className="lg:col-span-8 lg:col-start-1">
            {/* Small label with slide-in */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-sm text-muted-foreground mb-6 font-medium tracking-wide"
            >
              Data Scientist & ML Engineer
            </motion.p>

            {/* Main name - letter by letter animation */}
            <div className="mb-8 overflow-hidden" style={{ perspective: 1000 }}>
              <div className="flex flex-wrap">
                {nameLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[clamp(3rem,12vw,9rem)] font-bold uppercase text-foreground leading-[0.9] inline-block"
                    style={{ transformOrigin: "bottom" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap">
                {lastNameLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i + nameLetters.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[clamp(3rem,12vw,9rem)] font-bold uppercase text-primary leading-[0.9] inline-block"
                    style={{ transformOrigin: "bottom" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tagline with stagger */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              I build ML systems that make sense of messy data. 
              Currently obsessed with NLP and making models actually work in production.
            </motion.p>

            {/* CTA Buttons with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticElement strength={0.4}>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold tracking-wide rounded-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300"
                >
                  See my work
                </a>
              </MagneticElement>
              
              <MagneticElement strength={0.3}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-block px-8 py-4 text-foreground font-medium hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
                >
                  Get in touch
                </a>
              </MagneticElement>
            </motion.div>
          </div>

          {/* Right column - animated rings */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.6, 0.01, -0.05, 0.95] }}
            className="hidden lg:flex lg:col-span-4 justify-end items-center"
          >
            <div className="relative w-56 h-56">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-primary/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-dashed border-primary/20 rounded-full"
              />
              <div className="absolute inset-12 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-5xl font-bold text-primary/50"
                >
                  ML
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with pulse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-6 z-20"
      >
        <button
          onClick={scrollToAbout}
          className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </button>
      </motion.div>
    </section>
  );
}
