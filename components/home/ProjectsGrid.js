import { PROJECT_CATALOG } from '@/lib/project-catalog'

import ProjectCard from '@/components/home/ProjectCard'

export default function ProjectsGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {PROJECT_CATALOG.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
