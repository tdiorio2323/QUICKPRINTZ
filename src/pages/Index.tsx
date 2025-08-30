import Navigation from "@/components/Navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import QuickContactForm from "@/components/QuickContactForm";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const host = typeof window !== 'undefined' ? window.location.hostname : "";
    const hostMap: Record<string, string> = {
      "bagman.tdstudioshq.com": "Bagman",
      "tdstudioshq.com": "TD Studios",
      "www.tdstudioshq.com": "TD Studios",
      // Add more subdomain -> client name mappings here as needed
    };
    const client = hostMap[host];
    if (client) {
      navigate(`/auth?client=${encodeURIComponent(client)}`, { replace: true });
    }
  }, [navigate]);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quick Printz",
    "url": "https://quickprintz.com",
    "sameAs": ["https://instagram.com/quickprintz"],
    "description": "#1 Independent Cannabis Packaging Agency - More Than Print, We Build Brands. Custom design & automated POD fulfillment."
  };

  return (
    <div className="min-h-screen relative">
      {/* Unified Scroll-Responsive Background */}
      <div className="fixed inset-0 z-0 scroll-bg">
        {/* Dynamic gradient that changes with scroll */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background"></div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse floating-element" data-speed="0.5"></div>
          <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-accent/25 rounded-full blur-3xl animate-pulse delay-1000 floating-element" data-speed="0.3"></div>
          <div className="absolute top-[70%] left-[20%] w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse delay-2000 floating-element" data-speed="0.7"></div>
          <div className="absolute top-[90%] right-[30%] w-64 h-64 bg-accent/15 rounded-full blur-3xl animate-pulse delay-3000 floating-element" data-speed="0.4"></div>
        </div>
        
        {/* Scroll-responsive pattern overlay */}
        <div 
          className="absolute inset-0 opacity-30 scroll-pattern"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, hsl(var(--accent) / 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px',
          }}
        ></div>
        
        {/* Dynamic mesh gradient */}
        <div className="absolute inset-0 opacity-40 mesh-gradient"></div>
      </div>

      <div className="relative z-10">
        <SEO
          title="Premium Cannabis Packaging Agency"
          description="#1 Independent Cannabis Packaging Agency - More Than Print, We Build Brands. Custom design & automated POD fulfillment."
          jsonLd={organizationSchema}
        />
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
                alt="BUY BAGS Today"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <Footer />
        <QuickContactForm />
      </div>
    </div>
  );
};

export default Index;
