import { useEffect, useRef, useMemo, useState } from "react";
import { applyParallax, useScrollAnimation, useCursorPosition } from "@/lib/animations";
import { useMagneticEffect } from "@/lib/magnetic";
import ThreeCanvas from "./ThreeCanvas";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

export default function HeroSection() {
  const parallaxBackgroundRef = useRef<HTMLDivElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonAnimation = useScrollAnimation();
  const cursorPos = useCursorPosition();
  const primaryBtnRef = useMagneticEffect(0.4);
  const secondaryBtnRef = useMagneticEffect(0.3);
  
  // State for the sequential messages
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const messages = [
    "Hi, I'm Dhriman",
    "I specialise in <span class='text-gradient font-intro font-bold'>ML</span> and <span class='text-gradient font-intro font-bold'>Operations Research</span>.",
    "Let's connect for <span class='text-gradient font-intro font-bold'>data-driven innovation</span>!"
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
    return Array.from({ length: 30 }).map((_, i) => {
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
        
        {/* Multiple floating gradient orbs with enhanced animations */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-orange-300/30 via-amber-300/35 to-orange-400/30 dark:from-orange-700/30 dark:via-amber-700/35 dark:to-orange-600/30 blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-l from-amber-400/35 via-orange-400/40 to-amber-500/35 dark:from-amber-600/35 dark:via-orange-600/40 dark:to-amber-700/35 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-orange-300/35 via-amber-300/30 to-orange-400/35 dark:from-orange-700/35 dark:via-amber-700/30 dark:to-orange-600/35 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        
        {/* Additional atmospheric elements */}
        <div className="absolute top-1/2 left-1/6 w-60 h-60 rounded-full bg-gradient-to-tr from-orange-200/35 to-amber-200/35 dark:from-orange-800/35 dark:to-amber-800/35 blur-2xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-2/3 w-48 h-48 rounded-full bg-gradient-to-bl from-amber-300/40 to-orange-300/40 dark:from-amber-700/40 dark:to-orange-700/40 blur-xl animate-float-gentle" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/5 right-1/5 w-32 h-32 rounded-full bg-gradient-to-r from-orange-400/45 to-amber-400/45 dark:from-orange-600/45 dark:to-amber-600/45 blur-lg animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
      </div>
      
      {/* Enhanced main content */}
      <div className="container mx-auto px-6 z-20 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            ref={parallaxContentRef}
            className="relative"
          >
            {/* Enhanced professional badge */}
            <div className="mb-12 inline-block animate-reveal-up">
              <span className="inline-flex items-center px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-orange-100/95 via-amber-100/95 to-orange-100/95 dark:from-orange-900/80 dark:via-amber-900/80 dark:to-orange-900/80 text-orange-800 dark:text-orange-200 backdrop-blur-3xl border-2 border-orange-200/70 dark:border-orange-700/70 shadow-2xl font-league enhanced-glow shimmer-overlay overflow-hidden">
                <Sparkles className="w-5 h-5 mr-3 animate-pulse-glow" />
                Data Scientist & ML Engineer
                <Zap className="w-5 h-5 ml-3 animate-pulse-glow" />
              </span>
            </div>
            
            {/* Main heading with consistent large font size across all lines */}
            <div className="min-h-[220px] flex flex-col items-center justify-center mb-16">
              <h1 
                className={`block font-intro font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gray-900 dark:text-white transition-all duration-700 ease-out leading-[1.1] ${
                  isAnimating ? 'opacity-0 transform translate-y-8 scale-95 blur-sm' : 'opacity-100 transform translate-y-0 scale-100 blur-0'
                }`}
                style={{ 
                  textShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)'
                }}
                dangerouslySetInnerHTML={{ __html: messages[messageIndex] }}
              />
            </div>
            
            {/* Call to action buttons with magnetic effect */}
            <div 
              ref={buttonAnimation.ref}
              className={`mt-20 ${buttonAnimation.animation}`}
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <a 
                  ref={primaryBtnRef as any}
                  href="#projects" 
                  className="group relative inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 text-white shadow-2xl hover:shadow-3xl font-league enhanced-glow shimmer-overlay animate-gradient-shift"
                >
                  <span className="relative z-10 font-league">View My Work</span>
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2 relative z-10" />
                </a>
                
                <a 
                  ref={secondaryBtnRef as any}
                  href="#contact" 
                  className="group inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 bg-white/20 dark:bg-gray-800/50 backdrop-blur-3xl border-3 border-orange-200/50 dark:border-orange-700/50 text-orange-800 dark:text-orange-200 hover:bg-orange-50/40 dark:hover:bg-orange-900/40 hover:border-orange-300/70 dark:hover:border-orange-600/70 font-league enhanced-glow shimmer-overlay overflow-hidden"
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
          const maxForceDistance = 400;
          const forceMultiplier = Math.max(0, 1 - distance / maxForceDistance);
          
          const moveX = dx * forceMultiplier * 0.4;
          const moveY = dy * forceMultiplier * 0.4;
          
          return (
            <div
              key={point.id}
              className="absolute rounded-full transition-all duration-500 ease-out will-change-transform animate-pulse-glow"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: `translate(${moveX}px, ${moveY}px) scale(${1 + forceMultiplier * 2})`,
                opacity: 0.4 + forceMultiplier * 0.6,
                width: (point.id % 4 === 0) ? '10px' : (point.id % 3 === 0) ? '8px' : '6px',
                height: (point.id % 4 === 0) ? '10px' : (point.id % 3 === 0) ? '8px' : '6px',
                background: point.id % 2 === 0 
                  ? `radial-gradient(circle, rgba(255, 191, 64, ${0.8 + forceMultiplier * 0.2}), rgba(249, 115, 22, ${0.5 + forceMultiplier * 0.5}))` 
                  : `radial-gradient(circle, rgba(251, 191, 36, ${0.7 + forceMultiplier * 0.3}), rgba(245, 158, 11, ${0.6 + forceMultiplier * 0.4}))`,
                boxShadow: forceMultiplier > 0.3 ? '0 0 25px rgba(255, 191, 64, 0.9)' : '0 0 10px rgba(255, 191, 64, 0.5)',
                animationDelay: `${point.id * 0.1}s`,
              }}
            />
          );
        })}
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 animate-bounce">
        <span className="text-sm font-league font-bold tracking-wider uppercase text-gray-600 dark:text-gray-400 mb-5">Scroll to explore</span>
        <div className="w-9 h-14 border-4 border-orange-400 dark:border-orange-500 rounded-full flex justify-center bg-white/15 dark:bg-gray-900/25 backdrop-blur-lg shadow-2xl">
          <div className="w-2.5 h-5 bg-gradient-to-b from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 rounded-full mt-2.5 animate-pulse-glow"></div>
        </div>
      </div>
    </section>
  );
}
