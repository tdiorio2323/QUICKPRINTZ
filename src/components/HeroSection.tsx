import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import lightningBg from "@/assets/lightning-yellow-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={lightningBg} 
          alt="Lightning Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Quick Printz Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/1eedce7b-3acd-4662-a3c3-5bc1320d31e8.png" 
            alt="Quick Printz"
            className="mx-auto max-w-md w-full h-auto rounded-3xl"
          />
        </div>


        {/* Services Text */}
        <p className="text-xl md:text-2xl font-bold text-lightning-yellow mb-8 tracking-wide">
          MYLAR BAGS - BOXES - GRAPHIC DESIGN & MORE
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button variant="lightning" size="xl" className="backdrop-blur-sm w-80">
            Order Bags Online
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button variant="lightning" size="xl" className="group w-80">
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