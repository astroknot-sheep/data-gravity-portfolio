
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { FileText, Code, Brain, Server, BookOpen } from "lucide-react";

export default function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const experienceData = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Research Publication - Political Methods eJournal",
      period: "2023 - 2024",
      description: "Co-authored a top-ten ranked paper analyzing pension reforms, recognized for comprehensive fiscal policy analysis."
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI & NLP Projects",
      period: "2023 - Present",
      description: "Developed conversational Q&A chatbots with RAG architecture and Resume ATS systems using LLMs and computer vision techniques."
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: "MLOps & Production Systems",
      period: "2022 - Present",
      description: "Built end-to-end ML system with CI/CD, achieving 99.9% uptime and 40% inference time reduction."
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Data Engineering & ML Research",
      period: "2021 - 2022",
      description: "Created real-time flight price prediction models and news aggregation systems processing thousands of articles daily."
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Technical Skill Development",
      period: "2020 - 2021",
      description: "Mastered Python, SQL, Docker, AWS and machine learning fundamentals through intensive study and practical applications."
    }
  ];
  
  return (
    <section
      id="experience"
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 font-intro text-gray-800 dark:text-amber-300"
          >
            My Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Timeline of my experience in AI research and engineering
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              {index < experienceData.length - 1 && (
                <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 z-0"></div>
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-amber-500 dark:bg-amber-400 flex items-center justify-center z-10">
                <div className="text-white dark:text-gray-900">
                  {experience.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-amber-300">{experience.title}</h3>
                  <div className="text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 px-3 py-1 rounded-full">
                    {experience.period}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {experience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
