import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Database, Cloud, BarChart3, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "Machine Learning",
    icon: Brain,
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost"]
  },
  {
    title: "NLP & LLMs",
    icon: Cpu,
    skills: ["Transformers", "BERT", "Hugging Face", "LangChain"]
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["SQL", "MongoDB", "Spark", "Airflow"]
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "TypeScript", "R", "Julia"]
  },
  {
    title: "Cloud & MLOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "MLflow", "FastAPI"]
  },
  {
    title: "Analytics",
    icon: BarChart3,
    skills: ["Pandas", "NumPy", "Matplotlib", "Plotly"]
  }
];

export default function ScrollSkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Header animations
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], [0, 1, 1, 0.3]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], [0.9, 1, 1, 0.95]);
  const headerY = useTransform(scrollYProgress, [0.3, 0.4], [0, -50]);

  // Grid reveal
  const gridOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  return (
    <div ref={containerRef} id="skills" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [0, 0.15])
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/10 to-transparent rounded-full" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header - pinned then moves up */}
          <motion.div
            style={{ 
              opacity: headerOpacity, 
              scale: headerScale,
              y: headerY
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-6"
          >
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Expertise
              </span>
            </motion.div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-foreground leading-[0.9]">
              Technical<br />
              <span className="text-primary">Arsenal</span>
            </h2>
          </motion.div>

          {/* Skills grid - fades in and spreads out */}
          <motion.div
            style={{ opacity: gridOpacity }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              const row = Math.floor(index / 3);
              const col = index % 3;
              
              // Calculate start position (center) and end position (grid)
              const startX = (col - 1) * 0; // Start at center
              const startY = 0;
              
              return (
                <motion.div
                  key={category.title}
                  style={{
                    opacity: useTransform(
                      scrollYProgress, 
                      [0.35 + index * 0.03, 0.45 + index * 0.03], 
                      [0, 1]
                    ),
                    scale: useTransform(
                      scrollYProgress,
                      [0.35 + index * 0.03, 0.45 + index * 0.03],
                      [0.8, 1]
                    ),
                    y: useTransform(
                      scrollYProgress,
                      [0.35 + index * 0.03, 0.45 + index * 0.03],
                      [50, 0]
                    )
                  }}
                  className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Hover accent */}
                  <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                  
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
                        {category.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          style={{
                            opacity: useTransform(
                              scrollYProgress,
                              [0.5 + index * 0.03 + skillIndex * 0.01, 0.55 + index * 0.03 + skillIndex * 0.01],
                              [0, 1]
                            )
                          }}
                          className="px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-medium bg-muted text-muted-foreground"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
