
import { useEffect, useRef, useState, useCallback } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export default function Cursor() {
  const [hidden, setHidden] = useState(true);
  const [linkHovered, setLinkHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const interactiveElementsRef = useRef<NodeListOf<Element> | null>(null);
  const posRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const targetRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const handleLinkHoverOn = useCallback(() => setLinkHovered(true), []);
  const handleLinkHoverOff = useCallback(() => setLinkHovered(false), []);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

    const animate = () => {
      const ease = 0.2;
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, ease);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, ease);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => {
      setHidden(true);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    const handleMouseEnter = () => {
      setHidden(false);
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add event listeners to all links and interactive elements - once at mount
    interactiveElementsRef.current = document.querySelectorAll(
      "a, button, .interactive, input, select, textarea, [role='button']"
    );

    interactiveElementsRef.current.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkHoverOn);
      element.addEventListener("mouseleave", handleLinkHoverOff);
    });

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
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

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [handleLinkHoverOn, handleLinkHoverOff]);

  // Mutation observer to detect new interactive elements
  useEffect(() => {
    const updateInteractiveElements = () => {
      if (interactiveElementsRef.current) {
        interactiveElementsRef.current.forEach((element) => {
          element.removeEventListener("mouseenter", handleLinkHoverOn);
          element.removeEventListener("mouseleave", handleLinkHoverOff);
        });
      }

      interactiveElementsRef.current = document.querySelectorAll(
        "a, button, .interactive, input, select, textarea, [role='button']"
      );

      if (interactiveElementsRef.current) {
        interactiveElementsRef.current.forEach((element) => {
          element.addEventListener("mouseenter", handleLinkHoverOn);
          element.addEventListener("mouseleave", handleLinkHoverOff);
        });
      }
    };

    const observer = new MutationObserver(updateInteractiveElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial setup
    updateInteractiveElements();

    return () => {
      observer.disconnect();
      if (interactiveElementsRef.current) {
        interactiveElementsRef.current.forEach((element) => {
          element.removeEventListener("mouseenter", handleLinkHoverOn);
          element.removeEventListener("mouseleave", handleLinkHoverOff);
        });
      }
    };
  }, [handleLinkHoverOn, handleLinkHoverOff]);

  if (typeof window === "undefined") return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot will-change-transform ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-75" : ""
        }`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring will-change-transform ${hidden ? "opacity-0" : "opacity-100"} ${
          linkHovered ? "scale-150" : ""
        } ${clicked ? "scale-75" : ""}`}
      />
    </>
  );
}
