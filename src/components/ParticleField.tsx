
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

export default function ParticleField({ count = 50, cursorTrail = true }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const lastEmitTime = useRef<number>(0);

  const colors = [
    "rgba(245, 158, 11, 0.7)",  // Amber
    "rgba(249, 115, 22, 0.7)",  // Orange
    "rgba(234, 88, 12, 0.7)",   // Red-Orange
    "rgba(251, 191, 36, 0.7)",  // Yellow
  ];

  const createParticle = (x: number, y: number, fromCursor = false): Particle => {
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
      
      // Add particles on mouse move with rate limiting
      if (cursorTrail && Date.now() - lastEmitTime.current > 50) {
        lastEmitTime.current = Date.now();
        
        if (particlesRef.current) {
          const cursorParticles = [
            createParticle(e.clientX, e.clientY, true),
            createParticle(e.clientX, e.clientY, true)
          ];
          particlesRef.current = [...particlesRef.current, ...cursorParticles];
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const updatedParticles = particlesRef.current.filter(p => p.life < p.maxLife);
      
      updatedParticles.forEach(particle => {
        // Apply data gravity effect toward cursor
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
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
        
        // Draw particle
        const opacity = 1 - particle.life / particle.maxLife;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${opacity})`);
        ctx.fill();
      });
      
      // Add new particles to replace those that died
      if (updatedParticles.length < count) {
        const newCount = count - updatedParticles.length;
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
    
    animate();
    
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
