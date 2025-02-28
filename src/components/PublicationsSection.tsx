
import { useInView } from "@/lib/animations";

export default function PublicationsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section
      id="publications"
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full border border-amber-500/40 animate-rotate-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full border-2 border-amber-500/30 animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full border-2 border-amber-500/20 animate-rotate-slow" style={{ animationDuration: '25s' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <span className="chip mb-3">Research</span>
          <h2 className={`text-4xl font-bold transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Publications & Achievements
          </h2>
          <p className={`mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Academic contributions and professional recognition in the field of data science
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="vertical-timeline">
            <div className={`timeline-item transition-all duration-700 ${
              isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
            }`}>
              <div className="timeline-dot">
                <svg 
                  className="w-4 h-4 text-amber-600 dark:text-amber-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              
              <div className="ml-8">
                <div className="glassmorphism p-6 transition-all duration-500 hover:shadow-lg interactive">
                  <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">
                    Research Publication
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Co-authored "Comparative Analysis of NPS & UPS from an Employee Perspective and Evaluation of Fiscal Implications of Pension Reforms"
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="chip">SSRN</span>
                    <span className="chip">Political Methods eJournal</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>147+ abstract views</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      <span>33+ downloads</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`timeline-item transition-all duration-700 delay-100 ${
              isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
            }`}>
              <div className="timeline-dot">
                <svg
                  className="w-4 h-4 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              
              <div className="ml-8">
                <div className="glassmorphism p-6 transition-all duration-500 hover:shadow-lg interactive">
                  <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">
                    Top Ten Publication
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Ranked among Top Ten downloads in SSRN's Political Methods eJournal
                  </p>
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <blockquote className="text-sm italic text-gray-600 dark:text-gray-300">
                      "A comprehensive analysis with significant implications for pension reform policy."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
