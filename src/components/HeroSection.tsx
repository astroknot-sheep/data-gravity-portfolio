
import { useEffect, useRef, useMemo } from "react";
import { applyParallax, useScrollAnimation, useCursorPosition } from "@/lib/animations";
import ThreeCanvas from "./ThreeCanvas";

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

  // Memoize the data points to prevent recreating on every render
  const dataPoints = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return { id: i, x, y };
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Three.js background */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas />
      </div>
      
      {/* Background gradient and shapes */}
      <div className="absolute inset-0 -z-10">
        <div 
          ref={parallaxBackgroundRef}
          className="absolute inset-0 bg-gradient-radial from-amber-100/30 via-transparent to-transparent dark:from-amber-900/15"
        />
        
        {/* Background grid with subtle effect */}
        <div className="absolute inset-0 bg-data-grid bg-[length:30px_30px] opacity-20" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-300/10 dark:bg-amber-700/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-300/10 dark:bg-amber-700/10 blur-3xl animate-float" />
        
        {/* Animated morphing blob */}
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400/15 to-amber-400/15 rounded-full blur-3xl animate-morph" />
      </div>
      
      {/* Semi-transparent backdrop for better text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10">
        {/* Intentionally empty for the backdrop effect */}
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={parallaxContentRef}
            className="relative p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10"
          >
            {/* Badge with improved contrast */}
            <span className="chip mb-6 inline-block px-4 py-2 text-sm bg-amber-500/40 text-white backdrop-blur-sm border border-amber-400/30 shadow-lg">Data Scientist & ML Engineer</span>
            
            {/* Heading with improved typography and contrast */}
            <h1 className="flex flex-col items-center justify-center">
              <span 
                ref={title1Animation.ref}
                className={`block font-bold text-white font-league text-5xl md:text-6xl lg:text-7xl mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${title1Animation.animation}`}
              >
                Transforming Data 
              </span>
              <span 
                ref={title2Animation.ref}
                className={`block text-amber-300 dark:text-amber-300 font-intro text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${title2Animation.animation}`} 
                style={{ animationDelay: "0.2s" }}
              >
                Into Insights
              </span>
            </h1>
            
            {/* Subtitle with improved contrast */}
            <p 
              ref={subtitleAnimation.ref}
              className={`mt-8 text-lg md:text-xl lg:text-2xl text-gray-100 max-w-2xl mx-auto font-league leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${subtitleAnimation.animation}`}
              style={{ animationDelay: "0.4s" }}
            >
              Specialized in building end-to-end ML systems and data-driven solutions
              with expertise in Python, Deep Learning, and MLOps.
            </p>
            
            {/* Call to action with improved visual appeal */}
            <div 
              ref={buttonAnimation.ref}
              className={`mt-12 ${buttonAnimation.animation}`}
              style={{ animationDelay: "0.6s" }}
            >
              <a 
                href="#projects" 
                className="interactive glassmorphism px-8 py-4 text-lg text-amber-200 font-medium rounded-full shadow-xl hover:shadow-amber-500/20 transition-all duration-300 font-league border border-amber-400/50 bg-amber-900/50 hover:bg-amber-800/60"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating data points that follow cursor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {dataPoints.map((point) => {
          // Calculate distance from cursor
          const dx = cursorPos.x - point.x;
          const dy = cursorPos.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxForceDistance = 400; // Increased influence range
          const forceMultiplier = Math.max(0, 1 - distance / maxForceDistance);
          
          // Apply force vector with improved physics
          const moveX = dx * forceMultiplier * 0.3;
          const moveY = dy * forceMultiplier * 0.3;
          
          return (
            <div
              key={point.id}
              className="data-point will-change-transform"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: `translate(${moveX}px, ${moveY}px)`,
                opacity: 0.3 + forceMultiplier * 0.7,
                scale: 1 + forceMultiplier * 1.5, // More dramatic scaling
                width: (point.id % 3 === 0) ? '4px' : '2px', // Varied sizes
                height: (point.id % 3 === 0) ? '4px' : '2px',
                backgroundColor: (point.id % 5 === 0) ? 'rgba(255, 210, 138, 0.6)' : 'rgba(140, 105, 49, 0.5)', // Varied colors
              }}
            />
          );
        })}
      </div>
      
      {/* Refined scroll indicator with better contrast */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
        <span className="text-sm text-white mb-2 font-league drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Scroll</span>
        <svg 
          className="w-6 h-6 text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" 
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
