import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  lazy?: boolean
  priority?: boolean
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  lazy = true,
  priority = false 
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      width={width}
      height={height}
      loading={priority ? "eager" : lazy ? "lazy" : "eager"}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
    />
  )
}