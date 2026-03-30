import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import TacticalOverlayNav from '@/components/TacticalOverlayNav'

describe('TacticalOverlayNav', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('opens the overlay and exposes the available routes', async () => {
    const user = userEvent.setup()

    render(<TacticalOverlayNav projectsEnabled />)

    await user.click(screen.getByRole('button', { name: /trace route/i }))

    expect(screen.getByRole('dialog', { name: /active sectors/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /projects/i })).toBeInTheDocument()
  })

  it('hides the projects route when projects are disabled', async () => {
    const user = userEvent.setup()

    render(<TacticalOverlayNav projectsEnabled={false} />)

    await user.click(screen.getByRole('button', { name: /trace route/i }))

    expect(screen.queryByRole('button', { name: /projects/i })).not.toBeInTheDocument()
  })

  it('notifies the page when a section is selected and closes the overlay', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(<TacticalOverlayNav onSelect={onSelect} activeSection="about" projectsEnabled />)

    await user.click(screen.getByRole('button', { name: /trace route/i }))
    await user.click(screen.getByRole('button', { name: /about/i }))

    expect(onSelect).toHaveBeenCalledWith('about')
    expect(screen.queryByRole('dialog', { name: /active sectors/i })).not.toBeInTheDocument()
  })

  it('shows a home route inside the overlay when not on the homepage', async () => {
    const user = userEvent.setup()
    const onHome = vi.fn()

    render(<TacticalOverlayNav onHome={onHome} activeSection="projects" projectsEnabled />)

    await user.click(screen.getByRole('button', { name: /trace route/i }))
    await user.click(screen.getByRole('button', { name: /home/i }))

    expect(onHome).toHaveBeenCalledTimes(1)
  })

  it('restores document scrolling when the overlay closes', async () => {
    const user = userEvent.setup()

    render(<TacticalOverlayNav projectsEnabled />)

    await user.click(screen.getByRole('button', { name: /trace route/i }))
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog', { name: /active sectors/i })).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
  })
})
