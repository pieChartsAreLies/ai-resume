import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowILeadSection from "@/components/HowILeadSection";
import ProjectsSection from "@/components/ProjectsSection";
import AIPhilosophySection from "@/components/AIPhilosophySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CareerSection from "@/components/CareerSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowILeadSection />
      <AIPhilosophySection />
      <ProjectsSection />
      <TestimonialsSection />
      <CareerSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
