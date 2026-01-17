import { motion } from "framer-motion";
import { 
  Code, Database, Brain, Cloud, Layers, Zap 
} from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    skills: ["Python (Advanced)", "SQL (Proficient)", "Shell Scripting"],
    size: "col-span-2 row-span-1",
  },
  {
    title: "ML & Data Libraries",
    icon: Layers,
    skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Hugging Face"],
    size: "col-span-2 row-span-2",
  },
  {
    title: "ML Expertise",
    icon: Brain,
    skills: ["NLP & Transformers", "CNNs/RNNs/LSTMs", "Time Series Forecasting", "Model Deployment"],
    size: "col-span-2 row-span-2",
  },
  {
    title: "Tools & Cloud",
    icon: Cloud,
    skills: ["Docker", "AWS (S3, EC2, SageMaker)", "MLflow", "FastAPI", "Git", "Kubernetes"],
    size: "col-span-2 row-span-1",
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["ML Pipelines", "PostgreSQL", "Data Visualization", "A/B Testing"],
    size: "col-span-2 row-span-1",
  },
  {
    title: "Core Competencies",
    icon: Zap,
    skills: ["Feature Engineering", "Statistical Modeling", "EDA", "Regression/Classification"],
    size: "col-span-2 row-span-1",
  }
];

export default function BentoSkillsSection() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-primary mb-4 block">
            Technical Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Specialized in machine learning, data science, and engineering
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[150px]">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={category.size}
              >
                <div className="h-full bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold uppercase text-sm tracking-wider text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium bg-muted border border-border rounded-full text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
