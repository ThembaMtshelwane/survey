import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Survey on People's Lifestyles",
  description: "Gathering and analyzing data about people's lifestyles",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="logo.svg" />
      </head>
      <body className={inter.className}>
        <main className='mainContainer'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
