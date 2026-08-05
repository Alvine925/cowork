'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Founder, TechFlow Kenya",
    quote: "PresenceHQ allowed us to register our company with a prime Westlands address. The mail handling and reception services make us look like a massive enterprise to our clients.",
    initial: "S"
  },
  {
    name: "James K.",
    role: "Managing Partner, K&A Law",
    quote: "As a boutique law firm, credibility is everything. Using PresenceHQ's meeting rooms for client consultations has been a game-changer. Impeccable service.",
    initial: "J"
  },
  {
    name: "Amina Hassan",
    role: "Freelance Consultant",
    quote: "I used to meet clients in coffee shops. Now I book a premium meeting room at PresenceHQ. My close rate has doubled because I present a much more professional image.",
    initial: "A"
  },
  {
    name: "David O.",
    role: "Director, Global Logistics Hub",
    quote: "Expanding into Mombasa was seamless. We didn't need to sign a lease or hire admin staff. PresenceHQ provided the instant infrastructure we needed to start operating.",
    initial: "D"
  }
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1))
  const prev = () => setActiveIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1))

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          eyebrow="Testimonials"
          title="What Our Clients Say"
          className="mb-16"
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Large Quote Icon */}
          <div className="absolute -top-10 -left-10 text-gray-100 z-0">
            <Quote className="w-32 h-32 rotate-180" />
          </div>

          <div className="relative z-10 bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-xl md:text-2xl lg:text-3xl text-navy font-medium leading-relaxed italic">
                "{TESTIMONIALS[activeIndex].quote}"
              </p>

              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center text-xl font-bold">
                  {TESTIMONIALS[activeIndex].initial}
                </div>
                <div>
                  <h4 className="font-bold text-navy">{TESTIMONIALS[activeIndex].name}</h4>
                  <p className="text-sm text-dark-gray/60">{TESTIMONIALS[activeIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === activeIndex ? 'bg-navy' : 'bg-gray-200 hover:bg-gray-300'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
