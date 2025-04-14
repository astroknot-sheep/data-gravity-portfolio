
import { useState, useRef } from "react";
import { useInView } from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const projectsData = [
  {
    title: "End-to-End ML System with CI/CD",
    technologies: ["MLOps", "Python", "Docker", "AWS", "CI/CD"],
    description: [
      "Built production-ready ML pipeline reducing inference time by 40%",
      "Achieved 99.9% uptime with Docker and AWS CloudWatch",
      "Reduced operational costs by 35% through resource optimization",
    ],
    category: "mlops",
    link: "https://github.com/dhrimandeka/ml-cicd-pipeline",
  },
  {
    title: "Real-Time Flight Price Prediction",
    technologies: ["LSTM", "Airflow", "FastAPI", "AWS"],
    description: [
      "Developed LSTM models with 88% prediction accuracy and <100ms latency",
      "Engineered FastAPI service handling 1000+ concurrent requests",
      "Designed Airflow DAGs for daily data collection from 15+ sources",
    ],
    category: "ml",
    link: "https://github.com/dhrimandeka/flight-price-prediction",
  },
  {
    title: "Conversational Q&A Chatbot",
    technologies: ["LangChain", "Vector Stores", "LLMs", "Prompt Engineering"],
    description: [
      "Achieved 92% user satisfaction with 50ms response time",
      "Integrated RAG architecture for efficient document retrieval",
      "Improved answer accuracy by 45% with prompt templates",
    ],
    category: "nlp",
    link: "https://github.com/dhrimandeka/conversational-qa-system",
  },
  {
    title: "Resume ATS System",
    technologies: ["Computer Vision", "LLMs", "FastAPI", "React"],
    description: [
      "Processed 1000+ resumes/hour with 95% data extraction accuracy",
      "Reduced manual review time by 80%",
      "Built React dashboard reducing HR time-to-decision by 35%",
    ],
    category: "nlp",
    link: "https://github.com/dhrimandeka/resume-ats-system",
  },
  {
    title: "News Aggregation System",
    technologies: ["Transformers", "Docker Compose", "Microservices"],
    description: [
      "Processed 10,000+ daily articles with 96% classification accuracy",
      "Reduced processing time by 85% using microservices",
      "Ensured zero-downtime deployment",
    ],
    category: "ml",
    link: "https://github.com/dhrimandeka/news-aggregation-system",
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
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-12" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 font-intro text-amber-400"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Explore my data science and machine learning projects showcasing end-to-end implementation
          </motion.p>
        </div>
        
        {/* Project filter tabs with red-tinged amber active state */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 px-4">
          <div className="inline-flex rounded-full p-1 bg-gray-800/80 backdrop-blur-sm border border-gray-700">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category.id 
                    ? "text-gray-900" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {filter === category.id && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-500 rounded-full -z-10"
                    transition={{ type: "spring", duration: 0.6 }}
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
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              View More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
