
import { useEffect, lazy, Suspense, useCallback, useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Cursor from "@/components/Cursor";

// Lazy load heavier components with higher priority
const ParticleField = lazy(() => import("@/components/ParticleField"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));

// Lower priority components that appear later in the page
const PublicationsSection = lazy(() => import("@/components/PublicationsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

// Simple loading component with reduced animation
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Index() {
  // Track visible sections for performance optimization
  const [visibleSections, setVisibleSections] = useState({
    publications: false,
    experience: false,
    contact: false
  });

  // Optimize scroll handling with IntersectionObserver
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id === 'publications' || id === 'experience' || id === 'contact') {
          setVisibleSections(prev => ({ ...prev, [id]: true }));
        }
      }
    });
  }, []);

  useEffect(() => {
    // Set dark mode
    document.documentElement.classList.add('dark');
    
    // Optimized scroll anchor handling
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const anchor = e.currentTarget as HTMLAnchorElement;
      const targetId = anchor.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      // Use native smooth scrolling with behavior hint
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    };
    
    // Improved event delegation for better performance
    document.body.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      if (anchor) {
        handleAnchorClick(new Event('click', { bubbles: true, cancelable: true }));
      }
    });
    
    // Set up intersection observer for lazy loading components
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '100px', // Load slightly before coming into view
      threshold: 0.1
    });
    
    // Observe sections that should be lazy loaded
    ['publications', 'experience', 'contact'].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    // Add a class to body for styling purposes
    document.body.classList.add('portfolio-page');
    document.body.classList.add('font-league');
    
    return () => {
      document.body.classList.remove('portfolio-page');
      observer.disconnect();
    };
  }, [observerCallback]);

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
      
      {/* Main content sections with optimized suspense boundaries */}
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
        
        {/* Conditionally load lower priority sections */}
        <div id="publications">
          {visibleSections.publications && (
            <Suspense fallback={<SectionLoader />}>
              <PublicationsSection />
            </Suspense>
          )}
        </div>
        
        <div id="experience">
          {visibleSections.experience && (
            <Suspense fallback={<SectionLoader />}>
              <ExperienceSection />
            </Suspense>
          )}
        </div>
        
        <div id="contact">
          {visibleSections.contact && (
            <Suspense fallback={<SectionLoader />}>
              <ContactSection />
            </Suspense>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400 text-sm">
        <div className="container mx-auto px-6">
          <div className="mb-4 flex justify-center space-x-6">
            {["github", "linkedin", "twitter"].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label={`${social} profile`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} Dhriman Deka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
