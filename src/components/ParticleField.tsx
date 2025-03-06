
import { useEffect, useRef, useMemo, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  count: number;
  cursorTrail?: boolean;
}

export default function ParticleField({ count = 50, cursorTrail = true }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const lastEmitTimeRef = useRef<number>(0);
  const isActiveRef = useRef<boolean>(true);
  
  // Use a memoized color palette to avoid recreation
  const colors = useMemo(() => [
    "rgba(176, 127, 244, 0.7)", // Purple
    "rgba(245, 158, 11, 0.7)",  // Amber
    "rgba(139, 92, 246, 0.7)",  // Indigo
    "rgba(249, 115, 22, 0.7)",  // Orange
  ], []);

  // Memoized particle creator function
  const createParticle = useCallback((x: number, y: number, fromCursor = false): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = fromCursor ? Math.random() * 2 + 1 : Math.random() * 0.5 + 0.1;
    
    return {
      id: Math.random(),
      x,
      y,
      size: fromCursor ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: fromCursor ? Math.random() * 40 + 20 : Math.random() * 200 + 50
    };
  }, [colors]);

  // Optimized initialization of particles
  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }
    
    particlesRef.current = newParticles;
  }, [count, createParticle]);

  useEffect(() => {
    // Resize handler with performance optimization
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      // Use device pixel ratio for better quality on high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Scale the canvas back to its original size for display
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale the context to match the device pixel ratio
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      
      initParticles();
    };

    // Use throttled mouse move handler
    let lastMouseMoveTime = 0;
    const throttleThreshold = 16; // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMoveTime < throttleThreshold) return;
      lastMouseMoveTime = now;
      
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      // Add particles on mouse move with rate limiting
      if (cursorTrail && now - lastEmitTimeRef.current > 50) {
        lastEmitTimeRef.current = now;
        
        if (particlesRef.current && canvasRef.current) {
          const cursorParticles = [
            createParticle(e.clientX, e.clientY, true),
            createParticle(e.clientX, e.clientY, true)
          ];
          particlesRef.current = [...particlesRef.current, ...cursorParticles];
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Add visibility change listeners to pause animations when tab inactive
    const handleVisibilityChange = () => {
      isActiveRef.current = document.visibilityState === 'visible';
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [cursorTrail, createParticle, initParticles]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    // Optimize animation with proper timing
    let lastFrameTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      if (!isActiveRef.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate elapsed time and skip frames if needed
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp - (elapsed % frameInterval);
      
      // Clear the canvas using a more efficient method
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      const updatedParticles = particlesRef.current.filter(p => p.life < p.maxLife);
      
      // Batch similar operations for better performance
      updatedParticles.forEach(particle => {
        // Apply data gravity effect toward cursor
        const dx = mousePositionRef.current.x - particle.x;
        const dy = mousePositionRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200 && distance > 5) {
          const force = 0.2 / distance;
          particle.vx += dx * force;
          particle.vy += dy * force;
        }
        
        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Increase life
        particle.life += 1;
      });
      
      // Batch all drawing operations
      ctx.save();
      updatedParticles.forEach(particle => {
        // Draw particle
        const opacity = 1 - particle.life / particle.maxLife;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${opacity})`);
        ctx.fill();
      });
      ctx.restore();
      
      // Add new particles to replace those that died
      if (updatedParticles.length < count) {
        const newCount = count - updatedParticles.length;
        for (let i = 0; i < newCount; i++) {
          updatedParticles.push(
            createParticle(
              Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
              Math.random() * (canvas.height / (window.devicePixelRatio || 1))
            )
          );
        }
      }
      
      particlesRef.current = updatedParticles;
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [count, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
