
import { useInView } from "@/lib/animations";
import { useCardTilt3D } from "@/lib/magnetic";
import { motion } from "framer-motion";
import { FileText, Eye, Download, ExternalLink, Award, Sparkles } from "lucide-react";

export default function PublicationsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const cardTiltRef = useCardTilt3D();
  
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
      className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAyNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi02aDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-15 dark:opacity-10"></div>
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-300/20 to-amber-300/20 dark:from-orange-700/20 dark:to-amber-700/20 rounded-full blur-3xl animate-float-gentle"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium bg-gradient-to-r from-orange-100/90 to-amber-100/90 dark:from-orange-900/70 dark:to-amber-900/70 text-orange-800 dark:text-orange-200 border-2 border-orange-200/60 dark:border-orange-700/60 font-league shadow-xl">
              <Award className="w-5 h-5 mr-2 animate-pulse-glow" />
              Research & Publications
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="type-h2 font-bold mb-6 font-intro text-gray-800 dark:text-amber-300"
          >
            Publications & Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-league"
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
            className="bg-gray-900/90 rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-700/50 flex flex-col card-tilt shimmer-overlay hover:shadow-3xl transition-all duration-700"
            ref={cardTiltRef as any}
          >
            <div className="p-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <div className="p-10 flex-grow">
              <div className="flex items-start gap-6">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-5 rounded-2xl shadow-xl">
                  <FileText className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white font-intro">
                      "Comparative Analysis of NPS & UPS from an Employee Perspective and Evaluation of Fiscal Implications of Pension Reforms"
                    </h3>
                    <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-medium font-league shadow-lg">
                      Top Ten Ranked
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 font-league text-lg">
                    Co-authored a top-ten ranked paper in SSRN's Political Methods eJournal, with 147+ abstract views and 33+ downloads. A comprehensive analysis with significant implications for pension reform policy.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="text-sm py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 font-league font-semibold">
                      Political Methods eJournal
                    </span>
                    <span className="text-sm py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 font-league font-semibold">
                      Economic Research
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-base text-gray-500 dark:text-gray-400 font-league">
                      <div className="flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-amber-500" />
                        <span>147+ views</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="w-5 h-5 mr-2 text-amber-500" />
                        <span>33+ downloads</span>
                      </div>
                    </div>
                    
                    <a 
                      href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5088591" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors font-medium font-league text-lg enhanced-link px-4 py-2 rounded-xl"
                    >
                      View Publication <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
