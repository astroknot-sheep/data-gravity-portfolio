
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Add mobile-specific fixes on component mount
  useEffect(() => {
    // Check if we're on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                  
    // Check if we're on Android
    const isAndroid = /android/i.test(navigator.userAgent);
    
    // Fix scrolling on iOS & Android
    if (isIOS || isAndroid) {
      // Add mobile class
      document.documentElement.classList.add('mobile-device');
      
      if (isIOS) {
        // Add iOS class 
        document.documentElement.classList.add('ios');
        
        // Force a repaint which can help with black screen issues
        document.body.style.opacity = '0.99';
        setTimeout(() => {
          document.body.style.opacity = '1';
        }, 100);
        
        // iOS viewport fix
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no';
        document.getElementsByTagName('head')[0].appendChild(meta);
        
        // iOS body overflow fix
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
        
        // Make sure root element is scrollable
        const rootElement = document.getElementById('root');
        if (rootElement) {
          rootElement.style.position = 'absolute';
          rootElement.style.top = '0';
          rootElement.style.left = '0';
          rootElement.style.right = '0';
          rootElement.style.bottom = '0';
          rootElement.style.overflowY = 'auto';
          rootElement.style.webkitOverflowScrolling = 'touch';
        }
      }
      
      // Disable animations and effects that may cause performance issues
      document.documentElement.classList.add('reduce-motion');
    }
    
    // Cleanup function
    return () => {
      if (isIOS) {
        document.documentElement.classList.remove('ios');
      }
      if (isIOS || isAndroid) {
        document.documentElement.classList.remove('mobile-device');
        document.documentElement.classList.remove('reduce-motion');
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
