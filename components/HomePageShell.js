'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { PROJECT_CATALOG } from '@/lib/project-catalog'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ParallaxPanel from '@components/ParallaxPanel'
import TacticalOverlayNav from '@components/TacticalOverlayNav'

const INTRO_QUOTES = [
  'The sky above the port was the colour of television, tuned to static...',
  'Cyberspace. A consensual hallucination experienced daily...',
  "I've seen things you people wouldn't believe...",
  'What if a cyber brain could possibly generate its own ghost?',
]

const HEADER_TITLE = 'David Mountford'
const HEADER_SUBTITLE = 'Software Engineer'
const INIT_LABEL = 'Init TerminusEst'
const TRACE_LABEL = 'Begin Trace...'
const GLITCH_DURATION_MS = 1000
const SECOND_INITIAL_INDEX = HEADER_TITLE.indexOf('M', 1)

const SKILLS = [
  'PHP',
  'Laravel',
  'Symfony',
  'Tailwind',
  'JS',
  'TS',
  'React',
  'Next',
  'Vue',
  'Nuxt',
  'CSS',
  'MySQL',
  'AI',
  'Agentic AI',
  'Prompting',
]

const SOCIAL_LINKS = [
  {
    id: 'github',
    href: 'https://github.com/davidmountford',
    label: 'GitHub profile',
    icon: (
      <path d="M12 0C5.37 0 0 5.49 0 12.26c0 5.42 3.44 10.01 8.2 11.63.6.11.82-.27.82-.59 0-.29-.01-1.07-.02-2.1-3.34.74-4.05-1.65-4.05-1.65-.55-1.42-1.33-1.8-1.33-1.8-1.08-.76.08-.75.08-.75 1.2.09 1.83 1.26 1.83 1.26 1.06 1.87 2.79 1.33 3.47 1.02.11-.79.42-1.33.76-1.63-2.66-.31-5.47-1.36-5.47-6.03 0-1.33.47-2.41 1.24-3.26-.12-.31-.54-1.57.12-3.27 0 0 1.01-.33 3.3 1.24a11.2 11.2 0 0 1 6 0c2.28-1.57 3.29-1.24 3.29-1.24.66 1.7.24 2.96.12 3.27.77.85 1.24 1.93 1.24 3.26 0 4.69-2.81 5.71-5.49 6.02.43.38.82 1.12.82 2.26 0 1.63-.01 2.94-.01 3.34 0 .32.21.71.82.59A12.3 12.3 0 0 0 24 12.26C24 5.49 18.63 0 12 0Z" />
    ),
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/davidsmountford/',
    label: 'LinkedIn profile',
    icon: (
      <path d="M20.447 20.452H16.9v-5.568c0-1.328-.028-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.939v5.666H9.367V9h3.4v1.561h.049c.473-.898 1.637-1.848 3.368-1.848 3.599 0 4.263 2.369 4.263 5.455v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9H7.12v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
]

const SECTION_CONTENT = {
  about: {
    eyebrow: '01 // About',
    title: 'Terminus Est',
    intro: [
      'Well, we all have little artefacts from our younger selves, right?',
      'For me there were two things that cemented this (and certain other phrases) into my brain. Finding the weapon in Baldurs Gate and later a book by Gene Wolfe called The Book of the New Sun.',
      'So, for me it evokes a memory, but as a latin phrase it also has a litte gravitas. If you were to translate it into English it would be "Final End" or "The end is near".',
      'I am a UK based software engineer, married father of one and partner to a doting wife who puts up with excited technical explanations and localhost projects. This site is a playground, somewhere where I can test out my latest projects and make them available.',
      'So take a look. Trace me onto LinkedIn or Github. Connect. See you in the neon haze.',
    ],
  },
  projects: {
    eyebrow: '02 // Projects',
    title: 'Interfacing...',
    intro: 'Welcome to the Playground.',
    bodyComponent: <ProjectsGrid />,
  },
}

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

function normalizeParagraphs(value) {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value.filter(Boolean) : [value]
}

function getAmbientGlitchDelay() {
  if (Math.random() < 0.8) {
    return Math.round((5 + Math.random() * 5) * 1000)
  }

  return Math.round((3 + Math.random() * 2) * 1000)
}

function renderStyledHeaderTitle(value) {
  const firstInitial = value.slice(0, 1)
  const firstSegment = value.slice(1, SECOND_INITIAL_INDEX)
  const secondInitial = value.slice(SECOND_INITIAL_INDEX, SECOND_INITIAL_INDEX + 1)
  const secondSegment = value.slice(SECOND_INITIAL_INDEX + 1)

  return (
    <>
      {firstInitial ? <span className="text-signal">{firstInitial}</span> : null}

      {firstSegment ? <span>{firstSegment}</span> : null}

      {secondInitial ? <span className="text-signal">{secondInitial}</span> : null}

      {secondSegment ? <span>{secondSegment}</span> : null}
    </>
  )
}

function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex min-h-[16rem] flex-col overflow-hidden rounded-[1.5rem] border border-primary/20 bg-card/92 p-5 shadow-[0_18px_48px_rgba(24,20,34,0.16)] transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:border-secondary/45 hover:bg-card hover:shadow-[0_24px_56px_rgba(0,229,204,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,47,255,0.1),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(0,229,204,0.08),transparent_48%)] opacity-80 transition-opacity duration-200 group-hover:opacity-100"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-70"
      />

      <div className="relative z-10 flex h-full flex-col gap-5">
        <div className="space-y-3">
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-secondary">
            {project.index} // Project
          </span>

          <h3 className="font-display text-xl uppercase tracking-[0.08em] text-foreground transition-colors duration-200 group-hover:text-secondary sm:text-2xl">
            {project.title}
          </h3>

          <p className="font-sans text-base leading-8 text-muted-foreground">{project.summary}</p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

function ProjectsGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {PROJECT_CATALOG.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}

function SocialLink({ link, showTraceIcons, glitchTarget }) {
  const isActive = glitchTarget === `link-${link.id}`

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      aria-hidden={!showTraceIcons}
      tabIndex={showTraceIcons ? undefined : -1}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-md border border-secondary/45 bg-secondary/18 text-secondary shadow-[0_6px_20px_rgba(15,143,130,0.12)] transition-[opacity,transform,border-color,background-color,color,box-shadow] duration-500 hover:border-primary/35 hover:bg-primary/12 hover:text-primary',
        showTraceIcons ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
        isActive &&
          'border-primary/35 bg-primary/12 text-primary shadow-[0_0_0_1px_rgba(91,33,182,0.16),0_0_24px_rgba(91,33,182,0.18)]'
      )}
      style={{ transitionDelay: link.id === 'linkedin' && showTraceIcons ? '90ms' : '0ms' }}
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {link.icon}
      </svg>
    </a>
  )
}

function LandingHeading({
  activeSection,
  displayTitle,
  glitchTarget,
  isResolved,
  isTypingOrResolved,
  showSubtitle,
}) {
  const titleClassName = cn(
    'origin-top-left leading-tight font-display tracking-tight text-foreground transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)]',
    activeSection
      ? 'text-[2.4rem] min-[360px]:text-[2.7rem] sm:text-[2.8rem]'
      : 'text-[3rem] min-[360px]:text-[3.4rem] sm:text-5xl'
  )

  return (
    <div className="flex flex-col gap-1 sm:gap-1.5">
      <div
        className={cn(
          'relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)]',
          activeSection ? 'min-h-[4.5rem] sm:min-h-[4.5rem]' : 'min-h-[5.75rem] sm:min-h-[4.75rem]'
        )}
      >
        <div className="pointer-events-none invisible">
          <Header title={renderStyledHeaderTitle(HEADER_TITLE)} className={titleClassName} />
        </div>

        {isTypingOrResolved ? (
          <div className="absolute inset-0">
            <Header
              title={
                isResolved ? renderStyledHeaderTitle(HEADER_TITLE) : renderStyledHeaderTitle(displayTitle)
              }
              pulsing={glitchTarget === 'title'}
              className={titleClassName}
            />
          </div>
        ) : null}

        {!isTypingOrResolved ? (
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 flex items-start overflow-hidden leading-tight font-mono text-2xl tracking-[0.04em] text-signal sm:text-3xl',
              glitchTarget === 'title' && 'glitch-text-active'
            )}
          >
            <span>
              <span>{displayTitle}</span>

              <span
                className="terminal-cursor ml-1 inline-block align-baseline text-signal"
                aria-hidden="true"
              />
            </span>
          </div>
        ) : null}
      </div>

      <div className="min-h-[1.25rem] sm:min-h-[1.5rem]">
        {showSubtitle ? (
          <p
            className={cn(
              'animate-in fade-in slide-in-from-bottom-1 duration-500 font-mono text-sm uppercase tracking-[0.28em] text-muted-foreground transition-all duration-500 sm:text-base',
              glitchTarget === 'subtitle' && 'glitch-text-active'
            )}
          >
            {HEADER_SUBTITLE}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function SkillsPanel({ glitchTarget }) {
  return (
    <div className="space-y-5 pt-1 text-lg leading-8 text-muted-foreground sm:space-y-6 sm:pt-2">
      <div className="space-y-3">
        <p className="font-mono text-sm tracking-[0.08em] text-muted-foreground">
          Selected Skills <span className="text-signal">=&gt;</span>
        </p>

        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className={cn(
                'rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-mono text-sm tracking-[0.12em] text-primary',
                glitchTarget === `skill:${skill}` && 'glitch-text-active'
              )}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function TraceLinks({ glitchTarget, showTraceIcons, traceLabel }) {
  return (
    <>
      <hr className="glitch-divider mt-6 w-full max-w-3xl border-0" />

      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-sm tracking-[0.14em] text-primary">
        <span>
          {traceLabel}{' '}
          <span className="inline-block animate-spin">
            /
          </span>
        </span>

        {SOCIAL_LINKS.map((link) => (
          <SocialLink
            key={link.id}
            link={link}
            showTraceIcons={showTraceIcons}
            glitchTarget={glitchTarget}
          />
        ))}
      </div>
    </>
  )
}

function SidebarFooter({ handleReturnHome, sidebarSlot }) {
  return (
    <div className="mt-auto animate-in fade-in slide-in-from-bottom-2 duration-500 pt-6">
      <div className="border-t border-primary/18 pt-4">
        {sidebarSlot ? <div className="mb-4">{sidebarSlot}</div> : null}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleReturnHome}
            className="inline-flex items-center rounded-md border border-primary/30 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary transition-colors duration-200 hover:border-secondary/50 hover:text-secondary"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionPanel({ activeContent, bodyParagraphs, contentAside, hasContentAside, introParagraphs }) {
  const bodyComponent = activeContent?.bodyComponent ?? null

  if (!activeContent) {
    return null
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="rounded-[2rem] border border-border/70 bg-card/95 p-8 shadow-[0_24px_80px_rgba(24,20,34,0.16)] sm:p-10 lg:min-h-[36rem]">
        <div className={cn('space-y-8', bodyComponent ? 'max-w-5xl' : 'max-w-3xl')}>
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-secondary">
              {activeContent.eyebrow}
            </p>

            <h2 className="font-display text-3xl uppercase tracking-[0.14em] text-foreground sm:text-5xl">
              {activeContent.title}
            </h2>

            {introParagraphs.length > 0 ? (
              <div className="max-w-2xl space-y-4 text-xl leading-8 text-foreground/90">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              'grid gap-8',
              hasContentAside && 'lg:grid-cols-[minmax(0,1.6fr)_minmax(16rem,0.85fr)]'
            )}
          >
            <div className={cn(bodyComponent ? '' : 'space-y-5 text-lg leading-8 text-muted-foreground')}>
              {bodyComponent}

              {!bodyComponent
                ? bodyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                : null}
            </div>

            {contentAside ? <aside>{contentAside}</aside> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function useHeroAnimationState({ activeContent }) {
  const [glitchTarget, setGlitchTarget] = useState(null)
  const [introQuote, setIntroQuote] = useState(INTRO_QUOTES[0])
  const [displayTitle, setDisplayTitle] = useState(INTRO_QUOTES[0])
  const [titleMode, setTitleMode] = useState('quote')
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [initLabel, setInitLabel] = useState('')
  const [sectionLabel, setSectionLabel] = useState('')
  const [traceLabel, setTraceLabel] = useState('')
  const [showTraceIcons, setShowTraceIcons] = useState(false)

  const isResolved = titleMode === 'resolved'
  const isTypingOrResolved = titleMode === 'typing' || isResolved
  const initReady = initLabel === INIT_LABEL

  useEffect(() => {
    const nextQuote = INTRO_QUOTES[Math.floor(Math.random() * INTRO_QUOTES.length)]

    setIntroQuote(nextQuote)
    setDisplayTitle(nextQuote)
    setTitleMode('quote')
  }, [])

  useEffect(() => {
    let cycleTimeoutId
    let clearTimeoutId

    const pulseAmbient = () => {
      const targets = ['title', ...SKILLS.map((skill) => `skill:${skill}`)]

      if (showSubtitle) {
        targets.push('subtitle')
      }

      if (initReady) {
        targets.push('init-terminus', 'init-est')
      }

      if (showTraceIcons) {
        targets.push(...SOCIAL_LINKS.map((link) => `link-${link.id}`))
      }

      const nextTarget = targets[Math.floor(Math.random() * targets.length)]
      setGlitchTarget(nextTarget)

      clearTimeoutId = window.setTimeout(() => {
        setGlitchTarget((current) => (current === nextTarget ? null : current))
      }, GLITCH_DURATION_MS)

      cycleTimeoutId = window.setTimeout(pulseAmbient, getAmbientGlitchDelay())
    }

    cycleTimeoutId = window.setTimeout(pulseAmbient, getAmbientGlitchDelay())

    return () => {
      window.clearTimeout(cycleTimeoutId)
      window.clearTimeout(clearTimeoutId)
    }
  }, [initReady, showSubtitle, showTraceIcons])

  useEffect(() => {
    let initIntervalId
    let traceStartTimeoutId
    let traceIntervalId
    let iconTimeoutId

    let initIndex = 0
    initIntervalId = window.setInterval(() => {
      initIndex += 1
      setInitLabel(INIT_LABEL.slice(0, initIndex))

      if (initIndex >= INIT_LABEL.length) {
        window.clearInterval(initIntervalId)
      }
    }, 40)

    traceStartTimeoutId = window.setTimeout(() => {
      let traceIndex = 0
      traceIntervalId = window.setInterval(() => {
        traceIndex += 1
        setTraceLabel(TRACE_LABEL.slice(0, traceIndex))

        if (traceIndex >= TRACE_LABEL.length) {
          window.clearInterval(traceIntervalId)
          iconTimeoutId = window.setTimeout(() => {
            setShowTraceIcons(true)
          }, 120)
        }
      }, 36)
    }, 260)

    return () => {
      window.clearInterval(initIntervalId)
      window.clearTimeout(traceStartTimeoutId)
      window.clearInterval(traceIntervalId)
      window.clearTimeout(iconTimeoutId)
    }
  }, [])

  useEffect(() => {
    if (!activeContent) {
      setSectionLabel('')
      return undefined
    }

    setSectionLabel('')

    let sectionIndex = 0
    const sectionIntervalId = window.setInterval(() => {
      sectionIndex += 1
      setSectionLabel(activeContent.eyebrow.slice(0, sectionIndex))

      if (sectionIndex >= activeContent.eyebrow.length) {
        window.clearInterval(sectionIntervalId)
      }
    }, 34)

    return () => {
      window.clearInterval(sectionIntervalId)
    }
  }, [activeContent])

  useEffect(() => {
    let startTimeoutId
    let encryptFrameId
    let deleteIntervalId
    let typeIntervalId

    setDisplayTitle(introQuote)
    setTitleMode('quote')

    startTimeoutId = window.setTimeout(() => {
      setTitleMode('encrypting')

      const startedAt = window.performance.now()

      const encryptTick = (now) => {
        const progress = Math.min((now - startedAt) / 1000, 1)

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
              }, 28)
            }
          }, 15)

          return
        }

        encryptFrameId = window.requestAnimationFrame(encryptTick)
      }

      encryptFrameId = window.requestAnimationFrame(encryptTick)
    }, 450)

    return () => {
      window.clearTimeout(startTimeoutId)
      window.cancelAnimationFrame(encryptFrameId)
      window.clearInterval(deleteIntervalId)
      window.clearInterval(typeIntervalId)
    }
  }, [introQuote])

  useEffect(() => {
    if (titleMode !== 'resolved') {
      setShowSubtitle(false)
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setShowSubtitle(true)
    }, 180)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [titleMode])

  return {
    displayTitle,
    glitchTarget,
    initLabel,
    initReady,
    isResolved,
    isTypingOrResolved,
    sectionLabel,
    showSubtitle,
    showTraceIcons,
    traceLabel,
  }
}

export default function HomePageShell({
  initialSection = null,
  sidebarSlot = null,
  contentAside = null,
  projectsEnabled = false,
}) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(initialSection)
  const activeContent = activeSection ? SECTION_CONTENT[activeSection] : null
  const introParagraphs = normalizeParagraphs(activeContent?.intro)
  const bodyParagraphs = normalizeParagraphs(activeContent?.body)
  const hasContentAside = Boolean(contentAside)
  const {
    displayTitle,
    glitchTarget,
    initLabel,
    initReady,
    isResolved,
    isTypingOrResolved,
    sectionLabel,
    showSubtitle,
    showTraceIcons,
    traceLabel,
  } = useHeroAnimationState({ activeContent })

  useEffect(() => {
    setActiveSection(initialSection)
  }, [initialSection])

  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId)
    router.push(`/${sectionId}`)
  }

  const handleReturnHome = () => {
    setActiveSection(null)
    router.push('/')
  }

  return (
    <div className="min-h-screen px-6 py-10 text-foreground sm:py-16">
      <TacticalOverlayNav
        onSelect={handleSectionSelect}
        onHome={handleReturnHome}
        activeSection={activeSection}
        projectsEnabled={projectsEnabled}
      />

      <main
        className={cn(
          'mx-auto max-w-6xl transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)]',
          activeSection
            ? 'flex min-h-[calc(100vh-5rem)] flex-col gap-6 pt-16 lg:min-h-[calc(100vh-8rem)] lg:flex-row lg:items-start lg:gap-8 lg:pt-8'
            : 'flex min-h-[calc(100vh-5rem)] items-center justify-center sm:min-h-[calc(100vh-8rem)]'
        )}
      >
        <ParallaxPanel
          as="section"
          className={cn(
            'transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)]',
            activeSection ? 'w-full lg:sticky lg:top-24 lg:max-w-[21rem] lg:flex-none' : 'w-full max-w-5xl'
          )}
          frameClassName={cn(
            'border border-border/70 bg-card/95 shadow-[0_24px_80px_rgba(24,20,34,0.16)] transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)]',
            activeSection && 'shadow-[0_18px_56px_rgba(24,20,34,0.2)]'
          )}
          innerClassName={cn(
            'relative transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)]',
            activeSection ? 'flex min-h-[28rem] flex-col p-6 sm:p-7' : 'p-8 sm:p-12'
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute z-0 opacity-60',
              activeSection
                ? 'bottom-6 left-1/2 h-40 w-40 -translate-x-1/2 sm:h-48 sm:w-48'
                : 'bottom-0 right-0 h-64 w-64 translate-x-[33%] translate-y-[33%] sm:h-80 sm:w-80'
            )}
            style={{
              background:
                'radial-gradient(circle at 35% 35%, rgba(123,47,255,0.16), rgba(0,229,204,0.08) 58%, rgba(0,229,204,0.02) 100%)',
              WebkitMaskImage: 'url(/kamon_bw.svg)',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskImage: 'url(/kamon_bw.svg)',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              maskSize: 'contain',
            }}
          />

          <div
            className={cn(
              'relative z-10 flex flex-1 flex-col transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)]',
              activeSection ? 'gap-5' : 'gap-6'
            )}
          >
            <span
              className={cn(
                'inline-flex w-fit items-baseline gap-0.5 font-mono text-xs uppercase tracking-[0.3em] text-primary',
                !activeSection && "before:text-primary/65 before:content-['//_']"
              )}
            >
              {activeSection ? (
                <span>{sectionLabel}</span>
              ) : initReady ? (
                <>
                  <span>Init </span>

                  <span className={glitchTarget === 'init-terminus' ? 'glitch-text-active' : ''}>
                    Terminus
                  </span>

                  <span className={glitchTarget === 'init-est' ? 'glitch-text-active' : ''}>
                    Est
                  </span>
                </>
              ) : (
                <span>{initLabel}</span>
              )}

              <span className="terminal-cursor text-secondary" aria-hidden="true" />
            </span>

            <div
              className={cn(
                'w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.3,0.8,0.2,1)]',
                activeSection
                  ? 'pointer-events-none max-h-0 -translate-x-6 opacity-0'
                  : 'max-h-48 translate-x-0 opacity-100'
              )}
            >
              <LandingHeading
                activeSection={activeSection}
                displayTitle={displayTitle}
                glitchTarget={glitchTarget}
                isResolved={isResolved}
                isTypingOrResolved={isTypingOrResolved}
                showSubtitle={showSubtitle}
              />
            </div>

            <div
              className={cn(
                'max-w-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.3,0.8,0.2,1)]',
                activeSection
                  ? 'pointer-events-none max-h-0 translate-x-8 opacity-0'
                  : 'max-h-[28rem] translate-x-0 opacity-100'
              )}
            >
              <SkillsPanel glitchTarget={glitchTarget} />

              <TraceLinks
                glitchTarget={glitchTarget}
                showTraceIcons={showTraceIcons}
                traceLabel={traceLabel}
              />
            </div>

            {activeSection ? (
              <SidebarFooter handleReturnHome={handleReturnHome} sidebarSlot={sidebarSlot} />
            ) : null}
          </div>
        </ParallaxPanel>

        <section
          aria-live="polite"
          className={cn(
            'w-full transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)]',
            activeSection
              ? 'translate-x-0 opacity-100 lg:max-w-[calc(100%-21rem)]'
              : 'pointer-events-none translate-x-20 opacity-0 lg:max-w-0 lg:overflow-hidden'
          )}
        >
          <SectionPanel
            activeContent={activeContent}
            bodyParagraphs={bodyParagraphs}
            contentAside={contentAside}
            hasContentAside={hasContentAside}
            introParagraphs={introParagraphs}
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}
