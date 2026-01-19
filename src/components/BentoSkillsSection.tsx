import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Code, Database, Cloud, BarChart3, Cpu } from "lucide-react";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Machine Learning",
    icon: Brain,
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost"],
    size: "col-span-2 md:col-span-2 lg:col-span-2 row-span-2"
  },
  {
    title: "NLP & LLMs",
    icon: Cpu,
    skills: ["Transformers", "BERT", "Hugging Face", "LangChain"],
    size: "col-span-2 md:col-span-2 lg:col-span-2 row-span-2"
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["SQL", "MongoDB", "Spark", "Airflow"],
    size: "col-span-2 md:col-span-2 lg:col-span-2 row-span-1"
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "TypeScript", "R", "Julia"],
    size: "col-span-2 md:col-span-2 lg:col-span-2 row-span-1"
  },
  {
    title: "Cloud & MLOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "MLflow", "FastAPI"],
    size: "col-span-2 md:col-span-2 lg:col-span-2 row-span-1"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    skills: ["Pandas", "NumPy", "Matplotlib", "Plotly"],
    size: "col-span-2 md:col-span-2 lg:col-span-2 row-span-1"
  }
];

export default function BentoSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [80, 0]);

  return (
    <section ref={sectionRef} id="skills" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6">
        {/* Header - reveals on scroll */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Expertise
            </span>
            <div className="h-px flex-1 bg-border max-w-24" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground leading-[0.9]">
              Technical<br />
              <span className="text-primary">Arsenal</span>
            </h2>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Specialized in building production-grade ML systems with a focus on NLP and deep learning.
            </p>
          </div>
        </motion.div>

        {/* Grid - cards reveal staggered on scroll */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[120px]">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <ScrollSkillCard 
                key={category.title}
                category={category}
                index={index}
                Icon={Icon}
                progress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScrollSkillCard({ category, index, Icon, progress }: {
  category: typeof skillCategories[0];
  index: number;
  Icon: any;
  progress: any;
}) {
  const start = 0.15 + (index * 0.03);
  const end = start + 0.15;
  
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={category.size}
    >
      <div className="group h-full bg-card border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
        {/* Hover accent */}
        <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
        
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {category.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
