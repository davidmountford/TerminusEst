import Link from 'next/link'

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex min-h-[16rem] flex-col overflow-hidden rounded-[1.5rem] border border-primary/20 bg-card/92 p-5 shadow-[0_18px_48px_rgba(24,20,34,0.16)] transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:border-secondary/45 hover:bg-card hover:shadow-[0_24px_56px_rgba(0,229,204,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,47,255,0.1),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(0,229,204,0.08),transparent_48%)] opacity-80 transition-opacity duration-200 group-hover:opacity-100"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-70"
      />

      <div className="relative z-10 flex h-full flex-col gap-5">
        <div className="space-y-3">
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-secondary">
            {project.index} // Project
          </span>

          <h3 className="font-display text-xl uppercase tracking-[0.08em] text-foreground transition-colors duration-200 group-hover:text-secondary sm:text-2xl">
            {project.title}
          </h3>

          <p className="font-sans text-base leading-8 text-muted-foreground">{project.summary}</p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
