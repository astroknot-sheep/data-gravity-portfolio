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
              Most of my week goes into poking at <span className="text-primary">language</span> models,
              cleaning up data, and re-running things that didn&rsquo;t work the
              first time. I&rsquo;m still figuring a lot of it out — the model is
              usually the easy part; the data and the eval are where I get humbled.
            </p>

            <p className="mt-10 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl" style={{ textTransform: "none" }}>
              I read papers slower than I&rsquo;d like, write small scripts to
              keep myself honest, and try not to make the codebase worse on the
              way out.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {[
                ["Working on", "LLM evaluation, retrieval"],
                ["Stack", "Python, PyTorch, vLLM"],
                ["Reading", "Anthropic interp papers"],
                ["Listening", "Caribou — Suddenly"],
              ].map(([k, v]) => (
                <div key={k} className="glass-card rounded-[14px] px-5 py-4">
                  <p className="text-[11px] text-muted-foreground mb-1.5" style={{ textTransform: "none" }}>{k}</p>
                  <p className="text-sm text-foreground" style={{ textTransform: "none" }}>{v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
