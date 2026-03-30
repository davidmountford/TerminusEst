'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TriangleAlert } from 'lucide-react'

import TacticalOverlayNav from '@components/TacticalOverlayNav'

const VOID_WINDOWS = [
  { className: 'not-found-void-1', type: 'icon' },
  { className: 'not-found-void-2', type: 'gibberish' },
  { className: 'not-found-void-3', type: 'icon' },
  { className: 'not-found-void-4', type: 'matrix' },
  { className: 'not-found-void-5', type: 'gibberish' },
]
const NOT_FOUND_TITLE = 'The Route Dissolved In Transit'
const MATRIX_STREAMS = [
  'SIGNAL_NULL_404//TERMINUS_EST//GHOST_ROUTE//PACKET_LOSS//',
  'VX-SECTOR::NULL_PATH//TRACE_FAIL//ARCHIVE_VOID//',
  'RETURN_SIGNAL_LOW//KAMON_ECHO//NODE_LOST//',
  'ERROR_404//ROUTE_GONE//PACKET_NOISE//',
  'NULL_PATH//SIGNAL_NULL//VOID_LINK//',
  'TERMINUS_EST//404_ROUTE//NODE_BREAK//',
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
        const deterministicOffset =
          target.length * 17 +
          index * 31 +
          Math.floor(progress * 1000) * 13 +
          character.charCodeAt(0)

        return ENCRYPTION_CHARS[deterministicOffset % ENCRYPTION_CHARS.length]
      }

      return character
    })
    .join('')
}

function MatrixTrack({ className, value }) {
  return (
    <div className={`not-found-void-matrix-track ${className}`}>
      <div className="not-found-void-matrix-track-inner">
        <span>{value}{value}{value}</span>

        <span aria-hidden="true">{value}{value}{value}</span>
      </div>
    </div>
  )
}

export default function NotFoundPageClient({ projectsEnabled }) {
  const router = useRouter()
  const [glitchWindow, setGlitchWindow] = useState(null)
  const [displayTitle, setDisplayTitle] = useState(() => createEncryptedFrame(NOT_FOUND_TITLE, 1))
  const [titleMode, setTitleMode] = useState('deleting')

  useEffect(() => {
    let cycleTimeoutId
    let clearTimeoutId

    const nextDelay = () => Math.round((0.8 + Math.random() * 1.4) * 1000)

    const pulseWindow = () => {
      const nextWindow = VOID_WINDOWS[Math.floor(Math.random() * VOID_WINDOWS.length)].className

      setGlitchWindow(nextWindow)

      clearTimeoutId = window.setTimeout(() => {
        setGlitchWindow((current) => (current === nextWindow ? null : current))
      }, 420)

      cycleTimeoutId = window.setTimeout(pulseWindow, nextDelay())
    }

    cycleTimeoutId = window.setTimeout(pulseWindow, nextDelay())

    return () => {
      window.clearTimeout(cycleTimeoutId)
      window.clearTimeout(clearTimeoutId)
    }
  }, [])

  useEffect(() => {
    let deleteIntervalId
    let typeIntervalId

    const fullyEncrypted = createEncryptedFrame(NOT_FOUND_TITLE, 1)
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
          setDisplayTitle(NOT_FOUND_TITLE.slice(0, typedCharacters))

          if (typedCharacters >= NOT_FOUND_TITLE.length) {
            window.clearInterval(typeIntervalId)
            setTitleMode('resolved')
          }
        }, 26)
      }
    }, 15)

    return () => {
      window.clearInterval(deleteIntervalId)
      window.clearInterval(typeIntervalId)
    }
  }, [])

  const handleSectionSelect = (sectionId) => {
    router.push(`/${sectionId}`)
  }

  const handleReturnHome = () => {
    router.push('/')
  }

  return (
    <main className="relative isolate h-screen overflow-clip px-6 py-6 text-foreground sm:px-8 sm:py-8">
      <TacticalOverlayNav
        onSelect={handleSectionSelect}
        onHome={handleReturnHome}
        activeSection="error"
        projectsEnabled={projectsEnabled}
      />

      <div
        aria-hidden="true"
        className="nebula nebula-primary absolute right-[-10rem] top-[-8rem] opacity-70"
      />

      <div
        aria-hidden="true"
        className="nebula nebula-secondary absolute bottom-[-6rem] left-[-7rem] opacity-60"
      />

      <div aria-hidden="true" className="cyber-grid-floor opacity-40" />

      <div className="mx-auto flex h-full max-w-6xl items-center justify-center overflow-hidden">
        <section className="not-found-shell relative max-h-full w-full overflow-hidden px-2 py-4 sm:px-4 sm:py-6">
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-secondary">
                Signal Lost // Error 404
              </p>

              <h1
                className={`font-display text-4xl uppercase tracking-[0.12em] text-foreground sm:text-5xl ${
                  titleMode === 'encrypting' ? 'glitch-text-active' : ''
                }`}
              >
                <span className="relative inline-flex min-h-[2.4em] min-w-full items-center justify-center">
                  <span className="invisible" aria-hidden="true">
                    {NOT_FOUND_TITLE}

                    <span className="terminal-cursor ml-2 text-signal" />
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span>{displayTitle}</span>

                    {titleMode !== 'resolved' ? (
                      <span className="terminal-cursor ml-2 text-signal" aria-hidden="true" />
                    ) : null}
                  </span>
                </span>
              </h1>
            </div>

            <div className="relative flex min-h-[18rem] w-full items-center justify-center sm:min-h-[24rem]">
              <div className="not-found-monolith" aria-hidden="true">
                <img src="/kamon_bw.svg" alt="" className="not-found-kamon not-found-rgb-layer not-found-rgb-layer-cyan" />
                <img src="/kamon_bw.svg" alt="" className="not-found-kamon not-found-rgb-layer not-found-rgb-layer-magenta" />
                <img src="/kamon_bw.svg" alt="" className="not-found-kamon not-found-kamon-core not-found-rgb-layer" />

                <div className="not-found-slice not-found-slice-a" />
                <div className="not-found-slice not-found-slice-b" />
                <div className="not-found-slice not-found-slice-c" />
                <div className="not-found-slice not-found-slice-d" />

                {VOID_WINDOWS.map(({ className, type }) => (
                  <div
                    key={className}
                    className={`not-found-void ${className} ${
                      glitchWindow === className ? 'glitch-text-active' : ''
                    }`}
                  >
                    <div className="not-found-void-header">
                      <div className="not-found-void-dots" />
                    </div>

                    <div className="not-found-void-body">
                      {type === 'icon' ? (
                        <TriangleAlert
                          className="not-found-void-icon"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      ) : null}

                      {type === 'gibberish' ? (
                        <div className="not-found-void-gibberish" aria-hidden="true">
                          <span>7F::NULL</span>
                          <span>ERR/SECT-9</span>
                          <span>VX-113.A$</span>
                          <span>NO_ROUTE</span>
                        </div>
                      ) : null}

                      {type === 'matrix' ? (
                        <div className="not-found-void-matrix" aria-hidden="true">
                          {MATRIX_STREAMS.map((stream, index) => (
                            <MatrixTrack
                              key={stream}
                              className={`not-found-void-matrix-track-${index + 1}`}
                              value={stream}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-2xl space-y-3">
              <p className="text-lg leading-7 text-muted-foreground sm:text-xl">
                The requested page broke apart somewhere between sectors. All that came back was a damaged monument and some bad signal.
              </p>

              <span className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                Artifact state: corrupted
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
