import { motion } from "framer-motion";

interface GiantMarqueeProps {
  text?: string;
  reverse?: boolean;
}

export default function GiantMarquee({
  text = "Dhriman Deka — data science & machine learning — ",
  reverse = false,
}: GiantMarqueeProps) {
  const items = Array.from({ length: 6 });
  return (
    <div className="overflow-hidden border-y border-border/40 py-6 lg:py-10 select-none">
      <motion.div
        className="flex shrink-0 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {items.concat(items).map((_, i) => (
          <span
            key={i}
            className="text-[clamp(3rem,12vw,11rem)] font-medium leading-none tracking-[-0.04em] pr-8 text-foreground/90"
            style={{
              textTransform: "none",
              WebkitTextStroke: i % 2 === 1 ? "1px hsl(var(--foreground))" : undefined,
              color: i % 2 === 1 ? "transparent" : undefined,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}