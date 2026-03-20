import '@styles/globals.css'

export const metadata = {
  title: 'Terminus Est - Another Web Developer'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
