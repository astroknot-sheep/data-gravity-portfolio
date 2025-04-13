
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      if (!isLoaded) setIsLoaded(true)
    }
    
    // Run initial check
    checkMobile()
    
    // Add event listener for resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern event listener for MediaQueryList
    const onChange = () => checkMobile()
    mql.addEventListener("change", onChange)
    
    // Cleanup
    return () => mql.removeEventListener("change", onChange)
  }, [isLoaded])

  return isMobile
}
