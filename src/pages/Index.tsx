import { useEffect } from "react";
import SpeedLinesBackground from "@/components/SpeedLinesBackground";
import F1NavBar from "@/components/F1NavBar";
import F1HeroSection from "@/components/F1HeroSection";
import F1AboutSection from "@/components/F1AboutSection";
import BentoSkillsSection from "@/components/BentoSkillsSection";
import HorizontalProjectsSection from "@/components/HorizontalProjectsSection";
import F1PublicationsSection from "@/components/F1PublicationsSection";
import HorizontalExperienceSection from "@/components/HorizontalExperienceSection";
import F1ContactSection from "@/components/F1ContactSection";
import F1Footer from "@/components/F1Footer";

export default function Index() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background */}
      <SpeedLinesBackground />
      
      {/* Navigation */}
      <F1NavBar />
      
      {/* Main content */}
      <main className="relative z-10">
        <F1HeroSection />
        <F1AboutSection />
        <BentoSkillsSection />
        <HorizontalProjectsSection />
        <F1PublicationsSection />
        <HorizontalExperienceSection />
        <F1ContactSection />
      </main>
      
      <F1Footer />
    </div>
  );
}
