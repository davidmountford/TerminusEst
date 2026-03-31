import { TriangleAlert } from 'lucide-react'

import MatrixTrack from '@/components/not-found/MatrixTrack'
import { MATRIX_STREAMS, VOID_WINDOWS } from '@/components/not-found/not-found-content'

export default function NotFoundMonolith({ glitchWindow }) {
  return (
    <div className="relative flex min-h-[18rem] w-full items-center justify-center sm:min-h-[24rem]">
      <div className="not-found-monolith" aria-hidden="true">
        <img
          src="/kamon_bw.svg"
          alt=""
          className="not-found-kamon not-found-rgb-layer not-found-rgb-layer-cyan"
        />

        <img
          src="/kamon_bw.svg"
          alt=""
          className="not-found-kamon not-found-rgb-layer not-found-rgb-layer-magenta"
        />

        <img src="/kamon_bw.svg" alt="" className="not-found-kamon not-found-kamon-core not-found-rgb-layer" />

        <div className="not-found-slice not-found-slice-a" />
        <div className="not-found-slice not-found-slice-b" />
        <div className="not-found-slice not-found-slice-c" />
        <div className="not-found-slice not-found-slice-d" />

        {VOID_WINDOWS.map(({ className, type }) => (
          <div
            key={className}
            className={`not-found-void ${className} ${glitchWindow === className ? 'glitch-text-active' : ''}`}
          >
            <div className="not-found-void-header">
              <div className="not-found-void-dots" />
            </div>

            <div className="not-found-void-body">
              {type === 'icon' ? (
                <TriangleAlert className="not-found-void-icon" strokeWidth={1.8} aria-hidden="true" />
              ) : null}

              {type === 'gibberish' ? (
                <div className="not-found-void-gibberish" aria-hidden="true">
                  <span>7F::NULL</span>
                  <span>ERR/SECT-9</span>
                  <span>VX-113.A$</span>
                  <span>NO_ROUTE</span>
                </div>
              ) : null}

              {type === 'matrix' ? (
                <div className="not-found-void-matrix" aria-hidden="true">
                  {MATRIX_STREAMS.map((stream, index) => (
                    <MatrixTrack
                      key={stream}
                      className={`not-found-void-matrix-track-${index + 1}`}
                      value={stream}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
