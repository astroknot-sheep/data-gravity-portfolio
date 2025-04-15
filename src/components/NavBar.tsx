
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

  // Close menu when a section is clicked or when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, menuOpen]);

  // Prevent body scroll when mobile menu is open
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        <a 
          href="#home" 
          className="text-xl font-bold text-gray-900 dark:text-amber-400 tracking-tight font-intro"
          aria-label="Dhriman Deka - Go to home section"
        >
          DHRIMAN DEKA
        </a>

        {isMobile ? (
          <>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col items-end space-y-1.5">
                <motion.div 
                  animate={menuOpen ? { rotate: 45, y: 7, width: "24px" } : { rotate: 0, y: 0, width: "24px" }}
                  className="h-0.5 bg-gray-900 dark:bg-white transition-all"
                />
                <motion.div 
                  animate={menuOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: "18px" }}
                  className="h-0.5 bg-gray-900 dark:bg-white transition-all"
                />
                <motion.div 
                  animate={menuOpen ? { rotate: -45, y: -7, width: "24px" } : { rotate: 0, y: 0, width: "12px" }}
                  className="h-0.5 bg-gray-900 dark:bg-white transition-all"
                />
              </div>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-24"
                >
                  <div className="container mx-auto px-6">
                    <ul className="flex flex-col items-center space-y-8">
                      {navItems.map((item) => (
                        <li key={item.href} className="w-full">
                          <a
                            href={item.href}
                            className={`text-2xl font-medium transition-colors block py-2 text-center ${
                              activeSection === item.href.substring(1)
                                ? "text-amber-600 dark:text-amber-400 font-semibold"
                                : "text-gray-800 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                            {activeSection === item.href.substring(1) && (
                              <motion.span
                                layoutId="mobileActiveIndicator"
                                className="block h-0.5 bg-amber-500 mt-1"
                              />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-center mt-12 space-x-4">
                      <a 
                        href="https://github.com/astroknot-sheep" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="GitHub profile"
                        className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-amber-400 dark:hover:bg-amber-500 hover:text-gray-900 dark:hover:text-gray-900 transition-colors"
                      >
                        <Github size={20} />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/dhriman-d-b57b76179/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="LinkedIn profile"
                        className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-amber-400 dark:hover:bg-amber-500 hover:text-gray-900 dark:hover:text-gray-900 transition-colors"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a 
                        href="mailto:dhriman@example.com" 
                        aria-label="Email me"
                        className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-amber-400 dark:hover:bg-amber-500 hover:text-gray-900 dark:hover:text-gray-900 transition-colors"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                    
                    <div className="mt-12 text-center">
                      <Button 
                        className="bg-amber-600 hover:bg-amber-700 text-white h-12 px-6"
                        onClick={() => {
                          setMenuOpen(false);
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Contact Me
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative px-3 py-2 rounded-full font-medium text-sm transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-white dark:text-gray-900"
                      : "text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                  } link-underline`}
                >
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute inset-0 bg-amber-500 dark:bg-amber-400 rounded-full -z-10"
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
                className="ml-3 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm font-medium transition-colors"
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
