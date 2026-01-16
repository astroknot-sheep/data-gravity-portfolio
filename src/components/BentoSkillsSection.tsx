import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Code, Database, Brain, Cloud, Layers, Zap 
} from "lucide-react";
import { useRef } from "react";
import TiltCard from "./TiltCard";

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    skills: ["Python (Advanced)", "SQL (Proficient)", "Shell Scripting"],
  },
  {
    title: "ML & Data Libraries",
    icon: Layers,
    skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Hugging Face"],
  },
  {
    title: "ML Expertise",
    icon: Brain,
    skills: ["NLP & Transformers", "CNNs/RNNs/LSTMs", "Time Series Forecasting", "Model Deployment"],
  },
  {
    title: "Tools & Cloud",
    icon: Cloud,
    skills: ["Docker", "AWS (S3, EC2, SageMaker)", "MLflow", "FastAPI", "Git", "Kubernetes"],
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["ML Pipelines", "PostgreSQL", "Data Visualization", "A/B Testing"],
  },
  {
    title: "Core Competencies",
    icon: Zap,
    skills: ["Feature Engineering", "Statistical Modeling", "EDA", "Regression/Classification"],
  }
];

export default function BentoSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header with parallax */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
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

        {/* Skills grid with stagger and tilt */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.6, 0.01, -0.05, 0.95]
                }}
              >
                <TiltCard className="h-full" glare>
                  <div className="h-full p-6 border border-border rounded-lg bg-card/50 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]">
                    <motion.div 
                      className="flex items-center gap-3 mb-5"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-5 h-5 text-primary" />
                      </motion.div>
                      <h3 className="font-semibold text-foreground">
                        {category.title}
                      </h3>
                    </motion.div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + skillIndex * 0.05 }}
                          whileHover={{ 
                            scale: 1.05, 
                            backgroundColor: "hsl(var(--primary) / 0.15)",
                            color: "hsl(var(--primary))"
                          }}
                          className="px-3 py-1.5 text-sm bg-muted/50 rounded-md text-muted-foreground transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
