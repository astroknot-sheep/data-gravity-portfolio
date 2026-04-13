import { motion } from "framer-motion";
import developerPhoto from "@/assets/developer-photo.png";

export default function F1HeroSection() {
  const firstName = "Dhriman";
  const lastName = "Deka";

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-6 z-10 relative py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-muted-foreground mb-8 tracking-wide"
            >
              Data Science & ML Engineer
            </motion.p>

            {/* Name */}
            <div className="mb-8">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                  className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95] tracking-tight text-foreground"
                >
                  {firstName}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
                  className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95] tracking-tight text-primary"
                >
                  {lastName}
                </motion.h1>
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-lg text-muted-foreground max-w-lg mb-12"
            >
              Building NLP systems and production ML pipelines at Probe42. 
              Previously research on multilingual transformers at LaRGo.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm transition-colors hover:bg-accent"
              >
                View Work
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-border text-foreground font-semibold text-sm transition-colors hover:border-primary hover:text-primary"
              >
                Contact
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="w-56 h-64 md:w-64 md:h-72 overflow-hidden border border-border">
              <img 
                src={developerPhoto} 
                alt="Dhriman Deka"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
