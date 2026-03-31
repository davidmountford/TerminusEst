import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ProjectsGrid from '@/components/home/ProjectsGrid'

describe('ProjectsGrid', () => {
  it('renders the Dragonsight project card from the catalog', () => {
    render(<ProjectsGrid />)

    const link = screen.getByRole('link', { name: /project dragonsight/i })

    expect(link).toHaveAttribute('href', '/projects/project-dragonsight')
    expect(
      screen.getByText(/understanding and guiding rpgs through ai analytics and generation/i)
    ).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('RPG')).toBeInTheDocument()
  })
})
