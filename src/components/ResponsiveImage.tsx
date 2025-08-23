type Props = {
  name: string // basename produced by optimizer, e.g., 'hero'
  alt: string
  className?: string
  widths?: number[]
  path?: string // default '/img'
}

export default function ResponsiveImage({
  name,
  alt,
  className,
  widths = [480, 768, 1080, 1440],
  path = '/img'
}: Props) {
  const webp = widths.map(w => `${path}/${name}-${w}.webp ${w}w`).join(', ')
  const avif = widths.map(w => `${path}/${name}-${w}.avif ${w}w`).join(', ')
  const jpg = `${path}/${name}.jpg`
  const sizes = '(max-width: 768px) 90vw, 1200px'
  
  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img src={jpg} alt={alt} loading="lazy" decoding="async" className={className} />
    </picture>
  )
}