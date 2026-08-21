import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Providers from '@/components/providers'
import './globals.css'

/* Nexa Text Pro = thin/regular; Nexa Pro = bold/black (same type family, different cuts) */
const nexa = localFont({
  src: [
    {
      path: '../public/fontface/NexaTextPro_Trial-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fontface/NexaTextPro_Trial-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fontface/NexaTextPro_Trial-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fontface/NexaTextPro_Trial-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fontface/NexaPro_Trial-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fontface/NexaPro_Trial-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fontface/NexaPro_Trial-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fontface/NexaPro_Trial-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-nexa',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PharmaCore Wholesale | Premium B2B Pharmaceutical Distributor',
  description:
    'PharmaCore Wholesale is a trusted B2B pharmaceutical wholesale company supplying high-quality medicines, medical devices, and surgical products to healthcare providers nationwide.',
  keywords: [
    'pharmaceutical wholesale',
    'medicine distributor',
    'B2B pharma',
    'WHO-GMP certified',
    'medical wholesale',
  ],
  openGraph: {
    title: 'PharmaCore Wholesale',
    description: 'Your Trusted B2B Pharmaceutical Wholesale Partner',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#00827F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nexa.variable} bg-background`}>
      <body className="antialiased font-sans">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
