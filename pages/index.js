import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Footer from '@components/Footer'

export default function Home() {
  const heroRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const card = cardRef.current

    if (!hero || !card) {
      return undefined
    }

    let frame = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const animate = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      card.style.setProperty('--tilt-x', `${currentX}deg`)
      card.style.setProperty('--tilt-y', `${currentY}deg`)
      card.style.boxShadow = `
        ${currentY * 2}px ${-currentX * 2}px 60px rgba(123, 47, 255, 0.4),
        0 0 80px rgba(0, 229, 204, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.06)
      `

      frame = window.requestAnimationFrame(animate)
    }

    const onMove = (event) => {
      const bounds = hero.getBoundingClientRect()
      targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -14
      targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    frame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frame)
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>Terminus Est - Another Web Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16 [perspective:900px]"
      >
        <div className="nebula nebula-primary" />
        <div className="nebula nebula-secondary" />
        <div className="cyber-grid-floor" />
        <div className="retro-sun" />
        <div className="cyber-horizon" />

        <section className="pointer-events-none absolute inset-x-0 bottom-[28%] z-10 h-24 bg-[linear-gradient(180deg,transparent_0%,rgba(5,4,10,0.12)_40%,rgba(5,4,10,1)_100%)]" />

        <section
          ref={cardRef}
          className="parallax-card relative z-20 w-full max-w-3xl border border-primary/35 bg-[rgba(10,8,18,0.78)] p-8 backdrop-blur-xl sm:p-12"
        >
          <div className="fade-up fade-up-delay-1 mb-5 font-mono text-xs uppercase tracking-[0.3em] text-secondary/85 before:content-['//_'] before:opacity-50">
            portfolio.init
          </div>

          <h1 className="glitch-text fade-up fade-up-delay-2 font-display text-4xl font-black leading-none text-transparent sm:text-6xl bg-[linear-gradient(135deg,#fff_0%,var(--color-primary-soft)_45%,var(--color-secondary)_100%)] bg-clip-text">
            YOUR NAME
          </h1>

          <p className="fade-up fade-up-delay-3 mt-3 font-mono text-sm tracking-[0.15em] text-accent [text-shadow:0_0_12px_rgba(255,45,126,0.6)]">
            FULL_STACK_DEVELOPER / DIGITAL_CRAFTSMAN
          </p>

          <div className="glitch-divider fade-up fade-up-delay-4 my-8" />

          <p className="fade-up fade-up-delay-5 max-w-2xl text-xl leading-8 text-text-primary/80">
            I build <strong className="font-semibold text-secondary">fast, purposeful software</strong> at
            the intersection of elegant engineering and thoughtful design. The palette here is now
            reusable through Tailwind theme tokens like <code className="rounded bg-white/5 px-2 py-1 text-sm text-primary-soft">bg-primary</code> and{' '}
            <code className="rounded bg-white/5 px-2 py-1 text-sm text-secondary">text-secondary</code>.
          </p>

          <div className="fade-up fade-up-delay-6 mt-10 flex flex-wrap items-center gap-5">
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 overflow-hidden bg-secondary px-6 py-3 font-display text-xs font-bold tracking-[0.12em] text-cyber-black transition duration-300 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))] hover:text-white hover:[box-shadow:0_0_20px_rgba(168,85,247,0.6),0_0_40px_rgba(168,85,247,0.2)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-primary-glow transition duration-300 group-hover:translate-x-0" />
              <span className="relative z-10">VIEW LINKEDIN</span>
            </a>

            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-secondary/75">
              <span className="h-2 w-2 rounded-full bg-secondary [box-shadow:0_0_8px_var(--color-secondary)] animate-pulse" />
              AVAILABLE FOR HIRE
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
