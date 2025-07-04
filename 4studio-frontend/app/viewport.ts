import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' }, // Violeta-500
    { media: '(prefers-color-scheme: dark)', color: '#6b21a8' }   // Violeta-800
  ],
}
