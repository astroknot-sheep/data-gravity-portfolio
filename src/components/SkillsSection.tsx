
import { useState, useRef } from "react";
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { 
  Code, Database, Coffee, Terminal, FileCode, 
  Server, Cloud, GitCompare, Timer, Cpu, 
  Archive, Brain, Edit, Globe, HardDrive, Network
} from "lucide-react";

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    icon: JSX.Element;
  }[];
}

export default function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const getSkillIcon = (skill: string) => {
    switch (skill.toLowerCase()) {
      case "python": return <Code className="w-8 h-8" />;
      case "sql": return <Database className="w-8 h-8" />;
      case "java": return <Coffee className="w-8 h-8" />;
      case "r": return <FileCode className="w-8 h-8" />;
      case "shell scripting": return <Terminal className="w-8 h-8" />;
      case "docker": return <Server className="w-8 h-8" />;
      case "aws": return <Cloud className="w-8 h-8" />;
      case "ci/cd": return <GitCompare className="w-8 h-8" />;
      case "airflow": return <Timer className="w-8 h-8" />;
      case "fastapi": return <Cpu className="w-8 h-8" />;
      case "vector stores": return <Archive className="w-8 h-8" />;
      case "llms": return <Brain className="w-8 h-8" />;
      case "prompt engineering": return <Edit className="w-8 h-8" />;
      case "react": return <Globe className="w-8 h-8" />;
      case "docker compose": return <HardDrive className="w-8 h-8" />;
      case "microservices": return <Network className="w-8 h-8" />;
      default: return <Code className="w-8 h-8" />;
    }
  };

  const skillsData: SkillCategory[] = [
    {
      name: "Programming",
      skills: [
        { name: "Python", icon: getSkillIcon("python") },
        { name: "SQL", icon: getSkillIcon("sql") },
        { name: "Java", icon: getSkillIcon("java") },
        { name: "R", icon: getSkillIcon("r") },
        { name: "Shell Scripting", icon: getSkillIcon("shell scripting") },
      ]
    },
    {
      name: "DevOps & Deployment",
      skills: [
        { name: "Docker", icon: getSkillIcon("docker") },
        { name: "AWS", icon: getSkillIcon("aws") },
        { name: "CI/CD", icon: getSkillIcon("ci/cd") },
        { name: "Airflow", icon: getSkillIcon("airflow") },
        { name: "FastAPI", icon: getSkillIcon("fastapi") },
      ]
    },
    {
      name: "AI & Machine Learning",
      skills: [
        { name: "Vector Stores", icon: getSkillIcon("vector stores") },
        { name: "LLMs", icon: getSkillIcon("llms") },
        { name: "Prompt Engineering", icon: getSkillIcon("prompt engineering") },
      ]
    },
    {
      name: "Frontend & Architecture",
      skills: [
        { name: "React", icon: getSkillIcon("react") },
        { name: "Docker Compose", icon: getSkillIcon("docker compose") },
        { name: "Microservices", icon: getSkillIcon("microservices") },
      ]
    }
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
            className="text-4xl font-bold mb-6 font-intro text-gray-800 dark:text-orange-300"
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
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-orange-300">{category.name}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="text-orange-600 dark:text-orange-400 mb-2">
                      {skill.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
