
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const experienceData = [
    {
      title: "Research Intern, LaRGo - Large Language Models Research Group",
      company: "Advanced AI Research Team under Professor Kripa Bandhu Ghosh",
      period: "Feb 2024 - Present",
      description: "Developing innovative AI solutions for psychiatry and psychotherapy using large language models (LLMs). Implementing state-of-the-art neural networks and transformer architectures. Co-authoring research papers for submission to top AI conferences (NeurIPS, ICML, ICLR)."
    },
    {
      title: "Winter Intern, MOON Lab, IISER Bhopal",
      company: "Large Language Models and Retrieval-Augmented Generation (RAG)",
      period: "Dec 2023 - Present",
      description: "Researching RAG architecture optimization and embedding model implementation. Developing expertise in vector databases and semantic search technologies."
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
            Professional Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            My journey through the world of AI research and language models
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
                <div className="w-2 h-2 rounded-full bg-white dark:bg-gray-900"></div>
              </div>
              
              {/* Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-amber-300">{experience.title}</h3>
                  <div className="text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 px-3 py-1 rounded-full">
                    {experience.period}
                  </div>
                </div>
                <div className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {experience.company}
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
