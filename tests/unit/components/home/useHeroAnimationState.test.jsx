import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import useHeroAnimationState from '@/components/home/useHeroAnimationState'

describe('useHeroAnimationState', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('progresses through the full intro and section animation state', async () => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) =>
      window.setTimeout(() => callback(window.performance.now()), 16)
    )
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((handle) => {
      window.clearTimeout(handle)
    })

    const activeContent = {
      eyebrow: '02 // Projects',
    }

    const { result, unmount } = renderHook(() => useHeroAnimationState({ activeContent }))

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5200)
    })

    expect(result.current.initReady).toBe(true)
    expect(result.current.sectionLabel).toBe('02 // Projects')
    expect(result.current.traceLabel).toBe('Begin Trace...')
    expect(result.current.showTraceIcons).toBe(true)
    expect(result.current.isResolved).toBe(true)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(result.current.showSubtitle).toBe(true)

    unmount()
  })

  it('clears section state when no active content is provided', async () => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) =>
      window.setTimeout(() => callback(window.performance.now()), 16)
    )
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((handle) => {
      window.clearTimeout(handle)
    })

    const { result, unmount } = renderHook(() => useHeroAnimationState({ activeContent: null }))

    expect(result.current.sectionLabel).toBe('')
    expect(result.current.showSubtitle).toBe(false)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200)
    })

    expect(result.current.sectionLabel).toBe('')
    expect(result.current.showSubtitle).toBe(false)

    unmount()
  })
})
