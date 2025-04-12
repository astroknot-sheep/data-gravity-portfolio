
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  // Return null immediately if on mobile - prevents any cursor effects on touch devices
  if (isMobile) return null;

  useEffect(() => {
    // Skip cursor effects on mobile
    if (isMobile) {
      document.body.style.cursor = "auto";
      return () => {}; // Empty cleanup for mobile
    }

    // Hide default cursor
    document.body.style.cursor = "none";

    const updateCursorPosition = (e: MouseEvent) => {
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
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add event listeners to all links and interactive elements
    interactiveElementsRef.current = document.querySelectorAll(
      "a, button, .interactive, input, select, textarea, [role='button']"
    );

    interactiveElementsRef.current.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkHoverOn);
      element.addEventListener("mouseleave", handleLinkHoverOff);
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
  }, [isMobile]);

  // Return null for mobile
  if (isMobile) return null;

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
