import { describe, expect, it } from 'vitest'

import { createEncryptedFrame } from '@/components/not-found/not-found-content'

describe('not-found-content', () => {
  it('leaves characters unchanged when encryption progress is zero', () => {
    expect(createEncryptedFrame('VOID LINK', 0)).toBe('VOID LINK')
  })
})
