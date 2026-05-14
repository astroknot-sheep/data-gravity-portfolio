import { motion } from "framer-motion";

export default function F1ContactSection() {
  return (
    <section id="contact" className="py-32 lg:py-44">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] text-muted-foreground/70 mb-16 font-mono-ui tracking-wider"
        >
          06 — contact
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.02em] text-foreground"
            style={{ textTransform: "none" }}
          >
            Happy to chat about small ML problems,<br />
            papers worth reading,<br />
            or anything in between.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 lg:pt-3 space-y-6"
          >
            <a
              href="mailto:contact@dhrimandeka.com"
              className="block group"
            >
              <p className="text-[11px] text-muted-foreground mb-1 font-mono-ui lowercase">email</p>
              <p
                className="text-lg md:text-xl text-foreground border-b border-border group-hover:border-primary group-hover:text-primary pb-2 transition-colors"
                style={{ textTransform: "none" }}
              >
                contact@dhrimandeka.com ↗
              </p>
            </a>

            <a
              href="https://www.linkedin.com/in/dhrimandeka"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-[11px] text-muted-foreground mb-1 font-mono-ui lowercase">linkedin</p>
              <p
                className="text-lg md:text-xl text-foreground border-b border-border group-hover:border-primary group-hover:text-primary pb-2 transition-colors"
                style={{ textTransform: "none" }}
              >
                /in/dhrimandeka ↗
              </p>
            </a>

            <a
              href="https://github.com/astroknot-sheep"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-[11px] text-muted-foreground mb-1 font-mono-ui lowercase">github</p>
              <p
                className="text-lg md:text-xl text-foreground border-b border-border group-hover:border-primary group-hover:text-primary pb-2 transition-colors"
                style={{ textTransform: "none" }}
              >
                @astroknot-sheep ↗
              </p>
            </a>

            <p className="pt-6 text-sm text-muted-foreground" style={{ textTransform: "none" }}>
              Based in Bengaluru. Slow but reliable replier.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
