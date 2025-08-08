import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MylarBags = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold premium-gradient-text mb-6 tracking-tight">
              Custom Mylar Bags
            </h1>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Premium cannabis packaging that elevates your brand and ensures product freshness with our custom mylar bag solutions.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button variant="lightning" size="xl" className="backdrop-blur-premium w-80 h-16 text-lg font-body shadow-premium hover-lift">
              Get Custom Quote
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-24 px-8 bg-lightning-yellow overflow-hidden">
        {/* Lightning Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="lightning-mylar" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M50 0L30 80h20L40 160l40-80H60L80 0z" fill="#000" opacity="0.8"/>
                <path d="M150 40L130 120h20L140 200l40-80H160L180 40z" fill="#000" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lightning-mylar)"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Request Your <span className="text-black">Custom Quote</span>
            </h2>
            <p className="text-xl text-black/80 font-medium">
              Tell us about your project and we'll create the perfect mylar bag solution for your brand.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MylarBags;
