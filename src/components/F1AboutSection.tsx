import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import MarqueeTicker from "./MarqueeTicker";

export default function F1AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);

  const statementWords = ["I", "BUILD", "SYSTEMS", "THAT", "LEARN", "&", "ADAPT"];

  return (
    <section ref={sectionRef} id="about" className="py-32 relative overflow-hidden">
      {/* Marquee background */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
        <MarqueeTicker 
          items={["DATA", "MACHINE LEARNING", "NLP", "DEEP LEARNING"]} 
          direction="left"
          speed={40}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* Large statement typography - Lando style */}
        <div className="mb-20">
          <motion.div 
            style={{ y: textY }}
            className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2"
          >
            {statementWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onMouseEnter={() => setHoveredWord(index)}
                onMouseLeave={() => setHoveredWord(null)}
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase cursor-default transition-all duration-300 ${
                  hoveredWord === index 
                    ? 'text-primary scale-105' 
                    : hoveredWord !== null 
                      ? 'text-muted-foreground/50' 
                      : 'text-foreground'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Two-column content layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Bio text with reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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

          {/* Right - Quick facts with HUD styling */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { label: "Focus", value: "NLP & LLMs", num: "01" },
              { label: "Stack", value: "Python, PyTorch", num: "02" },
              { label: "Base", value: "Bengaluru", num: "03" }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
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
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
