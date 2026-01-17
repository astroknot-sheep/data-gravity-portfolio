import { motion } from "framer-motion";

// Dynamic, cinematic background inspired by F1/HUD aesthetic
export default function SpeedLinesBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      
      {/* Animated grid with perspective */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      />
      
      {/* Diagonal speed lines */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            style={{
              width: '200%',
              top: `${15 + i * 20}%`,
              left: '-50%',
              transform: 'rotate(-5deg)',
            }}
            animate={{
              x: ['-10%', '10%'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Ambient glow orbs */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 100%)'
        }}
      />
    </div>
  );
}
