import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

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
        left: direction === 'left' ? -420 : 420,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-10">
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Portfolio
              </span>
              <div className="h-px flex-1 bg-border max-w-24" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground leading-[0.9]">
              Featured<br />
              <span className="text-primary">Projects</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground hidden sm:block">
              {String(hoveredIndex !== null ? hoveredIndex + 1 : 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  canScrollLeft 
                    ? 'border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground' 
                    : 'border-border/30 text-muted-foreground/30'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  canScrollRight 
                    ? 'border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground' 
                    : 'border-border/30 text-muted-foreground/30'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cards - reveal on scroll */}
      <div 
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="horizontal-scroll px-6 gap-6 pb-4"
      >
        {projectsData.map((project, index) => (
          <ScrollProjectCard 
            key={project.title}
            project={project}
            index={index}
            progress={scrollYProgress}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

function ScrollProjectCard({ project, index, progress, onHover, onLeave }: {
  project: typeof projectsData[0];
  index: number;
  progress: any;
  onHover: () => void;
  onLeave: () => void;
}) {
  const start = 0.1 + (index * 0.04);
  const end = start + 0.15;
  
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [80, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="horizontal-scroll-item w-[350px] md:w-[400px]"
    >
      <div className="group h-full bg-card border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Large index number */}
        <div className="absolute top-4 right-4 text-6xl font-bold text-border/30 group-hover:text-primary/20 transition-colors select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
        
        <div className="p-8 relative">
          {/* Category & link */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 px-3 py-1">
              {project.category}
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-4 leading-tight pr-12">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.metrics.map((metric) => (
              <span 
                key={metric}
                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary"
              >
                {metric}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-2 py-1 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors group/link"
          >
            <span>View Project</span>
            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
