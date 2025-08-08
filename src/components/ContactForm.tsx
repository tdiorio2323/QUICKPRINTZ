import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Send } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  instagram: string;
  message: string;
  services: string[];
  additionalNotes: string;
  file: File | null;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    instagram: "",
    message: "",
    services: [],
    additionalNotes: "",
    file: null
  });

  const serviceOptions = [
    "MYLAR BAGS",
    "LABELS/STICKERS", 
    "BOXES/JARS",
    "DESIGN SERVICES",
    "3D ANIMATION VIDEO",
    "SOMETHING ELSE"
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <Card className="glass-morphism border-primary/20 shadow-premium">
      <CardHeader>
        <CardTitle className="text-2xl font-bold premium-gradient-text text-center">
          GET A QUOTE
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Fill out the form below & a member of our team will reach out to you immediately
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">NAME</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="glass-morphism border-primary/20 focus:border-primary"
              placeholder="Enter your full name"
            />
          </div>

          {/* Phone Number Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">PHONE NUMBER</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="glass-morphism border-primary/20 focus:border-primary"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              EMAIL<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="glass-morphism border-primary/20 focus:border-primary"
              placeholder="Enter your email address"
            />
          </div>

          {/* Instagram Link Field */}
          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-sm font-semibold">
              INSTAGRAM LINK<span className="text-red-500">*</span>
            </Label>
            <Input
              id="instagram"
              type="url"
              required
              value={formData.instagram}
              onChange={(e) => handleInputChange("instagram", e.target.value)}
              className="glass-morphism border-primary/20 focus:border-primary"
              placeholder="https://instagram.com/yourusername"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold">
              MESSAGE<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="glass-morphism border-primary/20 focus:border-primary min-h-[120px]"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* Services Needed */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">SERVICE(S) NEEDED:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={(checked) => 
                      handleServiceChange(service, checked as boolean)
                    }
                    className="border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label 
                    htmlFor={service} 
                    className="text-sm font-medium cursor-pointer"
                  >
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="additionalNotes" className="text-sm font-semibold">
              ADDITIONAL NOTES:
            </Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
              className="glass-morphism border-primary/20 focus:border-primary"
              placeholder="Any additional information or special requirements..."
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file" className="text-sm font-semibold">FILE UPLOAD</Label>
            <div className="glass-morphism border-primary/20 border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Drop files here or click to browse
                </p>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.ai,.psd,.eps"
                />
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => document.getElementById('file')?.click()}
                  className="glass-morphism"
                >
                  Upload File
                </Button>
                {formData.file && (
                  <p className="text-xs text-primary">
                    Selected: {formData.file.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="premium" 
            size="lg"
            className="w-full h-12 text-lg font-semibold shadow-premium hover-lift"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
