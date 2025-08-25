import React, { useState } from "react";

// Import all 60 images from public folder
const designImages = [
    ...Array(40).fill(0).map((_, i) => `/60 designs for Reel/layer_${String(i + 1).padStart(3, '0')}_Layer ${i + ((i % 2) === 0 ? 0 : 1)}.jpg`),
    // Add the rest of the images manually if needed
];

const PremadeDesignSlideshow = ({ onSelect }: { onSelect?: (img: string) => void }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="w-full overflow-x-auto py-4">
            <div className="flex gap-6 md:gap-8 lg:gap-10 px-2" role="list">
                {designImages.map((img, idx) => (
                    <button
                        key={img}
                        className={`border-2 rounded-xl p-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary ${selectedIndex === idx ? 'border-primary shadow-glow' : 'border-muted'}`}
                        onClick={() => {
                            setSelectedIndex(idx);
                            if (onSelect) onSelect(img);
                        }}
                        aria-label={`Select premade design ${idx + 1}`}
                        tabIndex={0}
                    >
                        <img
                            src={img}
                            alt={`Premade Design ${idx + 1}`}
                            className="w-64 h-160 object-contain rounded-xl bg-gray-100"
                            loading="lazy"
                            draggable={false}
                        />
                    </button>
                ))}
            </div>
            {selectedIndex !== null && (
                <div className="mt-4 text-center">
                    <span className="font-semibold text-primary">Selected Design #{selectedIndex + 1}</span>
                </div>
            )}
            {/* Mobile swipe hint */}
            <div className="text-xs text-muted-foreground text-center mt-2 md:hidden" aria-live="polite">
                Swipe left/right to browse designs
            </div>
        </div>
    );
};

export default PremadeDesignSlideshow;
