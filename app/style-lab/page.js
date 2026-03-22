import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const metadata = {
  title: 'Style Lab | Terminus Est',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StyleLab() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="space-y-4">
          <Badge variant="outline" data-testid="lab-eyebrow" className="border-secondary/40 text-secondary">
            hidden route
          </Badge>

          <div className="space-y-3">
            <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">
              Style Lab
            </h1>

            <p className="max-w-3xl text-lg text-muted-foreground">
              Smoke-test surface for shared UI primitives. Keep it hidden, keep it reliable, and
              toss new components in here whenever we need a fast visual sanity check.
            </p>
          </div>
        </header>

        <section data-testid="lab-colors" className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Theme Tokens</h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['primary', 'bg-primary text-primary-foreground'],
              ['secondary', 'bg-secondary text-secondary-foreground'],
              ['signal', 'bg-signal text-white'],
              ['card', 'bg-card text-card-foreground border border-border'],
            ].map(([name, classes]) => (
              <div
                key={name}
                data-testid={`swatch-${name}`}
                className={`rounded-xl p-5 shadow-sm ${classes}`}
              >
                <div className="font-mono text-xs uppercase tracking-[0.25em] opacity-80">{name}</div>

                <div className="mt-4 text-sm">Token preview</div>
              </div>
            ))}
          </div>
        </section>

        <section data-testid="lab-buttons" className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Buttons</h2>

          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        <section data-testid="lab-forms" className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Form Controls</h2>

          <Card className="max-w-xl bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Contact Intake</CardTitle>

              <CardDescription>Good for smoke-testing input surfaces and contrast.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <label className="block space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Email
                </span>

                <Input data-testid="lab-input-email" type="email" placeholder="you@night.city" />
              </label>

              <label className="block space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Project
                </span>

                <Input data-testid="lab-input-project" placeholder="Synthwave rebuild" />
              </label>
            </CardContent>

            <CardFooter className="justify-between gap-4">
              <Badge variant="secondary">Ready</Badge>

              <Button variant="secondary">Submit Probe</Button>
            </CardFooter>
          </Card>
        </section>

        <section data-testid="lab-cards" className="space-y-4">
          <h2 className="font-display text-2xl font-semibold">Cards</h2>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-primary/30 bg-card/70 backdrop-blur">
              <CardHeader>
                <Badge variant="signal" className="w-fit">
                  featured
                </Badge>

                <CardTitle className="glitch-text mt-3">Cyberpunk Hero Card</CardTitle>

                <CardDescription>
                  Mixes shadcn primitives with project-specific glitch styling.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-7 text-text-primary/80">
                  This page is intentionally generic enough for smoke tests, but styled enough to
                  catch busted tokens, low-contrast surfaces, or broken utility combinations.
                </p>
              </CardContent>
            </Card>

            <Card className="parallax-card overflow-hidden bg-[rgba(10,8,18,0.78)]">
              <CardHeader>
                <CardTitle>Effects Check</CardTitle>

                <CardDescription>Verifies custom classes can live beside shadcn.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="glitch-divider" />

                <p className="glitch-text font-display text-lg text-primary-soft">
                  Signal drift detected
                </p>

                <div className="flex flex-wrap gap-3">
                  <Badge>token</Badge>

                  <Badge variant="secondary">glow</Badge>

                  <Badge variant="outline">border</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
