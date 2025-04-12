
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to determine if device is mobile
    const checkMobile = () => {
      // Check viewport width
      const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT;
      
      // Check for touch capability as a secondary signal
      const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          // @ts-ignore - vendor prefixed property
                          (navigator.msMaxTouchPoints > 0);
      
      // For most cases, we just use the viewport width
      setIsMobile(isMobileViewport);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern approach using addEventListener
    const onChange = () => {
      checkMobile();
    }
    
    // Run check immediately
    checkMobile();
    
    // Use standard event listener
    mql.addEventListener("change", onChange);
    
    // Check on resize as well
    window.addEventListener("resize", onChange);
    
    // Cleanup
    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    }
  }, [])

  // Default to false if undefined (server-side rendering)
  return isMobile ?? false;
}
