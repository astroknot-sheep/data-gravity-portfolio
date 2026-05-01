import { motion } from "framer-motion";

const stack = [
  "Python", "PyTorch", "Hugging Face", "vLLM", "FastAPI",
  "Transformers", "RAG", "LoRA / QLoRA", "Pandas", "SQL", "Docker", "AWS",
  "TypeScript", "JAX", "Triton", "MLflow", "Airflow", "Spark",
];

export default function BentoSkillsSection() {
  // duplicate enough times for a seamless loop
  const loop = [...stack, ...stack];

  return (
    <section id="skills" className="py-32 lg:py-44 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10 mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs text-muted-foreground mb-8"
        >
          — What I use
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.01em] text-foreground"
          style={{ textTransform: "none" }}
        >
          A small, boring stack —<br />
          chosen mostly because it gets out of the way.
        </motion.h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex overflow-hidden border-y border-border/40 py-8">
          <motion.div
            className="flex shrink-0 items-center gap-12 pr-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {loop.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-12 text-2xl md:text-3xl lg:text-4xl font-light text-foreground/80"
                style={{ textTransform: "none" }}
              >
                {item}
                <span className="text-muted-foreground/50">/</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
