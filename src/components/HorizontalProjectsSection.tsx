import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

interface ProjectCardProps {
  project: typeof projectsData[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="flex-shrink-0 w-[340px] md:w-[400px] snap-start"
    >
      <motion.div 
        className="group h-full bg-card border border-border relative overflow-hidden"
        animate={{
          borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))"
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Top accent bar with animation */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={{ 
            translateX: isHovered ? "200%" : "-100%" 
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Large index number with animation */}
        <motion.div 
          className="absolute top-4 right-4 text-6xl font-bold text-border/30 select-none"
          animate={{ 
            color: isHovered ? "hsl(var(--primary) / 0.2)" : "hsl(var(--border) / 0.3)",
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
        
        <div className="p-8 relative">
          {/* Category & link */}
          <motion.div 
            className="flex items-center justify-between mb-8"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 px-3 py-1"
              animate={{ 
                borderColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.3)"
              }}
            >
              {project.category}
            </motion.span>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Title with hover effect */}
          <motion.h3 
            className="text-xl font-bold text-foreground mb-4 leading-tight pr-12"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-sm text-muted-foreground mb-6 leading-relaxed"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {project.description}
          </motion.p>

          {/* Metrics with staggered animation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.metrics.map((metric, i) => (
              <motion.span 
                key={metric}
                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "hsl(var(--primary) / 0.2)"
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                {metric}
              </motion.span>
            ))}
          </div>

          {/* Tech stack with hover effects */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <motion.span 
                key={tech}
                className="px-2 py-1 text-xs text-muted-foreground"
                whileHover={{ color: "hsl(var(--primary))" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.03 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* View link with animation */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
            whileHover={{ x: 4 }}
          >
            <span>View Project</span>
            <motion.span
              animate={{ x: isHovered ? [0, 4, 0] : 0 }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HorizontalProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      const cardWidth = 420;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(index, projectsData.length - 1));
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScrollButtons, { passive: true });
      return () => scrollEl.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -420 : 420,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Animated background accent */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--primary) / 0.05) 0%, transparent 100%)"
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Portfolio
              </span>
              <motion.div 
                className="h-px bg-border"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground leading-[0.9]"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Featured<br />
                <motion.span 
                  className="text-primary inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Projects
                </motion.span>
              </motion.h2>
            </div>
          </div>

          {/* Navigation with counter */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.span 
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground hidden sm:block"
              key={currentIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {String(currentIndex + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
            </motion.span>
            <div className="flex gap-2">
              <motion.button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  canScrollLeft 
                    ? 'border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground' 
                    : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
                }`}
                whileHover={canScrollLeft ? { scale: 1.05 } : {}}
                whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  canScrollRight 
                    ? 'border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground' 
                    : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
                }`}
                whileHover={canScrollRight ? { scale: 1.05 } : {}}
                whileTap={canScrollRight ? { scale: 0.95 } : {}}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Cards with perspective */}
      <div style={{ perspective: "1000px" }}>
        <motion.div 
          ref={scrollRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex overflow-x-auto gap-6 px-6 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Progress dots */}
      <motion.div 
        className="flex justify-center gap-2 mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {projectsData.map((_, index) => (
          <motion.div
            key={index}
            className="h-1 rounded-full transition-all duration-300"
            animate={{
              width: currentIndex === index ? 24 : 8,
              backgroundColor: currentIndex === index ? "hsl(var(--primary))" : "hsl(var(--border))"
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
