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
        {/* Header - left aligned, simpler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16 max-w-xl"
        >
          <span className="text-xs font-medium text-primary mb-4 block tracking-wide">
            What I work with
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tools & Technologies
          </h2>
          <p className="text-muted-foreground">
            The stack I use to turn ideas into working systems.
          </p>
        </motion.div>

        {/* Skills - simple grid, no bento complexity */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="h-full p-6 border border-border rounded-lg hover:border-primary/30 transition-colors bg-card/50">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-muted/50 rounded-md text-muted-foreground"
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
