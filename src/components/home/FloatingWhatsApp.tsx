'use client';

import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const phone = '254700000000';
  const text = encodeURIComponent('Hello Paper Street, I would like to inquire about your virtual office and workspace services.');

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
    </a>
  );
}
