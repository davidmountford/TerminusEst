import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import HomeSidebar from '@/components/home/HomeSidebar'

describe('HomeSidebar', () => {
  it('renders the landing state with skills and trace links', () => {
    render(
      <HomeSidebar
        activeSection={null}
        displayTitle="Neon Signal"
        glitchTarget="skill:React"
        initLabel="Init TerminusEst"
        initReady
        isResolved
        isTypingOrResolved
        sectionLabel=""
        showSubtitle
        showTraceIcons
        traceLabel="Begin Trace..."
        handleReturnHome={vi.fn()}
      />
    )

    expect(screen.getAllByRole('heading', { name: /davidmountford/i })).toHaveLength(2)
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github profile/i })).toBeInTheDocument()
    expect(screen.getByText(/begin trace/i)).toBeInTheDocument()
  })

  it('renders the active section footer when a section is selected', () => {
    render(
      <HomeSidebar
        activeSection="projects"
        displayTitle="Neon Signal"
        glitchTarget={null}
        initLabel="Init TerminusEst"
        initReady={false}
        isResolved={false}
        isTypingOrResolved={false}
        sectionLabel="02 // Projects"
        showSubtitle={false}
        showTraceIcons={false}
        traceLabel="Begin Trace..."
        handleReturnHome={vi.fn()}
        sidebarSlot={<div>Custom slot</div>}
      />
    )

    expect(screen.getByText('02 // Projects')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /return home/i })).toBeInTheDocument()
    expect(screen.getByText('Custom slot')).toBeInTheDocument()
  })

  it('keeps the landing state collapsed when init and trace links are not ready', () => {
    const { container } = render(
      <HomeSidebar
        activeSection={null}
        displayTitle="Neon Signal"
        glitchTarget="link-linkedin"
        initLabel="Booting"
        initReady={false}
        isResolved={false}
        isTypingOrResolved={false}
        sectionLabel=""
        showSubtitle={false}
        showTraceIcons={false}
        traceLabel="Trace offline"
        handleReturnHome={vi.fn()}
      />
    )

    const linkedInLink = container.querySelector('a[aria-label="LinkedIn profile"]')

    expect(screen.getByText('Booting')).toBeInTheDocument()
    expect(screen.queryByText(/software engineer/i)).not.toBeInTheDocument()
    expect(linkedInLink).not.toBeNull()
    expect(linkedInLink).toHaveAttribute('tabindex', '-1')
    expect(linkedInLink).toHaveStyle({
      transitionDelay: '0ms',
    })
    expect(container.firstChild).toHaveClass('gap-6')
  })

  it('renders the initialized landing label and highlighted init segment', () => {
    render(
      <HomeSidebar
        activeSection={null}
        displayTitle="David Mountford"
        glitchTarget="init-terminus"
        initLabel="Init TerminusEst"
        initReady
        isResolved
        isTypingOrResolved
        sectionLabel=""
        showSubtitle
        showTraceIcons
        traceLabel="Begin Trace..."
        handleReturnHome={vi.fn()}
      />
    )

    const terminus = screen.getByText('Terminus')
    const est = screen.getByText('Est')

    expect(screen.getByText('Init')).toBeInTheDocument()
    expect(terminus).toHaveClass('glitch-text-active')
    expect(est).not.toHaveClass('glitch-text-active')
  })

  it('renders the footer without a slot when the section is active', () => {
    render(
      <HomeSidebar
        activeSection="projects"
        displayTitle="Neon Signal"
        glitchTarget={null}
        initLabel="Init TerminusEst"
        initReady={false}
        isResolved={false}
        isTypingOrResolved={false}
        sectionLabel="02 // Projects"
        showSubtitle={false}
        showTraceIcons={false}
        traceLabel="Begin Trace..."
        handleReturnHome={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: /return home/i })).toBeInTheDocument()
    expect(screen.queryByText('Custom slot')).not.toBeInTheDocument()
  })
})
