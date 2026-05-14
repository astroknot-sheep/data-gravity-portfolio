import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const projects = [
  {
    year: "2025",
    title: "Lyra",
    summary: "A small mental-health chatbot built around Gemini. Mostly an excuse to learn how fragile conversational eval really is.",
    stack: ["React", "Express", "MongoDB", "Gemini"],
    link: "https://github.com/astroknot-sheep",
  },
  {
    year: "2024",
    title: "BERT search for an internal tool",
    summary: "Replaced a clunky filter UI with semantic search. Helped the team find things faster; helped me find a lot of bad data.",
    stack: ["BERT", "PyTorch", "FastAPI", "Docker"],
    link: "https://github.com/astroknot-sheep",
  },
  {
    year: "2024",
    title: "Multilingual hate-speech detector",
    summary: "Fine-tuned on 1.5M tweets across a few Indian languages. Decent F1, very humbling failure cases.",
    stack: ["Transformers", "Hugging Face", "PyTorch"],
    link: "https://github.com/astroknot-sheep",
  },
  {
    year: "2023",
    title: "Pension portfolio optimiser",
    summary: "Monte Carlo + classical optimisation on Indian pension data. A chance to think carefully about what risk actually means.",
    stack: ["Python", "Pandas", "Scikit-learn"],
    link: "https://github.com/astroknot-sheep",
  },
  {
    year: "2023",
    title: "Synthetic PAN/GST generator",
    summary: "A small generative model for compliance test data. Useful, ugly, shipped.",
    stack: ["Python", "ML"],
    link: "https://github.com/astroknot-sheep",
  },
];

export default function HorizontalProjectsSection() {
  return (
    <section id="projects" className="py-32 lg:py-44">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader
          number="03"
          label="work"
          meta={`${projects.length} selected`}
          title={
            <>
              A few things I&rsquo;ve made,
              <br />
              mostly to learn.
            </>
          }
        />

        <ul className="border-t border-border/40">
          {projects.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border-b border-border/40 group relative overflow-hidden"
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid lg:grid-cols-12 gap-4 lg:gap-10 items-center py-8 lg:py-10 relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
              >
                <span className="lg:col-span-1 text-xs text-muted-foreground font-mono-ui" style={{ textTransform: "none" }}>
                  {p.year}
                </span>

                <div className="lg:col-span-5">
                  <h3
                    className="text-2xl md:text-4xl font-light text-foreground tracking-[-0.02em] transition-colors duration-500 group-hover:text-primary flex items-center gap-4"
                    style={{ textTransform: "none" }}
                  >
                    <span>{p.title}</span>
                    <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary text-xl">↗</span>
                  </h3>
                </div>

                <p className="lg:col-span-4 text-sm md:text-base text-muted-foreground leading-relaxed" style={{ textTransform: "none" }}>
                  {p.summary}
                </p>

                <div className="lg:col-span-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground lg:justify-end lg:text-right" style={{ textTransform: "none" }}>
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </a>
              {/* hover wash */}
              <span className="absolute inset-x-0 bottom-0 h-0 bg-primary/[0.04] group-hover:h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" aria-hidden="true" />
            </motion.li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-muted-foreground" style={{ textTransform: "none" }}>
          More on{" "}
          <a
            href="https://github.com/astroknot-sheep"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground draw-link hover:text-primary transition-colors"
          >
            github
          </a>
          , including the ones that didn&rsquo;t work.
        </p>
      </div>
    </section>
  );
}
