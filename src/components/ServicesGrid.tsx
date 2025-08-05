import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Package, Box, Zap, ArrowRight } from "lucide-react";
const services = [{
  icon: Palette,
  title: "Custom Package Design",
  description: "Full-service design studio creating premium cannabis packaging that stands out on dispensary shelves.",
  features: ["Logo Design", "Brand Strategy", "Package Mockups", "Print-Ready Files"],
  color: "text-primary"
}, {
  icon: Package,
  title: "Print-on-Demand Orders",
  description: "Automated ordering system with real-time pricing. From 25 to 10,000+ units with instant quotes.",
  features: ["Live Configurator", "Instant Pricing", "25+ Bag Sizes", "Premium Finishes"],
  color: "text-accent"
}, {
  icon: Box,
  title: "Premium Boxes",
  description: "Child-resistant containers, luxury boxes, and custom packaging solutions for every cannabis product.",
  features: ["Child-Resistant", "Luxury Finishes", "Custom Sizes", "Compliance Ready"],
  color: "text-secondary"
}, {
  icon: Zap,
  title: "Rush Fulfillment",
  description: "Priority production queue for urgent orders. Same-day printing with express shipping options.",
  features: ["24hr Turnaround", "Express Shipping", "Priority Queue", "Real-Time Tracking"],
  color: "text-primary"
}, {
  icon: Palette,
  title: "Brand Strategy",
  description: "Comprehensive brand development and strategy services to elevate your cannabis business.",
  features: ["Market Research", "Brand Positioning", "Visual Identity", "Brand Guidelines"],
  color: "text-accent"
}];
const ServicesGrid = () => {
  return <section className="px-6 py-[22px]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            <div className="text-lightning-yellow mb-2 w-full">FULL-SERVICE</div>
            <div className="text-lightning-yellow mb-2 w-full">PACKAGING</div>
            <div className="text-lightning-yellow w-full">ENTERPRISE</div>
          </h2>
        </div>

        {/* Quick Printz Logo */}
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/4019ba2e-3743-461f-8378-597b5f232f96.png" 
            alt="Quick Printz Logo" 
            className="w-full max-w-2xl h-auto"
          />
        </div>

      </div>
    </section>;
};
export default ServicesGrid;