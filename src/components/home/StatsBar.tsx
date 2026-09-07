import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, isInView])

  return <span ref={ref}>{count}{suffix}</span>
}

const STATS = [
  { num: 500, suffix: '+', label: 'Businesses' },
  { num: 5, suffix: '', label: 'Cities' },
  { num: 10, suffix: '+', label: 'Services' },
  { num: 98, suffix: '%', label: 'Satisfaction' },
]

export function StatsBar() {
  return (
    <section className="relative w-full h-[400px] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
          alt="Modern architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center flex-1 w-full text-center ${
                i !== STATS.length - 1 ? 'md:border-r md:border-white/20' : ''
              }`}
            >
              <div className="text-white text-4xl md:text-5xl font-bold font-heading mb-2">
                <Counter end={stat.num} suffix={stat.suffix} />
              </div>
              <div className="text-white/60 text-xs tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
