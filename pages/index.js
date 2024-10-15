import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Terminus Est - Another Web Developer</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col justify-center items-center'>
        <Header title="Working..." />

        <p className="description">
          <code className='text-xs'>Please wait...</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
