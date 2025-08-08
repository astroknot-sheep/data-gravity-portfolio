
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  technologies: string[];
  description: string[];
  index: number;
  isInView: boolean;
  link?: string;
}

export default function ProjectCard({ 
  title, 
  technologies, 
  description, 
  index, 
  isInView,
  link = "#"
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Get the main technology as a featured tag
  const mainTech = technologies[0];
  
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleViewProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(link, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className="relative h-full w-full" style={{ perspective: '1000px' }}>
      <motion.div 
        className="relative w-full h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotateY: isFlipped ? 180 : 0
        }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          rotateY: { duration: 0.6 }
        }}
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s'
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden backface-hidden cursor-pointer group"
          onClick={handleClick}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Card background with gradient */}
          <div className="absolute inset-0 rounded-xl z-0 bg-gradient-to-br from-black via-gray-900 to-black ring-1 ring-orange-500/20"></div>
          
          {/* Card content */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-amber-200">{title}</h3>
              <span className="bg-orange-500/10 text-orange-200 px-3 py-1 rounded-full text-xs font-medium border border-orange-500/30">
                {mainTech}
              </span>
            </div>
            
            <p className="text-gray-300 mb-6">
              {description[0]}
            </p>
            
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-auto mb-14">
              {technologies.slice(1).map((tech, i) => (
                <span 
                  key={i} 
                  className="text-xs py-1 px-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* View Project Button */}
            <Button 
              className="absolute bottom-6 left-6 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 text-white px-4 h-10 flex items-center shadow-lg"
              onClick={handleViewProject}
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            {/* Click indicator */}
            <div className="absolute bottom-3 right-3 flex items-center text-gray-300 text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
              <span>Click for details</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
            
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden backface-hidden cursor-pointer"
          onClick={handleClick}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Card background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black rounded-xl z-0"></div>
          
          {/* Card content */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold text-amber-200 mb-4">{title}</h3>
            
            <ul className="space-y-3 text-gray-300">
              {description.map((point, i) => (
                <li key={i} className="flex items-start">
                  <svg 
                    className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
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
            
            <div className="mt-auto flex justify-between items-center">
              <Button 
                variant="default"
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 text-white"
                onClick={handleViewProject}
              >
                <Github className="w-4 h-4 mr-2" />
                View Project
              </Button>
              
              <button 
                onClick={handleClick}
                className="text-gray-400 hover:text-gray-300 transition-colors"
                aria-label="Flip card back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
