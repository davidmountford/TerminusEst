import * as Sentry from '@sentry/nextjs'
import { getClientSentryEnvironment, shouldLoadClientSentry } from '@/lib/sentryConfig'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN
const environment = getClientSentryEnvironment()

if (dsn && shouldLoadClientSentry()) {
  Sentry.init({
    dsn,
    environment,
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.1,
    integrations: [Sentry.replayIntegration()],
    replaysSessionSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.1,
    replaysOnErrorSampleRate: 1
  })
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
