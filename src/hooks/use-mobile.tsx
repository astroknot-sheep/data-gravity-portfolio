
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(true); // Default to true for SSR

  React.useEffect(() => {
    // Function to determine if device is mobile
    const checkMobile = () => {
      // Check user agent first (most reliable for iOS)
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent) || 
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isAndroid = /android/.test(userAgent);
      
      // Device detection
      const isMobileDevice = isIOS || isAndroid || window.innerWidth < MOBILE_BREAKPOINT;
      
      // Touch capability detection
      const isTouchDevice = 'ontouchstart' in window || 
                           navigator.maxTouchPoints > 0;
      
      // Set mobile if any of these conditions are true
      setIsMobile(isMobileDevice || isTouchDevice);
      
      // Apply mobile class to document for global styling
      if (isMobileDevice || isTouchDevice) {
        document.documentElement.classList.add('mobile-device');
      } else {
        document.documentElement.classList.remove('mobile-device');
      }
    };

    // Run check immediately
    checkMobile();
    
    // Set up listeners for changes
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    }
  }, []);

  return isMobile;
}
