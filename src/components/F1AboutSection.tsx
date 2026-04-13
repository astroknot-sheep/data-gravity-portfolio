import { motion } from "framer-motion";

export default function F1AboutSection() {
  return (
    <section id="about" className="relative py-48 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground text-sm tracking-wide mb-24"
        >
          About
        </motion.h2>

        {/* Two-column content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-2xl md:text-3xl leading-relaxed text-foreground font-medium">
              I work at the intersection of data science and software engineering, 
              building systems that process language at scale.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              At Probe42, I designed a BERT-based search system that replaced a legacy filter UI, 
              improving query accuracy by 45%. Before that, I fine-tuned multilingual transformers 
              on 1.5M tweets at LaRGo, achieving 92% F1-score in hate speech detection.
            </p>
          </motion.div>

          {/* Right - Quick facts as simple text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8 lg:pt-4"
          >
            {[
              { label: "Focus", value: "NLP & Large Language Models" },
              { label: "Stack", value: "Python, PyTorch, Hugging Face, AWS" },
              { label: "Based in", value: "Bengaluru, India" },
            ].map((item) => (
              <div key={item.label} className="border-b border-border pb-6">
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="text-lg text-foreground">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
