import { useEffect, lazy, Suspense } from "react";

// Lazy load components for performance
const SmoothCursor = lazy(() => import("@/components/SmoothCursor"));
const FloatingShapes = lazy(() => import("@/components/FloatingShapes"));
const ParallaxBackground = lazy(() => import("@/components/ParallaxBackground"));
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

export default function Index() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground cursor-none">
      {/* Custom cursor */}
      <Suspense fallback={null}>
        <SmoothCursor />
      </Suspense>
      
      {/* 3D Background - lazy loaded */}
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>
      
      {/* Parallax gradient orbs */}
      <Suspense fallback={null}>
        <ParallaxBackground />
      </Suspense>
      
      {/* Navigation */}
      <Suspense fallback={null}>
        <F1NavBar />
      </Suspense>
      
      {/* Main content */}
      <main className="relative z-10">
        <Suspense fallback={null}>
          <F1HeroSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <F1AboutSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <BentoSkillsSection />
        </Suspense>
        
        <Suspense fallback={null}>
          <HorizontalProjectsSection />
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
