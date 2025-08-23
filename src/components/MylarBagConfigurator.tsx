import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Upload, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductConfig {
  size: string;
  finish: string;
  color: string;
  quantity: number;
  artworkType: 'upload' | 'preset';
  presetCode?: string;
}

const PRODUCTS = [
  { id: '3.5g', name: 'Mylar Bag — 3.5g', basePrice: 0.40 },
  { id: '7g', name: 'Mylar Bag — 7g', basePrice: 0.55 },
  { id: '14g', name: 'Mylar Bag — 14g', basePrice: 0.75 },
  { id: '28g', name: 'Mylar Bag — 28g', basePrice: 0.95 },
];

const FINISHES = [
  { id: 'matte', name: 'Matte', price: 0 },
  { id: 'gloss', name: 'Gloss', price: 0.03 },
  { id: 'holographic', name: 'Holographic', price: 0.10 },
];

const COLORS = [
  { id: 'black', name: 'Black', price: 0 },
  { id: 'white', name: 'White', price: 0.02 },
  { id: 'clear-window', name: 'Clear-Window', price: 0.05 },
];

const QUANTITIES = [100, 500, 1000, 5000];

const PRESET_DESIGNS = [
  { code: 'Cosmic-01', name: 'Cosmic', licenseFee: 20 },
  { code: 'Neon-02', name: 'Neon Grid', licenseFee: 20 },
  { code: 'Retro-03', name: 'Retro Pop', licenseFee: 20 },
  { code: 'Minimal-04', name: 'Minimal Luxe', licenseFee: 20 },
];

export default function MylarBagConfigurator() {
  const [config, setConfig] = useState<ProductConfig>({
    size: '',
    finish: '',
    color: '',
    quantity: 100,
    artworkType: 'upload',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const calculatePrice = () => {
    const product = PRODUCTS.find(p => p.id === config.size);
    if (!product) return { unitPrice: 0, totalPrice: 0, breakdown: [] };

    const finish = FINISHES.find(f => f.id === config.finish);
    const color = COLORS.find(c => c.id === config.color);
    
    let unitPrice = product.basePrice;
    const breakdown = [`Base (${product.name}): $${product.basePrice.toFixed(2)}`];

    if (finish && finish.price > 0) {
      unitPrice += finish.price;
      breakdown.push(`${finish.name} finish: +$${finish.price.toFixed(2)}`);
    }

    if (color && color.price > 0) {
      unitPrice += color.price;
      breakdown.push(`${color.name} color: +$${color.price.toFixed(2)}`);
    }

    let totalPrice = unitPrice * config.quantity;
    
    if (config.artworkType === 'preset') {
      totalPrice += 20;
      breakdown.push('Preset design license: +$20.00');
    }

    return { unitPrice, totalPrice, breakdown };
  };

  const generateSKU = () => {
    const artType = config.artworkType === 'upload' ? 'UPLOAD' : 'PRESET';
    const finishCode = config.finish.toUpperCase().substring(0, 4);
    const colorCode = config.color.toUpperCase().replace('-', '').substring(0, 3);
    
    return `MB-${config.size.toUpperCase()}-${finishCode}-${colorCode}-${config.quantity}-${artType}`;
  };

  const handleAddToCart = async () => {
    if (!config.size || !config.finish || !config.color) {
      toast({
        title: "Configuration Incomplete",
        description: "Please select all product options before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock Stripe checkout creation
      const pricing = calculatePrice();
      const sku = generateSKU();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success - in real implementation, this would redirect to Stripe
      toast({
        title: "Added to Cart!",
        description: `${PRODUCTS.find(p => p.id === config.size)?.name} configured successfully. Total: $${pricing.totalPrice.toFixed(2)}`,
      });

      // In real implementation, redirect to Stripe Checkout
      console.log('Mock order:', {
        sku,
        config,
        pricing,
        redirectToStripe: 'mock-checkout-url'
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const pricing = calculatePrice();
  const isConfigComplete = config.size && config.finish && config.color;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Configure Your Mylar Bags</h1>
          <p className="text-muted-foreground">Customize your premium cannabis packaging with our configurator</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Selection */}
            <Card>
              <CardHeader>
                <CardTitle>1. Select Product Size</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={config.size}
                  onValueChange={(value) => setConfig({...config, size: value})}
                  className="grid grid-cols-2 gap-4"
                >
                  {PRODUCTS.map((product) => (
                    <div key={product.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={product.id} id={product.id} />
                      <Label htmlFor={product.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">${product.basePrice.toFixed(2)} base</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Finish Selection */}
            <Card>
              <CardHeader>
                <CardTitle>2. Choose Finish</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={config.finish} onValueChange={(value) => setConfig({...config, finish: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select finish" />
                  </SelectTrigger>
                  <SelectContent>
                    {FINISHES.map((finish) => (
                      <SelectItem key={finish.id} value={finish.id}>
                        {finish.name} {finish.price > 0 && `(+$${finish.price.toFixed(2)})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle>3. Choose Color</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={config.color} onValueChange={(value) => setConfig({...config, color: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        {color.name} {color.price > 0 && `(+$${color.price.toFixed(2)})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Quantity Selection */}
            <Card>
              <CardHeader>
                <CardTitle>4. Select Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <Select 
                  value={config.quantity.toString()} 
                  onValueChange={(value) => setConfig({...config, quantity: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {QUANTITIES.map((qty) => (
                      <SelectItem key={qty} value={qty.toString()}>
                        {qty} bags
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Artwork Selection */}
            <Card>
              <CardHeader>
                <CardTitle>5. Choose Artwork Option</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={config.artworkType}
                  onValueChange={(value: 'upload' | 'preset') => setConfig({...config, artworkType: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="upload" />
                    <Label htmlFor="upload" className="flex items-center gap-2 cursor-pointer">
                      <Upload className="h-4 w-4" />
                      Upload Your Design
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="preset" id="preset" />
                    <Label htmlFor="preset" className="flex items-center gap-2 cursor-pointer">
                      <Palette className="h-4 w-4" />
                      Use Preset Design (+$20)
                    </Label>
                  </div>
                </RadioGroup>

                {config.artworkType === 'preset' && (
                  <Select 
                    value={config.presetCode} 
                    onValueChange={(value) => setConfig({...config, presetCode: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preset design" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRESET_DESIGNS.map((design) => (
                        <SelectItem key={design.code} value={design.code}>
                          {design.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {config.artworkType === 'upload' && (
                  <div className="p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">File upload will be available in checkout</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isConfigComplete && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Product:</span>
                        <span>{PRODUCTS.find(p => p.id === config.size)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Finish:</span>
                        <span>{FINISHES.find(f => f.id === config.finish)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Color:</span>
                        <span>{COLORS.find(c => c.id === config.color)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span>{config.quantity} bags</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Artwork:</span>
                        <span>{config.artworkType === 'upload' ? 'Upload' : 'Preset'}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-1 text-sm">
                      {pricing.breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-muted-foreground">{item.split(':')[0]}:</span>
                          <span>{item.split(':')[1]}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Unit Price:</span>
                        <span>${pricing.unitPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${pricing.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="w-full justify-center">
                      SKU: {generateSKU()}
                    </Badge>
                  </>
                )}

                <Button 
                  onClick={handleAddToCart}
                  disabled={!isConfigComplete || isLoading}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isLoading ? 'Processing...' : 'Add to Cart'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Packaging only. No cannabis sales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}