import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const push = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push,
  }),
}))

vi.mock('@/components/Footer', () => ({
  default: () => <div>Footer Stub</div>,
}))

vi.mock('@/components/ParallaxPanel', () => ({
  default: ({ children }) => <div>{children}</div>,
}))

vi.mock('@/components/TacticalOverlayNav', () => ({
  default: ({ onSelect, onHome, projectsEnabled }) => (
    <div>
      <div>{projectsEnabled ? 'projects-enabled' : 'projects-disabled'}</div>
      <button type="button" onClick={() => onSelect?.('projects')}>
        Select Projects
      </button>
      <button type="button" onClick={() => onHome?.()}>
        Nav Home
      </button>
    </div>
  ),
}))

vi.mock('@/components/home/HomeSidebar', () => ({
  default: ({ activeSection, handleReturnHome }) => (
    <div>
      <div>{activeSection ?? 'home'}</div>
      <button type="button" onClick={() => handleReturnHome?.()}>
        Return Home
      </button>
    </div>
  ),
}))

vi.mock('@/components/home/ProjectsGrid', () => ({
  default: () => <div>Projects Grid</div>,
}))

vi.mock('@/components/home/SectionPanel', () => ({
  default: ({ activeContent, bodyComponent }) => (
    <div>
      <div>{activeContent?.title ?? 'no-section'}</div>
      {bodyComponent}
    </div>
  ),
}))

vi.mock('@/components/home/useHeroAnimationState', () => ({
  default: () => ({
    displayTitle: 'Display',
    glitchTarget: null,
    initLabel: 'Init TerminusEst',
    initReady: true,
    isResolved: true,
    isTypingOrResolved: true,
    sectionLabel: '',
    showSubtitle: true,
    showTraceIcons: true,
    traceLabel: 'Begin Trace...',
  }),
}))

import HomePageShell from '@/components/HomePageShell'

describe('HomePageShell', () => {
  beforeEach(() => {
    push.mockReset()
  })

  it('renders the projects section when selected initially', () => {
    render(<HomePageShell initialSection="projects" projectsEnabled />)

    expect(screen.getByText('projects-enabled')).toBeInTheDocument()
    expect(screen.getByText('Interfacing...')).toBeInTheDocument()
    expect(screen.getByText('Projects Grid')).toBeInTheDocument()
    expect(screen.getByText('Footer Stub')).toBeInTheDocument()
  })

  it('updates the active section and routes when navigation selects a section', async () => {
    const user = userEvent.setup()

    render(<HomePageShell />)

    await user.click(screen.getByRole('button', { name: /select projects/i }))

    expect(push).toHaveBeenCalledWith('/projects')
    expect(screen.getByText('Interfacing...')).toBeInTheDocument()
  })

  it('returns home when the sidebar callback is triggered', async () => {
    const user = userEvent.setup()

    render(<HomePageShell initialSection="about" />)

    await user.click(screen.getByRole('button', { name: /return home/i }))

    expect(push).toHaveBeenCalledWith('/')
    expect(screen.getByText('no-section')).toBeInTheDocument()
  })
})
