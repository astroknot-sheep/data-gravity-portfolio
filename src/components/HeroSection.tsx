
import { useRef, useState } from "react";
import ThreeCanvas from "./ThreeCanvas";

export default function HeroSection() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  
  const messages = [
    "Hi, I'm Dhriman",
    "I specialise in <span class='text-amber-500 font-semibold'>ML</span> and <span class='text-amber-500 font-semibold'>Operations Research</span>.",
    "Let's connect for <span class='text-amber-500 font-semibold'>data-driven innovation</span>!"
  ];

  // Function to cycle through messages
  const cycleMessage = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-20">
      {/* Three.js background */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas />
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-amber-100/30 via-transparent to-transparent dark:from-amber-900/15" />
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={parallaxContentRef} className="relative">
            {/* Badge */}
            <span className="chip mb-4 inline-block px-4 py-1 text-sm bg-amber-900/20 text-amber-200 backdrop-blur-sm">
              Data Scientist & ML Engineer
            </span>
            
            {/* Message display */}
            <div className="min-h-[160px] md:min-h-[220px] flex flex-col items-center justify-center">
              <h1 
                className={`block font-bold text-gray-900 dark:text-white font-league text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl transition-opacity duration-500 ${
                  isAnimating ? 'opacity-0 transform translate-y-5' : 'opacity-100 transform translate-y-0'
                }`}
                dangerouslySetInnerHTML={{ __html: messages[messageIndex] }}
                onClick={cycleMessage}
              />
            </div>
            
            {/* Call to action */}
            <div className="mt-8 md:mt-12">
              <a 
                href="#projects" 
                className="interactive glassmorphism px-6 py-3 md:px-8 md:py-4 text-base md:text-lg text-amber-800 dark:text-amber-200 font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-league border border-amber-500/30"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
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
