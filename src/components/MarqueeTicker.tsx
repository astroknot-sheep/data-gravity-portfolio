import { motion } from "framer-motion";

interface MarqueeTickerProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export default function MarqueeTicker({ 
  items, 
  direction = "left", 
  speed = 30,
  className = ""
}: MarqueeTickerProps) {
  const repeatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-8"
        animate={{ 
          x: direction === "left" ? [0, -50 * items.length + "%"] : [-50 * items.length + "%", 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
      >
        {repeatedItems.map((item, index) => (
          <span 
            key={index} 
            className="inline-flex items-center gap-8 text-7xl md:text-8xl lg:text-9xl font-bold uppercase text-foreground/5 select-none"
          >
            {item}
            <span className="text-primary/20">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
