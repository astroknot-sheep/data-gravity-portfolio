import { motion } from "framer-motion";
import { Brain, Code, Database, Cloud, BarChart3, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "Machine Learning",
    icon: Brain,
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost"],
    size: "col-span-2 row-span-2",
  },
  {
    title: "NLP & LLMs",
    icon: Cpu,
    skills: ["Transformers", "BERT", "Hugging Face", "LangChain"],
    size: "col-span-2 row-span-2",
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["SQL", "MongoDB", "Spark", "Airflow"],
    size: "col-span-2 row-span-1",
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "TypeScript", "R", "Julia"],
    size: "col-span-2 row-span-1",
  },
  {
    title: "Cloud & MLOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "MLflow", "FastAPI"],
    size: "col-span-2 row-span-1",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    skills: ["Pandas", "NumPy", "Matplotlib", "Plotly"],
    size: "col-span-2 row-span-1",
  },
];

export default function BentoSkillsSection() {
  return (
    <section id="skills" className="py-48 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <p className="text-sm text-muted-foreground tracking-wide mb-4">Skills</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-foreground">
              Tools I use daily
            </h2>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Production ML systems with a focus on NLP, deep learning, and scalable data pipelines.
            </p>
          </div>
        </motion.div>

        {/* Flat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[120px]">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`${category.size} bg-card border border-border p-6 flex flex-col hover:border-muted-foreground/30 transition-colors duration-150`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs bg-muted text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
