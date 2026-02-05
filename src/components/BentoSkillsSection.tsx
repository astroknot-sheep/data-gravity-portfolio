import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Code, Database, Cloud, BarChart3, Cpu } from "lucide-react";
import { useRef, useState } from "react";

const skillCategories = [
  {
    title: "Machine Learning",
    icon: Brain,
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost"],
    size: "col-span-2 row-span-2",
    accent: "from-primary/20 to-accent/10"
  },
  {
    title: "NLP & LLMs",
    icon: Cpu,
    skills: ["Transformers", "BERT", "Hugging Face", "LangChain"],
    size: "col-span-2 row-span-2",
    accent: "from-accent/20 to-primary/10"
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["SQL", "MongoDB", "Spark", "Airflow"],
    size: "col-span-2 row-span-1",
    accent: "from-primary/15 to-transparent"
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "TypeScript", "R", "Julia"],
    size: "col-span-2 row-span-1",
    accent: "from-accent/15 to-transparent"
  },
  {
    title: "Cloud & MLOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "MLflow", "FastAPI"],
    size: "col-span-2 row-span-1",
    accent: "from-primary/15 to-transparent"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    skills: ["Pandas", "NumPy", "Matplotlib", "Plotly"],
    size: "col-span-2 row-span-1",
    accent: "from-accent/15 to-transparent"
  }
];

interface SkillCardProps {
  category: typeof skillCategories[0];
  index: number;
}

function SkillCard({ category, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 20 });

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

  const Icon = category.icon;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={category.size}
    >
      <motion.div 
        className="group h-full bg-card border border-border relative overflow-hidden"
        animate={{
          borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))"
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.accent}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated border accent */}
        <motion.div 
          className="absolute top-0 left-0 w-1 bg-primary"
          initial={{ height: 0 }}
          animate={{ height: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={{ 
            translateX: isHovered ? "200%" : "-100%" 
          }}
          transition={{ duration: 0.6 }}
        />
        
        <div className="p-6 h-full flex flex-col relative z-10">
          <motion.div 
            className="flex items-center gap-3 mb-4"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--primary) / 0.2)"
              }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {category.title}
            </h3>
          </motion.div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {category.skills.map((skill, skillIndex) => (
              <motion.span
                key={skill}
                className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + skillIndex * 0.05 }}
                whileHover={{ 
                  backgroundColor: "hsl(var(--primary) / 0.2)",
                  color: "hsl(var(--primary))",
                  scale: 1.05
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BentoSkillsSection() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-6">
        {/* Header with animated reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Expertise
            </span>
            <motion.div 
              className="h-px bg-border"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="overflow-hidden">
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground leading-[0.9]"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Technical<br />
                <motion.span 
                  className="text-primary inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Arsenal
                </motion.span>
              </motion.h2>
            </div>
            <motion.p 
              className="text-muted-foreground max-w-md lg:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Specialized in building production-grade ML systems with a focus on NLP and deep learning.
            </motion.p>
          </div>
        </motion.div>

        {/* 3D Interactive Grid */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[120px]"
          style={{ perspective: "1000px" }}
        >
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
