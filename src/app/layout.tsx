import type { Metadata } from 'next'
import './globals.css'
import { Provider } from '@/components/ui/provider'
import { open_sans } from './fonts'

export const metadata: Metadata = {
  title: 'NYT Tech Guild Mini Crossword',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={open_sans.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
