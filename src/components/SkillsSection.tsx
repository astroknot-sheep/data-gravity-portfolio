import { useState, useRef } from "react";
import { useInView } from "@/lib/animations";
import { useCardTilt3D } from "@/lib/magnetic";
import { motion } from "framer-motion";
import { 
  Code, Database, Coffee, Terminal, FileCode, 
  Server, Cloud, GitCompare, Timer, Cpu, 
  Archive, Brain, Edit, Globe, HardDrive, Network, Sparkles
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
      className="py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black relative"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-orange-100/30 to-amber-100/30 dark:from-orange-900/25 dark:to-amber-900/25 rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-l from-amber-100/30 to-orange-100/30 dark:from-amber-900/25 dark:to-orange-900/25 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute inset-0 bg-data-grid bg-[length:120px_120px] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium bg-gradient-to-r from-orange-100/90 to-amber-100/90 dark:from-orange-900/70 dark:to-amber-900/70 text-orange-800 dark:text-orange-200 border-2 border-orange-200/60 dark:border-orange-700/60 font-league shadow-xl">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse-glow" />
              Technical Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="type-h2 font-bold mb-8 font-intro text-gray-900 dark:text-white tracking-tight"
          >
            Skills & Technologies
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-league leading-relaxed"
          >
            Specialized in machine learning, data science, and engineering with expertise across multiple domains
          </motion.p>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {skillsData.map((category, catIndex) => {
            const SkillCard = () => {
              const tiltRef = useCardTilt3D();
              
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.9, 
                    delay: catIndex * 0.15,
                    ease: "easeOut"
                  }}
                  className="group relative"
                  ref={tiltRef as any}
                >
                  {/* Enhanced card with better shadows and gradients */}
                  <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border-2 border-gray-200/60 dark:border-gray-700/60 h-full transition-all duration-700 hover:shadow-3xl hover:bg-white/95 dark:hover:bg-gray-800/95 shimmer-overlay overflow-hidden card-tilt">
                    {/* Gradient border effect on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/25 to-amber-500/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl"></div>
                    
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mr-5 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <div className="text-white">
                          {category.name === "Programming" && <Code className="w-8 h-8" />}
                          {category.name === "DevOps & Deployment" && <Server className="w-8 h-8" />}
                          {category.name === "AI & Machine Learning" && <Brain className="w-8 h-8" />}
                          {category.name === "Frontend & Architecture" && <Globe className="w-8 h-8" />}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-intro">{category.name}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            duration: 0.7, 
                            delay: catIndex * 0.15 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                          whileHover={{ y: -10, scale: 1.08 }}
                          className="group/skill flex flex-col items-center justify-center p-5 bg-gradient-to-br from-gray-50/90 to-gray-100/90 dark:from-gray-700/60 dark:to-gray-800/60 rounded-2xl hover:from-orange-50/90 hover:to-amber-50/90 dark:hover:from-orange-900/40 dark:hover:to-amber-900/40 transition-all duration-500 cursor-pointer border-2 border-gray-200/40 dark:border-gray-600/40 hover:border-orange-300/60 dark:hover:border-orange-600/60 shadow-lg hover:shadow-2xl"
                        >
                          <div className="text-orange-600 dark:text-orange-400 mb-4 group-hover/skill:text-orange-700 dark:group-hover/skill:text-orange-300 transition-colors duration-500 group-hover/skill:scale-125 transform">
                            {skill.icon}
                          </div>
                          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center font-league leading-tight">
                            {skill.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            };
            
            return <SkillCard key={category.name} />;
          })}
        </div>
      </div>
    </section>
  );
}
