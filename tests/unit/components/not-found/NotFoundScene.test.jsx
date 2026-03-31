import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/TacticalOverlayNav', () => ({
  default: ({ projectsEnabled, activeSection }) => (
    <div>
      <span>{projectsEnabled ? 'projects-enabled' : 'projects-disabled'}</span>
      <span>{activeSection}</span>
    </div>
  ),
}))

import NotFoundScene from '@/components/not-found/NotFoundScene'

describe('NotFoundScene', () => {
  it('renders the scene shell, copy, and navigation wiring', () => {
    render(
      <NotFoundScene
        displayTitle="The Route Dissolved In Transit"
        glitchWindow="not-found-void-1"
        handleReturnHome={vi.fn()}
        handleSectionSelect={vi.fn()}
        projectsEnabled
        titleMode="resolved"
      />
    )

    expect(screen.getByText('projects-enabled')).toBeInTheDocument()
    expect(screen.getByText('error')).toBeInTheDocument()
    expect(screen.getByText(/signal lost \/\/ error 404/i)).toBeInTheDocument()
    expect(
      screen.getByText(/the requested page broke apart somewhere between sectors/i)
    ).toBeInTheDocument()
  })
})
