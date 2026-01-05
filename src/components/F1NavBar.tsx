import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, Briefcase, Mail, FileText, BookOpen, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "publications", label: "Research", icon: FileText },
  { id: "experience", label: "Experience", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function F1NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 100;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  return (
    <>
      {/* Desktop Bottom Dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="hud-glass hud-corners-large px-2 py-2 flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive ? 'text-background' : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg neon-glow"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                
                {/* Hover glow effect */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                )}
              </motion.button>
            );
          })}
        </div>
        
        {/* HUD decorative elements */}
        <div className="absolute -top-1 left-4 w-8 h-[2px] bg-gradient-to-r from-amber-500/50 to-transparent" />
        <div className="absolute -top-1 right-4 w-8 h-[2px] bg-gradient-to-l from-amber-500/50 to-transparent" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </motion.nav>

      {/* Mobile Floating Menu */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full hud-glass-strong flex items-center justify-center neon-glow"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6 text-amber-400" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu className="w-6 h-6 text-amber-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-16 right-0 hud-glass hud-corners p-3 min-w-[200px]"
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-background' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold uppercase text-sm tracking-wider">{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logo at top */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-6 left-6 z-50"
      >
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="hud-glass px-4 py-2 hud-corners inline-block group"
        >
          <span className="text-lg font-bold uppercase tracking-wider text-gradient-glow group-hover:neon-text transition-all duration-300">
            DD
          </span>
        </a>
      </motion.div>
    </>
  );
}
