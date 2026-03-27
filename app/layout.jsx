import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Jordan Benson | Developer',
  description:
    'Developer and entrepreneur focused on building thoughtful, scalable solutions for the modern web.',
  openGraph: {
    title: 'Jordan Benson | Developer',
    description: 'Developer and entrepreneur focused on building thoughtful, scalable solutions.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
