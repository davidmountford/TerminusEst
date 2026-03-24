'use client'

import { cn } from '@/lib/utils'

const MAX_TILT = 8

export default function ParallaxPanel({
  as: Tag = 'div',
  className,
  innerClassName,
  children,
  ...props
}) {
  const handlePointerMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const tiltLayer = event.currentTarget.firstElementChild

    if (!tiltLayer) {
      return
    }

    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const tiltY = (x - 0.5) * MAX_TILT * 2
    const tiltX = (0.5 - y) * MAX_TILT * 2

    tiltLayer.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
    tiltLayer.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
  }

  const resetTilt = (event) => {
    const tiltLayer = event.currentTarget.firstElementChild

    if (!tiltLayer) {
      return
    }

    tiltLayer.style.setProperty('--tilt-x', '0deg')
    tiltLayer.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Tag
      className={cn('parallax-panel', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      {...props}
    >
      <div className={cn('parallax-card h-full', innerClassName)}>{children}</div>
    </Tag>
  )
}
