import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function F1Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/astroknot-sheep", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dhrimandeka", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@dhrimandeka.com", label: "Email" },
  ];

  return (
    <footer className="py-24 border-t border-border relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        {/* Large name display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-foreground leading-[0.85]">
            DHRIMAN<br />
            <span className="text-primary">DEKA</span>
          </h2>
        </motion.div>

        {/* Social & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-3"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} Dhriman Deka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
