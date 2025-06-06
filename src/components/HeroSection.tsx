
import { useEffect, useRef, useMemo, useState } from "react";
import { applyParallax, useScrollAnimation, useCursorPosition } from "@/lib/animations";
import ThreeCanvas from "./ThreeCanvas";

export default function HeroSection() {
  const parallaxBackgroundRef = useRef<HTMLDivElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  const buttonAnimation = useScrollAnimation();
  const cursorPos = useCursorPosition();
  
  // State for the sequential messages
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const messages = [
    "Hi, I'm Dhriman",
    "I specialise in <span class='text-orange-500 font-semibold'>ML</span> and <span class='text-orange-500 font-semibold'>Operations Research</span>.",
    "Let's connect for <span class='text-orange-500 font-semibold'>data-driven innovation</span>!"
  ];

  useEffect(() => {
    const backgroundElement = parallaxBackgroundRef.current;
    const contentElement = parallaxContentRef.current;
    
    if (!backgroundElement || !contentElement) return;
    
    const cleanupBackground = applyParallax(backgroundElement, 100);
    const cleanupContent = applyParallax(contentElement, -30);
    
    // Set up message transition
    const messageTimer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setIsAnimating(false);
      }, 500); // 500ms for fade out
    }, 4000); // Change message every 4 seconds
    
    return () => {
      cleanupBackground();
      cleanupContent();
      clearInterval(messageTimer);
    };
  }, [messages.length]);

  // Memoize the data points to prevent recreating on every render
  const dataPoints = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return { id: i, x, y };
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Enhanced Three.js background */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas />
      </div>
      
      {/* Enhanced background with better visual depth */}
      <div className="absolute inset-0 -z-10">
        <div 
          ref={parallaxBackgroundRef}
          className="absolute inset-0 bg-gradient-radial from-orange-100/40 via-orange-50/20 to-transparent dark:from-orange-900/20 dark:via-orange-800/10"
        />
        
        {/* Enhanced grid with better opacity */}
        <div className="absolute inset-0 bg-data-grid bg-[length:40px_40px] opacity-30 dark:opacity-20" />
        
        {/* Enhanced decorative elements with better positioning */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-orange-300/15 to-amber-300/15 dark:from-orange-700/15 dark:to-amber-700/15 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-orange-400/20 to-amber-400/20 dark:from-orange-600/20 dark:to-amber-600/20 blur-3xl animate-float" />
        
        {/* Enhanced morphing blob */}
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-orange-300/20 via-amber-300/15 to-orange-400/20 dark:from-orange-700/20 dark:via-amber-700/15 dark:to-orange-600/20 rounded-full blur-3xl animate-morph" />
        
        {/* Additional floating elements */}
        <div className="absolute top-1/2 left-1/6 w-32 h-32 rounded-full bg-gradient-to-tr from-orange-200/25 to-amber-200/25 dark:from-orange-800/25 dark:to-amber-800/25 blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-2/3 w-24 h-24 rounded-full bg-gradient-to-bl from-amber-300/30 to-orange-300/30 dark:from-amber-700/30 dark:to-orange-700/30 blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Enhanced main content */}
      <div className="container mx-auto px-6 z-20 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            ref={parallaxContentRef}
            className="relative"
          >
            {/* Enhanced badge with better styling */}
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-orange-900/60 dark:to-amber-900/60 text-orange-800 dark:text-orange-200 backdrop-blur-lg border border-orange-200/50 dark:border-orange-700/50 shadow-lg">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                Data Scientist & ML Engineer
              </span>
            </div>
            
            {/* Enhanced animated message display */}
            <div className="min-h-[240px] flex flex-col items-center justify-center">
              <h1 
                className={`block font-bold text-gray-900 dark:text-white font-playfair text-5xl md:text-7xl lg:text-8xl transition-all duration-700 ease-out leading-tight tracking-tight ${
                  isAnimating ? 'opacity-0 transform translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'
                }`}
                style={{ 
                  textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  letterSpacing: '-0.02em'
                }}
                dangerouslySetInnerHTML={{ __html: messages[messageIndex] }}
              />
            </div>
            
            {/* Enhanced call to action */}
            <div 
              ref={buttonAnimation.ref}
              className={`mt-16 ${buttonAnimation.animation}`}
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#projects" 
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-medium rounded-full transition-all duration-500 overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 font-inter"
                >
                  <span className="absolute inset-0 bg-shimmer-gradient animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10">View My Work</span>
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                <a 
                  href="#contact" 
                  className="group inline-flex items-center px-8 py-4 text-lg font-medium rounded-full transition-all duration-500 bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg border border-orange-200/30 dark:border-orange-700/30 text-orange-800 dark:text-orange-200 hover:bg-orange-50/20 dark:hover:bg-orange-900/20 hover:border-orange-300/50 dark:hover:border-orange-600/50 hover:scale-105 font-inter"
                >
                  <span>Get In Touch</span>
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating data points */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {dataPoints.map((point) => {
          const dx = cursorPos.x - point.x;
          const dy = cursorPos.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxForceDistance = 300;
          const forceMultiplier = Math.max(0, 1 - distance / maxForceDistance);
          
          const moveX = dx * forceMultiplier * 0.2;
          const moveY = dy * forceMultiplier * 0.2;
          
          return (
            <div
              key={point.id}
              className="absolute rounded-full transition-all duration-300 ease-out will-change-transform"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: `translate(${moveX}px, ${moveY}px)`,
                opacity: 0.4 + forceMultiplier * 0.6,
                scale: 1 + forceMultiplier * 1.2,
                width: (point.id % 4 === 0) ? '6px' : (point.id % 3 === 0) ? '4px' : '3px',
                height: (point.id % 4 === 0) ? '6px' : (point.id % 3 === 0) ? '4px' : '3px',
                backgroundColor: point.id % 2 === 0 
                  ? `rgba(255, 191, 64, ${0.6 + forceMultiplier * 0.4})` 
                  : `rgba(251, 191, 36, ${0.5 + forceMultiplier * 0.5})`,
                boxShadow: forceMultiplier > 0.3 ? '0 0 10px rgba(255, 191, 64, 0.5)' : 'none',
              }}
            />
          );
        })}
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-inter font-medium tracking-wide">Scroll to explore</span>
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-400 dark:border-orange-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 dark:bg-orange-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
