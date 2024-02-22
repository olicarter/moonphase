'use client'

import { clsx } from 'clsx'
import { Moon } from 'lunarphase-js'
import { useRef } from 'react'
import { useScroll } from 'react-use'

const numMoons = 29
const maxDifference = Math.ceil(numMoons / 2)

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { y } = useScroll(scrollRef)

  return (
    <main
      className="h-svh overflow-y-scroll"
      ref={scrollRef}
      style={{ scrollbarWidth: 'none' }}
    >
      <div className="h-[3000px] w-svh" />
      <header className="cursor-default fixed p-4 top-0 left-0">
        <h1 className="bg-clip-text bg-gradient-to-r from-yellow-50/15 text-transparent text-xs to-yellow-50/15">
          moonphase
        </h1>
      </header>
      <div className="bottom-0 fixed flex flex-col items-center justify-around left-0 py-[3vmin] right-0 top-0 pointer-events-none">
        <div
          className="grid grid-cols-[repeat(29,1fr)] gap-[1vmin]"
          style={{ width: `${3000 - (y + 600)}vmin` }}
        >
          {new Array(numMoons).fill(null).map((_, i) => {
            const date = new Date()
            const difference = i - maxDifference
            date.setDate(date.getDate() + difference)

            return (
              <div
                key={i}
                className="aspect-square shrink-0 -translate-x-[calc(100%+1vmin)] w-full"
                style={{
                  opacity:
                    difference === 0
                      ? 1
                      : 0.5 - (Math.abs(difference) / maxDifference) * 0.5,
                }}
              >
                <MoonGraphic date={date} />
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

function MoonGraphic({ date = new Date() }: { date?: Date }) {
  const lunarAgePercent = Moon.lunarAgePercent(date)
  const phase = (lunarAgePercent * 360 + 180) % 360

  return (
    <div className="h-full relative rounded-full w-full">
      <div className="absolute h-full w-0.5 bg-yellow-50 left-1/2 z-10 -translate-x-1/2" />
      <div
        className={clsx(
          'absolute bg-gradient-to-r from-50% h-full overflow-hidden rounded-full to-50% w-full z-10',
          phase < 90 && 'from-yellow-50 to-yellow-50',
          phase >= 90 && phase < 180 && 'from-neutral-950 to-neutral-950',
          phase >= 180 && phase < 270 && 'from-neutral-950 to-neutral-950',
          phase >= 270 && 'from-yellow-50 to-transparent',
        )}
        style={{ transform: `rotateY(${phase}deg)` }}
      />
      <div
        className={clsx(
          'absolute bg-gradient-to-r from-50% h-full rounded-full to-50% w-full',
          phase < 90 && 'from-yellow-50 to-neutral-950',
          phase >= 90 && phase < 180 && 'from-yellow-50 to-neutral-950',
          phase >= 180 && phase < 270 && 'from-neutral-950 to-yellow-50',
          phase >= 270 && 'from-neutral-950 to-yellow-50',
        )}
      />
    </div>
  )
}
