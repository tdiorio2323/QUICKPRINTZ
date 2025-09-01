import { render, screen, fireEvent } from '@testing-library/react';
import PremadeDesignSlideshow from './PremadeDesignSlideshow';
import { describe, it, expect, vi } from 'vitest';

describe('PremadeDesignSlideshow', () => {
  const designImages = [
    ...Array(40).fill(0).map((_, i) => `/60 designs for Reel/layer_${String(i + 1).padStart(3, '0')}_Layer ${i + ((i % 2) === 0 ? 0 : 1)}.jpg`),
  ];

  it('renders without crashing', () => {
    render(<PremadeDesignSlideshow />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders the correct number of images', () => {
    render(<PremadeDesignSlideshow />);
    const images = screen.getAllByRole('button');
    expect(images.length).toBe(designImages.length);
  });

  it('calls onSelect with the correct image source when an image is clicked', () => {
    const onSelect = vi.fn();
    render(<PremadeDesignSlideshow onSelect={onSelect} />);
    const images = screen.getAllByRole('button');
    fireEvent.click(images[0]);
    expect(onSelect).toHaveBeenCalledWith(designImages[0]);
  });

  it('updates the selected state and displays the selected design number when an image is clicked', () => {
    render(<PremadeDesignSlideshow />);
    const images = screen.getAllByRole('button');
    fireEvent.click(images[0]);
    expect(screen.getByText('Selected Design #1')).toBeInTheDocument();
  });

  it('displays the mobile swipe hint', () => {
    render(<PremadeDesignSlideshow />);
    expect(screen.getByText('Swipe left/right to browse designs')).toBeInTheDocument();
  });
});
