import { clsx } from 'clsx'
import { Moon } from 'lunarphase-js'

const numMoons = 10
const maxDifference = numMoons / 2

export default function Home() {
  return (
    <main>
      <header className="cursor-default p-4">
        <h1 className="bg-clip-text bg-gradient-to-r from-yellow-50/15 text-transparent text-xs to-yellow-50/15">
          moonphase
        </h1>
      </header>
      <div className="bottom-0 fixed flex flex-col items-center justify-center left-0 right-0 top-0">
        <div className="flex gap-[3vmin] items-center justify-center w-full">
          {new Array(numMoons).fill(null).map((_, i) => {
            const date = new Date()
            const difference = i - maxDifference
            date.setDate(date.getDate() + difference)

            return (
              <div
                key={i}
                className="aspect-square shrink-0 -translate-x-1/2 w-[33vmin]"
                style={{
                  opacity: 1 - Math.abs(difference) / maxDifference,
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
