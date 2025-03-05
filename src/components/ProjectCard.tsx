
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
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the main technology as a featured tag
  const mainTech = technologies[0];
  
  return (
    <motion.div 
      className="relative h-full rounded-xl overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Card background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl z-0"></div>
      
      {/* Card content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-amber-300">{title}</h3>
          <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-medium border border-amber-500/30">
            {mainTech}
          </span>
        </div>
        
        <p className="text-gray-300 mb-6">
          {description[0]}
        </p>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-auto mb-6">
          {technologies.slice(1).map((tech, i) => (
            <span 
              key={i} 
              className="text-xs py-1 px-2 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Hover effect to show more details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/98 p-6 flex flex-col"
        >
          <h3 className="text-xl font-bold text-amber-300 mb-4">{title}</h3>
          
          <ul className="space-y-3 text-gray-300">
            {description.map((point, i) => (
              <li key={i} className="flex items-start">
                <svg 
                  className="w-5 h-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" 
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
          
          <div className="mt-auto">
            <span className="inline-flex items-center text-amber-400 text-sm font-medium">
              View Project
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom decoration line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
    </motion.div>
  );
}
