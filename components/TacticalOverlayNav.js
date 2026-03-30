'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    id: 'about',
    index: '01',
    label: 'About',
    description: 'Profile, background, operating pattern'
  },
  {
    id: 'projects',
    index: '02',
    label: 'Projects',
    description: 'Selected builds, systems, field notes'
  }
]

export default function TacticalOverlayNav({
  onSelect,
  onHome,
  activeSection = null,
  projectsEnabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)
  const availableItems = projectsEnabled
    ? NAV_ITEMS
    : NAV_ITEMS.filter((item) => item.id !== 'projects')
  const navItems = activeSection
    ? [
        {
          id: 'home',
          index: '00',
          label: 'Home',
          description: 'Return to landing sequence'
        },
        ...availableItems
      ]
    : availableItems

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeOverlay()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const closeOverlay = () => {
    triggerRef.current?.focus()
    setIsOpen(false)
  }

  const handleSelect = (sectionId) => {
    closeOverlay()

    if (sectionId === 'home') {
      onHome?.()
      return
    }

    onSelect?.(sectionId)
  }

  return (
    <>
      <div className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="tactical-overlay-nav"
          className="group inline-flex items-center gap-2 rounded-md border border-primary/35 bg-card/88 px-3 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-primary shadow-[0_0_0_1px_rgba(123,47,255,0.12),0_8px_24px_rgba(24,20,34,0.16)] backdrop-blur-md transition-[border-color,background-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-secondary/55 hover:bg-card hover:text-secondary hover:shadow-[0_0_0_1px_rgba(0,229,204,0.14),0_12px_28px_rgba(0,229,204,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(0,229,204,0.65)] transition-transform duration-200 group-hover:scale-110" />

          <span>Trace Route</span>
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-40 transition-[visibility] duration-200',
          isOpen ? 'visible' : 'invisible'
        )}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          tabIndex={isOpen ? 0 : -1}
          aria-label="Close navigation overlay"
          onClick={closeOverlay}
          className={cn(
            'absolute inset-0 bg-foreground/18 backdrop-blur-sm transition-opacity duration-200',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
        />

        <section
          id="tactical-overlay-nav"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tactical-overlay-nav-title"
          className={cn(
            'absolute inset-x-4 left-4 top-18 origin-top-left rounded-[1.4rem] border border-primary/30 bg-card/96 p-4 shadow-[0_0_0_1px_rgba(168,85,247,0.12),0_18px_56px_rgba(24,20,34,0.18),0_0_40px_rgba(123,47,255,0.08)] transition-[opacity,transform] duration-200 sm:inset-x-auto sm:left-6 sm:top-22 sm:w-[22rem] sm:p-5',
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.4rem] bg-[radial-gradient(circle_at_top_left,rgba(123,47,255,0.08),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(0,229,204,0.07),transparent_44%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent"
          />

          <div className="relative space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-secondary">
                  Navigation Matrix
                </p>

                <div>
                  <h2
                    id="tactical-overlay-nav-title"
                    className="font-display text-xl uppercase tracking-[0.14em] text-foreground sm:text-2xl"
                  >
                    Active Sectors
                  </h2>

                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {navItems.length} routes online
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeOverlay}
                className="inline-flex h-9 items-center justify-center rounded-md border border-primary/30 px-2.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primary transition-colors duration-200 hover:border-secondary/50 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
              >
                Close
              </button>
            </div>

            <div className="space-y-2.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`${item.label} route`}
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    'group block w-full rounded-[1.1rem] border px-3.5 py-3.5 text-left transition-[border-color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-secondary/45 hover:bg-secondary/10 hover:shadow-[0_12px_28px_rgba(0,229,204,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70',
                    activeSection === item.id
                      ? 'border-secondary/45 bg-secondary/10 shadow-[0_0_0_1px_rgba(0,229,204,0.08)]'
                      : 'border-primary/18 bg-primary/8'
                  )}
                >
                  <span className="block font-mono text-[0.62rem] uppercase tracking-[0.28em] text-primary transition-colors duration-200 group-hover:text-secondary">
                    {item.index} // Sector
                  </span>

                  <span className="mt-1.5 block font-display text-lg uppercase tracking-[0.12em] text-foreground sm:text-xl">
                    {item.label}
                  </span>

                  <span className="mt-1.5 block max-w-xs font-sans text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
