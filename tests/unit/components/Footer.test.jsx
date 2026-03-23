import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders as a hidden footer landmark', () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo', { hidden: true })).toHaveAttribute('aria-hidden', 'true')
  })
})
