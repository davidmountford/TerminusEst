import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ThemeToggle from '@/components/ThemeToggle'

describe('ThemeToggle', () => {
  it('exposes the active mode via radio semantics', () => {
    render(<ThemeToggle mode="system" onChange={() => {}} />)

    expect(screen.getByRole('radio', { name: 'System theme' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Dark mode' })).toHaveAttribute('aria-checked', 'false')
  })

  it('notifies when a different mode is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<ThemeToggle mode="light" onChange={onChange} />)

    await user.click(screen.getByRole('radio', { name: 'Dark mode' }))

    expect(onChange).toHaveBeenCalledWith('dark')
  })
})
