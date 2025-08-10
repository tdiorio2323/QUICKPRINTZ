import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Package, Box, Zap, ArrowRight } from "lucide-react";
const services = [{
  icon: Palette,
  title: "CUSTOM MYLAR BAGS",
  description: "Full-service design studio creating premium cannabis packaging that stands out on dispensary shelves.",
  features: ["Logo Design", "Brand Strategy", "Package Mockups", "Print-Ready Files"],
  color: "text-primary",
  image: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F5847553743ce48f5b2a6dc2214b11244?format=webp&width=800"
}, {
  icon: Box,
  title: "PREMIUM BOXES MIN. 500 PCS.",
  description: "Child-resistant containers, luxury boxes, and custom packaging solutions for every cannabis product.",
  features: ["Child-Resistant", "Luxury Finishes", "Custom Sizes", "Compliance Ready"],
  color: "text-secondary",
  image: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F4a800e0b806b41be876fb245e8fcf36d"
}, {
  icon: Zap,
  title: "RUSH ORDER FULFILLMENT",
  description: "Priority production queue for urgent orders. Same-day printing with express shipping options.",
  features: ["24hr Turnaround", "Express Shipping", "Priority Queue", "Real-Time Tracking"],
  color: "text-primary",
  image: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F9a0d735aeec84099864bc786d8078b82"
}, {
  icon: Palette,
  title: "IN HOUSE DESIGN DEPARTMENT.",
  description: "Comprehensive brand development and strategy services to elevate your cannabis business.",
  features: ["Market Research", "Brand Positioning", "Visual Identity", "Brand Guidelines"],
  color: "text-accent",
  image: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F539ee0c642a44e56b37c043056f01a7d"
}];
const ServicesGrid = () => {
  return <section className="px-8 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <div className="premium-gradient-text mb-3 w-full">FULL-SERVICE</div>
            <div className="premium-gradient-text mb-3 w-full">PACKAGING</div>
            <div className="premium-gradient-text w-full">ENTERPRISE</div>
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-8">
            Comprehensive packaging solutions designed to elevate your brand and exceed industry standards.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, index) => {
          return <Card key={index} className="group glass-morphism hover:border-primary/40 transition-all duration-700 hover-lift shadow-elegant hover:shadow-premium">
                <CardContent className="p-10">
                  {/* Service Image - First element */}
                  <div className="flex justify-center mb-8">
                    <img src={service.image} alt={service.title} className="w-56 h-auto rounded-2xl shadow-elegant group-hover:shadow-premium transition-all duration-500" />
                  </div>

                  {/* Content aligned with bullets */}
                  <div className="mb-10">
                    <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-gradient-luxury transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button variant="premium" className="group/btn w-full justify-between h-14 text-lg font-body shadow-premium hover-lift">
                    ORDER NOW
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>

      </div>
    </section>;
};
export default ServicesGrid;
