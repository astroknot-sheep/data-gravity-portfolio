import { motion } from "framer-motion";

const groups = [
  { label: "Mostly working in", items: ["Python", "PyTorch", "Hugging Face", "vLLM", "FastAPI"] },
  { label: "Comfortable with", items: ["Transformers", "RAG", "LoRA / QLoRA", "Pandas", "SQL", "Docker", "AWS"] },
  { label: "Touched, still learning", items: ["TypeScript", "JAX", "Triton", "MLflow", "Airflow", "Spark"] },
];

export default function BentoSkillsSection() {
  return (
    <section id="skills" className="py-32 lg:py-44">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs text-muted-foreground mb-16"
        >
          — What I use
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.01em] text-foreground"
            style={{ textTransform: "none" }}
          >
            A small, boring stack —<br />
            chosen mostly because it gets out of the way.
          </motion.h2>

          <div className="lg:col-span-7 space-y-12">
            {groups.map((g, i) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-t border-border/40 pt-6"
              >
                <p className="text-xs text-muted-foreground mb-4" style={{ textTransform: "none" }}>
                  {g.label}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base md:text-lg text-foreground" style={{ textTransform: "none" }}>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
