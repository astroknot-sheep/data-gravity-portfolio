import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 quick-transition ${
        scrolled 
          ? "py-4 bg-background border-b-5 border-black dark:border-white shadow-brutal" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        <a 
          href="#home" 
          className="text-2xl font-black text-foreground uppercase tracking-tight font-intro"
        >
          DHRIMAN DEKA
        </a>

        {isMobile ? (
          <>
            <button
              onClick={toggleMenu}
              className="p-3 bg-primary border-5 border-black dark:border-white rounded-sm shadow-brutal active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 bg-background border-l-8 border-black dark:border-white pt-28"
                >
                  <div className="container mx-auto px-6">
                    <ul className="flex flex-col items-center space-y-6">
                      {navItems.map((item) => (
                        <li key={item.href} className="w-full">
                          <a
                            href={item.href}
                            className={`text-2xl font-black uppercase block py-4 text-center border-5 rounded-sm ${
                              activeSection === item.href.substring(1)
                                ? "bg-primary border-black dark:border-white shadow-brutal"
                                : "bg-background border-black dark:border-white"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-12 text-center">
                      <Button 
                        variant="brutal"
                        size="lg"
                        onClick={() => {
                          setMenuOpen(false);
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Contact Me
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
                  className={`px-4 py-3 font-bold text-sm uppercase quick-transition ${
                    activeSection === item.href.substring(1)
                      ? "bg-primary text-primary-foreground border-5 border-black dark:border-white rounded-sm shadow-brutal"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Button variant="brutal" size="default" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
