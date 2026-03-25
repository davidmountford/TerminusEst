'use client'

import { cn } from '@/lib/utils'

const MAX_TILT = 8
const FRAME_TILT = 0.9
const SURFACE_TILT = 0.12

export default function ParallaxPanel({
  as: Tag = 'div',
  className,
  frameClassName,
  innerClassName,
  children,
  ...props
}) {
  const handlePointerMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const frameLayer = event.currentTarget.querySelector('[data-parallax-frame]')
    const tiltLayer = event.currentTarget.querySelector('[data-parallax-surface]')

    if (!frameLayer || !tiltLayer) {
      return
    }

    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const tiltY = (x - 0.5) * MAX_TILT * 2
    const tiltX = (0.5 - y) * MAX_TILT * 2

    frameLayer.style.transform = `perspective(1400px) rotateX(${(tiltX * FRAME_TILT).toFixed(2)}deg) rotateY(${(tiltY * FRAME_TILT).toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
    tiltLayer.style.transform = `perspective(1100px) rotateX(${(tiltX * SURFACE_TILT).toFixed(2)}deg) rotateY(${(tiltY * SURFACE_TILT).toFixed(2)}deg)`
  }

  const resetTilt = (event) => {
    const frameLayer = event.currentTarget.querySelector('[data-parallax-frame]')
    const tiltLayer = event.currentTarget.querySelector('[data-parallax-surface]')

    if (!frameLayer || !tiltLayer) {
      return
    }

    frameLayer.style.transform =
      'perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1.01, 1.01, 1.01)'
    tiltLayer.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <Tag
      className={cn('parallax-panel', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      {...props}
    >
      <div data-parallax-frame className={cn('parallax-frame', frameClassName)}>
        <div data-parallax-surface className={cn('parallax-card h-full', innerClassName)}>
          {children}
        </div>
      </div>
    </Tag>
  )
}
