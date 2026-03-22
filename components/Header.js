import { cn } from '@/lib/utils'

export default function Header({ title, className, pulsing = false }) {
  return (
    <h1
      className={cn(
        'glitch-text font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl',
        pulsing && 'glitch-text-active',
        className
      )}
    >
      {title}
    </h1>
  )
}
