import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portal do Governo de Moçambique',
  description: 'Portal oficial do Governo de Moçambique',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}