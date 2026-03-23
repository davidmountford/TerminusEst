import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button, buttonVariants } from '@/components/ui/button'

describe('Button', () => {
  it('renders a button element by default', () => {
    render(<Button>Transmit</Button>)

    expect(screen.getByRole('button', { name: 'Transmit' })).toHaveClass('bg-primary')
  })

  it('supports rendering through a child element', () => {
    render(
      <Button asChild variant="link">
        <a href="/contact">Contact</a>
      </Button>
    )

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveClass('text-primary')
  })

  it('exports predictable variant classes', () => {
    expect(buttonVariants({ variant: 'secondary', size: 'sm' })).toContain('bg-secondary')
  })
})
