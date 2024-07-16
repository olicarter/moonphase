import styles from './stars.module.css'

const duration = 3000
const starsCount = 100

export default function Stars() {
  return (
    <div className={styles.stars}>
      {Array.from({ length: starsCount }).map((_, i) => (
        <div
          key={i}
          className={styles.star}
          style={{
            animationDelay: `${(duration / starsCount) * i}ms`,
            animationDuration: `${duration}ms`,
            left: `${Math.random() * 100}%`,
            scale: Math.random(),
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
