
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "experience", "publications", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Publications", href: "#publications" },
    { label: "Contact", href: "#contact" }
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled ? "py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "py-6"
  }`;

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          className="text-xl font-bold text-amber-800 dark:text-amber-400 tracking-tight interactive font-league"
        >
          DHRIMAN DEKA
        </a>

        {isMobile ? (
          <>
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 z-50"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-end">
                <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}></div>
                <div className={`w-4 h-0.5 bg-current mb-1.5 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}></div>
                <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}></div>
              </div>
            </button>

            {/* Mobile menu overlay */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  className="fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg pt-24"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                >
                  <div className="container mx-auto px-6">
                    <ul className="flex flex-col items-center space-y-8">
                      {navItems.map((item) => (
                        <motion.li key={item.href} variants={itemVariants}>
                          <a
                            href={item.href}
                            className={`text-2xl font-medium transition-colors ${
                              activeSection === item.href.substring(1)
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 
                    ${activeSection === item.href.substring(1) 
                      ? "text-amber-600 dark:text-amber-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-amber-500" 
                      : "text-gray-700 dark:text-gray-300"}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="#contact"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors shadow-md hover:shadow-lg font-medium"
              >
                Hire Me
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
