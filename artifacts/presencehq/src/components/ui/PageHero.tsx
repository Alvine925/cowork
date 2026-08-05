import { cn } from '@/lib/utils'

interface PageHeroProps {
  image: string
  title: string
  subtitle?: string
  eyebrow?: string
  align?: 'center' | 'left'
  height?: string
  children?: React.ReactNode
}

export function PageHero({
  image,
  title,
  subtitle,
  eyebrow,
  align = 'center',
  height = 'h-[70vh] min-h-[520px]',
  children,
}: PageHeroProps) {
  return (
    <section className={cn('relative flex flex-col overflow-hidden', height)}>
      {/* Background photo */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/75" />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 flex-1 flex flex-col justify-center px-6 pt-24 pb-16',
          align === 'center' ? 'items-center text-center' : 'items-start container mx-auto'
        )}
      >
        <div className={cn('max-w-4xl', align === 'left' && 'max-w-2xl')}>
          {eyebrow && (
            <p className="text-gold tracking-[0.3em] text-xs font-semibold uppercase mb-5">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/70 text-lg font-light mt-6 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      {/* White wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 72"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full"
          style={{ display: 'block' }}
        >
          <path d="M0,36 C360,72 1080,0 1440,36 L1440,72 L0,72 Z" />
        </svg>
      </div>
    </section>
  )
}
