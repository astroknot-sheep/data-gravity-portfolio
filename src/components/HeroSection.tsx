
import { useEffect, useRef } from "react";
import { applyParallax, useScrollAnimation, useCursorPosition } from "@/lib/animations";

export default function HeroSection() {
  const parallaxBackgroundRef = useRef<HTMLDivElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  const title1Animation = useScrollAnimation();
  const title2Animation = useScrollAnimation();
  const subtitleAnimation = useScrollAnimation();
  const buttonAnimation = useScrollAnimation();
  const cursorPos = useCursorPosition();

  useEffect(() => {
    const backgroundElement = parallaxBackgroundRef.current;
    const contentElement = parallaxContentRef.current;
    
    if (!backgroundElement || !contentElement) return;
    
    const cleanupBackground = applyParallax(backgroundElement, 100);
    const cleanupContent = applyParallax(contentElement, -30);
    
    return () => {
      cleanupBackground();
      cleanupContent();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background gradient and shapes */}
      <div className="absolute inset-0 -z-10">
        <div 
          ref={parallaxBackgroundRef}
          className="absolute inset-0 bg-gradient-radial from-purple-100/40 via-transparent to-transparent dark:from-purple-900/20"
        />
        
        {/* Background grid */}
        <div className="absolute inset-0 bg-data-grid bg-[length:30px_30px]" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-amber-300/10 dark:bg-amber-700/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-300/10 dark:bg-purple-700/10 blur-3xl animate-float" />
        
        {/* Animated morphing blob */}
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-amber-400/20 rounded-full blur-2xl animate-morph" />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={parallaxContentRef}
            className="relative"
          >
            <span className="chip mb-3 inline-block">Data Scientist & ML Engineer</span>
            
            <h1 className="flex flex-col items-center justify-center">
              <span 
                ref={title1Animation.ref}
                className={`block font-bold text-gray-900 dark:text-white ${title1Animation.animation}`}
              >
                Transforming Data 
              </span>
              <span 
                ref={title2Animation.ref}
                className={`block text-purple-600 dark:text-purple-400 ${title2Animation.animation}`} 
                style={{ animationDelay: "0.2s" }}
              >
                Into Insights
              </span>
            </h1>
            
            <p 
              ref={subtitleAnimation.ref}
              className={`mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${subtitleAnimation.animation}`}
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
                className="interactive glassmorphism px-8 py-3 text-purple-800 dark:text-purple-200 font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating data points that follow cursor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => {
          // Calculate distance from cursor
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          const dx = cursorPos.x - x;
          const dy = cursorPos.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxForceDistance = 300;
          const forceMultiplier = Math.max(0, 1 - distance / maxForceDistance);
          
          // Apply force vector
          const moveX = dx * forceMultiplier * 0.2;
          const moveY = dy * forceMultiplier * 0.2;
          
          return (
            <div
              key={i}
              className="data-point"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(${moveX}px, ${moveY}px)`,
                opacity: 0.3 + forceMultiplier * 0.7,
                scale: 1 + forceMultiplier,
              }}
            />
          );
        })}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll</span>
        <svg 
          className="w-6 h-6 text-gray-500 dark:text-gray-400" 
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
