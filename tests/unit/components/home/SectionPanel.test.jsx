import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import SectionPanel from '@/components/home/SectionPanel'

describe('SectionPanel', () => {
  it('renders the section content and optional aside', () => {
    render(
      <SectionPanel
        activeContent={{
          eyebrow: '01 // About',
          title: 'Terminus Est',
          intro: ['First line', 'Second line'],
        }}
        bodyComponent={<div>Project body</div>}
        bodyParagraphs={['Unused body paragraph']}
        contentAside={<aside>Right rail</aside>}
        hasContentAside
        introParagraphs={['Intro one', 'Intro two']}
      />
    )

    expect(screen.getByRole('heading', { name: /terminus est/i })).toBeInTheDocument()
    expect(screen.getByText('Intro one')).toBeInTheDocument()
    expect(screen.getByText('Intro two')).toBeInTheDocument()
    expect(screen.getByText('Project body')).toBeInTheDocument()
    expect(screen.getByText('Right rail')).toBeInTheDocument()
  })

  it('returns nothing when there is no active content', () => {
    const { container } = render(<SectionPanel activeContent={null} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders paragraph body content without intro copy or an aside', () => {
    render(
      <SectionPanel
        activeContent={{
          eyebrow: '02 // Projects',
          title: 'Archive',
        }}
        bodyParagraphs={['Paragraph one', 'Paragraph two']}
        introParagraphs={[]}
      />
    )

    expect(screen.getByRole('heading', { name: /archive/i })).toBeInTheDocument()
    expect(screen.getByText('Paragraph one')).toBeInTheDocument()
    expect(screen.getByText('Paragraph two')).toBeInTheDocument()
    expect(screen.queryByText(/intro one/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/right rail/i)).not.toBeInTheDocument()
  })
})
