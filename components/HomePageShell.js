'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Footer from '@components/Footer'
import ParallaxPanel from '@components/ParallaxPanel'
import TacticalOverlayNav from '@components/TacticalOverlayNav'

import HomeSidebar from '@/components/home/HomeSidebar'
import ProjectsGrid from '@/components/home/ProjectsGrid'
import SectionPanel from '@/components/home/SectionPanel'
import useHeroAnimationState from '@/components/home/useHeroAnimationState'
import { SECTION_CONTENT } from '@/lib/home-shell-content'
import { normalizeParagraphs } from '@/lib/home-shell-helpers'
import { cn } from '@/lib/utils'

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
  const bodyComponent = activeSection === 'projects' ? <ProjectsGrid /> : null
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

          <HomeSidebar
            activeSection={activeSection}
            displayTitle={displayTitle}
            glitchTarget={glitchTarget}
            initLabel={initLabel}
            initReady={initReady}
            isResolved={isResolved}
            isTypingOrResolved={isTypingOrResolved}
            sectionLabel={sectionLabel}
            showSubtitle={showSubtitle}
            showTraceIcons={showTraceIcons}
            traceLabel={traceLabel}
            handleReturnHome={handleReturnHome}
            sidebarSlot={sidebarSlot}
          />
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
            bodyComponent={bodyComponent}
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
