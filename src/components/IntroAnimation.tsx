import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 900);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground"
            style={{ textTransform: "none" }}
          >
            Dhriman Deka<span className="text-primary">.</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
