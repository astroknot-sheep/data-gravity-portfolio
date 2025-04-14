
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");

  // Simulate checking if resources are loaded with sequential messages
  useEffect(() => {
    const messages = [
      "Initializing...",
      "Loading resources...",
      "Preparing experience..."
    ];
    
    let currentIndex = 0;
    const messageInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setLoadingMessage(messages[currentIndex]);
    }, 1000);
    
    const timer = setTimeout(() => {
      clearInterval(messageInterval);
      setLoading(false);
      console.log("App finished loading");
    }, 2500); // Keep loading time reasonable

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  if (loading) {
    return <LoadingScreen message={loadingMessage} />;
  }

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
