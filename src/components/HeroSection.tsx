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
    return Array.from({ length: 12 }).map((_, i) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return { id: i, x, y };
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Enhanced Three.js background with higher z-index to ensure it stays behind content */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas />
      </div>
      
      {/* Background gradient and shapes with warm amber/red tones */}
      <div className="absolute inset-0 -z-10">
        <div 
          ref={parallaxBackgroundRef}
          className="absolute inset-0 bg-gradient-radial from-orange-100/30 via-transparent to-transparent dark:from-orange-900/15"
        />
        
        {/* Background grid with subtle effect */}
        <div className="absolute inset-0 bg-data-grid bg-[length:30px_30px] opacity-20" />
        
        {/* Decorative elements with refined styling in warm red tones */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-orange-300/10 dark:bg-orange-700/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-300/10 dark:bg-orange-700/10 blur-3xl animate-float" />
        
        {/* Animated morphing blob with warmer red tones */}
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-orange-400/15 to-orange-300/15 rounded-full blur-3xl animate-morph" />
      </div>
      
      {/* Main content with increased z-index to ensure it stays on top */}
      <div className="container mx-auto px-6 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={parallaxContentRef}
            className="relative"
          >
            {/* Badge with improved styling */}
            <span className="chip mb-4 inline-block px-4 py-1 text-sm bg-orange-900/20 text-orange-200 backdrop-blur-sm">Data Scientist & ML Engineer</span>
            
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
            
            {/* Call to action with improved visual appeal */}
            <div 
              ref={buttonAnimation.ref}
              className={`mt-12 ${buttonAnimation.animation}`}
              style={{ animationDelay: "0.6s" }}
            >
              <a 
                href="#projects" 
                className="interactive glassmorphism px-8 py-4 text-lg text-orange-800 dark:text-orange-200 font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-league border border-orange-500/30"
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
                backgroundColor: (point.id % 5 === 0) ? 'rgba(255, 138, 138, 0.6)' : 'rgba(140, 49, 49, 0.5)', // Varied red colors
              }}
            />
          );
        })}
      </div>
      
      {/* Refined scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-league">Scroll</span>
        <svg 
          className="w-6 h-6 text-orange-600 dark:text-orange-400" 
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
