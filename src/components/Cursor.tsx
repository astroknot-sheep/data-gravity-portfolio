
import { useEffect, useRef, useState, useCallback } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export default function Cursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [linkHovered, setLinkHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const interactiveElementsRef = useRef<NodeListOf<Element> | null>(null);
  
  // Memoize event handlers for better performance
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setHidden(false);
    
    // Direct DOM manipulation for smoother performance
    if (dotRef.current && ringRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  }, []);

  const handleLinkHoverOn = useCallback(() => setLinkHovered(true), []);
  const handleLinkHoverOff = useCallback(() => setLinkHovered(false), []);
  const handleMouseDown = useCallback(() => setClicked(true), []);
  const handleMouseUp = useCallback(() => setClicked(false), []);
  const handleMouseLeave = useCallback(() => setHidden(true), []);
  const handleMouseEnter = useCallback(() => setHidden(false), []);

  useEffect(() => {
    // Skip effect in SSR environment
    if (typeof window === "undefined") return;
    
    document.body.style.cursor = "none";

    document.addEventListener("mousemove", updateCursorPosition, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    // Optimized selector for interactive elements
    interactiveElementsRef.current = document.querySelectorAll(
      "a, button, .interactive, input, select, textarea, [role='button']"
    );

    const currentElements = interactiveElementsRef.current;
    if (currentElements) {
      currentElements.forEach((element) => {
        element.addEventListener("mouseenter", handleLinkHoverOn);
        element.addEventListener("mouseleave", handleLinkHoverOff);
      });
    }

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      if (currentElements) {
        currentElements.forEach((element) => {
          element.removeEventListener("mouseenter", handleLinkHoverOn);
          element.removeEventListener("mouseleave", handleLinkHoverOff);
        });
      }
    };
  }, [
    updateCursorPosition, 
    handleLinkHoverOn, 
    handleLinkHoverOff, 
    handleMouseDown, 
    handleMouseUp, 
    handleMouseLeave, 
    handleMouseEnter
  ]);

  // Optimized mutation observer to detect new interactive elements
  useEffect(() => {
    const updateInteractiveElements = useCallback(() => {
      if (interactiveElementsRef.current) {
        const oldElements = interactiveElementsRef.current;
        
        // Remove old event listeners to prevent memory leaks
        oldElements.forEach((element) => {
          element.removeEventListener("mouseenter", handleLinkHoverOn);
          element.removeEventListener("mouseleave", handleLinkHoverOff);
        });
      }
      
      // Update with fresh elements
      interactiveElementsRef.current = document.querySelectorAll(
        "a, button, .interactive, input, select, textarea, [role='button']"
      );
  
      if (interactiveElementsRef.current) {
        interactiveElementsRef.current.forEach((element) => {
          element.addEventListener("mouseenter", handleLinkHoverOn);
          element.addEventListener("mouseleave", handleLinkHoverOff);
        });
      }
    }, [handleLinkHoverOn, handleLinkHoverOff]);
  
    // Use a more performance-optimized observer configuration
    const observer = new MutationObserver(updateInteractiveElements);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false,
      characterData: false
    });
  
    // Initial setup
    updateInteractiveElements();
  
    return () => observer.disconnect();
  }, [handleLinkHoverOn, handleLinkHoverOff]);

  // Skip rendering on server
  if (typeof window === "undefined") return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot will-change-transform ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-75" : ""
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring will-change-transform ${hidden ? "opacity-0" : "opacity-100"} ${
          linkHovered ? "scale-150" : ""
        } ${clicked ? "scale-75" : ""}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </>
  );
}
