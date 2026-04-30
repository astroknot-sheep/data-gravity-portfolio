import { motion } from "framer-motion";

export default function F1AboutSection() {
  return (
    <section id="about" className="relative py-32 lg:py-44">
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Plain, small label — no animated lines, no 01 numbering */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs text-muted-foreground mb-16"
        >
          — About
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — long-form paragraph, sentence-case, no big uppercase reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8"
          >
            <p
              className="text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-[-0.01em] text-foreground font-light"
              style={{ textTransform: "none" }}
            >
              I spend most of my week training, breaking, and re-training models —
              mostly <span className="text-primary">language</span> ones, sometimes the
              kind that have to run inside something embarrassingly small. The interesting
              bit is rarely the model. It&rsquo;s the data, the eval, and the dozen
              quiet decisions that decide whether the thing actually helps anyone.
            </p>

            <p className="mt-10 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl" style={{ textTransform: "none" }}>
              I read more papers than I probably should, write small tools to keep
              myself honest, and try to leave the codebase a little less haunted
              than I found it.
            </p>
          </motion.div>

          {/* Right — quiet meta column, plain rows, no hover scan bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 lg:pt-3"
          >
            <dl className="space-y-5 text-sm">
              {[
                ["Working on", "LLM evaluation, retrieval"],
                ["Stack", "Python, PyTorch, vLLM"],
                ["Reading", "Anthropic interp papers"],
                ["Listening", "Caribou — Suddenly"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-border/40 pb-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-foreground text-right" style={{ textTransform: "none" }}>{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
