
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import ContactSection from "@/components/ContactSection";
import Cursor from "@/components/Cursor";
import ParticleField from "@/components/ParticleField";

export default function Index() {
  useEffect(() => {
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
    
    return () => {
      document.body.classList.remove('portfolio-page');
    };
  }, []);

  return (
    <div className="relative">
      {/* Custom cursor */}
      <Cursor />
      
      {/* Particle background */}
      <ParticleField count={50} />
      
      {/* Navigation */}
      <NavBar />
      
      {/* Main content sections */}
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <PublicationsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-center text-gray-600 dark:text-gray-400 text-sm">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Data Scientist Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
