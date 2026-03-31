import { describe, expect, it, vi, afterEach } from 'vitest'

import {
  SECOND_INITIAL_INDEX,
  createEncryptedFrame,
  getAmbientGlitchDelay,
  normalizeParagraphs,
} from '@/lib/home-shell-helpers'

describe('home-shell-helpers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('derives the second initial index from the header title', () => {
    expect(SECOND_INITIAL_INDEX).toBe(6)
  })

  it('normalizes optional paragraph values into arrays', () => {
    expect(normalizeParagraphs(null)).toEqual([])
    expect(normalizeParagraphs('Hello')).toEqual(['Hello'])
    expect(normalizeParagraphs(['One', '', 'Two'])).toEqual(['One', 'Two'])
  })

  it('creates an encrypted frame for the leading characters', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(createEncryptedFrame('AB CD', 0.6)).toBe('AA CD')
  })

  it('leaves the target unchanged when encryption progress is zero', () => {
    expect(createEncryptedFrame('AB CD', 0)).toBe('AB CD')
  })

  it('returns ambient glitch delays inside the expected ranges', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    expect(getAmbientGlitchDelay()).toBe(7500)
  })

  it('returns the shorter ambient glitch delay on the rare branch', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.9).mockReturnValueOnce(0)

    expect(getAmbientGlitchDelay()).toBe(3000)
  })
})
