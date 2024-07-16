import dynamic from 'next/dynamic'
import Stars from '@/components/stars'

const Moon = dynamic(() => import('@/components/moon'), { ssr: false })

export default function Home() {
  return (
    <main>
      <Stars />
      <div className="inset-0 fixed flex items-center justify-center">
        <div className="aspect-square shrink-0 w-[66vmin]">
          <Moon />
        </div>
      </div>
    </main>
  )
}
