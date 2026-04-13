import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, User, Code, Briefcase, Mail, FileText, BookOpen, Menu, X } from "lucide-react";

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => item.id);
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsExpanded(false);
  };

  return (
    <>
      {/* Desktop side nav */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative flex items-center"
            >
              <div
                className={`h-px transition-all duration-200 ${
                  isActive ? "bg-primary w-12" : "bg-border w-8 group-hover:bg-muted-foreground group-hover:w-10"
                }`}
              />
              <span
                className={`absolute left-16 text-xs whitespace-nowrap transition-all duration-200 ${
                  isActive ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-100 text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Tablet bottom dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block lg:hidden">
        <div className="bg-card/90 backdrop-blur-md border border-border px-2 py-2 flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-3 transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center"
        >
          {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-16 right-0 bg-card border border-border p-2 min-w-[180px]"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logo */}
      <div
        className={`fixed top-6 right-6 z-50 transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "lg:opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection("home")}
          className="bg-card border border-border px-4 py-2 hover:border-primary transition-colors"
        >
          <span className="text-lg font-bold text-primary">DD</span>
        </button>
      </div>
    </>
  );
}
