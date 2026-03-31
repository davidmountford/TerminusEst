import { cn } from '@/lib/utils'

export default function NotFoundTitle({ displayTitle, staticTitle, titleMode }) {
  return (
    <h1
      className={cn(
        'font-display text-4xl uppercase tracking-[0.12em] text-foreground sm:text-5xl',
        titleMode === 'encrypting' && 'glitch-text-active'
      )}
    >
      <span className="relative inline-flex min-h-[2.4em] min-w-full items-center justify-center">
        <span className="invisible" aria-hidden="true">
          {staticTitle}

          <span className="terminal-cursor ml-2 text-signal" />
        </span>

        <span className="absolute inset-0 flex items-center justify-center">
          <span>{displayTitle}</span>

          {titleMode !== 'resolved' ? (
            <span className="terminal-cursor ml-2 text-signal" aria-hidden="true" />
          ) : null}
        </span>
      </span>
    </h1>
  )
}
