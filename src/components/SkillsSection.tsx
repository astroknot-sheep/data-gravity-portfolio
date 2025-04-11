
import { useState, useRef } from "react";
import { useInView } from "@/lib/animations";
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
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const skillsData: Skill[] = [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", proficiency: 95 },
        { name: "SQL", proficiency: 85 },
        { name: "Java", proficiency: 70 },
        { name: "R", proficiency: 75 },
        { name: "Shell Scripting", proficiency: 65 },
      ],
    },
    {
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
    {
      category: "Data Engineering",
      items: [
        { name: "Data Pipelines", proficiency: 85 },
        { name: "ETL Processes", proficiency: 80 },
        { name: "Data Warehousing", proficiency: 75 },
        { name: "Data Cleaning", proficiency: 90 },
      ],
    },
    {
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
                className={`relative px-4 py-2 rounded-full text-sm md:text-base whitespace-nowrap transition-all duration-300 ${
                  activeCategory === idx 
                    ? "text-gray-800 dark:text-amber-300 font-medium" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-amber-300"
                }`}
              >
                {skill.category}
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
            className="grid gap-6 md:grid-cols-2"
          >
            {skillsData[activeCategory].items.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800 dark:text-white">{skill.name}</h3>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
