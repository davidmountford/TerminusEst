export default function NotFoundCopy() {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-lg leading-7 text-muted-foreground sm:text-xl">
        The requested page broke apart somewhere between sectors. All that came back was a damaged monument and some bad signal.
      </p>

      <span className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
        Artifact state: corrupted
      </span>
    </div>
  )
}
