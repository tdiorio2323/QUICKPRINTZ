import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroPackaging from "@/assets/hero-packaging.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroPackaging} 
          alt="Premium Cannabis Packaging"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Cabana Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/7fe280dc-94c6-4de1-80d7-0144c7ed10a7.png" 
            alt="Cabana"
            className="mx-auto max-w-2xl w-full h-auto"
          />
        </div>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Premium cannabis packaging design & automated print-on-demand fulfillment. 
          From custom branding to same-day shipping.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="outline" size="xl" className="backdrop-blur-sm">
            Order Bags Online
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button variant="hero" size="xl" className="group">
            Custom Design Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-border/20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24-48hr</div>
            <div className="text-muted-foreground">Rush Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Brands Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.8%</div>
            <div className="text-muted-foreground">On-Time Delivery</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;