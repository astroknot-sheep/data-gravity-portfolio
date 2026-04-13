import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

const projectsData = [
  {
    title: "LYRA – AI Mental Health Chatbot",
    technologies: ["React", "Express", "MongoDB", "GenAI"],
    description: "Full-stack app with Gemini API integration. Handled 500+ conversations at 99% uptime with 87% sentiment accuracy.",
    category: "NLP",
    link: "https://github.com/astroknot-sheep",
    metrics: ["500+ conversations", "99% uptime", "87% accuracy"],
  },
  {
    title: "Pension Portfolio Optimiser",
    technologies: ["Python", "Pandas", "Scikit-learn", "AWS"],
    description: "Enhanced portfolios via Max Sharpe and Min Volatility strategies with Monte Carlo simulations across 1,713 data points.",
    category: "ML",
    link: "https://github.com/astroknot-sheep",
    metrics: ["12% above benchmark", "10K+ simulations"],
  },
  {
    title: "BERT-based NLP Search System",
    technologies: ["BERT", "PyTorch", "FastAPI", "Docker"],
    description: "Replaced a legacy filter-based UI, boosting query accuracy by 45% and user satisfaction from 3.2 to 4.5/5.",
    category: "NLP",
    link: "https://github.com/astroknot-sheep",
    metrics: ["45% accuracy boost", "4.5/5 satisfaction", "50ms latency"],
  },
  {
    title: "Multilingual Hate Speech Detection",
    technologies: ["Transformers", "Hugging Face", "PyTorch"],
    description: "Fine-tuned on 1.5M tweets, achieving 92% F1-score while processing 200+ tweets/second.",
    category: "NLP",
    link: "https://github.com/astroknot-sheep",
    metrics: ["92% F1-score", "1.5M tweets", "200+ TPS"],
  },
  {
    title: "Generative PAN/GST Model",
    technologies: ["Python", "ML", "Compliance"],
    description: "Generated 100% valid PAN/GST numbers for compliance testing, reducing validation time by 80%.",
    category: "ML",
    link: "https://github.com/astroknot-sheep",
    metrics: ["100% valid", "80% time saved"],
  },
];

export default function HorizontalProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScrollButtons, { passive: true });
      return () => scrollEl.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -420 : 420,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects" className="py-48 relative">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p className="text-sm text-muted-foreground tracking-wide mb-4">Work</p>
            <h2 className="text-foreground">Selected Projects</h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                canScrollLeft
                  ? "border-border text-foreground hover:border-primary hover:text-primary"
                  : "border-border/30 text-muted-foreground/30 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                canScrollRight
                  ? "border-border text-foreground hover:border-primary hover:text-primary"
                  : "border-border/30 text-muted-foreground/30 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Cards */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex overflow-x-auto gap-6 px-6 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="flex-shrink-0 w-[340px] md:w-[400px] snap-start bg-card border border-border hover:border-muted-foreground/30 transition-colors duration-150"
          >
            <div className="p-8">
              {/* Category & link */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-primary font-medium">
                  {project.category}
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
                {project.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="px-3 py-1 text-xs bg-muted text-muted-foreground"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              {/* Tech */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
