import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Palette, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quick Printz",
    "url": "https://quickprintz.com",
    "sameAs": ["https://instagram.com/quickprintz"],
    "description": "Premium cannabis packaging solutions including custom mylar bags, boxes, and labels"
  };

  const products = [
    {
      name: "Custom Mylar Bags",
      description: "Premium smell-proof mylar bags with custom printing. Available in 3.5g, 7g, 14g, and 28g sizes.",
      features: ["Smell-proof", "Child-resistant", "UV protection", "Custom printing"],
      image: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F3306cf242e664d5983b4f132a942f5aa",
      link: "/mylar-bags"
    },
    {
      name: "Custom Boxes",
      description: "Luxury presentation boxes for premium cannabis products. Available in various sizes and finishes.",
      features: ["Premium cardstock", "Magnetic closure", "Custom design", "Gold foil options"],
      image: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F3306cf242e664d5983b4f132a942f5aa",
      link: "/boxes"
    },
    {
      name: "Custom Labels",
      description: "Professional labels for jars, bottles, and packaging. Waterproof and fade-resistant.",
      features: ["Waterproof", "Fade-resistant", "Various shapes", "Premium finishes"],
      image: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F3306cf242e664d5983b4f132a942f5aa",
      link: "/contact"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Premium Cannabis Packaging Products"
        description="Custom mylar bags, luxury boxes, and professional labels for cannabis brands. Low MOQs, fast turnaround, and compliance-ready designs."
        jsonLd={organizationSchema}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-8 bg-gradient-overlay overflow-hidden mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold premium-gradient-text mb-6 tracking-tight">
            Premium Products
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional packaging solutions designed to elevate your cannabis brand and ensure compliance.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <article key={product.name} className="glass-morphism border-primary/20 rounded-[2rem] p-8 shadow-premium hover-lift transition-all duration-500">
                <div className="mb-6">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                    priority={index === 0}
                  />
                </div>
                
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {product.name}
                </h2>
                
                <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center font-body text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="premium" size="lg" className="w-full group shadow-premium" asChild>
                  <Link to={product.link}>
                    Learn More
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-8 leading-relaxed">
            Get a custom quote for your packaging needs. Low minimum orders and fast turnaround times.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="premium" size="xl" className="group shadow-premium hover-lift" asChild>
              <Link to="/quote">
                Get Quote
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="lightning" size="xl" className="group shadow-premium hover-lift" asChild>
              <Link to="/design">
                <Palette className="w-6 h-6 mr-2" />
                Custom Design
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;