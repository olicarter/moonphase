'use client'

import { Moon as LunarPhaseMoon } from 'lunarphase-js'
import { cn } from '@/app/utils'
import styles from './moon.module.css'

export default function Moon() {
  const lunarAgePercent = LunarPhaseMoon.lunarAgePercent(new Date())
  const phase = (lunarAgePercent * 360 + 180) % 360

  return (
    <div className={styles.moon}>
      <div />
      <div
        className={cn(
          'bg-gradient-to-r from-50% to-50%',
          phase < 90 && 'from-yellow-50 to-yellow-50',
          phase >= 90 && phase < 180 && 'from-neutral-900 to-neutral-900',
          phase >= 180 && phase < 270 && 'from-neutral-900 to-neutral-900',
          phase >= 270 && 'from-yellow-50 to-transparent',
        )}
        style={{ transform: `rotateY(${phase}deg)` }}
      />
      <div
        className={cn(
          'bg-gradient-to-r from-50% to-50%',
          phase < 90 && 'from-yellow-50 to-neutral-900',
          phase >= 90 && phase < 180 && 'from-yellow-50 to-neutral-900',
          phase >= 180 && phase < 270 && 'from-neutral-900 to-yellow-50',
          phase >= 270 && 'from-neutral-900 to-yellow-50',
        )}
      />
    </div>
  )
}
