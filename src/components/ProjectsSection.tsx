import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/lib/animations";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projectsData = [
  {
    id: 1,
    title: "LYRA",
    subtitle: "AI-Powered Mental Health Therapy Chatbot",
    technologies: ["React", "Express", "MongoDB", "Google Gemini"],
    description: "Full-stack platform with 40% faster response time. Integrated Gemini AI with Clerk auth and MongoDB persistence.",
    category: "nlp",
    link: "https://github.com/astroknot-sheep",
    stats: ["500+ conversations", "99% uptime", "87% accuracy"]
  },
  {
    id: 2,
    title: "Pension Portfolio Optimiser",
    subtitle: "Investment Strategy Engine",
    technologies: ["Python", "Pandas", "Scikit-learn", "AWS"],
    description: "Enhanced portfolios via Max Sharpe, Min Volatility, and Risk Parity strategies. Yields 12% above benchmarks.",
    category: "ml",
    link: "https://github.com/astroknot-sheep",
    stats: ["1,713 data points", "10K+ simulations", "2.16-5.04% volatility"]
  },
  {
    id: 3,
    title: "Hate Speech Detection",
    subtitle: "Multilingual Transformer System",
    technologies: ["BERT", "PyTorch", "Hugging Face"],
    description: "Fine-tuned multilingual transformer on 1.5M tweets, attaining 92% F1-score while processing 200+ tweets/second.",
    category: "nlp",
    link: "https://github.com/astroknot-sheep",
    stats: ["1.5M tweets", "92% F1", "200 tweets/sec"]
  },
  {
    id: 4,
    title: "CI/CD ML Pipeline",
    subtitle: "Automated Deployment on AWS",
    technologies: ["Docker", "GitHub Actions", "Flask", "AWS"],
    description: "End-to-end automated ML deployment pipeline with 95% less manual work via GitHub Actions-driven AWS deployments.",
    category: "mlops",
    link: "https://github.com/astroknot-sheep",
    stats: ["95% automation", "<50ms latency", "10K+ daily queries"]
  },
];

const categories = [
  { id: "all", name: "All" },
  { id: "ml", name: "Machine Learning" },
  { id: "nlp", name: "NLP" },
  { id: "mlops", name: "MLOps" },
];

export default function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = filter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blob-shape -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 blob-shape-2 translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/60 mb-4">Portfolio</p>
          <h2 className="text-background mb-6">Featured Projects</h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Explore my data science and machine learning projects showcasing end-to-end implementation
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-16 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 text-xs uppercase tracking-[0.15em] border transition-all ${
                filter === category.id 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "border-background/30 text-background/70 hover:border-background hover:text-background"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative border border-background/20 p-8 hover:border-primary transition-all duration-300 bg-background/5 backdrop-blur-sm"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Project number */}
                <span className="absolute top-4 right-4 text-5xl font-bold text-background/10" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  0{project.id}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">{project.category}</p>
                  
                  <h3 className="text-4xl text-background mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-background/60 text-sm mb-6">{project.subtitle}</p>

                  <p className="text-background/70 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.stats.map((stat) => (
                      <span key={stat} className="text-xs px-3 py-1 border border-background/20 text-background/60">
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-primary/20 text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    View Project <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Hover indicator */}
                <motion.div
                  initial={false}
                  animate={{ 
                    width: hoveredId === project.id ? "100%" : "0%",
                    opacity: hoveredId === project.id ? 1 : 0
                  }}
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
