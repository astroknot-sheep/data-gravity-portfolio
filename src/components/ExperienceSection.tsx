
import { useInView } from "@/lib/animations";
import { useScrollReveal } from "@/lib/magnetic";
import { motion } from "framer-motion";
import { Beaker, Database, Search, Network, BookOpen, Briefcase, Sparkles, Zap } from "lucide-react";

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
      className="py-40 bg-gradient-to-br from-gray-50 via-orange-50/50 to-amber-50/40 dark:from-gray-900 dark:via-gray-800/70 dark:to-gray-700/50 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-data-grid bg-[length:100px_100px] opacity-25 dark:opacity-15"></div>
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-gradient-to-bl from-orange-300/30 to-amber-300/30 dark:from-orange-700/30 dark:to-amber-700/30 rounded-full blur-3xl animate-float-gentle"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-amber-300/25 to-orange-300/25 dark:from-amber-700/25 dark:to-orange-700/25 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium bg-gradient-to-r from-orange-100/90 to-amber-100/90 dark:from-orange-900/70 dark:to-amber-900/70 text-orange-800 dark:text-orange-200 border-2 border-orange-200/60 dark:border-orange-700/60 font-league shadow-xl">
              <Zap className="w-5 h-5 mr-2 animate-pulse-glow" />
              Career Journey
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="type-h2 font-bold mb-8 font-intro text-gradient"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-league font-medium"
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
                <div className="absolute left-7 top-8 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 via-amber-400 to-orange-500 dark:from-orange-500 dark:via-amber-500 dark:to-orange-600 z-0 shadow-2xl"></div>
              )}
              
              {/* Enhanced timeline dot */}
              <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 flex items-center justify-center z-10 shadow-2xl enhanced-glow animate-pulse-glow">
                <div className="text-white dark:text-gray-900">
                  {experience.icon}
                </div>
              </div>
              
              {/* Enhanced content card */}
              <div className="enhanced-glassmorphism p-10 enhanced-glow border-gradient shadow-2xl hover:shadow-3xl transition-all duration-700 card-tilt shimmer-overlay overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-7">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-orange-300 font-intro mb-3">{experience.title}</h3>
                    {experience.company && (
                      <p className="text-xl text-orange-600 dark:text-orange-400 font-league font-bold mb-2">{experience.company}</p>
                    )}
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-league font-semibold">{experience.location}</p>
                  </div>
                  <div className="text-base font-bold bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 dark:from-orange-900/70 dark:to-amber-900/70 dark:text-orange-400 px-5 py-3 rounded-2xl mt-4 lg:mt-0 font-league shadow-2xl">
                    {experience.period}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-league leading-relaxed text-lg">
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
