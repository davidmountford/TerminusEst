import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import NotFoundTitle from '@/components/not-found/NotFoundTitle'

describe('NotFoundTitle', () => {
  it('renders the animated title and keeps the width reserve stable', () => {
    const { container } = render(
      <NotFoundTitle
        displayTitle="The Route Dissolved In Transit"
        staticTitle="The Route Dissolved In Transit"
        titleMode="resolved"
      />
    )

    expect(screen.getByRole('heading', { name: /the route dissolved in transit/i })).toBeInTheDocument()
    expect(container.querySelector('h1')).not.toHaveClass('glitch-text-active')
    expect(container.querySelector('.invisible')).toHaveTextContent('The Route Dissolved In Transit')
  })

  it('adds the glitch class while encrypting', () => {
    const { container } = render(
      <NotFoundTitle
        displayTitle="Encrypted"
        staticTitle="The Route Dissolved In Transit"
        titleMode="encrypting"
      />
    )

    expect(container.querySelector('h1')).toHaveClass('glitch-text-active')
  })
})
