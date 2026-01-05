import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function F1Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathLength, setPathLength] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPathLength(Math.min(latest * 2, 1));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/astroknot-sheep", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dhrimandeka", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@dhrimandeka.com", label: "Email" },
  ];

  return (
    <footer 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 f1-grid opacity-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <motion.div 
        style={{ opacity, y }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Giant signature */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            {/* SVG Signature animation */}
            <svg 
              viewBox="0 0 400 100" 
              className="w-full max-w-xl mx-auto h-24 md:h-32"
            >
              <defs>
                <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(38 100% 50%)" />
                  <stop offset="100%" stopColor="hsl(25 100% 50%)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M20,70 C30,30 50,20 80,50 C110,80 120,30 150,50 C180,70 190,40 220,50 C250,60 260,30 290,50 C320,70 340,40 380,50"
                fill="none"
                stroke="url(#signatureGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength }}
                transition={{ duration: 0.1 }}
                style={{ filter: "drop-shadow(0 0 10px hsl(38 100% 50% / 0.5))" }}
              />
            </svg>

            {/* Name text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-intro uppercase text-gradient-glow mt-8"
            >
              DHRIMAN DEKA
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-xl text-muted-foreground mt-4 uppercase tracking-widest"
            >
              Data Scientist & ML Engineer
            </motion.p>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 mb-12"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-xl hud-glass hud-corners flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-glow transition-all"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Back to top */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mb-12"
        >
          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 hud-glass hud-corners text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -3 }}
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </motion.button>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dhriman Deka. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            Built with React, Three.js & Framer Motion
          </p>
        </motion.div>

        {/* HUD corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-lg" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-lg" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-lg" />
      </motion.div>
    </footer>
  );
}
