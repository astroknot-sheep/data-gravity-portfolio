import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Code, Database, Brain, Cloud, Terminal, 
  Cpu, GitBranch, Layers, Sparkles, Zap 
} from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    skills: ["Python (Advanced)", "SQL (Proficient)", "Shell Scripting"],
    size: "col-span-2 row-span-1",
    accent: true
  },
  {
    title: "ML & Data Libraries",
    icon: Layers,
    skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Hugging Face"],
    size: "col-span-2 row-span-2",
    accent: false
  },
  {
    title: "ML Expertise",
    icon: Brain,
    skills: ["NLP & Transformers", "CNNs/RNNs/LSTMs", "Time Series Forecasting", "Model Deployment"],
    size: "col-span-2 row-span-2",
    accent: true
  },
  {
    title: "Tools & Cloud",
    icon: Cloud,
    skills: ["Docker", "AWS (S3, EC2, SageMaker)", "MLflow", "FastAPI", "Git", "Kubernetes"],
    size: "col-span-2 row-span-1",
    accent: false
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["ML Pipelines", "PostgreSQL", "Data Visualization", "A/B Testing"],
    size: "col-span-2 row-span-1",
    accent: false
  },
  {
    title: "Core Competencies",
    icon: Zap,
    skills: ["Feature Engineering", "Statistical Modeling", "EDA", "Regression/Classification"],
    size: "col-span-2 row-span-1",
    accent: true
  }
];

export default function BentoSkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 f1-grid opacity-20" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 hud-glass hud-corners text-sm font-bold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4" />
              Technical Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-intro uppercase text-gradient-glow mb-4"
          >
            Skills & Technologies
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            Specialized in machine learning, data science, and engineering with expertise across multiple domains
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[150px]">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${category.size} group`}
              >
                <div className={`h-full bento-card hud-corners p-6 transition-all duration-500 hover:border-primary/50 relative overflow-hidden ${
                  category.accent ? 'hover:neon-glow' : ''
                }`}>
                  {/* Accent gradient for highlighted cards */}
                  {category.accent && (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      category.accent 
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-background' 
                        : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold uppercase text-sm tracking-wider text-foreground group-hover:text-gradient transition-all">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium bg-background/50 border border-border/50 rounded-full text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
