
import { useEffect, useRef, useState } from "react";

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

export default function ParticleField({ count = 30, cursorTrail = true }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const lastEmitTime = useRef<number>(0);

  const colors = [
    "rgba(176, 127, 244, 0.7)", // Purple
    "rgba(245, 158, 11, 0.7)",  // Amber
  ];

  const createParticle = (x: number, y: number, fromCursor = false): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = fromCursor ? Math.random() * 2 + 1 : Math.random() * 0.5 + 0.1;
    
    return {
      id: Math.random(),
      x,
      y,
      size: fromCursor ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: fromCursor ? Math.random() * 30 + 15 : Math.random() * 150 + 50
    };
  };

  const initParticles = () => {
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
  };

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add particles on mouse move with rate limiting (slower emission rate)
      if (cursorTrail && Date.now() - lastEmitTime.current > 100) { // Increased from 50 to 100ms for performance
        lastEmitTime.current = Date.now();
        
        if (particlesRef.current) {
          const cursorParticle = createParticle(e.clientX, e.clientY, true);
          particlesRef.current = [...particlesRef.current, cursorParticle];
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [cursorTrail]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;

    let lastAnimTime = 0;
    const animInterval = 1000 / 40; // Cap at 40fps for better performance

    const animate = (timestamp: number) => {
      // Frame rate limiting for better performance
      if (timestamp - lastAnimTime < animInterval) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      lastAnimTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const updatedParticles = particlesRef.current.filter(p => p.life < p.maxLife);
      
      updatedParticles.forEach(particle => {
        // Apply data gravity effect toward cursor
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150 && distance > 5) { // Reduced from 200 to 150 for performance
          const force = 0.15 / distance;
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
        
        // Draw particle
        const opacity = 1 - particle.life / particle.maxLife;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${opacity})`);
        ctx.fill();
      });
      
      // Add new particles to replace those that died (with a limit on total particles)
      if (updatedParticles.length < count) {
        const newCount = Math.min(3, count - updatedParticles.length); // Add at most 3 at once
        for (let i = 0; i < newCount; i++) {
          updatedParticles.push(
            createParticle(
              Math.random() * canvas.width,
              Math.random() * canvas.height
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
  }, [count, mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
