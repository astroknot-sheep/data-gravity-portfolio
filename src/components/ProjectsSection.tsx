import { useState } from "react";
import { useInView } from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles } from "lucide-react";

const projectsData = [
  { title: "LYRA - AI Mental Health Chatbot", technologies: ["React", "Express", "MongoDB", "GenAI"], description: ["40% faster response vs traditional chatbots", "Google Gemini AI with Clerk auth"], category: "nlp", link: "https://github.com/astroknot-sheep" },
  { title: "Flight Price Prediction", technologies: ["Python", "Scikit-learn", "Pandas"], description: ["94.2% accuracy across 10,000+ data points", "37% error reduction"], category: "ml", link: "https://github.com/astroknot-sheep" },
  { title: "CI/CD ML Pipeline on AWS", technologies: ["Docker", "GitHub Actions", "Flask"], description: ["95% less manual work", "Dockerized with GitHub Actions"], category: "mlops", link: "https://github.com/astroknot-sheep" },
];

const categories = [
  { id: "all", name: "All" },
  { id: "ml", name: "ML" },
  { id: "nlp", name: "NLP" },
  { id: "mlops", name: "MLOps" },
];

export default function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [filter, setFilter] = useState("all");
  
  const filteredProjects = filter === "all" ? projectsData : projectsData.filter(p => p.category === filter);
  
  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 geometric-grid opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="type-h2 font-black mb-6 uppercase"
          >
            Featured Projects
          </motion.h2>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted border-5 border-black dark:border-white rounded-sm p-2 shadow-brutal">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 font-black uppercase quick-transition ${
                  filter === category.id ? "bg-primary text-primary-foreground border-3 border-black dark:border-white rounded-sm shadow-brutal-sm" : ""
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
              <ProjectCard {...project} index={index} isInView={isInView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
