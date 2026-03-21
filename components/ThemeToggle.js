'use client'

import { Circle, Lightbulb, Moon } from 'lucide-react'

import { cn } from '@/lib/utils'

const OPTIONS = [
  { value: 'dark', label: 'Dark mode', Icon: Moon },
  { value: 'system', label: 'System theme', Icon: Circle },
  { value: 'light', label: 'Light mode', Icon: Lightbulb },
]

export default function ThemeToggle({ mode, onChange }) {
  return (
    <div className="fixed right-5 top-5 z-40 sm:right-6 sm:top-6">
      <div
        role="radiogroup"
        aria-label="Theme mode"
        className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/85 p-1.5 shadow-[0_10px_30px_rgba(24,20,34,0.12)] backdrop-blur"
      >
        {OPTIONS.map(({ value, label, Icon }) => {
          const selected = mode === value

          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={label}
              onClick={() => onChange(value)}
              className={cn(
                'inline-flex size-9 items-center justify-center rounded-full border transition',
                selected
                  ? 'border-primary/40 bg-primary/12 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-secondary/30 hover:bg-secondary/10 hover:text-secondary'
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
