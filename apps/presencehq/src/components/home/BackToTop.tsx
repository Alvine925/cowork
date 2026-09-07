'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center border border-navy/20 bg-white/90 backdrop-blur-xs text-navy shadow-md transition-all hover:bg-navy hover:text-white"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
