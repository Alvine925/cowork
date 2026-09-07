/**
 * Security & Input Validation utilities
 * Protects against prompt injection, XSS, and malicious payloads
 */

export function sanitizeInput(input: string, maxLength = 255): string {
  if (!input || typeof input !== 'string') return '';

  return (
    input
      .trim()
      // Remove null bytes
      .replace(/\0/g, '')
      // Strip potentially dangerous HTML/script tags
      .replace(/<[^>]*>?/gm, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      // Slice to maximum length
      .slice(0, maxLength)
  );
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const sanitized = sanitizeInput(email, 120).toLowerCase();
  if (!sanitized) {
    return { valid: false, error: 'Email address is required' };
  }
  
  // Standard RFC 5322 compliant regex for emails
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(sanitized)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  if (password.length > 100) {
    return { valid: false, error: 'Password exceeds maximum length' };
  }
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; error?: string; cleanName: string } {
  const cleaned = sanitizeInput(name, 80);
  if (!cleaned || cleaned.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters', cleanName: '' };
  }
  
  // Check for suspicious injection patterns
  const suspicious = /(system:|instruction:|ignore previous|<script|javascript:|eval\()/i;
  if (suspicious.test(cleaned)) {
    return { valid: false, error: 'Invalid characters in name', cleanName: '' };
  }

  return { valid: true, cleanName: cleaned };
}

export function validatePhone(phone: string): { valid: boolean; error?: string; cleanPhone: string } {
  const cleaned = sanitizeInput(phone, 30);
  if (!cleaned) return { valid: true, cleanPhone: '' };
  
  const phoneRegex = /^[+0-9\s-()]{7,25}$/;
  if (!phoneRegex.test(cleaned)) {
    return { valid: false, error: 'Please enter a valid telephone number', cleanPhone: '' };
  }

  return { valid: true, cleanPhone: cleaned };
}
