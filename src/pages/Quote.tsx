import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { gaEvent } from "@/lib/ga";

const Quote = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      productType: formData.get('productType'),
      size: formData.get('size'),
      quantity: formData.get('quantity'),
      finish: formData.get('finish'),
      timeline: formData.get('timeline'),
      notes: formData.get('notes')
    };

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 24 hours with a custom quote.",
      });
      
      // Track conversion
      gaEvent('generate_lead', { 
        lead_type: 'quote_request',
        product_type: data.productType 
      });
      
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Get Custom Quote"
        description="Request a custom quote for premium cannabis packaging. Fast response times and competitive pricing for mylar bags, boxes, and labels."
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-8 bg-gradient-overlay overflow-hidden mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold premium-gradient-text mb-6 tracking-tight">
            Get Your Quote
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tell us about your project and we'll provide a custom quote within 24 hours.
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <Card className="glass-morphism border-primary/20 shadow-premium">
            <CardHeader className="text-center pb-8">
              <CardTitle className="font-display text-3xl font-bold premium-gradient-text">
                Project Details
              </CardTitle>
              <CardDescription className="font-body text-lg text-muted-foreground">
                Fill out the form below and we'll prepare a custom quote for your packaging needs.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body font-medium">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="bg-input border-border"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body font-medium">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-input border-border"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-body font-medium">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      className="bg-input border-border"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-body font-medium">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="bg-input border-border"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="productType" className="font-body font-medium">Product Type *</Label>
                    <Select name="productType" required>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mylar-bags">Mylar Bags</SelectItem>
                        <SelectItem value="boxes">Custom Boxes</SelectItem>
                        <SelectItem value="labels">Labels</SelectItem>
                        <SelectItem value="multiple">Multiple Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="size" className="font-body font-medium">Size/Dimensions</Label>
                    <Input
                      id="size"
                      name="size"
                      type="text"
                      className="bg-input border-border"
                      placeholder="e.g., 3.5g, 7g, custom size"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="font-body font-medium">Quantity *</Label>
                    <Select name="quantity" required>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100-500">100-500 units</SelectItem>
                        <SelectItem value="500-1000">500-1,000 units</SelectItem>
                        <SelectItem value="1000-5000">1,000-5,000 units</SelectItem>
                        <SelectItem value="5000+">5,000+ units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="finish" className="font-body font-medium">Finish</Label>
                    <Select name="finish">
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select finish" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matte">Matte</SelectItem>
                        <SelectItem value="gloss">Gloss</SelectItem>
                        <SelectItem value="holographic">Holographic</SelectItem>
                        <SelectItem value="soft-touch">Soft Touch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="font-body font-medium">Timeline</Label>
                  <Select name="timeline">
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="When do you need this?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rush">Rush (7-10 days)</SelectItem>
                      <SelectItem value="standard">Standard (2-3 weeks)</SelectItem>
                      <SelectItem value="flexible">Flexible (1+ month)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="font-body font-medium">Project Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    className="bg-input border-border min-h-[120px]"
                    placeholder="Tell us about your project, design requirements, special features, or any questions you have..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="xl" 
                  variant="premium" 
                  className="w-full shadow-premium hover-lift"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Get My Quote"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote;