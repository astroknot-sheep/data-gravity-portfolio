import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import TiltCard from "./TiltCard";
import MagneticElement from "./MagneticElement";

const projectsData = [
  {
    title: "LYRA - AI Mental Health Chatbot",
    technologies: ["React", "Express", "MongoDB", "GenAI"],
    description: "Full-stack app with Gemini API integration, 500+ conversations at 99% uptime, 87% sentiment accuracy",
    category: "NLP",
    link: "https://github.com/astroknot-sheep",
    metrics: ["500+ Conversations", "99% Uptime", "87% Accuracy"]
  },
  {
    title: "Pension Portfolio Optimiser",
    technologies: ["Python", "Pandas", "Scikit-learn", "AWS"],
    description: "Enhanced portfolios via Max Sharpe, Min Volatility strategies with Monte Carlo simulations",
    category: "ML",
    link: "https://github.com/astroknot-sheep",
    metrics: ["12% Above Benchmark", "10K+ Simulations", "1,713 Data Points"]
  },
  {
    title: "BERT-based NLP Search System",
    technologies: ["BERT", "PyTorch", "FastAPI", "Docker"],
    description: "Replaced filter-based UI, boosting query accuracy by 45% and user satisfaction from 3.2 to 4.5/5",
    category: "NLP",
    link: "https://github.com/astroknot-sheep",
    metrics: ["45% Accuracy Boost", "4.5/5 Satisfaction", "50ms Latency"]
  },
  {
    title: "Multilingual Hate Speech Detection",
    technologies: ["Transformers", "Hugging Face", "PyTorch"],
    description: "Fine-tuned on 1.5M tweets, achieving 92% F1-score processing 200+ tweets/second",
    category: "NLP",
    link: "https://github.com/astroknot-sheep",
    metrics: ["92% F1-Score", "1.5M Tweets", "200+ TPS"]
  },
  {
    title: "Generative PAN/GST Model",
    technologies: ["Python", "ML", "Compliance"],
    description: "Generated 100% valid PAN/GST numbers for compliance testing, reducing validation time by 80%",
    category: "ML",
    link: "https://github.com/astroknot-sheep",
    metrics: ["100% Valid", "80% Time Saved", "20K+ Records"]
  }
];

export default function HorizontalProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <motion.div
          style={{ x: headerX, opacity: headerOpacity }}
          className="max-w-xl"
        >
          <span className="text-xs font-medium text-primary mb-4 block tracking-wide">
            Recent work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <p className="text-muted-foreground">
            Some things I've built recently.
          </p>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="container mx-auto px-6 flex justify-end gap-3 mb-6">
        <MagneticElement strength={0.2}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft ? 'text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary' : 'text-muted-foreground/30'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </MagneticElement>
        <MagneticElement strength={0.2}>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center transition-all duration-300 ${
              canScrollRight ? 'text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary' : 'text-muted-foreground/30'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </MagneticElement>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="horizontal-scroll px-6 gap-6 pb-4"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40, rotateY: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: [0.6, 0.01, -0.05, 0.95]
            }}
            className="horizontal-scroll-item w-[380px] md:w-[420px]"
            style={{ perspective: 1000 }}
          >
            <TiltCard className="h-full">
              <div className="h-full bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                <div className="flex items-center justify-between mb-4">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full"
                  >
                    {project.category}
                  </motion.span>
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((metric, i) => (
                    <motion.span 
                      key={metric}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="px-2 py-1 text-xs font-semibold bg-primary/10 border border-primary/20 rounded text-primary"
                    >
                      {metric}
                    </motion.span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-bold uppercase text-sm tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300"
                >
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
