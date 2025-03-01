
import { useEffect, useRef, useMemo } from "react";
import { applyParallax, useScrollAnimation, useCursorPosition } from "@/lib/animations";
import ThreeCanvas from "./ThreeCanvas";

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const title1Animation = useScrollAnimation();
  const title2Animation = useScrollAnimation();
  const subtitleAnimation = useScrollAnimation();
  const buttonAnimation = useScrollAnimation();
  const cursorPos = useCursorPosition();

  // Memoize the data points to prevent recreating on every render
  const dataPoints = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return { id: i, x, y };
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Three.js background - now placed BEHIND text with z-index */}
      <div className="absolute inset-0 bg-[#0A0A0F]"></div>
      <ThreeCanvas className="opacity-60" />
      
      {/* Background gradient and shapes with updated colors */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#1E0F48]/20 via-transparent to-transparent" />
        
        {/* Background grid */}
        <div className="absolute inset-0 bg-data-grid bg-[length:30px_30px] opacity-30" />
        
        {/* Decorative elements with new color scheme */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#008B94]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#9D4EDD]/10 blur-3xl animate-float" />
        
        {/* Animated morphing blob */}
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-[#00C2FF]/20 to-[#9D4EDD]/10 rounded-full blur-2xl animate-morph" />
      </div>
      
      {/* Main content - with absolute positioning and z-index to ensure separation from animation */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={titleRef} className="relative">
            <span className="chip mb-3 inline-block font-league">Data Scientist & ML Engineer</span>
            
            <h1 className="flex flex-col items-center justify-center">
              <span 
                ref={title1Animation.ref}
                className={`block font-bold text-white font-league ${title1Animation.animation}`}
              >
                Transforming Data 
              </span>
              <span 
                ref={title2Animation.ref}
                className={`block text-[#00C2FF] font-intro ${title2Animation.animation}`} 
                style={{ animationDelay: "0.2s" }}
              >
                Into Insights
              </span>
            </h1>
            
            <p 
              ref={subtitleAnimation.ref}
              className={`mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-league ${subtitleAnimation.animation}`}
              style={{ animationDelay: "0.4s" }}
            >
              Specialized in building end-to-end ML systems and data-driven solutions
              with expertise in Python, Deep Learning, and MLOps.
            </p>
            
            <div 
              ref={buttonAnimation.ref}
              className={`mt-10 ${buttonAnimation.animation}`}
              style={{ animationDelay: "0.6s" }}
            >
              <a 
                href="#projects" 
                className="interactive glassmorphism px-8 py-3 text-[#00C2FF] font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-league"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating data points that follow cursor - optimized with fewer points */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {dataPoints.map((point) => {
          // Calculate distance from cursor
          const dx = cursorPos.x - point.x;
          const dy = cursorPos.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxForceDistance = 300;
          const forceMultiplier = Math.max(0, 1 - distance / maxForceDistance);
          
          // Apply force vector
          const moveX = dx * forceMultiplier * 0.2;
          const moveY = dy * forceMultiplier * 0.2;
          
          return (
            <div
              key={point.id}
              className="data-point will-change-transform"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: `translate(${moveX}px, ${moveY}px)`,
                opacity: 0.3 + forceMultiplier * 0.7,
                scale: 1 + forceMultiplier,
                backgroundColor: '#00C2FF',
              }}
            />
          );
        })}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-gray-400 mb-2 font-league">Scroll</span>
        <svg 
          className="w-6 h-6 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
