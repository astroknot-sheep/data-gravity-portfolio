
import { useState } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  technologies: string[];
  description: string[];
  index: number;
  isInView: boolean;
}

export default function ProjectCard({ 
  title, 
  technologies, 
  description, 
  index, 
  isInView 
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="h-full perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-full transform-style-3d cursor-pointer"
      >
        {/* Front of card */}
        <div 
          className={`absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col backface-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow`}
        >
          <div className="space-y-4 h-full">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-gray-800 dark:text-amber-300">{title}</h3>
              <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-1 rounded-full text-xs font-medium">
                {technologies[0]}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 flex-grow">
              {description[0]}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto pt-4">
              {technologies.slice(1).map((tech, i) => (
                <span 
                  key={i} 
                  className="text-xs py-1 px-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="text-sm text-amber-600 dark:text-amber-400 flex items-center mt-4">
              <span>View details</span>
              <svg 
                className="w-4 h-4 ml-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className={`absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col backface-hidden rotate-y-180 border border-gray-200 dark:border-gray-700 shadow-md`}
        >
          <div className="space-y-4 h-full">
            <h3 className="text-xl font-bold text-gray-800 dark:text-amber-300 mb-4">{title}</h3>
            
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 flex-grow">
              {description.map((point, i) => (
                <li key={i} className="flex items-start">
                  <svg 
                    className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-sm text-amber-600 dark:text-amber-400 flex items-center mt-4">
              <span>Back to summary</span>
              <svg 
                className="w-4 h-4 ml-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
