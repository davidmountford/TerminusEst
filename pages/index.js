import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Search } from 'lucide-react'
import Header from '@components/Header'
import Footer from '@components/Footer'

const SKILLS = [
  'PHP',
  'Laravel',
  'Symfony',
  'JS',
  'TS',
  'React',
  'Vue',
  'MySQL',
  'AI',
  'Agentic AI',
  'Prompting',
]

export default function Home() {
  const [glitchPulse, setGlitchPulse] = useState(false)
  const [activeSkill, setActiveSkill] = useState(null)

  useEffect(() => {
    let timeoutId

    const nextNameDelay = () => {
      const weightedHigh = Math.random() < 0.5
      const seconds = weightedHigh ? 10 + Math.random() * 20 : 1 + Math.random() * 9
      return Math.round(seconds * 1000)
    }

    const pulse = () => {
      setGlitchPulse(true)
      window.setTimeout(() => {
        setGlitchPulse(false)
      }, 450)

      timeoutId = window.setTimeout(pulse, nextNameDelay())
    }

    timeoutId = window.setTimeout(pulse, nextNameDelay())

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const pulseSkill = () => {
      const nextSkill = SKILLS[Math.floor(Math.random() * SKILLS.length)]
      setActiveSkill(nextSkill)

      window.setTimeout(() => {
        setActiveSkill((current) => (current === nextSkill ? null : current))
      }, 500)
    }

    const intervalId = window.setInterval(pulseSkill, 47000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="min-h-screen px-6 py-10 text-foreground sm:py-16">
      <Head>
        <title>Terminus Est - Another Web Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center sm:min-h-[calc(100vh-8rem)]">
        <section className="w-full rounded-[2rem] border border-border/70 bg-card/95 p-8 shadow-[0_24px_80px_rgba(24,20,34,0.16)] backdrop-blur sm:p-12">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-baseline gap-0.5 font-mono text-xs uppercase tracking-[0.3em] text-primary before:content-['//_'] before:text-primary/65">
              <span>Init TerminusEst</span>
              <span className="terminal-cursor text-secondary" aria-hidden="true" />
            </span>
            <Header title="David Mountford" pulsing={glitchPulse} />
            <div className="max-w-2xl space-y-4 text-lg leading-8 text-muted-foreground">
              <p>
                <span className="inline-flex items-center gap-2">
                  <Search className="size-5 text-primary" aria-hidden="true" />
                  <span>Locating Software Engineer...</span>
                </span>
              </p>
              <div className="space-y-3">
                <p className="font-mono text-sm tracking-[0.08em] text-muted-foreground">
                  Selected Skills;
                </p>
                <div className="flex flex-wrap gap-3">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-mono text-sm tracking-[0.12em] text-primary ${
                        activeSkill === skill ? 'glitch-text-active' : ''
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-sm tracking-[0.14em] text-primary">
              <span>Begin Trace... //+</span>
              <a
                href="https://www.linkedin.com/in/davidsmountford/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex size-10 items-center justify-center rounded-md border border-secondary/45 bg-secondary/18 text-secondary shadow-[0_6px_20px_rgba(15,143,130,0.12)] transition hover:border-primary/35 hover:bg-primary/12 hover:text-primary"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452H16.9v-5.568c0-1.328-.028-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.939v5.666H9.367V9h3.4v1.561h.049c.473-.898 1.637-1.848 3.368-1.848 3.599 0 4.263 2.369 4.263 5.455v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9H7.12v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
