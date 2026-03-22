const TRUE_VALUES = new Set(['1', 'true', 'yes', 'on'])

function isTruthyFlag(value) {
  if (!value) {
    return false
  }

  return TRUE_VALUES.has(String(value).toLowerCase())
}

export function getClientSentryEnvironment() {
  return process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV
}

export function getServerSentryEnvironment() {
  return (
    process.env.SENTRY_ENVIRONMENT ||
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ||
    process.env.NODE_ENV
  )
}

export function shouldLoadClientSentry() {
  return (
    isTruthyFlag(process.env.NEXT_PUBLIC_LOAD_SENTRY) ||
    getClientSentryEnvironment() === 'production'
  )
}

export function shouldLoadServerSentry() {
  return (
    isTruthyFlag(process.env.LOAD_SENTRY) ||
    isTruthyFlag(process.env.NEXT_PUBLIC_LOAD_SENTRY) ||
    getServerSentryEnvironment() === 'production'
  )
}
