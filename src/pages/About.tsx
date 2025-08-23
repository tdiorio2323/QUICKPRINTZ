import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quick Printz",
    "url": "https://quickprintz.com",
    "sameAs": ["https://instagram.com/quickprintz"],
    "description": "Premium cannabis packaging agency specializing in custom mylar bags, boxes, and labels with low MOQs and fast turnaround times.",
    "foundingDate": "2020",
    "numberOfEmployees": "10-50",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  const stats = [
    { icon: Users, number: "500+", label: "Happy Clients" },
    { icon: Award, number: "2M+", label: "Units Produced" },
    { icon: Clock, number: "10-14", label: "Day Turnaround" },
    { icon: Shield, number: "100%", label: "Compliant" }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We use only premium materials and state-of-the-art printing technology to ensure every product meets our high standards."
    },
    {
      title: "Customer Success",
      description: "Your success is our success. We're committed to helping cannabis brands grow with packaging that performs."
    },
    {
      title: "Innovation",
      description: "We stay ahead of industry trends and regulations, constantly improving our processes and offerings."
    },
    {
      title: "Accessibility",
      description: "Low minimum orders and competitive pricing make professional packaging accessible to businesses of all sizes."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us - Your Cannabis Packaging Partner"
        description="Learn about Quick Printz, the leading cannabis packaging agency. We specialize in custom mylar bags, boxes, and labels with exceptional quality and service."
        jsonLd={organizationSchema}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-8 bg-gradient-overlay overflow-hidden mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold premium-gradient-text mb-6 tracking-tight">
            About Quick Printz
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            More than print, we build brands. Your trusted partner for premium cannabis packaging solutions.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
                Our Story
              </h2>
              <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020, Quick Printz emerged from a simple observation: the cannabis industry needed a packaging partner that understood both quality and accessibility. Too many brands were forced to choose between premium packaging and affordable minimums.
                </p>
                <p>
                  We set out to change that. By combining cutting-edge printing technology with streamlined processes, we've been able to offer professional-grade packaging with the lowest minimum orders in the industry.
                </p>
                <p>
                  Today, we're proud to serve over 500 cannabis brands across the country, from small local dispensaries to major multi-state operators. Our mission remains the same: to help every cannabis brand succeed with packaging that performs.
                </p>
              </div>
              
              <div className="mt-12">
                <Button variant="premium" size="xl" className="group shadow-premium hover-lift" asChild>
                  <Link to="/quote">
                    Start Your Project
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-morphism border-primary/20 rounded-[2rem] p-8 shadow-premium hover-lift">
                <OptimizedImage
                  src="https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F3306cf242e664d5983b4f132a942f5aa"
                  alt="Quick Printz team working on custom packaging designs"
                  className="w-full h-80 object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-8 bg-gradient-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              By the Numbers
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Our track record speaks for itself. Here's what we've accomplished together with our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center glass-morphism border-primary/20 rounded-xl p-8 shadow-elegant hover-lift">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="font-display text-4xl font-bold premium-gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="font-body text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from design to delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="glass-morphism border-primary/20 rounded-xl p-8 shadow-elegant hover-lift">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-overlay">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Work Together?
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-8 leading-relaxed">
            Join hundreds of successful cannabis brands who trust Quick Printz for their packaging needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="premium" size="xl" className="group shadow-premium hover-lift" asChild>
              <Link to="/quote">
                Get Quote
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="lightning" size="xl" className="group shadow-premium hover-lift" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;