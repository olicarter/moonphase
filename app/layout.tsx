import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'moonphased',
  description: "For checking the moon's phase in the dark of night",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="bg-neutral-950 overscroll-none" lang="en">
      <body>{children}</body>
    </html>
  )
}
