
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Publications", href: "#publications" },
    { label: "Contact", href: "#contact" }
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
    scrolled ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md" : "py-6"
  }`;

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
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
              <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`}></div>
              <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
            </button>

            <div 
              className={`fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg transition-all duration-300 transform ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } pt-24`}
            >
              <div className="container mx-auto px-6">
                <ul className="flex flex-col items-center space-y-8">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-2xl font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors link-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
