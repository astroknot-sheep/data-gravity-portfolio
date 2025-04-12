
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Simple check based on window width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Run check immediately
    checkMobile();
    
    // Set up listeners for changes
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
    }
  }, []);

  return isMobile;
}
