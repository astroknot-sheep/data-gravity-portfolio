
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const stats = [
    { value: "5+", label: "Years of Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "15+", label: "Happy Clients" },
    { value: "3", label: "Research Publications" },
  ];
  
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column with image and stats */}
          <div className={`relative transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-x-10"
          }`} ref={ref}>
            <div className="relative">
              {/* Profile image or illustration */}
              <div className="rounded-2xl overflow-hidden shadow-xl border-8 border-white dark:border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1655720843204-595700165b0c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Data scientist working" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-500/20 backdrop-blur-xl rounded-2xl z-0"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-500/10 backdrop-blur-xl rounded-full z-0"></div>
              
              {/* Stats cards */}
              <div className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center py-2">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stat.value}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column with text content */}
          <div className={`transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-x-10"
          }`}>
            <span className="inline-block px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-300 mb-3">About Me</span>
            <h2 className="text-4xl font-bold mb-6">Transforming Complex Data into Actionable Insights</h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-4">
                I'm a dedicated Data Scientist and Machine Learning Engineer with expertise in developing end-to-end ML systems that solve real-world problems across industries.
              </p>
              <p className="mb-4">
                With a strong foundation in statistical analysis, machine learning algorithms, and software engineering, I specialize in creating robust data pipelines and developing models that turn raw data into valuable business insights.
              </p>
              <p className="mb-6">
                My approach combines technical excellence with a deep understanding of business needs, ensuring that every solution I develop delivers measurable value.
              </p>
            </div>
            
            {/* Core skills highlight */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Core Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Machine Learning Model Development",
                  "Data Pipeline Engineering",
                  "Statistical Analysis & Insight Generation",
                  "Cloud-Based ML System Architecture",
                  "Algorithm Optimization & Performance Tuning",
                  "Cross-Functional Collaboration"
                ].map((strength, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA button */}
            <div className="mt-8">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-300 shadow-md"
              >
                <span>Get in Touch</span>
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              
              <a 
                href="#projects" 
                className="inline-flex items-center px-6 py-3 ml-4 bg-transparent border border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-300"
              >
                <span>View Projects</span>
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8L21 12M21 12L17 16M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
