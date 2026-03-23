import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Header from '@/components/Header'

describe('Header', () => {
  it('renders the supplied title', () => {
    render(<Header title="Terminus Est" />)

    expect(screen.getByRole('heading', { level: 1, name: 'Terminus Est' })).toBeInTheDocument()
  })

  it('applies the glitch pulse class when pulsing', () => {
    render(<Header title="Signal" pulsing className="custom-class" />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('glitch-text-active', 'custom-class')
  })
})
