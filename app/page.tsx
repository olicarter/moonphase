'use client'

import { clsx } from 'clsx'
import { Moon } from 'lunarphase-js'
import { useEffect, useState } from 'react'
import { addMinutes, format } from 'date-fns'

export default function Home() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const changeDate = (e: WheelEvent) => {
      setDate(d => addMinutes(d, e.deltaX + e.deltaY))
    }
    window.addEventListener('wheel', changeDate)
    return () => window.removeEventListener('wheel', changeDate)
  }, [])

  return (
    <main className="h-svh">
      <header className="cursor-default fixed font-mono p-4 top-0 left-0 text-yellow-50/20 text-xs">
        <h1>
          <a
            className="hover:text-yellow-50"
            href="https://github.com/olicarter/moonphase"
            rel="noreferrer"
            target="_blank"
          >
            moonphase
          </a>
        </h1>
      </header>
      <div className="bottom-0 fixed flex flex-col items-center justify-around left-0 py-[3vmin] right-0 top-0 pointer-events-none">
        <div className="absolute font-bold font-mono mix-blend-difference text-xs text-white z-50">
          {format(date, 'dd.MM.yy HH:mm')}
        </div>
        <div className="aspect-square duration-1000 shrink-0 w-[calc(100vmin-32px)] transition-[width]">
          <MoonGraphic date={date} />
        </div>
      </div>
    </main>
  )
}

function MoonGraphic({ date }: { date: Date }) {
  const lunarAgePercent = Moon.lunarAgePercent(date)
  const phase = (lunarAgePercent * 360 + 180) % 360

  return (
    <div className="h-full relative rounded-full w-full">
      <div className="absolute h-full w-0.5 bg-yellow-50 left-1/2 z-10 -translate-x-1/2" />
      <div
        className={clsx(
          'absolute bg-gradient-to-r from-50% h-full overflow-hidden rounded-full to-50% w-full z-10',
          phase < 90 && 'from-yellow-50 to-yellow-50',
          phase >= 90 && phase < 180 && 'from-neutral-900 to-neutral-900',
          phase >= 180 && phase < 270 && 'from-neutral-900 to-neutral-900',
          phase >= 270 && 'from-yellow-50 to-transparent',
        )}
        style={{ transform: `rotateY(${phase}deg)` }}
      />
      <div
        className={clsx(
          'absolute bg-gradient-to-r from-50% h-full rounded-full to-50% w-full',
          phase < 90 && 'from-yellow-50 to-neutral-900',
          phase >= 90 && phase < 180 && 'from-yellow-50 to-neutral-900',
          phase >= 180 && phase < 270 && 'from-neutral-900 to-yellow-50',
          phase >= 270 && 'from-neutral-900 to-yellow-50',
        )}
      />
    </div>
  )
}
