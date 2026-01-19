import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MarqueeTicker from "./MarqueeTicker";

export default function F1AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scroll-driven animations
  const textY = useTransform(scrollYProgress, [0, 0.5], [150, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  const statementWords = ["I", "BUILD", "SYSTEMS", "THAT", "LEARN", "&", "ADAPT"];

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen py-32 overflow-hidden">
      {/* Marquee background - fades in as you scroll */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <MarqueeTicker 
          items={["DATA", "MACHINE LEARNING", "NLP", "DEEP LEARNING"]} 
          direction="left"
          speed={40}
        />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section label - reveals on scroll */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            About
          </span>
          <div className="h-px flex-1 bg-border max-w-24" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            01
          </span>
        </motion.div>

        {/* Large statement typography - word by word reveal */}
        <div className="mb-20">
          <motion.div 
            style={{ scale }}
            className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2"
          >
            {statementWords.map((word, index) => {
              // Each word reveals at different scroll progress
              const wordStart = 0.1 + (index * 0.05);
              const wordEnd = wordStart + 0.15;
              
              return (
                <ScrollWord 
                  key={index} 
                  word={word} 
                  index={index}
                  progress={scrollYProgress}
                  range={[wordStart, wordEnd]}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Two-column content layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Bio text with reveal */}
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
              x: useTransform(scrollYProgress, [0.3, 0.5], [-50, 0])
            }}
            className="space-y-6"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              My work spans{" "}
              <span className="text-foreground font-semibold">NLP</span>,{" "}
              <span className="text-foreground font-semibold">deep learning</span>, and{" "}
              <span className="text-foreground font-semibold">MLOps</span> — turning raw data into meaningful impact.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Currently focused on large language models, production ML pipelines, and the 
              intersection of AI with real-world applications.
            </p>
          </motion.div>

          {/* Right - Quick facts with staggered reveal */}
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
              x: useTransform(scrollYProgress, [0.4, 0.6], [50, 0])
            }}
            className="space-y-6"
          >
            {[
              { label: "Focus", value: "NLP & LLMs", num: "01" },
              { label: "Stack", value: "Python, PyTorch", num: "02" },
              { label: "Base", value: "Bengaluru", num: "03" }
            ].map((item, index) => (
              <FactCard 
                key={item.label} 
                item={item} 
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScrollWord({ word, index, progress, range }: { 
  word: string; 
  index: number;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [60, 0]);
  const rotateX = useTransform(progress, range, [-45, 0]);

  return (
    <motion.span
      style={{ opacity, y, rotateX }}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase cursor-default text-foreground hover:text-primary transition-colors duration-300"
    >
      {word}
    </motion.span>
  );
}

function FactCard({ item, index, progress }: { 
  item: { label: string; value: string; num: string };
  index: number;
  progress: any;
}) {
  const start = 0.45 + (index * 0.05);
  const end = start + 0.1;
  
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [30, 0]);

  return (
    <motion.div 
      style={{ opacity, x }}
      className="group flex items-center gap-6 p-4 border border-border hover:border-primary/50 bg-card/50 transition-all duration-300"
    >
      <span className="text-xs font-bold text-primary/50 group-hover:text-primary transition-colors">
        {item.num}
      </span>
      <div className="h-8 w-px bg-border group-hover:bg-primary/50 transition-colors" />
      <div className="flex-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
          {item.label}
        </span>
        <span className="text-lg font-semibold text-foreground">
          {item.value}
        </span>
      </div>
    </motion.div>
  );
}
