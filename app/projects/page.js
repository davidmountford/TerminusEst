import HomePageShell from '@components/HomePageShell'
import { notFound } from 'next/navigation'
import { isProjectsEnabled } from '@/lib/projects-access.server'

export const dynamic = 'force-dynamic'

export default function ProjectsPage() {
  if (!isProjectsEnabled()) {
    notFound()
  }

  return <HomePageShell initialSection="projects" projectsEnabled />
}
