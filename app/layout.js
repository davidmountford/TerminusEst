import '@styles/globals.css'
import ThemeClientShell from '@components/ThemeClientShell'
import { Orbitron, Rajdhani, Share_Tech_Mono } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron'
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-rajdhani'
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-share-tech-mono'
})

export const metadata = {
  title: 'David Mountford | Terminus Est',
  description: 'I build web apps, platforms, and AI tooling, omae.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rajdhani.className} ${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable}`}>
        <ThemeClientShell>{children}</ThemeClientShell>
      </body>
    </html>
  )
}
