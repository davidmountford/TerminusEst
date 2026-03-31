import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const push = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push,
  }),
}))

vi.mock('@/components/not-found/use-not-found-animation-state', () => ({
  useNotFoundAnimationState: () => ({
    displayTitle: 'Signal',
    glitchWindow: 'not-found-void-2',
    titleMode: 'resolved',
  }),
}))

vi.mock('@/components/not-found/NotFoundScene', () => ({
  default: ({ handleReturnHome, handleSectionSelect, projectsEnabled, displayTitle, titleMode }) => (
    <div>
      <div>{projectsEnabled ? 'projects-enabled' : 'projects-disabled'}</div>
      <div>{displayTitle}</div>
      <div>{titleMode}</div>
      <button type="button" onClick={() => handleSectionSelect('about')}>
        Select About
      </button>
      <button type="button" onClick={() => handleReturnHome()}>
        Return Home
      </button>
    </div>
  ),
}))

import NotFoundPageClient from '@/components/NotFoundPageClient'

describe('NotFoundPageClient', () => {
  beforeEach(() => {
    push.mockReset()
  })

  it('passes animation state and projects flag into the scene', () => {
    render(<NotFoundPageClient projectsEnabled />)

    expect(screen.getByText('projects-enabled')).toBeInTheDocument()
    expect(screen.getByText('Signal')).toBeInTheDocument()
    expect(screen.getByText('resolved')).toBeInTheDocument()
  })

  it('routes section and home actions through the Next router', async () => {
    const user = userEvent.setup()

    render(<NotFoundPageClient projectsEnabled={false} />)

    await user.click(screen.getByRole('button', { name: /select about/i }))
    await user.click(screen.getByRole('button', { name: /return home/i }))

    expect(push).toHaveBeenNthCalledWith(1, '/about')
    expect(push).toHaveBeenNthCalledWith(2, '/')
  })
})
