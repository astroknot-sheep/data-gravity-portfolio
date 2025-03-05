
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";

export default function PublicationsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };
  
  return (
    <section
      id="publications"
      className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAyNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi02aDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 dark:opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 font-intro text-gray-800 dark:text-amber-300"
          >
            Publications & Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Academic contributions and professional recognition in the field of data science
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-full"
          >
            <div className="p-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Research Publication</h3>
                <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-1 rounded-full text-xs font-medium">
                  SSRN
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Co-authored "Comparative Analysis of NPS & UPS from an Employee Perspective and Evaluation of Fiscal Implications of Pension Reforms"
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs py-1 px-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                  Political Methods eJournal
                </span>
                <span className="text-xs py-1 px-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                  Economic Research
                </span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mt-auto">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>147+ abstract views</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <span>33+ downloads</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-full"
          >
            <div className="p-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Top Ten Publication</h3>
                <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-1 rounded-full text-xs font-medium">
                  Recognition
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ranked among Top Ten downloads in SSRN's Political Methods eJournal
              </p>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border-l-4 border-amber-500 mb-6">
                <blockquote className="text-gray-600 dark:text-gray-300 italic">
                  "A comprehensive analysis with significant implications for pension reform policy."
                </blockquote>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Cited in 3 other publications
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
