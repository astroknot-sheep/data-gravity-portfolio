import { useState } from "react";
import { useInView } from "@/lib/animations";
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
      case "python": return <Code className="w-6 h-6" />;
      case "sql": return <Database className="w-6 h-6" />;
      case "java": return <Coffee className="w-6 h-6" />;
      case "r": return <FileCode className="w-6 h-6" />;
      case "shell scripting": return <Terminal className="w-6 h-6" />;
      case "docker": return <Server className="w-6 h-6" />;
      case "aws": return <Cloud className="w-6 h-6" />;
      case "ci/cd": return <GitCompare className="w-6 h-6" />;
      case "airflow": return <Timer className="w-6 h-6" />;
      case "fastapi": return <Cpu className="w-6 h-6" />;
      case "vector stores": return <Archive className="w-6 h-6" />;
      case "llms": return <Brain className="w-6 h-6" />;
      case "prompt engineering": return <Edit className="w-6 h-6" />;
      case "react": return <Globe className="w-6 h-6" />;
      case "docker compose": return <HardDrive className="w-6 h-6" />;
      case "microservices": return <Network className="w-6 h-6" />;
      default: return <Code className="w-6 h-6" />;
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
      className="py-32 overflow-hidden bg-muted relative"
    >
      {/* Geometric background */}
      <div className="absolute inset-0 geometric-grid opacity-10"></div>
      
      {/* Angular decorative elements */}
      <div className="absolute top-40 right-40 w-48 h-48 bg-primary border-6 border-black dark:border-white angular-shape"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary border-6 border-black dark:border-white"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 bg-accent border-5 border-black dark:border-white rounded-sm shadow-brutal text-accent-foreground font-bold uppercase">
              <Sparkles className="w-5 h-5 mr-2" />
              Technical Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="type-h2 font-black mb-6 uppercase"
          >
            Skills & Technologies
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto font-bold"
          >
            Specialized in machine learning, data science, and engineering
          </motion.p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.3, 
                delay: catIndex * 0.1
              }}
              className="neobrutalist-card p-8 h-full quick-transition hover:shadow-brutal-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary border-3 border-black dark:border-white rounded-sm flex items-center justify-center mr-4">
                  <div className="text-primary-foreground">
                    {category.name === "Programming" && <Code className="w-6 h-6" />}
                    {category.name === "DevOps & Deployment" && <Server className="w-6 h-6" />}
                    {category.name === "AI & Machine Learning" && <Brain className="w-6 h-6" />}
                    {category.name === "Frontend & Architecture" && <Globe className="w-6 h-6" />}
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase">{category.name}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.2, 
                      delay: catIndex * 0.1 + skillIndex * 0.05
                    }}
                    className="flex items-center p-3 bg-background border-3 border-black dark:border-white rounded-sm cursor-pointer quick-transition hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    <div className="text-primary mr-3">
                      {skill.icon}
                    </div>
                    <span className="text-sm font-bold uppercase">
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
