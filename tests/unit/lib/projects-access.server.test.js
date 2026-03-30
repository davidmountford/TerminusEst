import { afterEach, describe, expect, it } from 'vitest'

import { isProjectsEnabled } from '@/lib/projects-access.server'

describe('projects-access.server', () => {
  const originalValue = process.env.ENABLE_PROJECTS

  afterEach(() => {
    if (originalValue === undefined) {
      delete process.env.ENABLE_PROJECTS
      return
    }

    process.env.ENABLE_PROJECTS = originalValue
  })

  it('returns true only when the server flag is set to true', () => {
    process.env.ENABLE_PROJECTS = 'true'
    expect(isProjectsEnabled()).toBe(true)

    process.env.ENABLE_PROJECTS = 'false'
    expect(isProjectsEnabled()).toBe(false)

    delete process.env.ENABLE_PROJECTS
    expect(isProjectsEnabled()).toBe(false)
  })
})
