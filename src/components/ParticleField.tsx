
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParticleFieldProps {
  count: number;
}

export default function ParticleField({ count = 50 }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  // Reduce particle count on mobile for better performance
  const actualCount = isMobile ? Math.floor(count / 3) : count;

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Colors for particles
    const colors = [
      "rgba(176, 127, 244, 0.7)", // Purple
      "rgba(245, 158, 11, 0.7)",  // Amber
      "rgba(139, 92, 246, 0.7)",  // Indigo
      "rgba(249, 115, 22, 0.7)",  // Orange
    ];
    
    // Particle object
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Loop around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    
    // Array to hold all particles
    let particles: Particle[] = [];
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < actualCount; i++) {
        particles.push(new Particle());
      }
    };
    
    // Animation function
    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    animate();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [actualCount, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
