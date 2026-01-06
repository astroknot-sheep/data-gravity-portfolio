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
    <footer className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold uppercase text-foreground mb-4">
            DHRIMAN DEKA
          </h2>
          <p className="text-xl text-muted-foreground uppercase tracking-widest">
            Data Scientist & ML Engineer
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center gap-4 mb-12"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                aria-label={social.label}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </motion.div>

        {/* Back to top */}
        <div className="text-center mb-12">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dhriman Deka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
