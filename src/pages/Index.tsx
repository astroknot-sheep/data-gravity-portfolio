
import { useEffect, lazy, Suspense } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Cursor from "@/components/Cursor";

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
              href="https://x.com/kaiser135971256" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors"
              aria-label="X profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M14.2 2.875a4.625 4.625 0 0 0-4.625 4.625v.1A9.98 9.98 0 0 0 4.95 12a9.969 9.969 0 0 0 0 9.95v.05h6.675v-.075a9.965 9.965 0 0 0 5.425-2.75v-7.1a9.984 9.984 0 0 0-1.05-4.5A4.624 4.624 0 0 0 14.2 2.875Z"/>
                <path d="M23.275 12c0 3.925-2.25 7.35-5.55 9v-2.025a7.982 7.982 0 0 0 3.525-6.975c0-2.7-1.35-5.1-3.4-6.55a6.668 6.668 0 0 1 1.45 4.225v.1A7.988 7.988 0 0 1 19.5 13.5v4.15a9.967 9.967 0 0 0 1.7-5.65c0-5.525-4.475-10-10-10a9.963 9.963 0 0 0-8.65 5h2.85A4.625 4.625 0 0 1 14.2 2.875c2.55 0 4.625 2.075 4.625 4.625v.1a9.986 9.986 0 0 0-2.575-4.725A7.948 7.948 0 0 0 12 2c-5.525 0-10 4.475-10 10a9.974 9.974 0 0 0 2.95 7.1 9.996 9.996 0 0 0 4.15 2.85v-2.025a7.95 7.95 0 0 1-5.075-7.425 8.025 8.025 0 0 1 5.075-7.45 7.959 7.959 0 0 1 8.55 1.725A7.976 7.976 0 0 1 20 12a7.927 7.927 0 0 1-1.525 4.625 3.05 3.05 0 0 0-.55-.85L15.8 13.65c-.55-.55-.85-1.275-.85-2.05s.3-1.5.85-2.05l2.125-2.125c.225-.225.35-.525.35-.85a1.163 1.163 0 0 0-.35-.85 1.163 1.163 0 0 0-.85-.35c-.325 0-.625.125-.85.35l-2.125 2.125c-.55.55-1.275.85-2.05.85s-1.5-.3-2.05-.85L8.85 6.6c-.225-.225-.525-.35-.85-.35-.325 0-.625.125-.85.35-.225.225-.35.525-.35.85 0 .325.125.625.35.85l2.125 2.125c.55.55.85 1.275.85 2.05s-.3 1.5-.85 2.05l-2.125 2.125c-.225.225-.35.525-.35.85 0 .325.125.625.35.85.225.225.525.35.85.35.325 0 .625-.125.85-.35l2.125-2.125c.55-.55 1.275-.85 2.05-.85s1.5.3 2.05.85l2.125 2.125c.225.225.525.35.85.35.325 0 .625-.125.85-.35.225-.225.35-.525.35-.85a1.163 1.163 0 0 0-.35-.85Z"/>
              </svg>
            </a>
          </div>
          <p>© {new Date().getFullYear()} Dhriman Deka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
