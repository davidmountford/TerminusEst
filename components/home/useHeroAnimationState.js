'use client'

import { useEffect, useState } from 'react'

import {
  GLITCH_DURATION_MS,
  HEADER_TITLE,
  INIT_LABEL,
  INTRO_QUOTES,
  SKILLS,
  SOCIAL_LINKS,
  TRACE_LABEL,
} from '@/lib/home-shell-content'
import { createEncryptedFrame, getAmbientGlitchDelay } from '@/lib/home-shell-helpers'

export default function useHeroAnimationState({ activeContent }) {
  const [glitchTarget, setGlitchTarget] = useState(null)
  const [introQuote, setIntroQuote] = useState(INTRO_QUOTES[0])
  const [displayTitle, setDisplayTitle] = useState(INTRO_QUOTES[0])
  const [titleMode, setTitleMode] = useState('quote')
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [initLabel, setInitLabel] = useState('')
  const [sectionLabel, setSectionLabel] = useState('')
  const [traceLabel, setTraceLabel] = useState('')
  const [showTraceIcons, setShowTraceIcons] = useState(false)

  const isResolved = titleMode === 'resolved'
  const isTypingOrResolved = titleMode === 'typing' || isResolved
  const initReady = initLabel === INIT_LABEL

  useEffect(() => {
    const nextQuote = INTRO_QUOTES[Math.floor(Math.random() * INTRO_QUOTES.length)]

    setIntroQuote(nextQuote)
    setDisplayTitle(nextQuote)
    setTitleMode('quote')
  }, [])

  useEffect(() => {
    let cycleTimeoutId
    let clearTimeoutId

    const pulseAmbient = () => {
      const targets = ['title', ...SKILLS.map((skill) => `skill:${skill}`)]

      if (showSubtitle) {
        targets.push('subtitle')
      }

      if (initReady) {
        targets.push('init-terminus', 'init-est')
      }

      if (showTraceIcons) {
        targets.push(...SOCIAL_LINKS.map((link) => `link-${link.id}`))
      }

      const nextTarget = targets[Math.floor(Math.random() * targets.length)]
      setGlitchTarget(nextTarget)

      clearTimeoutId = window.setTimeout(() => {
        setGlitchTarget((current) => (current === nextTarget ? null : current))
      }, GLITCH_DURATION_MS)

      cycleTimeoutId = window.setTimeout(pulseAmbient, getAmbientGlitchDelay())
    }

    cycleTimeoutId = window.setTimeout(pulseAmbient, getAmbientGlitchDelay())

    return () => {
      window.clearTimeout(cycleTimeoutId)
      window.clearTimeout(clearTimeoutId)
    }
  }, [initReady, showSubtitle, showTraceIcons])

  useEffect(() => {
    let initIntervalId
    let traceStartTimeoutId
    let traceIntervalId
    let iconTimeoutId

    let initIndex = 0
    initIntervalId = window.setInterval(() => {
      initIndex += 1
      setInitLabel(INIT_LABEL.slice(0, initIndex))

      if (initIndex >= INIT_LABEL.length) {
        window.clearInterval(initIntervalId)
      }
    }, 40)

    traceStartTimeoutId = window.setTimeout(() => {
      let traceIndex = 0
      traceIntervalId = window.setInterval(() => {
        traceIndex += 1
        setTraceLabel(TRACE_LABEL.slice(0, traceIndex))

        if (traceIndex >= TRACE_LABEL.length) {
          window.clearInterval(traceIntervalId)
          iconTimeoutId = window.setTimeout(() => {
            setShowTraceIcons(true)
          }, 120)
        }
      }, 36)
    }, 260)

    return () => {
      window.clearInterval(initIntervalId)
      window.clearTimeout(traceStartTimeoutId)
      window.clearInterval(traceIntervalId)
      window.clearTimeout(iconTimeoutId)
    }
  }, [])

  useEffect(() => {
    if (!activeContent) {
      setSectionLabel('')
      return undefined
    }

    setSectionLabel('')

    let sectionIndex = 0
    const sectionIntervalId = window.setInterval(() => {
      sectionIndex += 1
      setSectionLabel(activeContent.eyebrow.slice(0, sectionIndex))

      if (sectionIndex >= activeContent.eyebrow.length) {
        window.clearInterval(sectionIntervalId)
      }
    }, 34)

    return () => {
      window.clearInterval(sectionIntervalId)
    }
  }, [activeContent])

  useEffect(() => {
    let startTimeoutId
    let encryptFrameId
    let deleteIntervalId
    let typeIntervalId

    setDisplayTitle(introQuote)
    setTitleMode('quote')

    startTimeoutId = window.setTimeout(() => {
      setTitleMode('encrypting')

      const startedAt = window.performance.now()

      const encryptTick = (now) => {
        const progress = Math.min((now - startedAt) / 1000, 1)

        setDisplayTitle(createEncryptedFrame(introQuote, progress))

        if (progress >= 1) {
          const fullyEncrypted = createEncryptedFrame(introQuote, 1)
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
                setDisplayTitle(HEADER_TITLE.slice(0, typedCharacters))

                if (typedCharacters >= HEADER_TITLE.length) {
                  window.clearInterval(typeIntervalId)
                  setTitleMode('resolved')
                }
              }, 28)
            }
          }, 15)

          return
        }

        encryptFrameId = window.requestAnimationFrame(encryptTick)
      }

      encryptFrameId = window.requestAnimationFrame(encryptTick)
    }, 450)

    return () => {
      window.clearTimeout(startTimeoutId)
      window.cancelAnimationFrame(encryptFrameId)
      window.clearInterval(deleteIntervalId)
      window.clearInterval(typeIntervalId)
    }
  }, [introQuote])

  useEffect(() => {
    if (titleMode !== 'resolved') {
      setShowSubtitle(false)
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setShowSubtitle(true)
    }, 180)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [titleMode])

  return {
    displayTitle,
    glitchTarget,
    initLabel,
    initReady,
    isResolved,
    isTypingOrResolved,
    sectionLabel,
    showSubtitle,
    showTraceIcons,
    traceLabel,
  }
}
