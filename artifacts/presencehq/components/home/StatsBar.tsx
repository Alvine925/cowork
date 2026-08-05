'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatProps {
  end: number
  suffix?: string
  label: string
  duration?: number
}

function AnimatedCounter({ end, suffix = '', label, duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      
      setCount(Math.floor(easeProgress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center">
      <div className="text-4xl md:text-5xl font-bold text-gold mb-2 font-[family-name:var(--font-heading)]">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <AnimatedCounter end={500} suffix="+" label="Businesses Served" />
          <AnimatedCounter end={5} label="Prime Locations" />
          <AnimatedCounter end={10} suffix="+" label="Services Offered" />
          <AnimatedCounter end={98} suffix="%" label="Client Satisfaction" />
        </div>
      </div>
    </section>
  )
}
