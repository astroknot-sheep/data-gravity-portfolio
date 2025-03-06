
import { useEffect, useRef, useState, useCallback } from "react";

// Custom hook for detecting elements entering viewport with optimized performance
export function useInView(options = {}, once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentElement = ref.current;
    if (!currentElement) return;

    // Cleanup previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer with optimized callback
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once && currentElement) {
          observerRef.current?.unobserve(currentElement);
        }
      } else if (!once) {
        setIsInView(false);
      }
    }, options);

    observerRef.current.observe(currentElement);

    return () => {
      if (currentElement && observerRef.current) {
        observerRef.current.unobserve(currentElement);
        observerRef.current.disconnect();
      }
    };
  }, [options, once]);

  return { ref, isInView };
}

// Function to apply parallax movement based on mouse position with performance optimization
export function applyParallax(element: HTMLElement, strength: number = 40) {
  if (!element) return () => {};
  
  let lastX = 0;
  let lastY = 0;
  let rafId: number | null = null;
  
  // Use throttled handler for better performance
  const handleMouseMove = (e: MouseEvent) => {
    if (rafId) return; // Skip if animation frame is already scheduled
    
    rafId = requestAnimationFrame(() => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Apply smoothing to make movement less jerky
      const targetX = (e.clientX - centerX) / strength;
      const targetY = (e.clientY - centerY) / strength;
      
      // Apply easing to make movement smoother
      lastX = lastX + (targetX - lastX) * 0.1;
      lastY = lastY + (targetY - lastY) * 0.1;
      
      element.style.transform = `translate(${lastX}px, ${lastY}px)`;
      
      rafId = null;
    });
  };
  
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', handleMouseMove);
  };
}

// Hook to trigger animation once on scroll into view with optimized implementation
export function useScrollAnimation() {
  const { ref, isInView } = useInView({ 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'  // Start animation slightly before entering viewport
  });
  
  // Memoize animation class to avoid recreating on every render
  const animation = isInView ? 'animate-fade-in opacity-100' : 'opacity-0';
  
  return { ref, animation };
}

// Custom hook for tracking cursor position with performance optimizations
export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    let rafId: number | null = null;
    
    const updatePosition = (e: MouseEvent) => {
      // Update ref immediately for direct access
      positionRef.current = { x: e.clientX, y: e.clientY };
      
      // Throttle state updates for better performance
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setPosition(positionRef.current);
          rafId = null;
        });
      }
    };
    
    window.addEventListener('mousemove', updatePosition, { passive: true });
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);
  
  return position;
}

// Create a tilt effect for 3D cards with optimized performance
export function useCardTilt() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let rafId: number | null = null;
    let lastTiltX = 0;
    let lastTiltY = 0;
    const easing = 0.1; // Easing factor for smooth transitions
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return; // Skip if animation frame already scheduled
      
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate target tilt angles
        const targetTiltX = (y - centerY) / 10;
        const targetTiltY = (centerX - x) / 10;
        
        // Apply easing for smooth transitions
        lastTiltX = lastTiltX + (targetTiltX - lastTiltX) * easing;
        lastTiltY = lastTiltY + (targetTiltY - lastTiltY) * easing;
        
        element.style.transform = `perspective(1000px) rotateX(${lastTiltX}deg) rotateY(${lastTiltY}deg)`;
        
        rafId = null;
      });
    };
    
    const handleMouseLeave = () => {
      // Smoothly return to original position
      const resetTransform = () => {
        if (Math.abs(lastTiltX) < 0.1 && Math.abs(lastTiltY) < 0.1) {
          lastTiltX = 0;
          lastTiltY = 0;
          element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
          return;
        }
        
        lastTiltX = lastTiltX * 0.9;
        lastTiltY = lastTiltY * 0.9;
        element.style.transform = `perspective(1000px) rotateX(${lastTiltX}deg) rotateY(${lastTiltY}deg)`;
        
        requestAnimationFrame(resetTransform);
      };
      
      resetTransform();
    };
    
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return ref;
}

// Stagger the animation of multiple elements with optimized approach
export function useStaggeredAnimation(count: number, delay: number = 0.1) {
  // Memoize animation styles to avoid recreating on every render
  return useCallback(() => {
    return Array.from({ length: count }).map((_, index) => ({
      style: {
        animationDelay: `${delay * index}s`,
      },
    }));
  }, [count, delay])();
}
