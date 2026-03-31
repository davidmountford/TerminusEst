import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import NotFoundMonolith from '@/components/not-found/NotFoundMonolith'

describe('NotFoundMonolith', () => {
  it('renders the glitch windows and their content', () => {
    const { container } = render(<NotFoundMonolith glitchWindow="not-found-void-4" />)

    expect(container.querySelector('.not-found-monolith')).toBeInTheDocument()
    expect(screen.getAllByText('NO_ROUTE')).toHaveLength(2)
    expect(screen.getAllByText('7F::NULL')).toHaveLength(2)
  })
})
