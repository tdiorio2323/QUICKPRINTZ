import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Boxes = () => {
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
              Premium Boxes
            </h1>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Child-resistant containers, luxury boxes, and custom packaging solutions designed for compliance and premium presentation.
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

      {/* Form Section - Placeholder */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Request Your <span className="text-gradient-primary">Custom Quote</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tell us about your project and we'll create the perfect box solution for your brand.
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

export default Boxes;
