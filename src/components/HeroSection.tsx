import { useState, useEffect } from "react";
import { useInView } from "@/lib/animations";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    "Hi, I'm Dhriman",
    "I specialise in ML and Operations Research",
    "Let's connect for data-driven innovation!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-background">
      {/* Neobrutalist geometric background */}
      <div className="absolute inset-0 geometric-grid opacity-10" />
      
      {/* Angular shapes - Neobrutalist style */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary border-6 border-black dark:border-white angular-shape" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary border-6 border-black dark:border-white angular-shape-reverse" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-accent border-6 border-black dark:border-white" />
      
      {/* Main content */}
      <div className="container mx-auto px-6 z-20 relative" ref={ref}>
        <div className="max-w-6xl mx-auto text-center">
          {/* Professional badge - Neobrutalist style */}
          <div className="mb-12">
            <span className="inline-flex items-center px-8 py-4 bg-accent border-5 border-black dark:border-white rounded-sm shadow-brutal text-accent-foreground font-bold uppercase tracking-wider">
              <Sparkles className="w-5 h-5 mr-3" />
              Data Scientist & ML Engineer
              <Zap className="w-5 h-5 ml-3" />
            </span>
          </div>
          
          {/* Main heading - Bold and geometric */}
          <div className="min-h-[200px] flex items-center justify-center mb-16">
            <h1 className="type-h1 text-brutal-shadow uppercase tracking-tight font-black text-foreground">
              {messages[messageIndex]}
            </h1>
          </div>
          
          {/* Call to action buttons - Neobrutalist style */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
            <Button 
              variant="brutal"
              size="lg"
              asChild
            >
              <a href="#projects" className="inline-flex items-center">
                <span className="uppercase">View My Work</span>
                <ArrowRight className="ml-3 w-6 h-6" />
              </a>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              asChild
            >
              <a href="#contact" className="inline-flex items-center">
                <span className="uppercase">Get In Touch</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Neobrutalist style */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-sm font-bold uppercase tracking-wider mb-4">Scroll Down</span>
        <div className="w-6 h-10 border-5 border-black dark:border-white rounded-sm bg-background flex justify-center">
          <div className="w-2 h-3 bg-primary mt-2"></div>
        </div>
      </div>
    </section>
  );
}
