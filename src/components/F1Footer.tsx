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

  const nameLetters = "DHRIMAN".split("");
  const lastNameLetters = "DEKA".split("");

  return (
    <footer className="py-24 border-t border-border relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--primary) / 0.05) 0%, transparent 100%)"
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-6 relative">
        {/* Large animated name display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* First name with letter animation */}
          <div className="overflow-hidden flex justify-center">
            {nameLetters.map((letter, index) => (
              <motion.span
                key={`first-${index}`}
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: [0.33, 1, 0.68, 1]
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-foreground leading-[0.85] inline-block"
                whileHover={{ 
                  color: "hsl(var(--primary))",
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* Last name with letter animation */}
          <div className="overflow-hidden flex justify-center">
            {lastNameLetters.map((letter, index) => (
              <motion.span
                key={`last-${index}`}
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.05,
                  ease: [0.33, 1, 0.68, 1]
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-primary leading-[0.85] inline-block"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Social & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Social links with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-3"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors relative overflow-hidden group"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Icon className="w-5 h-5 relative z-10 group-hover:text-primary-foreground transition-colors" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Back to top with animation */}
          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -2 }}
          >
            <span>Back to Top</span>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Copyright with reveal animation */}
        <motion.div 
          className="mt-16 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.p 
            className="text-xs text-muted-foreground uppercase tracking-widest"
            whileHover={{ color: "hsl(var(--foreground))" }}
          >
            © {new Date().getFullYear()} Dhriman Deka. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
