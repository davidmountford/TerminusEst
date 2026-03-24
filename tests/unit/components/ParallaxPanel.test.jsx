import { fireEvent, render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import ParallaxPanel from '@/components/ParallaxPanel'

describe('ParallaxPanel', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    )
  })

  it('renders the wrapper and moving card layers', () => {
    const { container } = render(
      <ParallaxPanel className="outer-shell" innerClassName="inner-shell">
        <div>Signal</div>
      </ParallaxPanel>
    )

    expect(container.querySelector('.parallax-panel')).toHaveClass('outer-shell')
    expect(container.querySelector('.parallax-card')).toHaveClass('h-full', 'inner-shell')
  })

  it('updates the tilt variables on pointer move and resets them on leave', () => {
    const { container } = render(
      <ParallaxPanel>
        <div>Signal</div>
      </ParallaxPanel>
    )

    const panel = container.querySelector('.parallax-panel')
    const card = container.querySelector('.parallax-card')

    panel.getBoundingClientRect = vi.fn(() => ({
      width: 200,
      height: 100,
      top: 0,
      left: 0,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }))

    fireEvent.pointerMove(panel, { clientX: 180, clientY: 10 })

    expect(card.style.getPropertyValue('--tilt-x')).toBe('6.40deg')
    expect(card.style.getPropertyValue('--tilt-y')).toBe('6.40deg')

    fireEvent.pointerLeave(panel)

    expect(card.style.getPropertyValue('--tilt-x')).toBe('0deg')
    expect(card.style.getPropertyValue('--tilt-y')).toBe('0deg')
  })

  it('does not update the tilt when reduced motion is enabled', () => {
    window.matchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { container } = render(
      <ParallaxPanel>
        <div>Signal</div>
      </ParallaxPanel>
    )

    const panel = container.querySelector('.parallax-panel')
    const card = container.querySelector('.parallax-card')

    panel.getBoundingClientRect = vi.fn(() => ({
      width: 200,
      height: 100,
      top: 0,
      left: 0,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }))

    fireEvent.pointerMove(panel, { clientX: 180, clientY: 10 })

    expect(card.style.getPropertyValue('--tilt-x')).toBe('')
    expect(card.style.getPropertyValue('--tilt-y')).toBe('')
  })

  it('gracefully exits when the moving layer is missing', () => {
    const { container } = render(
      <ParallaxPanel>
        <div>Signal</div>
      </ParallaxPanel>
    )

    const panel = container.querySelector('.parallax-panel')

    panel.getBoundingClientRect = vi.fn(() => ({
      width: 200,
      height: 100,
      top: 0,
      left: 0,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }))

    panel.firstElementChild.remove()

    expect(() => fireEvent.pointerMove(panel, { clientX: 180, clientY: 10 })).not.toThrow()
    expect(() => fireEvent.pointerLeave(panel)).not.toThrow()
  })
})
