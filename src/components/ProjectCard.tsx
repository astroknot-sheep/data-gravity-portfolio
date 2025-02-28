
import { useRef, useState, useEffect } from "react";
import { useCardTilt } from "@/lib/animations";

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
  const cardRef = useCardTilt();
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="card-3d w-full h-full"
      style={{
        transitionDelay: `${index * 0.1}s`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(50px)",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        ref={cardRef}
        className={`card-3d-content ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front of card */}
        <div className="card-3d-front glassmorphism border border-amber-200 dark:border-amber-900">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">{title}</h3>
              <span className="chip bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
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
                  className="text-xs py-1 px-2 bg-amber-50 dark:bg-amber-900/50 rounded-full text-amber-700 dark:text-amber-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="text-sm text-amber-600 dark:text-amber-400 flex items-center mt-4">
              <span>Click to see details</span>
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
        <div className="card-3d-back glassmorphism border border-amber-200 dark:border-amber-900">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">{title} Details</h3>
            
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
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
              <span>Click to go back</span>
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
      </div>
    </div>
  );
}
