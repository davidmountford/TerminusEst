import '@styles/globals.css'
import ThemeClientShell from '@components/ThemeClientShell'

export const metadata = {
  title: 'Terminus Est - Another Web Developer'
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
