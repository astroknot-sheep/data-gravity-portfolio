import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "publications", label: "Writing" },
  { id: "experience", label: "CV" },
  { id: "contact", label: "Contact" },
];

export default function F1NavBar() {
  const [active, setActive] = useState("home");
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(t);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const ids = ["home", ...navItems.map((i) => i.id)];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2"
          style={{ textTransform: "none" }}
        >
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full" />
          Dhriman Deka
        </button>

        <nav className="hidden md:flex items-center gap-7 text-xs font-mono-ui">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`transition-colors ${
                active === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ textTransform: "lowercase" }}
            >
              {item.label}
            </button>
          ))}
          <span className="text-muted-foreground/60 tabular-nums pl-2 border-l border-border/40">
            blr {time}
          </span>
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="md:hidden text-xs font-mono-ui text-primary"
          style={{ textTransform: "lowercase" }}
        >
          contact ↗
        </button>
      </div>
    </motion.header>
  );
}
