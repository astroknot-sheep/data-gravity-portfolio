import { motion } from "framer-motion";

export default function F1HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const firstName = "DHRIMAN";
  const lastName = "DEKA";

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px),
            linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              top: `${25 + i * 20}%`,
              left: '-10%',
              right: '-10%',
              transform: `rotate(${-3 + i}deg)`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 + i * 0.15 }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 z-10 relative py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Main content */}
          <div className="lg:col-span-10">
            {/* HUD indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 flex items-center gap-4"
            >
              <div className="h-px w-16 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Data Science • ML • AI
              </span>
            </motion.div>

            {/* Name - letter reveal */}
            <div className="relative mb-8">
              {/* First name */}
              <div className="overflow-hidden flex">
                {firstName.split("").map((letter, index) => (
                  <motion.span
                    key={`first-${index}`}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + index * 0.04,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="text-[clamp(3rem,11vw,10rem)] font-bold uppercase leading-[0.9] tracking-tight text-foreground inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              
              {/* Last name */}
              <div className="overflow-hidden flex">
                {lastName.split("").map((letter, index) => (
                  <motion.span
                    key={`last-${index}`}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + index * 0.04,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="text-[clamp(3rem,11vw,10rem)] font-bold uppercase leading-[0.9] tracking-tight text-primary inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Accent number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -right-2 md:right-4 top-0"
              >
                <span className="text-[5rem] md:text-[8rem] font-bold text-primary/10 leading-none select-none">
                  01
                </span>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10"
            >
              Transforming complex data into{" "}
              <span className="text-foreground font-semibold">intelligent systems</span>.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Work
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
                <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-border font-bold uppercase tracking-wider text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Right side - Vertical text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="lg:col-span-2 hidden lg:flex items-center justify-end"
          >
            <div className="writing-vertical text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
              NLP • Deep Learning • MLOps
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
          <div className="relative w-5 h-10 border border-border/60 rounded-full group-hover:border-primary/50 transition-colors">
            <motion.div 
              className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </button>
      </motion.div>

      {/* Corner accents */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-8 right-8 flex items-start gap-2"
      >
        <div className="w-8 h-px bg-primary/40" />
        <div className="w-px h-8 bg-primary/40" />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-8 flex items-end gap-2"
      >
        <div className="w-px h-8 bg-primary/40" />
        <div className="w-8 h-px bg-primary/40" />
      </motion.div>

      {/* Large background text */}
      <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden opacity-[0.02] select-none">
        <span className="text-[30vw] font-bold uppercase leading-none text-foreground">
          DD
        </span>
      </div>
    </section>
  );
}
