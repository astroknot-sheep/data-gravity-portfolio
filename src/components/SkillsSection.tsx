
import { useState, useEffect, useRef } from "react";
import { useInView, useStaggeredAnimation } from "@/lib/animations";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface Skill {
  category: string;
  items: {
    name: string;
    proficiency: number;
  }[];
}

export default function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("programming");
  
  // Skill data organized by categories for tab filtering
  const skillsData: Record<string, Skill> = {
    programming: {
      category: "Programming Languages",
      items: [
        { name: "Python", proficiency: 95 },
        { name: "SQL", proficiency: 85 },
        { name: "Java", proficiency: 70 },
        { name: "R", proficiency: 75 },
        { name: "Shell Scripting", proficiency: 65 },
      ],
    },
    ml: {
      category: "ML & Data Science",
      items: [
        { name: "Regression", proficiency: 90 },
        { name: "Classification", proficiency: 85 },
        { name: "NLP", proficiency: 80 },
        { name: "Deep Learning", proficiency: 85 },
        { name: "Feature Engineering", proficiency: 90 },
        { name: "Time Series", proficiency: 75 },
      ],
    },
    data: {
      category: "Data Engineering",
      items: [
        { name: "Data Pipelines", proficiency: 85 },
        { name: "ETL Processes", proficiency: 80 },
        { name: "Data Warehousing", proficiency: 75 },
        { name: "Data Cleaning", proficiency: 90 },
      ],
    },
    tools: {
      category: "Tools & Technologies",
      items: [
        { name: "Docker", proficiency: 80 },
        { name: "AWS", proficiency: 75 },
        { name: "MLFlow", proficiency: 85 },
        { name: "Git", proficiency: 90 },
        { name: "FastAPI", proficiency: 80 },
        { name: "Tableau", proficiency: 70 },
      ],
    },
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGZpbGw9IiNlMmU4ZjAiIGN4PSIzNiIgY3k9IjE4IiByPSIxIi8+PHBhdGggZD0iTTI0LjMzIDEyYy0xNS43MyAwLTI4LjMzIDEyLjYtMjguMzMgMjguMzNzMTIuNiAyOC4zNCAyOC4zMyAyOC4zNCIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGZpbGw9IiNlMmU4ZjAiIGN4PSIyNC4zMyIgY3k9IjEyIiByPSIxIi8+PHBhdGggZD0iTTU4LjUgNDBjMC0xNS43NC0xMi42LTI4LjM0LTI4LjM0LTI4LjM0Ii8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-5 dark:opacity-1"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12" ref={ref}>
          <div className={`transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <span className="inline-block px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-300 mb-3">Expertise</span>
            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Specialized in machine learning, data science, and engineering with expertise across multiple domains
            </p>
          </div>
        </div>
        
        {/* Modern tabbed interface */}
        <Tabs 
          defaultValue="programming" 
          className="w-full" 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="programming">Programming</TabsTrigger>
              <TabsTrigger value="ml">ML & DS</TabsTrigger>
              <TabsTrigger value="data">Data Eng</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
          </div>
          
          {Object.entries(skillsData).map(([key, skillGroup]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate={activeTab === key ? "show" : "hidden"}
                variants={containerVariants}
              >
                {skillGroup.items.map((skill, i) => (
                  <motion.div 
                    key={skill.name} 
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                    variants={itemVariants}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{skill.name}</h3>
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{skill.proficiency}%</span>
                    </div>
                    <Progress value={isInView ? skill.proficiency : 0} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-gradient-to-r from-amber-500 to-amber-300" />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Core competencies overview */}
        <div className={`mt-16 text-center transition-all duration-700 delay-300 ${
          isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
        }`}>
          <h3 className="text-2xl font-bold mb-6">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Machine Learning", "Data Analysis", "Statistical Modeling", "Deep Learning", 
              "Natural Language Processing", "Time Series Analysis", "Feature Engineering", 
              "ETL Processes", "Cloud Computing", "MLOps", "Data Visualization", "Research"].map((competency) => (
              <span key={competency} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200 font-medium text-sm border border-gray-200 dark:border-gray-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-300 transition-colors duration-300">
                {competency}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
