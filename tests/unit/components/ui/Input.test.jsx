import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renders the supplied type and attributes', () => {
    render(<Input type="email" placeholder="name@example.com" />)

    expect(screen.getByPlaceholderText('name@example.com')).toHaveAttribute('type', 'email')
  })
})
