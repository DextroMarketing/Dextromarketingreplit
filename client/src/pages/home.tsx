import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import PainPointsSection from "@/components/pain-points-section";
import ConstructionPortfolioSection from "@/components/construction-portfolio-section";
import WhyChooseUsSection from "@/components/why-choose-us-section";
import TestimonialsSection from "@/components/testimonials-section";
import AboutSection from "@/components/about-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PainPointsSection />
      <ConstructionPortfolioSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}
