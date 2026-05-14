import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

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
        <SectionHeader
          number="02"
          label="stack"
          meta={`${stack.length} tools`}
          title={
            <>
              A small, boring stack —
              <br />
              chosen mostly because it gets out of the way.
            </>
          }
        />
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
