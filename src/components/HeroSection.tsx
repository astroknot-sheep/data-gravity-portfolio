
import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { applyParallax, useScrollAnimation, useCursorPosition } from "@/lib/animations";
import ThreeCanvas from "./ThreeCanvas";

export default function HeroSection() {
  const parallaxBackgroundRef = useRef<HTMLDivElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  const buttonAnimation = useScrollAnimation();
  const cursorPos = useCursorPosition();
  
  // State for the sequential messages with optimized approach
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Memoize messages to avoid recreating on every render
  const messages = useMemo(() => [
    "Hi, I'm Dhriman",
    "I specialise in <span class='text-amber-500 font-semibold'>ML</span> and <span class='text-amber-500 font-semibold'>Operations Research</span>.",
    "Let's connect for <span class='text-amber-500 font-semibold'>data-driven innovation</span>!"
  ], []);

  useEffect(() => {
    const backgroundElement = parallaxBackgroundRef.current;
    const contentElement = parallaxContentRef.current;
    
    if (!backgroundElement || !contentElement) return;
    
    const cleanupBackground = applyParallax(backgroundElement, 100);
    const cleanupContent = applyParallax(contentElement, -30);
    
    // Set up message transition with optimized timer
    const messageTimer = setInterval(() => {
      setIsAnimating(true);
      
      // Use setTimeout only once
      const timeoutId = setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setIsAnimating(false);
      }, 500); // 500ms for fade out
      
      return () => clearTimeout(timeoutId);
    }, 4000); // Change message every 4 seconds
    
    return () => {
      cleanupBackground();
      cleanupContent();
      clearInterval(messageTimer);
    };
  }, [messages.length]);

  // Memoize the data points to prevent recreating on every render
  // Optimize by using a more efficient calculation method
  const dataPoints = useMemo(() => {
    // Only create these points once at initialization
    return Array.from({ length: 12 }).map((_, i) => {
      const phi = Math.random() * Math.PI * 2; // Random angle
      const radius = Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.4;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const x = centerX + radius * Math.cos(phi);
      const y = centerY + radius * Math.sin(phi);
      
      return { id: i, x, y };
    });
  }, []);

  // Calculate point movements more efficiently
  const getPointStyle = useCallback((point: {id: number, x: number, y: number}) => {
    // Calculate distance from cursor
    const dx = cursorPos.x - point.x;
    const dy = cursorPos.y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxForceDistance = 400; // Influence range
    
    // Use fast inverse square approximation for performance
    const forceMultiplier = Math.max(0, 1 - distance / maxForceDistance);
    
    // Apply force vector
    const moveX = dx * forceMultiplier * 0.3;
    const moveY = dy * forceMultiplier * 0.3;
    
    return {
      left: `${point.x}px`,
      top: `${point.y}px`,
      transform: `translate(${moveX}px, ${moveY}px)`,
      opacity: 0.3 + forceMultiplier * 0.7,
      scale: 1 + forceMultiplier * 1.5,
      width: (point.id % 3 === 0) ? '4px' : '2px',
      height: (point.id % 3 === 0) ? '4px' : '2px',
      backgroundColor: (point.id % 5 === 0) ? 'rgba(255, 210, 138, 0.6)' : 'rgba(140, 105, 49, 0.5)',
    };
  }, [cursorPos]);

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
        
        {/* Background grid */}
        <div className="absolute inset-0 bg-data-grid bg-[length:30px_30px] opacity-20" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-300/10 dark:bg-amber-700/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-300/10 dark:bg-amber-700/10 blur-3xl animate-float" />
        
        {/* Animated morphing blob */}
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400/15 to-amber-400/15 rounded-full blur-3xl animate-morph" />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={parallaxContentRef}
            className="relative"
          >
            {/* Badge */}
            <span className="chip mb-4 inline-block px-4 py-1 text-sm bg-amber-900/20 text-amber-200 backdrop-blur-sm">Data Scientist & ML Engineer</span>
            
            {/* Animated message display */}
            <div className="min-h-[220px] flex flex-col items-center justify-center">
              <h1 
                className={`block font-bold text-gray-900 dark:text-white font-league text-5xl md:text-6xl lg:text-7xl transition-opacity duration-500 ${
                  isAnimating ? 'opacity-0 transform translate-y-5' : 'opacity-100 transform translate-y-0'
                }`}
                dangerouslySetInnerHTML={{ __html: messages[messageIndex] }}
              >
              </h1>
            </div>
            
            {/* Call to action */}
            <div 
              ref={buttonAnimation.ref}
              className={`mt-12 ${buttonAnimation.animation}`}
              style={{ animationDelay: "0.6s" }}
            >
              <a 
                href="#projects" 
                className="interactive glassmorphism px-8 py-4 text-lg text-amber-800 dark:text-amber-200 font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-league border border-amber-500/30"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating data points that follow cursor - with optimized rendering */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {dataPoints.map((point) => (
          <div
            key={point.id}
            className="data-point will-change-transform"
            style={getPointStyle(point)}
          />
        ))}
      </div>
      
      {/* Refined scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-league">Scroll</span>
        <svg 
          className="w-6 h-6 text-amber-600 dark:text-amber-400" 
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
