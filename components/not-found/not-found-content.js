export const VOID_WINDOWS = [
  { className: 'not-found-void-1', type: 'icon' },
  { className: 'not-found-void-2', type: 'gibberish' },
  { className: 'not-found-void-3', type: 'icon' },
  { className: 'not-found-void-4', type: 'matrix' },
  { className: 'not-found-void-5', type: 'gibberish' },
]

export const NOT_FOUND_TITLE = 'The Route Dissolved In Transit'

export const MATRIX_STREAMS = [
  'SIGNAL_NULL_404//TERMINUS_EST//GHOST_ROUTE//PACKET_LOSS//',
  'VX-SECTOR::NULL_PATH//TRACE_FAIL//ARCHIVE_VOID//',
  'RETURN_SIGNAL_LOW//KAMON_ECHO//NODE_LOST//',
  'ERROR_404//ROUTE_GONE//PACKET_NOISE//',
  'NULL_PATH//SIGNAL_NULL//VOID_LINK//',
  'TERMINUS_EST//404_ROUTE//NODE_BREAK//',
]

export const ENCRYPTION_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>/?"

export function createEncryptedFrame(target, progress) {
  const encryptedCharacters = Math.floor(progress * target.length)

  return target
    .split('')
    .map((character, index) => {
      if (character === ' ') {
        return ' '
      }

      if (index < encryptedCharacters) {
        const deterministicOffset =
          target.length * 17 +
          index * 31 +
          Math.floor(progress * 1000) * 13 +
          character.charCodeAt(0)

        return ENCRYPTION_CHARS[deterministicOffset % ENCRYPTION_CHARS.length]
      }

      return character
    })
    .join('')
}
