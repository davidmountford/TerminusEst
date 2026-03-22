# TerminusEst
Thank you for visiting.

## UsageSPDX-FileCopyrightText: 2024 David Mountford

```bash
npm ci
npm run dev
```

## Sentry

Copy `.env.example` to `.env.local` and set the Sentry values you need:

```bash
NEXT_PUBLIC_SENTRY_DSN=...
NEXT_PUBLIC_LOAD_SENTRY=true
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development
SENTRY_DSN=...
LOAD_SENTRY=true
SENTRY_ENVIRONMENT=development
SENTRY_AUTH_TOKEN=...
SENTRY_ORG=...
SENTRY_PROJECT=...
```

`NEXT_PUBLIC_SENTRY_DSN` is enough to start capturing browser errors. Set `SENTRY_DSN` if you want a separate server/edge DSN, and add `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` to upload source maps during builds.

Use `NEXT_PUBLIC_SENTRY_ENVIRONMENT` and `SENTRY_ENVIRONMENT` to label events clearly across local, preview, and production deploys.
Set `NEXT_PUBLIC_LOAD_SENTRY` and `LOAD_SENTRY` to `true` when you want Sentry active outside production. Production loads automatically when the environment is `production`.

## Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/46648482-644c-4c80-bafb-872057e51b6b/deploy-status)](https://app.netlify.com/sites/next-dev-starter/deploys)

SPDX-FileCopyrightText: 2024 David Mountford
