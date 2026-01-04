import { motion } from "framer-motion";
import { useInView } from "@/lib/animations";

interface SkillCategory {
  name: string;
  skills: string[];
}

export default function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const skillsData: SkillCategory[] = [
    {
      name: "Programming",
      skills: ["Python (Advanced)", "SQL (Proficient)", "Shell Scripting"]
    },
    {
      name: "ML & Data",
      skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Hugging Face"]
    },
    {
      name: "ML Expertise",
      skills: ["NLP", "Transformers", "CNNs", "RNNs/LSTMs", "Time Series", "Model Deployment"]
    },
    {
      name: "Tools & Cloud",
      skills: ["Docker", "AWS (S3, EC2, SageMaker)", "MLflow", "FastAPI", "Flask", "Streamlit", "Git", "Kubernetes"]
    }
  ];

  return (
    <section id="skills" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 blob-shape translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-200/50 blob-shape-2 -translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Expertise</p>
          <h2 className="text-foreground mb-6">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized in machine learning, data science, and engineering with expertise across multiple domains
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="border border-border bg-background p-8 hover:border-primary transition-all hover-lift group"
            >
              <h3 className="text-2xl mb-6 text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    className="text-muted-foreground text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Marquee of technologies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 overflow-hidden border-y border-border py-6"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 mr-12">
                {["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "FastAPI", "Pandas", "Scikit-learn", "NLP", "Transformers", "MLflow", "PostgreSQL"].map((tech) => (
                  <span key={`${tech}-${i}`} className="text-4xl md:text-5xl text-muted-foreground/30 font-bold tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
