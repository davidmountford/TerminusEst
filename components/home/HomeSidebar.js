'use client'

import Header from '@components/Header'

import { cn } from '@/lib/utils'
import {
  HEADER_SUBTITLE,
  HEADER_TITLE,
  INIT_LABEL,
  SKILLS,
  SOCIAL_LINKS,
  TRACE_LABEL,
} from '@/lib/home-shell-content'
import { SECOND_INITIAL_INDEX } from '@/lib/home-shell-helpers'

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

export default function HomeSidebar({
  activeSection,
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
  handleReturnHome,
  sidebarSlot,
}) {
  return (
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
  )
}
