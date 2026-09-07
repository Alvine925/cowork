import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  dark?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <span className={cn('text-sm font-bold uppercase tracking-wider', dark ? 'text-gold' : 'text-gold-600')}>
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance',
          dark ? 'text-white' : 'text-navy'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg md:text-xl max-w-2xl text-balance',
            dark ? 'text-white/80' : 'text-dark-gray/80'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
