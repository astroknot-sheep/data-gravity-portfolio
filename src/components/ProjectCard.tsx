
import { useRef, useState } from "react";
import { useCardTilt } from "@/lib/animations";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  technologies: string[];
  description: string[];
  index: number;
  isInView: boolean;
  image?: string;
}

export default function ProjectCard({ 
  title, 
  technologies, 
  description, 
  index, 
  isInView,
  image
}: ProjectCardProps) {
  const cardRef = useCardTilt();
  const [isHovered, setIsHovered] = useState(false);
  
  // Default placeholder image if none is provided
  const backgroundImage = image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop";
  
  return (
    <motion.div 
      className="relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image with Overlay */}
      <div className="relative h-52 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-80" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.slice(0, 3).map((tech, i) => (
              <span 
                key={i} 
                className="text-xs py-1 px-2 bg-amber-500/80 rounded-full text-white"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs py-1 px-2 bg-white/20 rounded-full">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Project Details */}
      <div className="p-5 bg-white dark:bg-gray-800">
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
          {description.map((point, i) => (
            <li key={i} className="flex items-start text-sm">
              <svg 
                className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        
        {/* Technologies not shown in the top section */}
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.slice(3).map((tech, i) => (
            <span 
              key={i} 
              className="text-xs py-1 px-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* View Details Button */}
        <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
          <button 
            className="w-full py-2 flex items-center justify-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            <span className="font-medium">View Details</span>
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
