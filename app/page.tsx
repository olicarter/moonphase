import { clsx } from 'clsx'
import { Moon } from 'lunarphase-js'

const numMoons = 10
const maxDifference = numMoons / 2

export default function Home() {
  return (
    <main>
      <header className="cursor-default p-4">
        <a className="text-sm" href="https://moonphase-nu.vercel.app">
          {'moonphase-nu.vercel.app'.split('').map((letter, index) => (
            <span
              className="delay-200 duration-1000 hover:delay-0 hover:duration-0 hover:opacity-100 opacity-30 relative transition-opacity z-10"
              key={index}
            >
              {letter}
            </span>
          ))}
        </a>
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
