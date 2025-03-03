
import { useEffect, lazy, Suspense } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Cursor from "@/components/Cursor";

// Lazy load heavier components to improve initial load time
const ParticleField = lazy(() => import("@/components/ParticleField"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const PublicationsSection = lazy(() => import("@/components/PublicationsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

// Simple loading component
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Index() {
  useEffect(() => {
    // Set dark mode
    document.documentElement.classList.add('dark');
    
    // Smooth scroll for anchor links with passive event listeners for better performance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const navbarHeight = 80; // Approximate navbar height
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, { passive: false });
    });
    
    return () => {
      // Clean up event listeners (though this won't run often as Index is the main page)
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="relative dark">
      {/* Custom cursor */}
      <Cursor />
      
      {/* Lazy load particle background with reduced particle count */}
      <Suspense fallback={null}>
        <ParticleField count={20} />
      </Suspense>
      
      {/* Navigation */}
      <NavBar />
      
      {/* Main content sections */}
      <main>
        <HeroSection />
        
        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <PublicationsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400 text-sm font-league">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Dhriman Deka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
