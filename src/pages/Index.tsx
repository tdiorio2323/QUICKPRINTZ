import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";
import PODConfigurator from "@/components/PODConfigurator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div id="services">
        <ServicesGrid />
      </div>
      <div id="portfolio">
        <PortfolioSlideshow />
      </div>
      <PODConfigurator />
      <Footer />
    </div>
  );
};

export default Index;
