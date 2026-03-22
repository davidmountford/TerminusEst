import * as Sentry from '@sentry/nextjs'
import { getServerSentryEnvironment, shouldLoadServerSentry } from '@/lib/sentryConfig'

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
const environment = getServerSentryEnvironment()

if (dsn && shouldLoadServerSentry()) {
  Sentry.init({
    dsn,
    environment,
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.1
  })
}
