
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      const sections = ["home", "about", "skills", "projects", "publications", "experience", "contact"];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Publications", href: "#publications" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl shadow-2xl border-b border-orange-200/30 dark:border-orange-700/30" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        <a 
          href="#home" 
          className="text-2xl font-bold text-gray-900 dark:text-amber-400 tracking-tight font-intro enhanced-glow"
          aria-label="Dhriman Deka - Go to home section"
        >
          DHRIMAN DEKA
        </a>

        {isMobile ? (
          <>
            <button
              onClick={toggleMenu}
              className="p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/50 enhanced-glassmorphism"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col items-end space-y-2">
                <motion.div 
                  animate={menuOpen ? { rotate: 45, y: 8, width: "28px" } : { rotate: 0, y: 0, width: "28px" }}
                  className="h-1 bg-gray-900 dark:bg-white transition-all rounded-full"
                />
                <motion.div 
                  animate={menuOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: "20px" }}
                  className="h-1 bg-gray-900 dark:bg-white transition-all rounded-full"
                />
                <motion.div 
                  animate={menuOpen ? { rotate: -45, y: -8, width: "28px" } : { rotate: 0, y: 0, width: "14px" }}
                  className="h-1 bg-gray-900 dark:bg-white transition-all rounded-full"
                />
              </div>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="fixed inset-0 z-50 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-700/60 pt-28 backdrop-blur-2xl"
                >
                  <div className="container mx-auto px-6">
                    <ul className="flex flex-col items-center space-y-10">
                      {navItems.map((item) => (
                        <li key={item.href} className="w-full">
                          <a
                            href={item.href}
                            className={`text-3xl font-bold transition-colors block py-3 text-center font-league ${
                              activeSection === item.href.substring(1)
                                ? "text-gradient"
                                : "text-gray-800 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                            {activeSection === item.href.substring(1) && (
                              <motion.span
                                layoutId="mobileActiveIndicator"
                                className="block h-1 bg-gradient-to-r from-orange-500 to-amber-500 mt-2 rounded-full"
                              />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-center mt-16 space-x-6">
                      <a 
                        href="https://github.com/astroknot-sheep" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="GitHub profile"
                        className="p-4 enhanced-glassmorphism rounded-2xl text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors enhanced-glow"
                      >
                        <Github size={24} />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/dhriman-d-b57b76179/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="LinkedIn profile"
                        className="p-4 enhanced-glassmorphism rounded-2xl text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors enhanced-glow"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a 
                        href="mailto:dhriman@example.com" 
                        aria-label="Email me"
                        className="p-4 enhanced-glassmorphism rounded-2xl text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors enhanced-glow"
                      >
                        <Mail size={24} />
                      </a>
                    </div>
                    
                    <div className="mt-16 text-center">
                      <Button 
                        className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 text-white h-14 px-8 font-league font-bold text-lg rounded-2xl shadow-2xl enhanced-glow"
                        onClick={() => {
                          setMenuOpen(false);
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Contact Me
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <ul className="flex items-center space-x-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative px-4 py-3 rounded-full font-bold text-sm transition-colors font-league ${
                    activeSection === item.href.substring(1)
                      ? "text-white dark:text-gray-900"
                      : "text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                  } link-underline`}
                >
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 dark:from-orange-400 dark:via-orange-500 dark:to-amber-400 rounded-full -z-10 shadow-xl"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="ml-4 px-6 py-3 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 text-white rounded-full text-sm font-bold transition-all duration-500 font-league shadow-xl hover:shadow-2xl hover:scale-105 enhanced-glow"
              >
                Contact Me
              </a>
            </li>
          </ul>
        )}
      </div>
    </motion.nav>
  );
}
