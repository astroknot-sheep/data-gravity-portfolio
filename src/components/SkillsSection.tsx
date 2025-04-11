
import { useState, useRef } from "react";
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  Server, 
  Terminal, 
  Braces, 
  Brain, 
  Beaker, 
  GitBranch, 
  Compass, 
  Cloud 
} from "lucide-react";

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  items: string[];
}

export default function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const skillsData: SkillCategory[] = [
    {
      category: "Programming Languages",
      icon: <Code className="w-6 h-6 text-amber-400" />,
      items: ["Python", "SQL", "Java", "R", "Shell Scripting"],
    },
    {
      category: "ML & Data Science",
      icon: <Brain className="w-6 h-6 text-amber-400" />,
      items: ["Regression", "Classification", "NLP", "Deep Learning", "Feature Engineering", "Time Series"],
    },
    {
      category: "Data Engineering",
      icon: <Database className="w-6 h-6 text-amber-400" />,
      items: ["Data Pipelines", "ETL Processes", "Data Warehousing", "Data Cleaning"],
    },
    {
      category: "Tools & Technologies",
      icon: <Server className="w-6 h-6 text-amber-400" />,
      items: ["Containers", "AWS", "MLFlow", "Git", "FastAPI", "Tableau"],
    },
  ];

  return (
    <section 
      id="skills" 
      className="py-20 overflow-hidden dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6 font-intro text-gray-800 dark:text-amber-300"
          >
            Technical Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Specialized in machine learning, data science, and engineering with expertise across multiple domains
          </motion.p>
        </div>
        
        {/* Skill category tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none" ref={containerRef}>
          <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            {skillsData.map((skill, idx) => (
              <button
                key={skill.category}
                onClick={() => setActiveCategory(idx)}
                className={`relative px-4 py-2 rounded-full text-sm md:text-base whitespace-nowrap transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === idx 
                    ? "text-gray-800 dark:text-amber-300 font-medium" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-amber-300"
                }`}
              >
                {skill.icon}
                <span>{skill.category}</span>
                {activeCategory === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Skills content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            {skillsData[activeCategory].items.map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center"
              >
                <div className="text-center">
                  {getSkillIcon(skill)}
                  <h3 className="mt-3 font-medium text-gray-800 dark:text-white">{skill}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Helper function to get appropriate icon for each skill
function getSkillIcon(skill: string) {
  switch(skill.toLowerCase()) {
    case 'python':
      return <Terminal className="w-8 h-8 mx-auto text-amber-500" />;
    case 'sql':
      return <Database className="w-8 h-8 mx-auto text-amber-500" />;
    case 'java':
      return <Code className="w-8 h-8 mx-auto text-amber-500" />;
    case 'r':
      return <Braces className="w-8 h-8 mx-auto text-amber-500" />;
    case 'shell scripting':
      return <Terminal className="w-8 h-8 mx-auto text-amber-500" />;
    case 'containers':
      return <Compass className="w-8 h-8 mx-auto text-amber-500" />;
    case 'aws':
      return <Cloud className="w-8 h-8 mx-auto text-amber-500" />;
    case 'git':
      return <GitBranch className="w-8 h-8 mx-auto text-amber-500" />;
    default:
      return <Beaker className="w-8 h-8 mx-auto text-amber-500" />;
  }
}
