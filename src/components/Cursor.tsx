
import { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export default function Cursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [linkHovered, setLinkHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleLinkHoverOn = () => setLinkHovered(true);
    const handleLinkHoverOff = () => setLinkHovered(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add event listeners to all links and interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive, input, select, textarea, [role='button']"
    );

    interactiveElements.forEach((element) => {
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

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleLinkHoverOn);
        element.removeEventListener("mouseleave", handleLinkHoverOff);
      });
    };
  }, []);

  useEffect(() => {
    // Dynamic event listener attachment after component mount
    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, .interactive, input, select, textarea, [role='button']"
      );

      const handleLinkHoverOn = () => setLinkHovered(true);
      const handleLinkHoverOff = () => setLinkHovered(false);

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", handleLinkHoverOn);
        element.addEventListener("mouseleave", handleLinkHoverOff);
      });
    };

    // Call immediately and set up a periodic check for new elements
    updateInteractiveElements();
    const intervalId = setInterval(updateInteractiveElements, 2000);

    return () => clearInterval(intervalId);
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      <div
        className={`cursor-dot ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-75" : ""
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div
        className={`cursor-ring ${hidden ? "opacity-0" : "opacity-100"} ${
          linkHovered ? "scale-150" : ""
        } ${clicked ? "scale-75" : ""}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </>
  );
}
