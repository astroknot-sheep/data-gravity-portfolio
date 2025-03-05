
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const skills = [
    "Machine Learning", "Statistical Analysis", "Data Engineering", 
    "Python", "SQL", "AWS", "Deep Learning", "NLP", 
    "Time Series Analysis", "Computer Vision"
  ];
  
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gray-50 dark:bg-gray-900 rounded-bl-[100px] -z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={ref}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-6 font-intro text-gray-800 dark:text-amber-300"
            >
              About Me
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-gray-600 dark:text-gray-300"
            >
              <p>
                I'm a data scientist and machine learning engineer with expertise in building end-to-end ML systems and developing solutions for complex business problems.
              </p>
              <p>
                My approach combines statistical rigor with practical engineering to create scalable, production-ready ML applications that deliver measurable business impact.
              </p>
              <p>
                With a background in operations research and deep learning, I specialize in transforming raw data into actionable insights and automated decision systems.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-300 dark:from-amber-900/30 dark:to-amber-700/30 p-1">
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-800/50 dark:to-gray-700/50 p-1">
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-800/50 dark:to-gray-700/50 p-1">
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-300 dark:from-amber-900/30 dark:to-amber-700/30 p-1">
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-300 to-amber-600 dark:from-amber-700 dark:to-amber-900 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 rounded-full -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
