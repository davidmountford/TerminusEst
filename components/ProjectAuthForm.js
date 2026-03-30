'use client'

import { useState } from 'react'

export default function ProjectAuthForm() {
  const [operatorId, setOperatorId] = useState('')
  const [accessPhrase, setAccessPhrase] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('failed')
  }

  return (
    <div className="rounded-[1.25rem] border border-primary/20 bg-background/55 p-5 shadow-[0_18px_42px_rgba(24,20,34,0.14)] backdrop-blur-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-secondary">
            // Authentication
          </p>

          <h2 className="font-display text-xl uppercase tracking-[0.1em] text-foreground">
            Session Login
          </h2>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block space-y-1.5">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
              Operator ID
            </span>

            <input
              type="text"
              value={operatorId}
              onChange={(event) => setOperatorId(event.target.value)}
              placeholder="gm@dragonsight"
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-secondary"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
              Access Phrase
            </span>

            <input
              type="password"
              value={accessPhrase}
              onChange={(event) => setAccessPhrase(event.target.value)}
              placeholder="********"
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-secondary"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg border border-secondary/45 bg-secondary/90 px-3 py-2.5 font-mono text-[0.64rem] uppercase tracking-[0.22em] text-black transition-colors duration-200 hover:bg-secondary"
          >
            Authenticate
          </button>
        </form>

        {status === 'failed' ? (
          <p className="rounded-lg border border-signal/25 bg-signal/10 px-3 py-2 text-center font-mono text-[0.64rem] uppercase tracking-[0.24em] text-signal">
            Access Denied
          </p>
        ) : null}
      </div>
    </div>
  )
}
