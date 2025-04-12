
import { useEffect, lazy, Suspense } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Cursor from "@/components/Cursor";
import { Linkedin } from "lucide-react";

// Lazy load heavier components to improve initial load time
const ParticleField = lazy(() => import("@/components/ParticleField"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const PublicationsSection = lazy(() => import("@/components/PublicationsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
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
    
    // Smooth scroll for anchor links
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
      });
    });
    
    // Add a class to body for styling purposes
    document.body.classList.add('portfolio-page');
    
    // Make sure fonts are properly loaded
    document.body.classList.add('font-league');
    
    // Add responsive viewport meta tag to ensure proper mobile display
    const existingMeta = document.querySelector('meta[name="viewport"]');
    if (existingMeta) {
      existingMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
    
    return () => {
      document.body.classList.remove('portfolio-page');
    };
  }, []);

  return (
    <div className="relative dark">
      {/* Custom cursor */}
      <Cursor />
      
      {/* Lazy load particle background */}
      <Suspense fallback={null}>
        <ParticleField count={30} />
      </Suspense>
      
      {/* Navigation */}
      <NavBar />
      
      {/* Main content sections */}
      <main className="overflow-x-hidden">
        <HeroSection />
        
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        
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
          <ExperienceSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400 text-sm">
        <div className="container mx-auto px-6">
          <div className="mb-4 flex justify-center">
            <a 
              href="https://www.linkedin.com/in/dhriman-d-b57b76179/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p>© {new Date().getFullYear()} Dhriman Deka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
