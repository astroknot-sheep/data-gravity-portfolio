
import { useState, useRef } from "react";
import { useInView } from "@/lib/animations";
import { useScrollReveal } from "@/lib/magnetic";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles } from "lucide-react";

const projectsData = [
  {
    title: "LYRA - AI-Powered Mental Health Therapy Chatbot",
    technologies: ["React", "Express", "MongoDB", "GenAI"],
    description: [
      "Full-stack platform with 40% faster response time vs traditional chatbots",
      "Google Gemini AI integration with Clerk auth and MongoDB persistence",
    ],
    category: "nlp",
    link: "https://github.com/astroknot-sheep",
  },
  {
    title: "Flight Price Prediction System",
    technologies: ["Python", "Scikit-learn", "Pandas"],
    description: [
      "94.2% accuracy across 10,000+ data points with optimized feature engineering",
      "37% prediction error reduction through advanced preprocessing techniques",
    ],
    category: "ml",
    link: "https://github.com/astroknot-sheep",
  },
  {
    title: "CI/CD ML Pipeline on AWS",
    technologies: ["Docker", "GitHub Actions", "Flask", "AWS"],
    description: [
      "End-to-end automated ML deployment pipeline with 95% less manual work",
      "Dockerized Flask application with GitHub Actions-driven AWS deployments",
    ],
    category: "mlops",
    link: "https://github.com/astroknot-sheep",
  },
  {
    title: "Real-Time Flight Price Prediction",
    technologies: ["LSTM", "Airflow", "FastAPI", "AWS"],
    description: [
      "Developed LSTM models with 88% prediction accuracy and <100ms latency",
      "Engineered FastAPI service handling 1000+ concurrent requests",
    ],
    category: "ml",
    link: "https://github.com/astroknot-sheep",
  },
  {
    title: "Conversational Q&A Chatbot",
    technologies: ["LangChain", "Vector Stores", "LLMs", "Prompt Engineering"],
    description: [
      "Achieved 92% user satisfaction with 50ms response time",
      "Integrated RAG architecture for efficient document retrieval",
    ],
    category: "nlp",
    link: "https://github.com/astroknot-sheep",
  },
];

// Filter categories
const categories = [
  { id: "all", name: "All Projects" },
  { id: "ml", name: "Machine Learning" },
  { id: "nlp", name: "NLP" },
  { id: "mlops", name: "MLOps" },
];

export default function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [filter, setFilter] = useState("all");
  
  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  return (
    <section
      id="projects"
      className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-data-grid bg-[length:120px_120px] opacity-10"></div>
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-orange-300/20 to-amber-300/20 dark:from-orange-700/15 dark:to-amber-700/15 rounded-full blur-3xl animate-float-gentle"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium bg-gradient-to-r from-orange-100/90 to-amber-100/90 dark:from-orange-900/70 dark:to-amber-900/70 text-orange-800 dark:text-orange-200 border-2 border-orange-200/60 dark:border-orange-700/60 font-league shadow-xl">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse-glow" />
              Portfolio
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="type-h2 font-bold mb-6 font-intro text-amber-300"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-300 max-w-3xl mx-auto font-league"
          >
            Explore my data science and machine learning projects showcasing end-to-end implementation
          </motion.p>
        </div>
        
        {/* Project filter tabs with enhanced dark gradient */}
        <div className="flex justify-center mb-16 overflow-x-auto pb-2 px-4">
          <div className="inline-flex rounded-2xl p-1.5 bg-gray-800/90 backdrop-blur-xl border-2 border-gray-700/60 shadow-2xl">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`relative px-8 py-3.5 rounded-xl text-base font-medium transition-all ${
                  filter === category.id 
                    ? "text-white" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {filter === category.id && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 rounded-xl -z-10 shadow-2xl"
                    transition={{ type: "spring", duration: 0.7 }}
                  />
                )}
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-20"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-80"
            >
              <ProjectCard
                title={project.title}
                technologies={project.technologies}
                description={project.description}
                index={index}
                isInView={isInView}
                link={project.link}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
          </div>
        )}
        
        {filter === "all" && filteredProjects.length >= 5 && (
          <div className="mt-16 text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-2 border-orange-500/50 text-orange-300 hover:bg-orange-500/15 hover:text-orange-200 px-8 py-6 text-lg rounded-2xl font-league font-bold shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              <PlusCircle className="mr-3 h-6 w-6" />
              View More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
