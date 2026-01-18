import { useEffect, lazy, Suspense } from "react";

// Lazy load components for performance
const SpeedLinesBackground = lazy(() => import("@/components/SpeedLinesBackground"));
const F1NavBar = lazy(() => import("@/components/F1NavBar"));
const ScrollHeroSection = lazy(() => import("@/components/ScrollHeroSection"));
const ScrollAboutSection = lazy(() => import("@/components/ScrollAboutSection"));
const ScrollSkillsSection = lazy(() => import("@/components/ScrollSkillsSection"));
const ScrollProjectsSection = lazy(() => import("@/components/ScrollProjectsSection"));
const F1PublicationsSection = lazy(() => import("@/components/F1PublicationsSection"));
const HorizontalExperienceSection = lazy(() => import("@/components/HorizontalExperienceSection"));
const F1ContactSection = lazy(() => import("@/components/F1ContactSection"));
const MediumBlogSection = lazy(() => import("@/components/MediumBlogSection"));
const F1Footer = lazy(() => import("@/components/F1Footer"));

export default function Index() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background */}
      <Suspense fallback={null}>
        <SpeedLinesBackground />
      </Suspense>
      
      {/* Navigation */}
      <Suspense fallback={null}>
        <F1NavBar />
      </Suspense>
      
      {/* Main content - Scroll-driven sections */}
      <main className="relative z-10">
        <Suspense fallback={null}>
          <ScrollHeroSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <ScrollAboutSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <ScrollSkillsSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <ScrollProjectsSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <F1PublicationsSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <HorizontalExperienceSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <F1ContactSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <MediumBlogSection />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <F1Footer />
      </Suspense>
    </div>
  );
}
