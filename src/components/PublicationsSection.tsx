
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { ExternalLink, Eye, Download } from "lucide-react";

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
        
        <div className="max-w-4xl mx-auto">
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
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Research Publication - Top Ten Downloaded</h3>
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
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border-l-4 border-amber-500 mb-6">
                <blockquote className="text-gray-600 dark:text-gray-300 italic">
                  "A comprehensive analysis with significant implications for pension reform policy."
                </blockquote>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1 text-amber-500" />
                    <span>147+ abstract views</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1 text-amber-500" />
                    <span>33+ downloads</span>
                  </div>
                </div>
                
                <a 
                  href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5088591#:~:text=The%20results%20reveal%20that%20although,fiscal%20risks%20on%20the%20government."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>View paper</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
