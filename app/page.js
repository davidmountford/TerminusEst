import HomePageShell from '@components/HomePageShell'
import { isProjectsEnabled } from '@/lib/projects-access.server'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return <HomePageShell projectsEnabled={isProjectsEnabled()} />
}
