import { useEffect, lazy, Suspense } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Cursor from "@/components/Cursor";
import { Linkedin, Github, Mail } from "lucide-react";

// Lazy load sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const MediumBlogSection = lazy(() => import("@/components/MediumBlogSection"));

const SectionLoader = () => (
  <div className="flex justify-center items-center py-32">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Index() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          const navbarHeight = 80;
          const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div className="relative bg-background text-foreground">
      <Cursor />
      <NavBar />
      
      <main>
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
          <ExperienceSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <MediumBlogSection />
        </Suspense>
      </main>
      
      {/* Footer */}
      <footer className="py-12 bg-foreground text-background border-t border-background/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                DHRIMAN <span className="text-primary">DEKA</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-background/60">
                Data Scientist & ML Engineer
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/astroknot-sheep" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/dhrimandeka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contact@dhrimandeka.com"
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} Dhriman Deka. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
