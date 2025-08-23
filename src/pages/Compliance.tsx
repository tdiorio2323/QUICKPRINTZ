import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, FileText } from "lucide-react";

const Compliance = () => {
  const complianceFeatures = [
    {
      title: "Child-Resistant Packaging",
      description: "All our mylar bags meet CPSC child-resistant requirements and state-specific regulations.",
      icon: Shield
    },
    {
      title: "Opaque Materials",
      description: "Our packaging materials prevent visibility of contents as required by most state regulations.",
      icon: CheckCircle
    },
    {
      title: "Tamper-Evident Seals",
      description: "Heat-sealable materials provide tamper-evident closure for product integrity.",
      icon: FileText
    },
    {
      title: "Required Label Space",
      description: "Designs include adequate space for mandatory state compliance labels and warnings.",
      icon: CheckCircle
    }
  ];

  const stateGuidelines = [
    {
      state: "California",
      requirements: [
        "Child-resistant packaging for all cannabis products",
        "Opaque packaging that obscures contents",
        "Universal symbol and warnings required",
        "No appealing imagery or cartoon characters"
      ]
    },
    {
      state: "Colorado",
      requirements: [
        "Child-resistant exit packaging",
        "Opaque containers",
        "Warning statements in specific format",
        "Laboratory testing information display"
      ]
    },
    {
      state: "New York",
      requirements: [
        "Child-resistant packaging required",
        "Plain packaging with no bright colors",
        "Health warnings prominently displayed",
        "No marketing to minors"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Cannabis Packaging Compliance Guide"
        description="Understanding cannabis packaging regulations and compliance requirements. Quick Printz ensures all packaging meets state and federal guidelines."
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-8 bg-gradient-overlay overflow-hidden mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold premium-gradient-text mb-6 tracking-tight">
            Compliance Guide
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Understanding cannabis packaging regulations to keep your business compliant and successful.
          </p>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-12 px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDescription className="font-body text-base">
              <strong>Important Disclaimer:</strong> Quick Printz provides packaging materials only. We do not sell, distribute, or handle cannabis products. While we design packaging to meet common compliance requirements, final compliance responsibility rests with the customer. Always consult with legal counsel and regulatory experts for your specific jurisdiction.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Compliance-Ready Features
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Our packaging incorporates key features required by cannabis regulations across multiple states.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceFeatures.map((feature) => (
              <div key={feature.title} className="glass-morphism border-primary/20 rounded-xl p-8 shadow-elegant hover-lift">
                <feature.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State Guidelines */}
      <section className="py-24 px-8 bg-gradient-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              State-Specific Guidelines
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Common requirements from major cannabis markets. Regulations vary and change frequently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stateGuidelines.map((guide) => (
              <div key={guide.state} className="glass-morphism border-primary/20 rounded-xl p-8 shadow-elegant">
                <h3 className="font-display text-2xl font-bold premium-gradient-text mb-6">
                  {guide.state}
                </h3>
                <ul className="space-y-3">
                  {guide.requirements.map((req, index) => (
                    <li key={index} className="flex items-start font-body text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Alert className="border-primary/50 bg-primary/10 max-w-4xl mx-auto">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <AlertDescription className="font-body text-base text-left">
                <strong>Note:</strong> This is a general overview only. Cannabis regulations vary significantly by state and municipality, and change frequently. Always verify current requirements with your local regulatory authority and legal counsel before finalizing packaging designs.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Compliance Resources
            </h2>
            <p className="font-body text-xl text-muted-foreground">
              Helpful links and resources for staying compliant in the cannabis industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-morphism border-primary/20 rounded-xl p-8 shadow-elegant">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Federal Resources
              </h3>
              <ul className="space-y-3 font-body text-muted-foreground">
                <li>• CPSC Child-Resistant Packaging Guidelines</li>
                <li>• FDA Packaging and Labeling Requirements</li>
                <li>• DEA Controlled Substances Regulations</li>
              </ul>
            </div>
            
            <div className="glass-morphism border-primary/20 rounded-xl p-8 shadow-elegant">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Industry Organizations
              </h3>
              <ul className="space-y-3 font-body text-muted-foreground">
                <li>• Cannabis Trade Federation</li>
                <li>• National Cannabis Industry Association</li>
                <li>• Americans for Safe Access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-8 bg-gradient-overlay">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Questions About Compliance?
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-8 leading-relaxed">
            Our team stays current with cannabis packaging regulations and can help ensure your packaging meets requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity shadow-premium hover-lift"
            >
              Get Compliance Help
            </a>
            <a 
              href="/quote" 
              className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors shadow-elegant"
            >
              Request Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;