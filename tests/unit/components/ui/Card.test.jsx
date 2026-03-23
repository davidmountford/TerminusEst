import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

describe('Card', () => {
  it('renders the full card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Deck</CardTitle>
          <CardDescription>Status feed</CardDescription>
        </CardHeader>

        <CardContent>Payload</CardContent>

        <CardFooter>Footer rail</CardFooter>
      </Card>
    )

    expect(screen.getByText('Deck').tagName).toBe('H3')
    expect(screen.getByText('Payload')).toHaveClass('p-6')
    expect(screen.getByText('Footer rail')).toHaveClass('items-center')
  })
})
