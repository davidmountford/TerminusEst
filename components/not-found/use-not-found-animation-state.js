'use client'

import { useEffect, useState } from 'react'

import {
  VOID_WINDOWS,
  NOT_FOUND_TITLE,
  createEncryptedFrame,
} from '@/components/not-found/not-found-content'

export function useNotFoundAnimationState() {
  const [glitchWindow, setGlitchWindow] = useState(null)
  const [displayTitle, setDisplayTitle] = useState(() => createEncryptedFrame(NOT_FOUND_TITLE, 1))
  const [titleMode, setTitleMode] = useState('deleting')

  useEffect(() => {
    let cycleTimeoutId
    let clearTimeoutId

    const nextDelay = () => Math.round((0.8 + Math.random() * 1.4) * 1000)

    const pulseWindow = () => {
      const nextWindow = VOID_WINDOWS[Math.floor(Math.random() * VOID_WINDOWS.length)].className

      setGlitchWindow(nextWindow)

      clearTimeoutId = window.setTimeout(() => {
        setGlitchWindow((current) => (current === nextWindow ? null : current))
      }, 420)

      cycleTimeoutId = window.setTimeout(pulseWindow, nextDelay())
    }

    cycleTimeoutId = window.setTimeout(pulseWindow, nextDelay())

    return () => {
      window.clearTimeout(cycleTimeoutId)
      window.clearTimeout(clearTimeoutId)
    }
  }, [])

  useEffect(() => {
    let deleteIntervalId
    let typeIntervalId

    const fullyEncrypted = createEncryptedFrame(NOT_FOUND_TITLE, 1)
    setDisplayTitle(fullyEncrypted)
    setTitleMode('deleting')

    let deleteIndex = fullyEncrypted.length
    deleteIntervalId = window.setInterval(() => {
      deleteIndex -= 1
      setDisplayTitle(fullyEncrypted.slice(0, Math.max(deleteIndex, 0)))

      if (deleteIndex <= 0) {
        window.clearInterval(deleteIntervalId)
        setTitleMode('typing')

        let typedCharacters = 0
        typeIntervalId = window.setInterval(() => {
          typedCharacters += 1
          setDisplayTitle(NOT_FOUND_TITLE.slice(0, typedCharacters))

          if (typedCharacters >= NOT_FOUND_TITLE.length) {
            window.clearInterval(typeIntervalId)
            setTitleMode('resolved')
          }
        }, 26)
      }
    }, 15)

    return () => {
      window.clearInterval(deleteIntervalId)
      window.clearInterval(typeIntervalId)
    }
  }, [])

  return {
    displayTitle,
    glitchWindow,
    titleMode,
  }
}
