import { motion } from "framer-motion";

const writing = [
  {
    year: "2024",
    venue: "SSRN",
    title: "A comparative look at NPS and UPS from an employee&rsquo;s perspective",
    note: "A small paper on Indian pension reform. Mostly accounting and assumptions.",
    link: "https://ssrn.com/",
  },
  {
    year: "2024",
    venue: "Medium",
    title: "Teaching a DQN agent to play Ludo, badly",
    note: "10,000 episodes, 9k lines of code, 43% win rate. Mostly notes-to-self.",
    link: "https://medium.com/@not_mordecai/teaching-ai-to-play-ludo-a-10-000-episode-deep-reinforcement-learning-journey-b8aacebc1044",
  },
  {
    year: "2024",
    venue: "Medium",
    title: "I built a transformer to predict stocks. It lost the money.",
    note: "53.7% accuracy and a tidy reminder that the market doesn&rsquo;t care.",
    link: "https://medium.com/@not_mordecai/i-built-a-transformer-to-predict-stocks-it-achieved-53-7-accuracy-and-lost-all-its-money-dfe7a8a44a14",
  },
];

export default function F1PublicationsSection() {
  return (
    <section id="publications" className="py-32 lg:py-44">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="pill-badge">Writing</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.01em] text-foreground"
            style={{ textTransform: "none" }}
          >
            Notes I&rsquo;ve written down — partly to remember, partly to be corrected.
          </motion.h2>
        </div>

        <ul>
          {writing.map((w, i) => (
            <motion.li
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border-t border-border/40 last:border-b py-8 lg:py-10 group"
            >
              <a
                href={w.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid lg:grid-cols-12 gap-4 lg:gap-10 items-start"
              >
                <span className="lg:col-span-1 text-xs text-muted-foreground pt-1" style={{ textTransform: "none" }}>
                  {w.year}
                </span>
                <div className="lg:col-span-7">
                  <h3
                    className="text-xl md:text-2xl font-light text-foreground tracking-[-0.01em] group-hover:text-primary transition-colors"
                    style={{ textTransform: "none" }}
                    dangerouslySetInnerHTML={{ __html: w.title }}
                  />
                  <p
                    className="mt-2 text-sm text-muted-foreground leading-relaxed"
                    style={{ textTransform: "none" }}
                    dangerouslySetInnerHTML={{ __html: w.note }}
                  />
                </div>
                <span className="lg:col-span-4 text-xs text-muted-foreground lg:text-right" style={{ textTransform: "none" }}>
                  {w.venue} ↗
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
