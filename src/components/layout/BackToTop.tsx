import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-md border border-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
