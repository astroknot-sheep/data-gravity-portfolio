import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Different layers move at different speeds
  const y1 = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(smoothProgress, [0, 1], ["0%", "70%"]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, -30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs with parallax */}
      <motion.div
        style={{ y: y1, rotate: rotate1, scale }}
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-1/3 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-accent/6 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-secondary/5 to-transparent blur-3xl"
      />

      {/* Floating geometric shapes */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[20%] right-[15%] w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[60%] left-[10%] w-24 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />
      <motion.div
        style={{ y: y3, rotate: rotate1 }}
        className="absolute top-[40%] right-[8%] w-3 h-3 border border-primary/20 rotate-45"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[70%] left-[20%] w-2 h-2 bg-primary/10 rounded-full"
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
}
