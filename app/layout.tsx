import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lato, Playfair_Display } from 'next/font/google'
import Providers from '@/components/providers'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '700', '900'],
})

/* Accent italic only — blue display words */
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['500'],
  style: ['italic'],
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
  themeColor: '#0F6CBD',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${playfairDisplay.variable} bg-background`}>
      <body className="antialiased font-sans">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
