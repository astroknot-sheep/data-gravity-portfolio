import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function F1AboutSection() {
  return (
    <section id="about" className="relative py-32 lg:py-44">
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <SectionHeader
          number="01"
          label="about"
          meta="who, where, why"
          title={
            <>
              Trying to build small things
              <br />
              that don&rsquo;t embarrass me later.
            </>
          }
        />

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
              Most of my week goes into poking at language models,
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
            <dl className="space-y-5 text-sm font-mono-ui">
              {[
                ["Working on", "LLM evaluation, retrieval"],
                ["Stack", "Python, PyTorch, vLLM"],
                ["Reading", "Anthropic interp papers"],
                ["Listening", "Caribou — Suddenly"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-border/40 pb-4">
                  <dt className="text-muted-foreground lowercase">{k}</dt>
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
