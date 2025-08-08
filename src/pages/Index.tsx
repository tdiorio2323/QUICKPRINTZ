import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div id="services">
        <ServicesGrid />
      </div>
      <div id="portfolio" className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="glass-morphism border-primary/20 rounded-[2rem] h-[28rem] shadow-premium hover-lift overflow-hidden">
            <img
              src="/lovable-uploads/4d0a2941-3ac7-42f0-98cf-84effd87b57b.png"
              alt="Place Your Order Today"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
