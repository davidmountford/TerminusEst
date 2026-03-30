import Link from 'next/link'
import { notFound } from 'next/navigation'

import ProjectAuthForm from '@/components/ProjectAuthForm'
import { isProjectsEnabled } from '@/lib/projects-access.server'
import { getProjectBySlug, PROJECT_CATALOG } from '@/lib/project-catalog'

export const dynamic = 'force-dynamic'

function SectionStatusBadge({ status }) {
  if (!status) {
    return null
  }

  const paletteByStatus = {
    'Active Concept': 'border-secondary/30 bg-secondary/10 text-secondary',
    'In Progress': 'border-primary/20 bg-primary/10 text-primary',
    Roadmap: 'border-signal/25 bg-signal/10 text-signal',
  }

  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] ${
        paletteByStatus[status] ?? 'border-primary/20 bg-primary/10 text-primary'
      }`}
    >
      {status}
    </span>
  )
}

export function generateStaticParams() {
  if (!isProjectsEnabled()) {
    return []
  }

  return PROJECT_CATALOG.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }) {
  if (!isProjectsEnabled()) {
    return {
      title: 'Project Not Found | Terminus Est',
    }
  }

  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Terminus Est',
    }
  }

  return {
    title: `${project.title} | Terminus Est`,
  }
}

export default async function ProjectDetailPage({ params }) {
  if (!isProjectsEnabled()) {
    notFound()
  }

  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen px-6 py-10 text-foreground sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-primary/30 px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-primary transition-colors duration-200 hover:border-secondary/50 hover:text-secondary"
        >
          <span aria-hidden="true">00 //</span>

          <span>Back To Projects</span>
        </Link>

        <section className="rounded-[2rem] border border-border/70 bg-card/95 px-8 py-10 shadow-[0_24px_80px_rgba(24,20,34,0.16)] sm:px-10 sm:py-12">
          <article>
            <div className="space-y-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-secondary">
                {project.eyebrow}
              </p>

              <h1 className="font-display text-3xl uppercase tracking-[0.14em] text-foreground sm:text-5xl">
                {project.title}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-foreground/90 sm:text-xl">
                {project.summary}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-12 space-y-12">
              {project.sections?.map((section, index) => (
                <section key={section.title} className="space-y-4">
                  {index === 0 ? (
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start lg:gap-12">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="font-display text-2xl uppercase tracking-[0.1em] text-foreground sm:text-3xl">
                            {section.title}
                          </h2>

                          <SectionStatusBadge status={section.status} />
                        </div>

                        <div className="space-y-4 text-lg leading-8 text-muted-foreground">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <ProjectAuthForm />
                      </div>
                    </div>
                  ) : null}

                  {index !== 0 ? (
                    <>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-2xl uppercase tracking-[0.1em] text-foreground sm:text-3xl">
                          {section.title}
                        </h2>

                        <SectionStatusBadge status={section.status} />
                      </div>

                      <div className="space-y-4 text-lg leading-8 text-muted-foreground">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
