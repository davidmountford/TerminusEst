import { describe, expect, it } from 'vitest'

import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges conditional classes', () => {
    expect(cn('alpha', false && 'beta', 'gamma')).toBe('alpha gamma')
  })

  it('deduplicates conflicting tailwind utilities in favor of the last value', () => {
    expect(cn('px-2 text-primary', 'px-4')).toBe('text-primary px-4')
  })
})
