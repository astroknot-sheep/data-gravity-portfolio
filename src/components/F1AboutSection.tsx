import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function F1AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  const statementWords = ["I", "BUILD", "SYSTEMS", "THAT", "LEARN", "&", "ADAPT"];

  return (
    <section ref={containerRef} id="about" className="relative py-32 overflow-hidden">
      {/* Scroll-linked marquee background */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 w-[200%] pointer-events-none"
        style={{ x: marqueeX }}
      >
        <div className="flex gap-16 whitespace-nowrap">
          {["DATA", "MACHINE LEARNING", "NLP", "DEEP LEARNING", "DATA", "MACHINE LEARNING", "NLP", "DEEP LEARNING"].map((item, i) => (
            <motion.span 
              key={i} 
              className="text-7xl md:text-8xl lg:text-9xl font-bold uppercase text-foreground/[0.03] select-none"
              style={{ opacity }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section label with animated line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span 
            className="text-xs font-bold uppercase tracking-[0.3em] text-primary"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            About
          </motion.span>
          <motion.div 
            className="h-px bg-border"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.span 
            className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            01
          </motion.span>
        </motion.div>

        {/* Large statement with word-by-word reveal */}
        <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 mb-20">
          {statementWords.map((word, index) => (
            <div key={index} className="overflow-hidden">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  ease: [0.33, 1, 0.68, 1]
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-foreground inline-block"
              >
                <motion.span
                  whileHover={{ 
                    color: "hsl(var(--primary))",
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block cursor-default"
                >
                  {word}
                </motion.span>
              </motion.span>
            </div>
          ))}
        </div>

        {/* Two-column content with staggered reveal */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Bio with text reveal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <motion.p 
              className="text-xl md:text-2xl leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              My work spans{" "}
              <motion.span 
                className="text-foreground font-semibold inline-block"
                whileHover={{ color: "hsl(var(--primary))", scale: 1.02 }}
              >
                NLP
              </motion.span>,{" "}
              <motion.span 
                className="text-foreground font-semibold inline-block"
                whileHover={{ color: "hsl(var(--primary))", scale: 1.02 }}
              >
                deep learning
              </motion.span>, and{" "}
              <motion.span 
                className="text-foreground font-semibold inline-block"
                whileHover={{ color: "hsl(var(--primary))", scale: 1.02 }}
              >
                MLOps
              </motion.span> — turning raw data into meaningful impact.
            </motion.p>
            <motion.p 
              className="text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Currently focused on large language models, production ML pipelines, and the 
              intersection of AI with real-world applications.
            </motion.p>
          </motion.div>

          {/* Right - Interactive quick facts */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { label: "Focus", value: "NLP & LLMs", num: "01" },
              { label: "Stack", value: "Python, PyTorch", num: "02" },
              { label: "Base", value: "Bengaluru", num: "03" }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 30, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  x: 8,
                  borderColor: "hsl(var(--primary) / 0.5)",
                  transition: { duration: 0.2 }
                }}
                className="group flex items-center gap-6 p-5 border border-border bg-card/50 transition-colors cursor-default"
              >
                <motion.span 
                  className="text-xs font-bold text-primary/50 group-hover:text-primary transition-colors"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {item.num}
                </motion.span>
                <motion.div 
                  className="h-8 w-px bg-border group-hover:bg-primary/50 transition-colors"
                  whileHover={{ scaleY: 1.2 }}
                />
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
                    {item.label}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {item.value}
                  </span>
                </div>
                <motion.div
                  className="w-0 group-hover:w-2 h-full bg-primary transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
