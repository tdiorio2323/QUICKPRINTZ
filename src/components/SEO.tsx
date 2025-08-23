import { Helmet } from 'react-helmet-async'

type Props = {
  title: string
  description: string
  url?: string
  image?: string
  jsonLd?: object
  canonical?: string
}

export default function SEO({ title, description, url, image, jsonLd, canonical }: Props) {
  const fullTitle = `${title} | Quick Printz - Premium Cannabis Packaging`
  const defaultImage = "https://cdn.builder.io/api/v1/image/assets%2Fed5382895c1f4487a68dd55afef3b83c%2F9a0d735aeec84099864bc786d8078b82"
  
  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        
        {/* Open Graph */}
        {url && <meta property="og:url" content={url} />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image || defaultImage} />
        <meta property="og:site_name" content="Quick Printz" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image || defaultImage} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Quick Printz" />
        <meta name="theme-color" content="#DCCC1C" />
      </Helmet>
      
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}