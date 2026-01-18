import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";

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

export default function ScrollProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Header animations
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15, 0.2], [0, 1, 1, 0.5]);
  const headerY = useTransform(scrollYProgress, [0, 0.08, 0.15, 0.2], [100, 0, 0, -50]);

  // Calculate section for each project (evenly distributed)
  const projectCount = projectsData.length;
  const projectSection = 0.8 / projectCount; // Each project gets equal portion of 80% scroll

  return (
    <div ref={containerRef} id="projects" className="relative h-[600vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background gradient */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.1, 0.1, 0])
          }}
        >
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-primary/10 to-transparent" />
        </motion.div>

        {/* Section label */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]) }}
          className="absolute top-8 left-8 flex items-center gap-4 z-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Portfolio
          </span>
          <div className="h-px w-16 bg-border" />
        </motion.div>

        {/* Project counter */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.15, 0.2], [0, 1]) }}
          className="absolute top-8 right-8 z-20"
        >
          <motion.span 
            className="text-6xl md:text-8xl font-bold text-primary/20"
          >
            {/* This will be updated per project */}
          </motion.span>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header - shows first then fades to make room for projects */}
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-foreground leading-[0.9] mb-6">
                Featured<br />
                <span className="text-primary">Projects</span>
              </h2>
              <motion.p
                style={{ opacity: useTransform(scrollYProgress, [0.05, 0.1], [0, 1]) }}
                className="text-muted-foreground text-lg max-w-xl mx-auto"
              >
                Scroll to explore my work in ML, NLP, and data science
              </motion.p>
            </div>
          </motion.div>

          {/* Projects - each takes over the screen in sequence */}
          {projectsData.map((project, index) => {
            const startPoint = 0.15 + index * projectSection;
            const midPoint = startPoint + projectSection * 0.5;
            const endPoint = startPoint + projectSection;

            return (
              <motion.div
                key={project.title}
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [startPoint, startPoint + 0.05, endPoint - 0.05, endPoint],
                    [0, 1, 1, 0]
                  ),
                  scale: useTransform(
                    scrollYProgress,
                    [startPoint, startPoint + 0.05, endPoint - 0.05, endPoint],
                    [0.9, 1, 1, 0.95]
                  ),
                  y: useTransform(
                    scrollYProgress,
                    [startPoint, startPoint + 0.05, endPoint - 0.05, endPoint],
                    [100, 0, 0, -50]
                  )
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-4xl w-full mx-auto">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Project info */}
                    <div className="space-y-6">
                      {/* Index and category */}
                      <div className="flex items-center gap-4">
                        <span className="text-5xl md:text-7xl font-bold text-primary/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 px-3 py-1">
                          {project.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      {/* Links */}
                      <div className="flex gap-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:bg-accent transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 border border-border font-bold uppercase tracking-wider text-sm text-foreground hover:border-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      </div>
                    </div>

                    {/* Right: Metrics and tech */}
                    <div className="space-y-6">
                      {/* Metrics cards */}
                      <div className="grid gap-4">
                        {project.metrics.map((metric, metricIndex) => (
                          <motion.div
                            key={metric}
                            style={{
                              opacity: useTransform(
                                scrollYProgress,
                                [startPoint + 0.03 + metricIndex * 0.02, startPoint + 0.06 + metricIndex * 0.02],
                                [0, 1]
                              ),
                              x: useTransform(
                                scrollYProgress,
                                [startPoint + 0.03 + metricIndex * 0.02, startPoint + 0.06 + metricIndex * 0.02],
                                [50, 0]
                              )
                            }}
                            className="p-4 bg-card border border-border flex items-center gap-4"
                          >
                            <span className="text-2xl md:text-3xl font-bold text-primary">
                              {metric.split(' ')[0]}
                            </span>
                            <span className="text-sm text-muted-foreground uppercase tracking-wider">
                              {metric.split(' ').slice(1).join(' ')}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-2">
            {projectsData.map((_, index) => {
              const startPoint = 0.15 + index * projectSection;
              const endPoint = startPoint + projectSection;
              
              return (
                <motion.div
                  key={index}
                  className="w-8 h-1 bg-border overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-primary"
                    style={{
                      width: useTransform(
                        scrollYProgress,
                        [startPoint, endPoint],
                        ["0%", "100%"]
                      )
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
