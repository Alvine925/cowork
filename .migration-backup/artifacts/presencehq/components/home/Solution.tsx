import Image from 'next/image'

export function Solution() {
  return (
    <section className="bg-white py-0">
      <div className="relative w-full h-[300px] md:h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
          alt="Premium office interior with professional design"
          fill
          className="object-cover object-center"
        />
      </div>
      
      <div className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-6">
          The Solution
        </span>
        <h2 className="text-4xl md:text-5xl font-light font-[family-name:var(--font-heading)] text-gray-900 mb-4">
          One address. Total professional credibility.
        </h2>
        <p className="text-gray-500 text-base font-light max-w-2xl leading-relaxed">
          We provide the infrastructure of a premium corporate office without the overhead. Get a prestigious business address, expert mail handling, and access to state-of-the-art meeting rooms exactly when you need them. Present an established image from day one.
        </p>
      </div>
    </section>
  )
}
