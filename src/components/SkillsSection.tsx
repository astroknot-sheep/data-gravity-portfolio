
import { useState, useEffect, useRef } from "react";
import { useInView, useStaggeredAnimation } from "@/lib/animations";

interface Skill {
  category: string;
  items: {
    name: string;
    proficiency: number;
  }[];
}

export default function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const skillsData: Skill[] = [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", proficiency: 95 },
        { name: "SQL", proficiency: 85 },
        { name: "Java", proficiency: 70 },
        { name: "R", proficiency: 75 },
        { name: "Shell Scripting", proficiency: 65 },
      ],
    },
    {
      category: "ML & Data Science",
      items: [
        { name: "Regression", proficiency: 90 },
        { name: "Classification", proficiency: 85 },
        { name: "NLP", proficiency: 80 },
        { name: "Deep Learning", proficiency: 85 },
        { name: "Feature Engineering", proficiency: 90 },
        { name: "Time Series", proficiency: 75 },
      ],
    },
    {
      category: "Data Engineering",
      items: [
        { name: "Data Pipelines", proficiency: 85 },
        { name: "ETL Processes", proficiency: 80 },
        { name: "Data Warehousing", proficiency: 75 },
        { name: "Data Cleaning", proficiency: 90 },
      ],
    },
    {
      category: "Tools & Technologies",
      items: [
        { name: "Docker", proficiency: 80 },
        { name: "AWS", proficiency: 75 },
        { name: "MLFlow", proficiency: 85 },
        { name: "Git", proficiency: 90 },
        { name: "FastAPI", proficiency: 80 },
        { name: "Tableau", proficiency: 70 },
      ],
    },
  ];

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillItemAnimations = useStaggeredAnimation(skillsData.length);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    
    const element = sectionRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      <div className="absolute inset-0 bg-data-grid bg-[length:30px_30px] opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <span className="chip mb-3">Expertise</span>
          <h2 className={`text-4xl font-bold transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Technical Skills
          </h2>
          <p className={`mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Specialized in machine learning, data science, and engineering with expertise across multiple domains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skillGroup, groupIndex) => {
            const distanceFactor = getDistanceFactor(
              cursorPosition, 
              groupIndex, 
              skillsData.length
            );
            
            return (
              <div 
                key={skillGroup.category}
                className="glassmorphism p-6 transition-all duration-500 glow"
                style={{
                  ...skillItemAnimations[groupIndex].style,
                  transform: `perspective(1000px) 
                              rotateX(${distanceFactor.y * 5}deg) 
                              rotateY(${distanceFactor.x * 5}deg)
                              scale(${isInView ? 1 : 0.9})`,
                  opacity: isInView ? 1 : 0,
                  transitionDelay: `${groupIndex * 0.1}s`,
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-amber-800 dark:text-amber-300">
                  {skillGroup.category}
                </h3>
                <div className="space-y-4">
                  {skillGroup.items.map((skill) => (
                    <div key={skill.name} className="interactive">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: isInView ? `${skill.proficiency}%` : "0%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Helper function to calculate distance factor for 3D effect
function getDistanceFactor(
  cursorPosition: { x: number; y: number },
  index: number,
  totalItems: number
) {
  // Simulate position based on index for a grid layout
  const itemsPerRow = 4; // Adjust based on your layout
  const row = Math.floor(index / itemsPerRow);
  const col = index % itemsPerRow;
  
  // Estimate position (this will need adjustment based on actual layout)
  const estimatedWidth = window.innerWidth / itemsPerRow;
  const estimatedHeight = 300; // Approximate height of skill cards
  
  const estimatedX = col * estimatedWidth + estimatedWidth / 2;
  const estimatedY = row * estimatedHeight + estimatedHeight / 2;
  
  // Calculate normalized distance from cursor (-1 to 1 range)
  const dx = (cursorPosition.x - estimatedX) / (window.innerWidth / 2);
  const dy = (cursorPosition.y - estimatedY) / (window.innerHeight / 2);
  
  return { x: dx, y: dy };
}
