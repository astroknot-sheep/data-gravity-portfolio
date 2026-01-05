import { useEffect, lazy, Suspense } from "react";
import Cursor from "@/components/Cursor";

// Lazy load components for performance
const SpeedLinesBackground = lazy(() => import("@/components/SpeedLinesBackground"));
const F1NavBar = lazy(() => import("@/components/F1NavBar"));
const F1HeroSection = lazy(() => import("@/components/F1HeroSection"));
const F1AboutSection = lazy(() => import("@/components/F1AboutSection"));
const BentoSkillsSection = lazy(() => import("@/components/BentoSkillsSection"));
const HorizontalProjectsSection = lazy(() => import("@/components/HorizontalProjectsSection"));
const F1PublicationsSection = lazy(() => import("@/components/F1PublicationsSection"));
const HorizontalExperienceSection = lazy(() => import("@/components/HorizontalExperienceSection"));
const F1ContactSection = lazy(() => import("@/components/F1ContactSection"));
const MediumBlogSection = lazy(() => import("@/components/MediumBlogSection"));
const F1Footer = lazy(() => import("@/components/F1Footer"));

// F1-style loading spinner
const SectionLoader = () => (
  <div className="flex justify-center items-center py-32">
    <div className="relative">
      <div className="w-12 h-12 border-2 border-primary/20 rounded-full" />
      <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-primary rounded-full animate-spin" />
    </div>
  </div>
);

export default function Index() {
  useEffect(() => {
    // Force dark mode for F1 experience
    document.documentElement.classList.add('dark');
    
    // Set background color immediately
    document.body.style.backgroundColor = 'hsl(0 0% 2%)';
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const navbarHeight = 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Add F1 class for global styling
    document.body.classList.add('f1-portfolio');
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.body.classList.remove('f1-portfolio');
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Custom F1 cursor */}
      <Cursor />
      
      {/* WebGL Speed Lines Background */}
      <Suspense fallback={null}>
        <SpeedLinesBackground />
      </Suspense>
      
      {/* F1 Bottom Dock Navigation */}
      <Suspense fallback={null}>
        <F1NavBar />
      </Suspense>
      
      {/* Main content */}
      <main className="relative z-10">
        {/* Hero - Full screen with 3D depth effect */}
        <Suspense fallback={<SectionLoader />}>
          <F1HeroSection />
        </Suspense>
        
        {/* About - With blob masking effect */}
        <Suspense fallback={<SectionLoader />}>
          <F1AboutSection />
        </Suspense>
        
        {/* Skills - Bento grid with HUD corners */}
        <Suspense fallback={<SectionLoader />}>
          <BentoSkillsSection />
        </Suspense>
        
        {/* Projects - Horizontal scroll dashboard */}
        <Suspense fallback={<SectionLoader />}>
          <HorizontalProjectsSection />
        </Suspense>
        
        {/* Publications */}
        <Suspense fallback={<SectionLoader />}>
          <F1PublicationsSection />
        </Suspense>
        
        {/* Experience - Horizontal scroll timeline */}
        <Suspense fallback={<SectionLoader />}>
          <HorizontalExperienceSection />
        </Suspense>
        
        {/* Contact */}
        <Suspense fallback={<SectionLoader />}>
          <F1ContactSection />
        </Suspense>
        
        {/* Medium Blog Section */}
        <Suspense fallback={<SectionLoader />}>
          <MediumBlogSection />
        </Suspense>
      </main>
      
      {/* Giant F1 Footer with signature */}
      <Suspense fallback={<SectionLoader />}>
        <F1Footer />
      </Suspense>
    </div>
  );
}
