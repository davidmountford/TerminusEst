import NotFoundPageClient from '@components/NotFoundPageClient'
import { isProjectsEnabled } from '@/lib/projects-access.server'

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return <NotFoundPageClient projectsEnabled={isProjectsEnabled()} />
}
