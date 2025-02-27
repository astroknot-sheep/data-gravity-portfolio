
import { useRef } from "react";
import { useInView } from "@/lib/animations";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: "End-to-End ML System with CI/CD",
    technologies: ["MLOps", "Python", "Docker", "AWS", "CI/CD"],
    description: [
      "Built production-ready ML pipeline reducing inference time by 40%",
      "Achieved 99.9% uptime with Docker and AWS CloudWatch",
      "Reduced operational costs by 35% through resource optimization",
    ],
  },
  {
    title: "Real-Time Flight Price Prediction",
    technologies: ["LSTM", "Airflow", "FastAPI", "AWS"],
    description: [
      "Developed LSTM models with 88% prediction accuracy and <100ms latency",
      "Engineered FastAPI service handling 1000+ concurrent requests",
      "Designed Airflow DAGs for daily data collection from 15+ sources",
    ],
  },
  {
    title: "Conversational Q&A Chatbot",
    technologies: ["LangChain", "Vector Stores", "LLMs", "Prompt Engineering"],
    description: [
      "Achieved 92% user satisfaction with 50ms response time",
      "Integrated RAG architecture for efficient document retrieval",
      "Improved answer accuracy by 45% with prompt templates",
    ],
  },
  {
    title: "Resume ATS System",
    technologies: ["Computer Vision", "LLMs", "FastAPI", "React"],
    description: [
      "Processed 1000+ resumes/hour with 95% data extraction accuracy",
      "Reduced manual review time by 80%",
      "Built React dashboard reducing HR time-to-decision by 35%",
    ],
  },
  {
    title: "News Aggregation System",
    technologies: ["Transformers", "Docker Compose", "Microservices"],
    description: [
      "Processed 10,000+ daily articles with 96% classification accuracy",
      "Reduced processing time by 85% using microservices",
      "Ensured zero-downtime deployment",
    ],
  },
];

export default function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-100/20 dark:bg-amber-900/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16" ref={ref}>
          <span className="chip mb-3">Portfolio</span>
          <h2 className={`text-4xl font-bold transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Featured Projects
          </h2>
          <p className={`mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Explore my data science and machine learning projects showcasing end-to-end implementation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div 
              key={index} 
              className="h-80 transition-all duration-500"
            >
              <ProjectCard
                title={project.title}
                technologies={project.technologies}
                description={project.description}
                index={index}
                isInView={isInView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
