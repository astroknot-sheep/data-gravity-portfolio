import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollAboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text reveals based on scroll
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.5], [0, 1, 1, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.5], [0.8, 1, 1, 0.9]);
  const headingY = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.5], [100, 0, 0, -100]);

  // Words reveal staggered
  const words = ["I", "BUILD", "SYSTEMS", "THAT", "LEARN", "&", "ADAPT"];
  
  // Bio text sections
  const bio1Opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const bio1Y = useTransform(scrollYProgress, [0.4, 0.55, 0.7, 0.8], [80, 0, 0, -80]);

  const bio2Opacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);
  const bio2Y = useTransform(scrollYProgress, [0.7, 0.85, 1], [80, 0, 0]);

  // Facts cards
  const facts = [
    { label: "Focus", value: "NLP & LLMs", num: "01" },
    { label: "Stack", value: "Python, PyTorch", num: "02" },
    { label: "Base", value: "Bengaluru", num: "03" }
  ];

  return (
    <div ref={containerRef} id="about" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background elements */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.1])
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Section label */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
          className="absolute top-8 left-8 flex items-center gap-4 z-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            About
          </span>
          <div className="h-px w-16 bg-border" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            01
          </span>
        </motion.div>

        {/* Main content */}
        <div className="container mx-auto px-6 relative z-10">
          {/* Layer 1: Large statement words */}
          <motion.div
            style={{ 
              opacity: headingOpacity, 
              scale: headingScale,
              y: headingY
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 max-w-6xl px-6">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  style={{
                    opacity: useTransform(
                      scrollYProgress, 
                      [0.05 + index * 0.02, 0.1 + index * 0.02], 
                      [0, 1]
                    ),
                    y: useTransform(
                      scrollYProgress,
                      [0.05 + index * 0.02, 0.1 + index * 0.02],
                      [50, 0]
                    )
                  }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-foreground"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Layer 2: First bio paragraph */}
          <motion.div
            style={{ opacity: bio1Opacity, y: bio1Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-3xl text-center px-6">
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-muted-foreground">
                My work spans{" "}
                <span className="text-foreground font-semibold">NLP</span>,{" "}
                <span className="text-foreground font-semibold">deep learning</span>, and{" "}
                <span className="text-foreground font-semibold">MLOps</span> — turning raw data into meaningful impact.
              </p>
            </div>
          </motion.div>

          {/* Layer 3: Facts grid */}
          <motion.div
            style={{ opacity: bio2Opacity, y: bio2Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full px-6">
              {facts.map((item, index) => (
                <motion.div 
                  key={item.label}
                  style={{
                    opacity: useTransform(
                      scrollYProgress, 
                      [0.75 + index * 0.03, 0.8 + index * 0.03], 
                      [0, 1]
                    ),
                    x: useTransform(
                      scrollYProgress,
                      [0.75 + index * 0.03, 0.8 + index * 0.03],
                      [index === 0 ? -50 : index === 2 ? 50 : 0, 0]
                    )
                  }}
                  className="group p-6 border border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm transition-all duration-300"
                >
                  <span className="text-4xl md:text-5xl font-bold text-primary/20 block mb-4">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                    {item.label}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-foreground">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="h-32 w-px bg-border relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
