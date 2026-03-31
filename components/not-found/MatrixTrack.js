export default function MatrixTrack({ className, value }) {
  return (
    <div className={`not-found-void-matrix-track ${className}`}>
      <div className="not-found-void-matrix-track-inner">
        <span>{value}{value}{value}</span>

        <span aria-hidden="true">{value}{value}{value}</span>
      </div>
    </div>
  )
}
