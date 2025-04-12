
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Function to determine if device is mobile
    const checkMobile = () => {
      // Primary check: viewport width
      const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT;
      
      // Secondary signals
      const isTouchDevice = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0;
      
      // User agent check for iOS and Android (more reliable for iOS detection)
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      
      // Consider iOS and Android as mobile regardless of viewport
      const isMobileDevice = isIOS || isAndroid;
      
      // For most cases, combine viewport with device detection
      setIsMobile(isMobileViewport || isMobileDevice);
    };

    // Set up media query listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      checkMobile();
    }
    
    // Run check immediately
    checkMobile();
    
    // Use standard event listener
    mql.addEventListener("change", onChange);
    
    // Check on resize as well
    window.addEventListener("resize", onChange);
    
    // Check on orientation change (important for mobile)
    window.addEventListener("orientationchange", onChange);
    
    // Cleanup
    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("orientationchange", onChange);
    }
  }, [])

  return isMobile;
}
