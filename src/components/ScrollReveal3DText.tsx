import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollReveal3DTextProps {
  lines: string[];
  label?: string;
}

function Line({ text, progress, index, total }: { text: string; progress: MotionValue<number>; index: number; total: number }) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, start + 0.15, end - 0.15, end], [0, 1, 1, 0]);
  const rotateX = useTransform(progress, [start, start + 0.2, end - 0.2, end], [60, 0, 0, -60]);
  const y = useTransform(progress, [start, start + 0.2, end - 0.2, end], [80, 0, 0, -80]);
  const scale = useTransform(progress, [start, start + 0.2, end - 0.2, end], [0.85, 1, 1, 0.85]);

  return (
    <motion.h2
      style={{ opacity, rotateX, y, scale, textTransform: "none", transformPerspective: 1000 }}
      className="absolute inset-0 flex items-center justify-center text-center px-6 text-[clamp(2rem,7vw,6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground"
    >
      {text}
    </motion.h2>
  );
}

export default function ScrollReveal3DText({ lines, label }: ScrollReveal3DTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${lines.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {label && (
          <p className="absolute top-10 left-6 lg:left-10 text-xs text-muted-foreground">
            {label}
          </p>
        )}
        <div className="relative w-full h-[60vh]" style={{ perspective: "1000px" }}>
          {lines.map((line, i) => (
            <Line key={i} text={line} progress={scrollYProgress} index={i} total={lines.length} />
          ))}
        </div>
      </div>
    </section>
  );
}