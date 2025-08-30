import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40">
      {/* Animated Premium Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
        
        {/* Animated geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Scroll-responsive overlay pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'float 20s ease-in-out infinite'
          }}
        ></div>
        
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-8">
        {/* Quick Printz Logo */}
        <div className="mb-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F9a0d735aeec84099864bc786d8078b82"
            alt="Quick Printz"
            className="mx-auto max-w-lg w-full h-auto rounded-[2rem] shadow-premium hover-lift sm:-mt-px"
          />
        </div>

        {/* Premium Tagline */}
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold premium-gradient-text mb-6 tracking-tight">
            Premium Packaging
          </h1>
          <p className="font-body text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
            Elevating brands with luxury packaging solutions, custom design excellence, and unmatched quality.
          </p>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-[22px] justify-center items-center">
          <Button variant="lightning" size="xl" className="backdrop-blur-premium w-80 h-16 text-lg font-body shadow-premium hover-lift" asChild>
            <Link to="/quote">
              Get Quote Now
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>

          <Button variant="premium" size="xl" className="group w-80 h-16 text-lg font-body shadow-premium hover-lift">
            Custom Design Services
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center shadow-glow">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-3 animate-pulse shadow-premium"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
