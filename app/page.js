import Header from '@components/Header'
import Footer from '@components/Footer'

export default function HomePage() {
  return (
    <div className="container">
      <main>
        <Header title="Working..." />
        <p className="description">
          <code>Please wait...</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
