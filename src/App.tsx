
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Optimized QueryClient for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retries for faster failure handling
    },
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);

  // Optimized loading with better performance
  useEffect(() => {
    // Check if the page was already loaded before
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setLoading(false);
      return;
    }
    
    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <LoadingScreen message="Loading Portfolio..." />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
