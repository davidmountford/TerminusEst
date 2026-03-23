'use client'

import { useEffect, useState } from 'react'

import { Search } from 'lucide-react'

import Footer from '@components/Footer'
import Header from '@components/Header'

const INTRO_QUOTES = [
  'The sky above the port was the colour of television, tuned to static...',
  'Cyberspace. A consensual hallucination experienced daily...',
  "I've seen things you people wouldn't believe...",
  'What if a cyber brain could possibly generate its own ghost?',
]
const HEADER_TITLE = 'David Mountford'
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

const ENCRYPTION_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>/?"

function createEncryptedFrame(target, progress) {
  const encryptedCharacters = Math.floor(progress * target.length)

  return target
    .split('')
    .map((character, index) => {
      if (character === ' ') {
        return ' '
      }

      if (index < encryptedCharacters) {
        return ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)]
      }

      return character
    })
    .join('')
}

export default function HomePage() {
  const [glitchPulse, setGlitchPulse] = useState(false)
  const [activeSkill, setActiveSkill] = useState(null)
  const [introQuote, setIntroQuote] = useState(INTRO_QUOTES[0])
  const [displayTitle, setDisplayTitle] = useState(INTRO_QUOTES[0])
  const [titleMode, setTitleMode] = useState('quote')

  useEffect(() => {
    const nextQuote = INTRO_QUOTES[Math.floor(Math.random() * INTRO_QUOTES.length)]

    setIntroQuote(nextQuote)
    setDisplayTitle(nextQuote)
    setTitleMode('quote')
  }, [])

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
    let startTimeoutId
    let encryptFrameId
    let deleteIntervalId
    let typeIntervalId

    setDisplayTitle(introQuote)
    setTitleMode('quote')

    startTimeoutId = window.setTimeout(() => {
      setTitleMode('encrypting')

      const encryptDuration = 1500
      const startedAt = window.performance.now()

      const encryptTick = (now) => {
        const elapsed = now - startedAt
        const progress = Math.min(elapsed / encryptDuration, 1)

        setDisplayTitle(createEncryptedFrame(introQuote, progress))

        if (progress >= 1) {
          const fullyEncrypted = createEncryptedFrame(introQuote, 1)
          setDisplayTitle(fullyEncrypted)
          setTitleMode('deleting')

          let deleteIndex = fullyEncrypted.length
          deleteIntervalId = window.setInterval(() => {
            deleteIndex -= 1
            setDisplayTitle(fullyEncrypted.slice(0, Math.max(deleteIndex, 0)))

            if (deleteIndex <= 0) {
              window.clearInterval(deleteIntervalId)
              setTitleMode('typing')

              let typedCharacters = 0
              typeIntervalId = window.setInterval(() => {
                typedCharacters += 1
                setDisplayTitle(HEADER_TITLE.slice(0, typedCharacters))

                if (typedCharacters >= HEADER_TITLE.length) {
                  window.clearInterval(typeIntervalId)
                  setTitleMode('resolved')
                }
              }, 35)
            }
          }, 25)

          return
        }

        encryptFrameId = window.requestAnimationFrame(encryptTick)
      }

      encryptFrameId = window.requestAnimationFrame(encryptTick)
    }, 800)

    return () => {
      window.clearTimeout(startTimeoutId)
      window.cancelAnimationFrame(encryptFrameId)
      window.clearInterval(deleteIntervalId)
      window.clearInterval(typeIntervalId)
    }
  }, [introQuote])

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
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center sm:min-h-[calc(100vh-8rem)]">
        <section className="w-full rounded-[2rem] border border-border/70 bg-card/95 p-8 shadow-[0_24px_80px_rgba(24,20,34,0.16)] backdrop-blur sm:p-12">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-baseline gap-0.5 font-mono text-xs uppercase tracking-[0.3em] text-primary before:text-primary/65 before:content-['//_']">
              <span>Init TerminusEst</span>

              <span className="terminal-cursor text-secondary" aria-hidden="true" />
            </span>

            <div
              className={`overflow-hidden transition-[min-height] duration-700 ease-out ${
                titleMode === 'resolved'
                  ? 'min-h-[3.25rem] sm:min-h-[4.5rem]'
                  : 'min-h-[7.5rem] sm:min-h-[8.5rem]'
              }`}
            >
              <Header
                title={
                  <>
                    <span>{displayTitle}</span>

                    {titleMode !== 'resolved' && (
                      <span
                        className="terminal-cursor ml-1 inline-block align-baseline text-signal"
                        aria-hidden="true"
                      />
                    )}
                  </>
                }
                pulsing={glitchPulse}
                className={`max-w-[24ch] leading-tight transition-all duration-700 ease-out sm:max-w-[28ch] ${
                  titleMode === 'resolved'
                    ? 'font-display text-[3.35rem] tracking-tight text-foreground min-[360px]:text-5xl sm:text-6xl'
                    : 'font-mono text-2xl tracking-[0.04em] text-signal sm:text-3xl'
                }`}
              />
            </div>

            <div className="max-w-2xl space-y-4 text-lg leading-8 text-muted-foreground">
              <p>
                <span className="inline-flex items-center gap-2">
                  <Search className="size-5 text-primary" aria-hidden="true" />

                  <span>Locating Software Engineer...</span>
                </span>
              </p>

              <div className="space-y-3">
                <p className="font-mono text-sm tracking-[0.08em] text-muted-foreground">
                  Selected Skills =&gt;
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
              <span>
                Begin Trace...{' '}
                <span className="inline-block animate-spin">/</span>
              </span>

              <a
                href="https://github.com/davidmountford"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex size-10 items-center justify-center rounded-md border border-secondary/45 bg-secondary/18 text-secondary shadow-[0_6px_20px_rgba(15,143,130,0.12)] transition hover:border-primary/35 hover:bg-primary/12 hover:text-primary"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.49 0 12.26c0 5.42 3.44 10.01 8.2 11.63.6.11.82-.27.82-.59 0-.29-.01-1.07-.02-2.1-3.34.74-4.05-1.65-4.05-1.65-.55-1.42-1.33-1.8-1.33-1.8-1.08-.76.08-.75.08-.75 1.2.09 1.83 1.26 1.83 1.26 1.06 1.87 2.79 1.33 3.47 1.02.11-.79.42-1.33.76-1.63-2.66-.31-5.47-1.36-5.47-6.03 0-1.33.47-2.41 1.24-3.26-.12-.31-.54-1.57.12-3.27 0 0 1.01-.33 3.3 1.24a11.2 11.2 0 0 1 6 0c2.28-1.57 3.29-1.24 3.29-1.24.66 1.7.24 2.96.12 3.27.77.85 1.24 1.93 1.24 3.26 0 4.69-2.81 5.71-5.49 6.02.43.38.82 1.12.82 2.26 0 1.63-.01 2.94-.01 3.34 0 .32.21.71.82.59A12.3 12.3 0 0 0 24 12.26C24 5.49 18.63 0 12 0Z" />
                </svg>
              </a>

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
