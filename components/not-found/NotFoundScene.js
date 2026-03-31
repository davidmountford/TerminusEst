'use client'

import TacticalOverlayNav from '@components/TacticalOverlayNav'

import NotFoundCopy from '@/components/not-found/NotFoundCopy'
import NotFoundMonolith from '@/components/not-found/NotFoundMonolith'
import NotFoundTitle from '@/components/not-found/NotFoundTitle'
import { NOT_FOUND_TITLE } from '@/components/not-found/not-found-content'

export default function NotFoundScene({
  displayTitle,
  glitchWindow,
  handleReturnHome,
  handleSectionSelect,
  projectsEnabled,
  titleMode,
}) {
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

              <NotFoundTitle
                displayTitle={displayTitle}
                staticTitle={NOT_FOUND_TITLE}
                titleMode={titleMode}
              />
            </div>

            <NotFoundMonolith glitchWindow={glitchWindow} />

            <NotFoundCopy />
          </div>
        </section>
      </div>
    </main>
  )
}
