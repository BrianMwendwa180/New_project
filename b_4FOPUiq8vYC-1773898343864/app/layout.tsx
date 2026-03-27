import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VendorSquare - Event & Vendor Marketplace',
  description: 'Discover amazing vendor events, craft fairs, and local markets. Book your vendor booth or find tickets to exciting events near you.',
  keywords: ['vendor events', 'craft fairs', 'local markets', 'vendor booth', 'event tickets', 'artisan market'],
  authors: [{ name: 'VendorSquare' }],
  openGraph: {
    title: 'VendorSquare - Event & Vendor Marketplace',
    description: 'Discover amazing vendor events, craft fairs, and local markets.',
    type: 'website',
    siteName: 'VendorSquare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VendorSquare - Event & Vendor Marketplace',
    description: 'Discover amazing vendor events, craft fairs, and local markets.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
<body className="font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
