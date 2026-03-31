import { ENCRYPTION_CHARS, HEADER_TITLE } from '@/lib/home-shell-content'

export const SECOND_INITIAL_INDEX = HEADER_TITLE.indexOf('M', 1)

export function createEncryptedFrame(target, progress) {
  const encryptedCharacters = Math.floor(progress * target.length)

  return target
    .split('')
    .map((character, index) => {
      if (character === ' ') {
        return ' '
      }

      if (index < encryptedCharacters) {
        return ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)]
      }

      return character
    })
    .join('')
}

export function normalizeParagraphs(value) {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value.filter(Boolean) : [value]
}

export function getAmbientGlitchDelay() {
  if (Math.random() < 0.8) {
    return Math.round((5 + Math.random() * 5) * 1000)
  }

  return Math.round((3 + Math.random() * 2) * 1000)
}
