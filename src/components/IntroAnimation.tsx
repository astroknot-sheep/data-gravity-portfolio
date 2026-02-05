import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"logo" | "reveal" | "complete">("logo");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("reveal"), 1200);
    const timer2 = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center overflow-hidden"
          exit={{ 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background grid that reveals */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              backgroundImage: `
                linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px),
                linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Center logo */}
          <div className="relative">
            {/* DD Monogram */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: phase === "reveal" ? 15 : 1, 
                opacity: phase === "reveal" ? 0 : 1 
              }}
              transition={{ 
                duration: phase === "reveal" ? 1 : 0.5,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="relative"
            >
              <span className="text-8xl md:text-9xl font-bold text-primary tracking-tighter">
                DD
              </span>
              
              {/* Scanning line */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="absolute -bottom-8 left-0 right-0 h-px bg-border overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.2, ease: "linear" }}
              />
            </motion.div>

            {/* System text */}
            <motion.div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "reveal" ? 0 : 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Initializing
              </span>
            </motion.div>
          </div>

          {/* Corner brackets */}
          <motion.div
            className="absolute top-12 left-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-12 border-l-2 border-t-2 border-primary/50" />
          </motion.div>
          <motion.div
            className="absolute top-12 right-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-12 border-r-2 border-t-2 border-primary/50" />
          </motion.div>
          <motion.div
            className="absolute bottom-12 left-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-12 border-l-2 border-b-2 border-primary/50" />
          </motion.div>
          <motion.div
            className="absolute bottom-12 right-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-12 border-r-2 border-b-2 border-primary/50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
