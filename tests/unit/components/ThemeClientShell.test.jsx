import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import ThemeClientShell from '@/components/ThemeClientShell'

function createMatchMedia(matches = false) {
  const listeners = new Set()

  return {
    get matches() {
      return matches
    },
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn((event, listener) => {
      if (event === 'change') {
        listeners.add(listener)
      }
    }),
    removeEventListener: vi.fn((event, listener) => {
      if (event === 'change') {
        listeners.delete(listener)
      }
    }),
    dispatch(nextMatches) {
      matches = nextMatches

      listeners.forEach((listener) => listener({ matches: nextMatches }))
    },
  }
}

describe('ThemeClientShell', () => {
  let mediaQuery

  beforeEach(() => {
    document.documentElement.className = ''
    window.localStorage.clear()

    mediaQuery = createMatchMedia(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))
  })

  it('hydrates from stored theme preference and renders children', () => {
    window.localStorage.setItem('theme-preference', 'dark')

    render(
      <ThemeClientShell>
        <div>Payload</div>
      </ThemeClientShell>
    )

    expect(screen.getByText('Payload')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Dark mode' })).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('switches themes and persists the new preference', async () => {
    const user = userEvent.setup()

    render(
      <ThemeClientShell>
        <div>Payload</div>
      </ThemeClientShell>
    )

    await user.click(screen.getByRole('radio', { name: 'Light mode' }))

    expect(window.localStorage.getItem('theme-preference')).toBe('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(screen.getByRole('radio', { name: 'Light mode' })).toHaveAttribute('aria-checked', 'true')
  })

  it('tracks system theme changes while in system mode', () => {
    render(
      <ThemeClientShell>
        <div>Payload</div>
      </ThemeClientShell>
    )

    mediaQuery.dispatch(true)

    expect(document.documentElement).toHaveClass('dark')
  })

  it('applies the dark class when switching to system mode and the OS prefers dark', async () => {
    const user = userEvent.setup()

    mediaQuery.dispatch(true)

    render(
      <ThemeClientShell>
        <div>Payload</div>
      </ThemeClientShell>
    )

    await user.click(screen.getByRole('radio', { name: 'Light mode' }))
    await user.click(screen.getByRole('radio', { name: 'System theme' }))

    expect(window.localStorage.getItem('theme-preference')).toBe('system')
    expect(document.documentElement).toHaveClass('dark')
    expect(screen.getByRole('radio', { name: 'System theme' })).toHaveAttribute('aria-checked', 'true')
  })
})
