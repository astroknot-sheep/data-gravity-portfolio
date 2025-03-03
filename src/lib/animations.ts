
import { useEffect, useRef, useState } from "react";

// Custom hook for detecting elements entering viewport
export function useInView(options = {}, once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!once) {
        setIsInView(false);
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options, once]);

  return { ref, isInView };
}

// Function to apply parallax movement based on mouse position
export function applyParallax(element: HTMLElement, strength: number = 40) {
  const handleMouseMove = (e: MouseEvent) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const moveX = (e.clientX - centerX) / strength;
    const moveY = (e.clientY - centerY) / strength;
    
    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}

// Hook to trigger animation once on scroll into view
export function useScrollAnimation() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return {
    ref,
    animation: isInView ? 'animate-fade-in opacity-100' : 'opacity-0',
  };
}

// Custom hook for tracking cursor position
export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updatePosition);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);
  
  return position;
}
