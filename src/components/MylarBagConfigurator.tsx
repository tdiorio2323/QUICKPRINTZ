import React, { useState, useRef } from 'react';
import { Upload, Eye, Palette, Package, Image } from 'lucide-react';
import PremadeDesignSlideshow from "./PremadeDesignSlideshow";

const MylarBagConfigurator = () => {
  const [config, setConfig] = useState({
    size: '',
    color: '',
    finish: '',
    printSides: '1',
    designOption: 'upload',
    uploadedFile: null,
    selectedTemplate: null,
    highResConfirmed: false,
    quantity: 100,
    rushOrder: false
  });

  const [preview, setPreview] = useState(null);
  const [pricing, setPricing] = useState(0);
  const fileInputRef = useRef(null);

  const sizes = [
    { id: '4x5', name: '4" x 5"', price: 0.85 },
    { id: '5x8', name: '5" x 8"', price: 1.20 },
    { id: '6x9', name: '6" x 9"', price: 1.45 },
    { id: '8x11', name: '8" x 11"', price: 2.10 }
  ];

  const colors = [
    { id: 'black', name: 'Black', hex: '#000000', price: 0 },
    { id: 'white', name: 'White', hex: '#ffffff', price: 0 },
    { id: 'red', name: 'Red', hex: '#ff0000', price: 0 },
    { id: 'green', name: 'Green', hex: '#00ff00', price: 0 },
    { id: 'blue', name: 'Blue', hex: '#0000ff', price: 0 }
  ];

  const finishes = [
    { id: 'matte', name: 'Matte', price: 0 },
    { id: 'glossy', name: 'Glossy', price: 0.05 },
    { id: 'holographic', name: 'Holographic', price: 0.35 }
  ];

  const quantities = [
    { value: 100, label: '100 bags', discount: 0 },
    { value: 200, label: '200 bags', discount: 0.05 },
    { value: 500, label: '500 bags', discount: 0.15 },
    { value: 1000, label: '1000 bags', discount: 0.25 }
  ];

  const templates = [
    { id: 1, name: 'Cannabis Leaf', category: 'Cannabis', preview: '/api/placeholder/150/150' },
    { id: 2, name: 'Minimalist Logo', category: 'Business', preview: '/api/placeholder/150/150' },
    { id: 3, name: 'Geometric Pattern', category: 'Abstract', preview: '/api/placeholder/150/150' },
    { id: 4, name: 'Vintage Badge', category: 'Retro', preview: '/api/placeholder/150/150' }
  ];

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    calculatePricing({ ...config, [key]: value });
  };

  const calculatePricing = (currentConfig) => {
    let basePrice = 0;

    const size = sizes.find(s => s.id === currentConfig.size);
    const color = colors.find(c => c.id === currentConfig.color);
    const finish = finishes.find(f => f.id === currentConfig.finish);
    const quantity = quantities.find(q => q.value === currentConfig.quantity);

    if (size) basePrice += size.price;
    if (color) basePrice += color.price;
    if (finish) basePrice += finish.price;

    if (currentConfig.printSides === '2') {
      basePrice += 0.30;
    }

    if (quantity) {
      basePrice *= (1 - quantity.discount);
    }

    if (currentConfig.rushOrder) {
      basePrice *= 1.5;
    }

    setPricing(basePrice);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid file (JPG, PNG, SVG, or PDF)');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be under 10MB');
        return;
      }

      updateConfig('uploadedFile', file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const generateOrder = () => {
    const orderData = {
      id: `ORD-${Date.now()}`,
      config,
      pricing: {
        unitPrice: pricing,
        totalPrice: pricing * config.quantity,
        quantity: config.quantity,
        discount: quantities.find(q => q.value === config.quantity)?.discount || 0
      },
      timestamp: new Date().toISOString(),
      status: config.rushOrder ? 'pending_rush_approval' : 'pending_payment',
      rushOrder: config.rushOrder,
      customer: {
        email: 'customer@example.com',
        name: 'Customer Name'
      }
    };

    fetch('https://hook.us1.make.com/YOUR_WEBHOOK_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trigger: 'new_order',
        orderData,
        emailTrigger: {
          recipients: [
            'tyler@tdstudiosny.com',
            'derekcasiano16@gmail.com',
            'msderek1116@gmail.com'
          ],
          orderType: config.rushOrder ? 'rush' : 'standard',
          subject: config.rushOrder
            ? `🚨 RUSH ORDER - ${orderData.id} - Requires Approval`
            : `📦 New Order - ${orderData.id} - ${config.quantity} bags`,
          orderSummary: {
            orderId: orderData.id,
            quantity: config.quantity,
            bagSpecs: `${config.size} ${config.color} ${config.finish}`,
            printSides: config.printSides,
            totalAmount: `$${(pricing * config.quantity).toFixed(2)}`,
            rushOrder: config.rushOrder,
            designType: config.designOption,
            fileName: config.uploadedFile?.name || config.selectedTemplate,
            timestamp: new Date().toLocaleString()
          }
        }
      })
    }).then(response => {
      if (response.ok) {
        console.log('Order generated and webhook triggered:', orderData);

        if (config.rushOrder) {
          alert('🚨 Rush order submitted for approval! Tyler and Derek have been notified and will respond within 2 hours.');
        } else {
          alert('📦 Order submitted successfully! The team has been notified and you will receive confirmation shortly.');
        }
      } else {
        throw new Error('Webhook failed');
      }
    }).catch(error => {
      console.error('Error triggering webhook:', error);
      console.log('Order generated (webhook failed):', orderData);
      alert('Order created but notification failed. Please contact support with order ID: ' + orderData.id);
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 min-h-screen">
      <div className="bg-black rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-yellow-400">
          <div className="text-center mb-6">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTUiIGZpbGw9IiMyMjI3MzMiLz4KPHBvbHlnb24gcG9pbnRzPSI1MCwxMCA2NSwyNSA1NSwzNSA3MCw1MCA1NSwzNSA2NSwyNSA1MCwxMCIgZmlsbD0iI0ZCQjQxOSIvPgo8cG9seWdvbiBwb2ludHM9IjUwLDkwIDM1LDc1IDQ1LDY1IDMwLDUwIDQ1LDY1IDM1LDc1IDUwLDkwIiBmaWxsPSIjRkJCNDE5Ii8+Cjx0ZXh0IHg9IjUwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzM5QzNGNiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UVVJQ0s8L3RleHQ+Cjx0ZXh0IHg9IjUwIiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI0VGNDQ0NCIgdGV4dC1hbmNob3I9Im1pZWRsZSI+UFJJTlRaPC90ZXh0Pgo8L3N2Zz4K"
              alt="QuickPrintz Logo"
              className="w-32 h-32 mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Package className="w-8 h-8" />
            Custom Mylar Bag Designer
          </h1>
          <p className="mt-2 opacity-90 text-center">Design your perfect custom mylar bags in minutes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-3">Bag Size</label>
              <div className="grid grid-cols-2 gap-3">
                {sizes.map(size => (
                  <button
                    key={size.id}
                    onClick={() => updateConfig('size', size.id)}
                    className={`p-3 border-2 rounded-lg transition-all ${config.size === size.id
                      ? 'border-yellow-400 bg-yellow-900/20'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                      }`}
                  >
                    <div className="font-medium text-yellow-400">{size.name}</div>
                    <div className="text-sm text-gray-400">${size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-3">Bag Color</label>
              <div className="grid grid-cols-5 gap-3">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => updateConfig('color', color.id)}
                    className={`p-3 border-2 rounded-lg transition-all ${config.color === color.id
                      ? 'border-yellow-400 ring-2 ring-yellow-400/30'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                      }`}
                  >
                    <div
                      className="w-full h-8 rounded mb-2 border"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="text-xs font-medium text-yellow-400">{color.name}</div>
                    <div className="text-xs text-gray-400">+${color.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-3">Finish</label>
              <div className="grid grid-cols-3 gap-3">
                {finishes.map(finish => (
                  <button
                    key={finish.id}
                    onClick={() => updateConfig('finish', finish.id)}
                    className={`p-3 border-2 rounded-lg transition-all ${config.finish === finish.id
                      ? 'border-yellow-400 bg-yellow-900/20'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                      }`}
                  >
                    <div className="font-medium text-yellow-400">{finish.name}</div>
                    <div className="text-sm text-gray-400">+${finish.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-3">Print Sides</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateConfig('printSides', '1')}
                  className={`p-3 border-2 rounded-lg transition-all ${config.printSides === '1'
                    ? 'border-yellow-400 bg-yellow-900/20'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                    }`}
                >
                  <div className="font-medium text-yellow-400">1-Side</div>
                  <div className="text-sm text-gray-400">Standard</div>
                </button>
                <button
                  onClick={() => updateConfig('printSides', '2')}
                  className={`p-3 border-2 rounded-lg transition-all ${config.printSides === '2'
                    ? 'border-yellow-400 bg-yellow-900/20'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                    }`}
                >
                  <div className="font-medium text-yellow-400">2-Sides</div>
                  <div className="text-sm text-gray-400">+$0.30</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-3">Quantity</label>
              <div className="grid grid-cols-2 gap-3">
                {quantities.map(qty => (
                  <button
                    key={qty.value}
                    onClick={() => updateConfig('quantity', qty.value)}
                    className={`p-3 border-2 rounded-lg transition-all ${config.quantity === qty.value
                      ? 'border-yellow-400 bg-yellow-900/20'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                      }`}
                  >
                    <div className="font-medium text-yellow-400">{qty.label}</div>
                    {qty.discount > 0 && (
                      <div className="text-sm text-green-400">Save {(qty.discount * 100).toFixed(0)}%</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.rushOrder}
                    onChange={(e) => updateConfig('rushOrder', e.target.checked)}
                    className="mt-1 w-4 h-4 text-red-400 bg-gray-700 border-gray-600 rounded focus:ring-red-400 focus:ring-2"
                  />
                  <div className="text-sm">
                    <div className="text-red-400 font-semibold mb-1 flex items-center gap-2">
                      ⚡ Rush Order (+50% fee)
                    </div>
                    <div className="text-gray-300 mb-2">
                      Priority processing and faster production time. Must be approved before payment.
                    </div>
                    <div className="text-xs text-red-300">
                      • Expedited review within 2 hours<br />
                      • 3-5 business day production (vs standard 7-10 days)<br />
                      • Priority shipping included
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-3">Design Option</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => updateConfig('designOption', 'template')}
                  className={`p-3 border-2 rounded-lg transition-all ${config.designOption === 'template'
                    ? 'border-yellow-400 bg-yellow-900/20'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                    }`}
                >
                  <Palette className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="font-medium text-yellow-400">Choose Template</div>
                </button>
                <button
                  onClick={() => updateConfig('designOption', 'upload')}
                  className={`p-3 border-2 rounded-lg transition-all ${config.designOption === 'upload'
                    ? 'border-yellow-400 bg-yellow-900/20'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                    }`}
                >
                  <Upload className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="font-medium text-yellow-400">Upload Design</div>
                </button>
              </div>

              {config.designOption === 'template' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => updateConfig('selectedTemplate', template.id)}
                        className={`p-3 border-2 rounded-lg transition-all ${config.selectedTemplate === template.id
                          ? 'border-yellow-400 bg-yellow-900/20'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                          }`}
                      >
                        <div className="w-full h-20 bg-gray-700 rounded mb-2 flex items-center justify-center">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="text-sm font-medium text-yellow-400">{template.name}</div>
                        <div className="text-xs text-gray-400">{template.category}</div>
                      </button>
                    ))}
                  </div>
                  {/* Premade Designs Slideshow */}
                  <div className="mt-8">
                    <label className="block text-sm font-semibold text-yellow-400 mb-3">Or pick a premade design</label>
                    <PremadeDesignSlideshow onSelect={img => updateConfig('selectedTemplate', img)} />
                  </div>
                </>
              )}

              {config.designOption === 'upload' && (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-500 transition-colors bg-gray-800"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <div className="font-medium text-yellow-400">
                      {config.uploadedFile ? config.uploadedFile.name : 'Click to upload design'}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      4" x 5" print area • PDF, JPG, PNG, SVG • Max 10MB
                    </div>
                  </button>

                  <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.highResConfirmed || false}
                        onChange={(e) => updateConfig('highResConfirmed', e.target.checked)}
                        className="mt-1 w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                      />
                      <div className="text-sm">
                        <div className="text-yellow-400 font-medium mb-1">High Resolution Confirmation</div>
                        <div className="text-gray-400">
                          I confirm that my artwork is submitted as a PDF or high-resolution file with a minimum of 300 DPI for optimal print quality.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
                <Eye className="w-5 h-5" />
                Live Preview
              </h3>

              <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-700">
                <div
                  className="w-48 h-64 mx-auto rounded-lg border-2 border-gray-600 relative overflow-hidden"
                  style={{
                    backgroundColor: colors.find(c => c.id === config.color)?.hex || '#ffffff',
                    filter: config.finish === 'holographic' ? 'hue-rotate(45deg) saturate(1.5)' : 'none'
                  }}
                >
                  {preview && (
                    <div className="absolute inset-4 bg-gray-700 rounded flex items-center justify-center">
                      <img
                        src={preview}
                        alt="Design preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                  {!preview && (
                    <div className="absolute inset-4 bg-gray-700 rounded flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <Image className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-sm">Design Preview</div>
                        <div className="text-xs">4" x 5" print area</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  {config.size && sizes.find(s => s.id === config.size)?.name} •
                  {config.color && ` ${colors.find(c => c.id === config.color)?.name}`} •
                  {config.finish && ` ${finishes.find(f => f.id === config.finish)?.name}`} •
                  {config.printSides}-Side Print
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 rounded-lg p-6 border border-yellow-400/30">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Pricing Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Unit Price:</span>
                  <span>${pricing.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Quantity:</span>
                  <span>{config.quantity} bags</span>
                </div>
                {quantities.find(q => q.value === config.quantity)?.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Volume Discount:</span>
                    <span>-{(quantities.find(q => q.value === config.quantity).discount * 100).toFixed(0)}%</span>
                  </div>
                )}
                {config.rushOrder && (
                  <div className="flex justify-between text-red-400">
                    <span>Rush Order Fee:</span>
                    <span>+50%</span>
                  </div>
                )}
                <div className="border-t border-yellow-400/30 pt-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>${(pricing * config.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t border-yellow-400/30 pt-2">
                  <div className="flex justify-between font-semibold text-yellow-400 text-lg">
                    <span>Total Order:</span>
                    <span>${(pricing * config.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={generateOrder}
              disabled={!config.size || !config.color || !config.finish || (!config.uploadedFile && !config.selectedTemplate) || (config.designOption === 'upload' && !config.highResConfirmed)}
              className={`w-full py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all ${config.rushOrder
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                : 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black'
                }`}
            >
              {config.rushOrder ? '⚡ Submit Rush Order for Approval' : 'Proceed to Checkout'}
            </button>

            {config.rushOrder && (
              <div className="text-center text-sm text-red-300 mt-2">
                Rush orders require approval before payment processing
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MylarBagConfigurator;
