import { motion } from "framer-motion";

export default function F1AboutSection() {
  const statementWords = ["I", "BUILD", "SYSTEMS", "THAT", "LEARN", "&", "ADAPT"];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background marquee text */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {["DATA", "MACHINE LEARNING", "NLP", "DEEP LEARNING", "DATA", "MACHINE LEARNING", "NLP", "DEEP LEARNING"].map((item, i) => (
            <span key={i} className="text-7xl md:text-8xl lg:text-9xl font-bold uppercase text-foreground/[0.03] select-none">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
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

        {/* Large statement */}
        <motion.div 
          className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {statementWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-foreground"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Two-column content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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

          {/* Right - Quick facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { label: "Focus", value: "NLP & LLMs", num: "01" },
              { label: "Stack", value: "Python, PyTorch", num: "02" },
              { label: "Base", value: "Bengaluru", num: "03" }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="group flex items-center gap-6 p-5 border border-border hover:border-primary/50 bg-card/50 transition-all duration-300"
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
