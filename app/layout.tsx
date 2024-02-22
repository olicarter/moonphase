import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'moonphase',
  description: 'The current moon phase',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className="bg-neutral-950 text-yellow-50"
      lang="en"
      style={{ scrollbarWidth: 'none' }}
    >
      <body className={inter.className}>{children}</body>
    </html>
  )
}
