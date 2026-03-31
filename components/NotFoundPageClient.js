'use client'

import { useRouter } from 'next/navigation'
import NotFoundScene from '@/components/not-found/NotFoundScene'
import { useNotFoundAnimationState } from '@/components/not-found/use-not-found-animation-state'

export default function NotFoundPageClient({ projectsEnabled }) {
  const router = useRouter()
  const { displayTitle, glitchWindow, titleMode } = useNotFoundAnimationState()

  const handleSectionSelect = (sectionId) => {
    router.push(`/${sectionId}`)
  }

  const handleReturnHome = () => {
    router.push('/')
  }

  return (
    <NotFoundScene
      displayTitle={displayTitle}
      glitchWindow={glitchWindow}
      handleReturnHome={handleReturnHome}
      handleSectionSelect={handleSectionSelect}
      projectsEnabled={projectsEnabled}
      titleMode={titleMode}
    />
  )
}
