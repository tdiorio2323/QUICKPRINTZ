import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Gallery = () => {
  // Placeholder images - these can be replaced with actual portfolio images
  const galleryImages = [
    { id: 1, src: "/lovable-uploads/110c795f-57b9-4ea7-9018-ac957df911a4.png", alt: "Cannabis Bag Design 1", category: "Mylar Bags" },
    { id: 2, src: "/lovable-uploads/4d0a2941-3ac7-42f0-98cf-84effd87b57b.png", alt: "Cannabis Bag Design 2", category: "Mylar Bags" },
    { id: 3, src: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F5847553743ce48f5b2a6dc2214b11244?format=webp&width=800", alt: "Custom Design 1", category: "Custom Design" },
    { id: 4, src: "/lovable-uploads/110c795f-57b9-4ea7-9018-ac957df911a4.png", alt: "Premium Box 1", category: "Boxes" },
    { id: 5, src: "/lovable-uploads/4d0a2941-3ac7-42f0-98cf-84effd87b57b.png", alt: "Cannabis Bag Design 3", category: "Mylar Bags" },
    { id: 6, src: "/lovable-uploads/110c795f-57b9-4ea7-9018-ac957df911a4.png", alt: "Premium Box 2", category: "Boxes" },
    { id: 7, src: "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F5847553743ce48f5b2a6dc2214b11244?format=webp&width=800", alt: "Custom Design 2", category: "Custom Design" },
    { id: 8, src: "/lovable-uploads/4d0a2941-3ac7-42f0-98cf-84effd87b57b.png", alt: "Cannabis Bag Design 4", category: "Mylar Bags" },
    { id: 9, src: "/lovable-uploads/110c795f-57b9-4ea7-9018-ac957df911a4.png", alt: "Premium Box 3", category: "Boxes" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-8 bg-gradient-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold premium-gradient-text mb-6 tracking-tight">
            Our Gallery
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of premium cannabis packaging designs and see how we've helped brands elevate their presence.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className="group glass-morphism border-primary/20 rounded-[2rem] overflow-hidden shadow-elegant hover:shadow-premium transition-all duration-700 hover-lift"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-gradient-primary transition-all duration-300">
                    {image.alt}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {image.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
