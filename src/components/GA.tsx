import { GA_ID, hasGA } from '@/lib/ga'

export default function GA() {
  if (!hasGA) return null
  
  return (
    <>
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`
      }} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
    </>
  )
}