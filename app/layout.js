import '@styles/globals.css'
import ThemeClientShell from '@components/ThemeClientShell'

export const metadata = {
  title: 'David Mountford | Terminus Est',
  description: 'I build web apps, platforms, and AI tooling, omae.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeClientShell>{children}</ThemeClientShell>
      </body>
    </html>
  )
}
