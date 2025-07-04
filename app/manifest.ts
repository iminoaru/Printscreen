import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Printscreen',
    short_name: 'Printscreen',
    description: 'Make your screenshots beautiful',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/192-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/512-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}