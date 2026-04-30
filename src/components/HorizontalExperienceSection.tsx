import { motion } from "framer-motion";

const entries = [
  {
    period: "2024 — now",
    role: "Data science & ML engineer",
    place: "Probe42, Bengaluru",
    notes: [
      "Helping a small team move ML work from notebooks into things that run quietly on EC2.",
      "Spent a lot of time on a BERT-based search system and a generative model for compliance data.",
    ],
  },
  {
    period: "Feb — Aug 2024",
    role: "Research intern, LaRGo LLM group",
    place: "with Prof. Kripa Bandhu Ghosh, Kolkata",
    notes: [
      "Worked on a multilingual hate-speech classifier across a few Indian languages.",
      "Mostly learned how much of research is data cleaning, eval design, and patience.",
    ],
  },
  {
    period: "—",
    role: "B.S. Economics",
    place: "IISER Bhopal",
    notes: [
      "Picked up econometrics, stats, and a habit of not trusting clean-looking numbers.",
      "Drifted into ML somewhere along the way and never quite drifted back.",
    ],
  },
];

export default function HorizontalExperienceSection() {
  return (
    <section id="experience" className="py-32 lg:py-44">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs text-muted-foreground mb-16"
        >
          — Where I&rsquo;ve been
        </motion.p>

        <ul className="max-w-4xl">
          {entries.map((e, i) => (
            <motion.li
              key={e.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-t border-border/40 last:border-b py-10 lg:py-12 grid lg:grid-cols-12 gap-4 lg:gap-10"
            >
              <span className="lg:col-span-3 text-xs text-muted-foreground pt-1" style={{ textTransform: "none" }}>
                {e.period}
              </span>

              <div className="lg:col-span-9">
                <h3
                  className="text-2xl md:text-3xl font-light text-foreground tracking-[-0.01em]"
                  style={{ textTransform: "none" }}
                >
                  {e.role}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground" style={{ textTransform: "none" }}>
                  {e.place}
                </p>

                <div className="mt-5 space-y-3 max-w-2xl">
                  {e.notes.map((n, idx) => (
                    <p key={idx} className="text-base text-muted-foreground leading-relaxed" style={{ textTransform: "none" }}>
                      {n}
                    </p>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
