
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
      className="py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-orange-100/30 to-amber-100/30 dark:from-orange-900/20 dark:to-amber-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-l from-amber-100/30 to-orange-100/30 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-orange-900/60 dark:to-amber-900/60 text-orange-800 dark:text-orange-200 border border-orange-200/50 dark:border-orange-700/50">
              Technical Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 font-playfair text-gray-900 dark:text-white tracking-tight"
          >
            Skills & Technologies
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed"
          >
            Specialized in machine learning, data science, and engineering with expertise across multiple domains
          </motion.p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: catIndex * 0.15,
                ease: "easeOut"
              }}
              className="group relative"
            >
              {/* Enhanced card with better shadows and gradients */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 h-full transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:bg-white/90 dark:hover:bg-gray-800/90">
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <div className="text-white">
                      {category.name === "Programming" && <Code className="w-6 h-6" />}
                      {category.name === "DevOps & Deployment" && <Server className="w-6 h-6" />}
                      {category.name === "AI & Machine Learning" && <Brain className="w-6 h-6" />}
                      {category.name === "Frontend & Architecture" && <Globe className="w-6 h-6" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-playfair">{category.name}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: catIndex * 0.15 + skillIndex * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      className="group/skill flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl hover:from-orange-50/80 hover:to-amber-50/80 dark:hover:from-orange-900/30 dark:hover:to-amber-900/30 transition-all duration-300 cursor-pointer border border-gray-200/30 dark:border-gray-600/30 hover:border-orange-300/50 dark:hover:border-orange-600/50"
                    >
                      <div className="text-orange-600 dark:text-orange-400 mb-3 group-hover/skill:text-orange-700 dark:group-hover/skill:text-orange-300 transition-colors duration-300 group-hover/skill:scale-110 transform">
                        {skill.icon}
                      </div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center font-inter leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
