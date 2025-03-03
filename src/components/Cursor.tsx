
import { useEffect, useRef, useState } from "react";

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
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    // Only apply custom cursor on non-touch devices
    if ('ontouchstart' in window) return;

    // Hide default cursor
    document.body.style.cursor = "none";

    const updateCursorPosition = (e: MouseEvent) => {
      // Throttle updates for better performance
      const now = Date.now();
      if (now - lastUpdateTime.current < 16) return; // ~60fps
      lastUpdateTime.current = now;

      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
      
      // Direct DOM manipulation for smoother movement
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleLinkHoverOn = () => setLinkHovered(true);
    const handleLinkHoverOff = () => setLinkHovered(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    document.addEventListener("mousemove", updateCursorPosition, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    // Add event listeners to all links and interactive elements - once at mount
    interactiveElementsRef.current = document.querySelectorAll(
      "a, button, .interactive, input, select, textarea, [role='button']"
    );

    interactiveElementsRef.current.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkHoverOn, { passive: true });
      element.addEventListener("mouseleave", handleLinkHoverOff, { passive: true });
    });

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      if (interactiveElementsRef.current) {
        interactiveElementsRef.current.forEach((element) => {
          element.removeEventListener("mouseenter", handleLinkHoverOn);
          element.removeEventListener("mouseleave", handleLinkHoverOff);
        });
      }
    };
  }, []);

  // Use a more efficient way to detect interactive elements
  useEffect(() => {
    if ('ontouchstart' in window) return; // Skip on touch devices
    
    // Use event delegation instead of attaching listeners to every element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('interactive') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button';
      
      setLinkHovered(isInteractive);
    };
    
    const handleMouseOut = () => {
      setLinkHovered(false);
    };
    
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Skip rendering on touch devices or server-side
  if (typeof window === "undefined" || ('ontouchstart' in window)) return null;

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
