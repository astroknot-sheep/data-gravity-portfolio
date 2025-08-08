
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { Beaker, Database, Search, Network, BookOpen, Briefcase } from "lucide-react";

export default function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const experienceData = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Engineer - Data Science and ML",
      company: "Probe42",
      location: "India",
      period: "Current",
      description: "Leading data science and machine learning initiatives, developing advanced ML models and data-driven solutions. Working on cutting-edge AI projects, implementing scalable data pipelines, and driving innovation in artificial intelligence applications."
    },
    {
      icon: <Beaker className="w-6 h-6" />,
      title: "Research Intern, LaRGo - Large Language Models Research Group",
      location: "Kolkata, India",
      period: "Feb 2024 – Present",
      description: "Advanced AI Research Team under Professor Kripa Bandhu Ghosh. Developing innovative AI solutions for psychiatry and psychotherapy using large language models (LLMs). Implementing state-of-the-art neural networks and transformer architectures. Co-authoring research papers for submission to top AI conferences (NeurIPS, ICML, ICLR)."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Winter Intern, MOON Lab, IISER Bhopal",
      location: "Bhopal, India",
      period: "Dec 2023 – Present",
      description: "Large Language Models and Retrieval-Augmented Generation (RAG). Researching RAG architecture optimization and embedding model implementation. Developing expertise in vector databases and semantic search technologies."
    }
  ];
  
  return (
    <section
      id="experience"
      className="py-32 bg-gradient-to-br from-gray-50 via-orange-50/40 to-amber-50/30 dark:from-gray-900 dark:via-gray-800/60 dark:to-gray-700/40 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-data-grid bg-[length:80px_80px] opacity-20 dark:opacity-10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-orange-300/20 to-amber-300/20 dark:from-orange-700/20 dark:to-amber-700/20 rounded-full blur-3xl animate-float-gentle"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="type-h2 font-bold mb-6 font-intro text-gradient"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-league font-medium"
          >
            My professional journey in AI, data science, and research
          </motion.p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-12 pb-16 last:pb-0"
            >
              {/* Enhanced timeline line */}
              {index < experienceData.length - 1 && (
                <div className="absolute left-6 top-6 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-amber-400 to-orange-500 dark:from-orange-500 dark:via-amber-500 dark:to-orange-600 z-0 shadow-lg"></div>
              )}
              
              {/* Enhanced timeline dot */}
              <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 flex items-center justify-center z-10 shadow-2xl enhanced-glow">
                <div className="text-white dark:text-gray-900">
                  {experience.icon}
                </div>
              </div>
              
              {/* Enhanced content card */}
              <div className="enhanced-glassmorphism p-8 enhanced-glow border-gradient">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-orange-300 font-intro mb-2">{experience.title}</h3>
                    {experience.company && (
                      <p className="text-lg text-orange-600 dark:text-orange-400 font-league font-bold mb-1">{experience.company}</p>
                    )}
                    <p className="text-base text-gray-600 dark:text-gray-400 font-league font-semibold">{experience.location}</p>
                  </div>
                  <div className="text-sm font-bold bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 dark:from-orange-900/60 dark:to-amber-900/60 dark:text-orange-400 px-4 py-2 rounded-full mt-3 lg:mt-0 font-league shadow-lg">
                    {experience.period}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-league leading-relaxed text-base">
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
