import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { FileText, Eye, Download, ExternalLink } from "lucide-react";

export default function PublicationsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section id="publications" className="py-32 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 geometric-grid opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="type-h2 font-black uppercase mb-6"
          >
            Publications
          </motion.h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="neobrutalist-card p-8"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-primary border-5 border-black dark:border-white rounded-sm flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-black uppercase mb-4">
                  Comparative Analysis of NPS & UPS from Employee Perspective
                </h3>
                
                <p className="font-semibold mb-4 leading-relaxed">
                  Top-ten ranked paper in SSRN's Political Methods eJournal with 147+ views and 33+ downloads.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 font-bold">
                    <div className="flex items-center"><Eye className="w-5 h-5 mr-2" /><span>147+ views</span></div>
                    <div className="flex items-center"><Download className="w-5 h-5 mr-2" /><span>33+ downloads</span></div>
                  </div>
                  
                  <a 
                    href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5088591" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center font-black uppercase hover:text-primary quick-transition"
                  >
                    View <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
