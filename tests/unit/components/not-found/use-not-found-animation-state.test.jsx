import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { NOT_FOUND_TITLE } from '@/components/not-found/not-found-content'
import { useNotFoundAnimationState } from '@/components/not-found/use-not-found-animation-state'

describe('useNotFoundAnimationState', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('progresses from deleting to a resolved title state', async () => {
    vi.useFakeTimers()

    const { result } = renderHook(() => useNotFoundAnimationState())

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })

    expect(result.current.titleMode).toBe('resolved')
    expect(result.current.displayTitle).toBe(NOT_FOUND_TITLE)
  })

  it('pulses a glitch window and clears it again', async () => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const { result } = renderHook(() => useNotFoundAnimationState())

    expect(result.current.glitchWindow).toBe(null)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(800)
    })

    expect(result.current.glitchWindow).toBe('not-found-void-1')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(420)
    })

    expect(result.current.glitchWindow).toBe(null)
  })
})
