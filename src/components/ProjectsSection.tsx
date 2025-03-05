
import { useRef, useState } from "react";
import { useInView } from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

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
    image: "https://images.unsplash.com/photo-1581092921461-7d6ed78ca205?q=80&w=2070&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1677442135196-8ea11d5efe7e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Resume ATS System",
    technologies: ["Computer Vision", "LLMs", "FastAPI", "React"],
    description: [
      "Processed 1000+ resumes/hour with 95% data extraction accuracy",
      "Reduced manual review time by 80%",
      "Built React dashboard reducing HR time-to-decision by 35%",
    ],
    category: "ml",
    image: "https://images.unsplash.com/photo-1664575196044-195f135295df?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "News Aggregation System",
    technologies: ["Transformers", "Docker Compose", "Microservices"],
    description: [
      "Processed 10,000+ daily articles with 96% classification accuracy",
      "Reduced processing time by 85% using microservices",
      "Ensured zero-downtime deployment",
    ],
    category: "nlp",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2069&auto=format&fit=crop"
  },
];

export default function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Define project categories for filtering
  const categories = [
    { id: "all", name: "All Projects" },
    { id: "ml", name: "Machine Learning" },
    { id: "nlp", name: "NLP" },
    { id: "mlops", name: "MLOps" },
  ];
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  
  return (
    <section
      id="projects"
      className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <span className="inline-block px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-300 mb-3">Portfolio</span>
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Explore my data science and machine learning projects showcasing end-to-end implementation
            </p>
          </div>
        </div>
        
        {/* Project filtering tabs */}
        <div className="flex justify-center mb-10">
          <Tabs 
            defaultValue="all" 
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-4">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Masonry style project grid with animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index} 
              className="h-auto"
              variants={itemVariants}
            >
              <ProjectCard
                title={project.title}
                technologies={project.technologies}
                description={project.description}
                image={project.image}
                index={index}
                isInView={isInView}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <div className={`mt-16 text-center transition-all duration-700 delay-300 ${
          isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
        }`}>
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Discuss a project</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
