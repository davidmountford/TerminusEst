import { describe, expect, it } from 'vitest'

import { getProjectBySlug, PROJECT_CATALOG } from '@/lib/project-catalog'

describe('project-catalog', () => {
  it('exposes the dragonsight project in the catalog', () => {
    expect(PROJECT_CATALOG).toHaveLength(1)
    expect(PROJECT_CATALOG[0]).toMatchObject({
      slug: 'project-dragonsight',
      title: 'Project Dragonsight',
    })
  })

  it('returns a project for a known slug and undefined for an unknown slug', () => {
    expect(getProjectBySlug('project-dragonsight')).toMatchObject({
      title: 'Project Dragonsight',
      sections: expect.any(Array),
    })
    expect(getProjectBySlug('ghost-sector')).toBeUndefined()
  })
})
