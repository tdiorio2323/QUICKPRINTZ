export const GA_ID = import.meta.env.VITE_GA_ID
export const hasGA = !!GA_ID

export function gtag(...args: any[]) {
  if (!hasGA) return
  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push(arguments)
}

export function gaEvent(name: string, params?: Record<string, any>) {
  if (!hasGA) return
  ;(window as any).gtag('event', name, params || {})
}