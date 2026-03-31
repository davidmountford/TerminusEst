import { cn } from '@/lib/utils'

export default function SectionPanel({
  activeContent,
  bodyComponent,
  contentAside,
  hasContentAside,
  introParagraphs,
  bodyParagraphs,
}) {
  if (!activeContent) {
    return null
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="rounded-[2rem] border border-border/70 bg-card/95 p-8 shadow-[0_24px_80px_rgba(24,20,34,0.16)] sm:p-10 lg:min-h-[36rem]">
        <div className={cn('space-y-8', bodyComponent ? 'max-w-5xl' : 'max-w-3xl')}>
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-secondary">
              {activeContent.eyebrow}
            </p>

            <h2 className="font-display text-3xl uppercase tracking-[0.14em] text-foreground sm:text-5xl">
              {activeContent.title}
            </h2>

            {introParagraphs.length > 0 ? (
              <div className="max-w-2xl space-y-4 text-xl leading-8 text-foreground/90">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              'grid gap-8',
              hasContentAside && 'lg:grid-cols-[minmax(0,1.6fr)_minmax(16rem,0.85fr)]'
            )}
          >
            <div className={cn(bodyComponent ? '' : 'space-y-5 text-lg leading-8 text-muted-foreground')}>
              {bodyComponent}

              {!bodyComponent
                ? bodyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                : null}
            </div>

            {contentAside ? <aside>{contentAside}</aside> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
