import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative isolate h-screen overflow-clip px-6 py-6 text-foreground sm:px-8 sm:py-8">
      <div
        aria-hidden="true"
        className="nebula nebula-primary absolute right-[-10rem] top-[-8rem] opacity-70"
      />

      <div
        aria-hidden="true"
        className="nebula nebula-secondary absolute bottom-[-6rem] left-[-7rem] opacity-60"
      />

      <div aria-hidden="true" className="cyber-grid-floor opacity-40" />

      <div className="mx-auto flex h-full max-w-6xl items-center justify-center overflow-hidden">
        <section className="not-found-shell relative max-h-full w-full overflow-hidden px-2 py-4 sm:px-4 sm:py-6">
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-secondary">
                Signal Lost // Error 404
              </p>

              <h1 className="font-display text-4xl uppercase tracking-[0.12em] text-foreground sm:text-5xl">
                The Route Dissolved In Transit
              </h1>
            </div>

            <div className="relative flex min-h-[18rem] w-full items-center justify-center sm:min-h-[24rem]">
              <div className="not-found-monolith" aria-hidden="true">
                <img src="/kamon_bw.svg" alt="" className="not-found-kamon not-found-rgb-layer not-found-rgb-layer-cyan" />
                <img src="/kamon_bw.svg" alt="" className="not-found-kamon not-found-rgb-layer not-found-rgb-layer-magenta" />
                <img src="/kamon_bw.svg" alt="" className="not-found-kamon not-found-kamon-core not-found-rgb-layer" />

                <div className="not-found-slice not-found-slice-a" />
                <div className="not-found-slice not-found-slice-b" />
                <div className="not-found-slice not-found-slice-c" />
                <div className="not-found-slice not-found-slice-d" />

                <div className="not-found-void not-found-void-1" />
                <div className="not-found-void not-found-void-2" />
                <div className="not-found-void not-found-void-3" />
                <div className="not-found-void not-found-void-4" />
                <div className="not-found-void not-found-void-5" />
              </div>
            </div>

            <div className="max-w-2xl space-y-3">
              <p className="text-lg leading-7 text-muted-foreground sm:text-xl">
                The requested page broke apart somewhere between sectors. All that came back was a damaged monument and some bad signal.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md border border-secondary/55 bg-secondary/90 px-5 py-3 font-mono text-xs uppercase tracking-[0.28em] text-secondary-foreground transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-[0_10px_24px_rgba(0,229,204,0.22)]"
                >
                  Return Home
                </Link>

                <span className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                  Artifact state: corrupted
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
