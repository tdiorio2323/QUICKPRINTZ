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
      <div id="portfolio" className="px-6 py-[22px]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border-border/50 rounded-[20px] h-96 shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.4)] overflow-hidden">
            <img 
              src="/lovable-uploads/4d0a2941-3ac7-42f0-98cf-84effd87b57b.png" 
              alt="Place Your Order Today" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
