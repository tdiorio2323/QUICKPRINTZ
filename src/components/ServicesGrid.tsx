import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Package, Box, Zap, ArrowRight } from "lucide-react";
const services = [{
  icon: Palette,
  title: "Custom Package Design & Branding",
  description: "Full-service design studio creating premium cannabis packaging that stands out on dispensary shelves.",
  features: ["Logo Design", "Brand Strategy", "Package Mockups", "Print-Ready Files"],
  color: "text-primary"
}, {
  icon: Package,
  title: "Print-on-Demand Bag Orders",
  description: "Automated ordering system with real-time pricing. From 25 to 10,000+ units with instant quotes.",
  features: ["Live Configurator", "Instant Pricing", "25+ Bag Sizes", "Premium Finishes"],
  color: "text-accent"
}, {
  icon: Box,
  title: "Premium Box & Container Solutions",
  description: "Child-resistant containers, luxury boxes, and custom packaging solutions for every cannabis product.",
  features: ["Child-Resistant", "Luxury Finishes", "Custom Sizes", "Compliance Ready"],
  color: "text-secondary"
}, {
  icon: Zap,
  title: "Rush Fulfillment (24-48hr delivery)",
  description: "Priority production queue for urgent orders. Same-day printing with express shipping options.",
  features: ["24hr Turnaround", "Express Shipping", "Priority Queue", "Real-Time Tracking"],
  color: "text-primary"
}];
const ServicesGrid = () => {
  return <section className="px-6 py-[22px]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            <div className="text-lightning-yellow mb-2 w-full">FULL SERVICE</div>
            
            <div className="text-lightning-yellow mb-2 w-full">PACKAGING</div>
            <div className="text-lightning-yellow w-full">ENTERPRISE</div>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
          return <Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover-glow">
                <CardContent className="p-8 py-[20px]">
                  {/* Bag Image - First element */}
                  <div className="flex justify-center mb-6">
                    <img src="/lovable-uploads/b2cf62dc-4fe0-40ba-a71c-f54423d9b53f.png" alt="Premium Cannabis Packaging" className="w-48 h-auto rounded-lg" />
                  </div>

                  {/* Content aligned with bullets */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, idx) => <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>)}
                  </div>

                  {/* CTA Button */}
                  <Button variant="ghost" className="group/btn w-full justify-between bg-lightning-yellow text-black hover:bg-lightning-yellow/90">
                    ORDER NOW
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-black" />
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button variant="premium" size="lg" className="group">
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>;
};
export default ServicesGrid;