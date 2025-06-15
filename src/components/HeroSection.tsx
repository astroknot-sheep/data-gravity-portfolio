
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
    "I specialise in <span class='text-gradient font-bold font-intro'>ML</span> and <span class='text-gradient font-bold font-intro'>Operations Research</span>.",
    "Let's connect for <span class='text-gradient font-bold font-intro'>data-driven innovation</span>!"
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
      }, 500);
    }, 4000);
    
    return () => {
      cleanupBackground();
      cleanupContent();
      clearInterval(messageTimer);
    };
  }, [messages.length]);

  // Enhanced data points with better distribution
  const dataPoints = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
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
      
      {/* Enhanced multi-layered background */}
      <div className="absolute inset-0 -z-10">
        <div 
          ref={parallaxBackgroundRef}
          className="absolute inset-0 bg-gradient-radial from-orange-200/50 via-orange-100/30 to-transparent dark:from-orange-900/30 dark:via-orange-800/20"
        />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-data-grid bg-[length:60px_60px] opacity-40 dark:opacity-25" />
        
        {/* Multiple floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-orange-300/20 via-amber-300/25 to-orange-400/20 dark:from-orange-700/20 dark:via-amber-700/25 dark:to-orange-600/20 blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-amber-400/25 via-orange-400/30 to-amber-500/25 dark:from-amber-600/25 dark:via-orange-600/30 dark:to-amber-700/25 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-orange-300/25 via-amber-300/20 to-orange-400/25 dark:from-orange-700/25 dark:via-amber-700/20 dark:to-orange-600/25 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        
        {/* Additional atmospheric elements */}
        <div className="absolute top-1/2 left-1/6 w-40 h-40 rounded-full bg-gradient-to-tr from-orange-200/30 to-amber-200/30 dark:from-orange-800/30 dark:to-amber-800/30 blur-2xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-2/3 w-32 h-32 rounded-full bg-gradient-to-bl from-amber-300/35 to-orange-300/35 dark:from-amber-700/35 dark:to-orange-700/35 blur-xl animate-float-gentle" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/5 right-1/5 w-24 h-24 rounded-full bg-gradient-to-r from-orange-400/40 to-amber-400/40 dark:from-orange-600/40 dark:to-amber-600/40 blur-lg animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
      </div>
      
      {/* Enhanced main content */}
      <div className="container mx-auto px-6 z-20 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            ref={parallaxContentRef}
            className="relative"
          >
            {/* Enhanced professional badge */}
            <div className="mb-8 inline-block">
              <span className="inline-flex items-center px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-orange-100/90 via-amber-100/90 to-orange-100/90 dark:from-orange-900/70 dark:via-amber-900/70 dark:to-orange-900/70 text-orange-800 dark:text-orange-200 backdrop-blur-2xl border-2 border-orange-200/60 dark:border-orange-700/60 shadow-2xl font-league enhanced-glow">
                <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3 animate-pulse-glow"></span>
                Data Scientist & ML Engineer
              </span>
            </div>
            
            {/* FIXED - Enhanced animated message display with explicit font classes */}
            <div className="min-h-[200px] flex flex-col items-center justify-center">
              <h1 
                className={`block font-bold text-gray-900 dark:text-white font-intro text-3xl sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-700 ease-out leading-tight tracking-tight ${
                  isAnimating ? 'opacity-0 transform translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'
                }`}
                style={{ 
                  textShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Intro Rust', serif !important"
                }}
                dangerouslySetInnerHTML={{ __html: messages[messageIndex] }}
              />
            </div>
            
            {/* Enhanced call to action with better spacing */}
            <div 
              ref={buttonAnimation.ref}
              className={`mt-20 ${buttonAnimation.animation}`}
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a 
                  href="#projects" 
                  className="group relative inline-flex items-center px-10 py-5 text-lg font-bold rounded-full transition-all duration-600 overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 font-league enhanced-glow"
                  style={{ fontFamily: "'League Spartan', sans-serif !important" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent translate-x-[-100%] transition-transform duration-600 group-hover:translate-x-[100%]"></span>
                  <span className="relative z-10 font-league">View My Work</span>
                  <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                <a 
                  href="#contact" 
                  className="group inline-flex items-center px-10 py-5 text-lg font-bold rounded-full transition-all duration-600 bg-white/15 dark:bg-gray-800/40 backdrop-blur-2xl border-2 border-orange-200/40 dark:border-orange-700/40 text-orange-800 dark:text-orange-200 hover:bg-orange-50/30 dark:hover:bg-orange-900/30 hover:border-orange-300/60 dark:hover:border-orange-600/60 hover:scale-110 font-league enhanced-glow"
                  style={{ fontFamily: "'League Spartan', sans-serif !important" }}
                >
                  <span className="font-league">Get In Touch</span>
                  <svg className="ml-3 w-6 h-6 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating data points with better interactivity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {dataPoints.map((point) => {
          const dx = cursorPos.x - point.x;
          const dy = cursorPos.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxForceDistance = 350;
          const forceMultiplier = Math.max(0, 1 - distance / maxForceDistance);
          
          const moveX = dx * forceMultiplier * 0.3;
          const moveY = dy * forceMultiplier * 0.3;
          
          return (
            <div
              key={point.id}
              className="absolute rounded-full transition-all duration-400 ease-out will-change-transform"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: `translate(${moveX}px, ${moveY}px)`,
                opacity: 0.5 + forceMultiplier * 0.5,
                scale: 1 + forceMultiplier * 1.5,
                width: (point.id % 4 === 0) ? '8px' : (point.id % 3 === 0) ? '6px' : '4px',
                height: (point.id % 4 === 0) ? '8px' : (point.id % 3 === 0) ? '6px' : '4px',
                background: point.id % 2 === 0 
                  ? `radial-gradient(circle, rgba(255, 191, 64, ${0.7 + forceMultiplier * 0.3}), rgba(249, 115, 22, ${0.4 + forceMultiplier * 0.4}))` 
                  : `radial-gradient(circle, rgba(251, 191, 36, ${0.6 + forceMultiplier * 0.4}), rgba(245, 158, 11, ${0.5 + forceMultiplier * 0.3}))`,
                boxShadow: forceMultiplier > 0.3 ? '0 0 20px rgba(255, 191, 64, 0.8)' : '0 0 8px rgba(255, 191, 64, 0.4)',
              }}
            />
          );
        })}
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-league font-bold tracking-wider uppercase" style={{ fontFamily: "'League Spartan', sans-serif !important" }}>Scroll to explore</span>
        <div className="animate-bounce">
          <div className="w-8 h-12 border-3 border-orange-400 dark:border-orange-500 rounded-full flex justify-center bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg shadow-xl">
            <div className="w-2 h-4 bg-gradient-to-b from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 rounded-full mt-2 animate-pulse-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
