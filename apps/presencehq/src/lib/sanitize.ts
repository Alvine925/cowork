/**
 * Security & Input Validation utilities
 * Protects against prompt injection, XSS, brute-force, and malicious payloads
 */

// ── Prompt injection patterns to reject ──────────────────────────────────────
const INJECTION_PATTERNS: RegExp[] = [
  // Classic LLM jailbreak phrases
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?|context)/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /act\s+as\s+(a|an)\s+/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /forget\s+(everything|all)\s+(you\s+)?(know|were\s+told)/i,
  /disregard\s+(your\s+)?(previous|prior|earlier)\s+/i,
  /new\s+(persona|role|identity|instructions?)/i,
  // Role/system manipulation
  /\bSYSTEM\s*:/i,
  /\bUSER\s*:/i,
  /\bASSISTANT\s*:/i,
  /\bINSTRUCTION\s*:/i,
  /\b(begin|start)\s+new\s+(session|conversation|context)/i,
  // Code injection
  /<script[\s>]/i,
  /javascript\s*:/i,
  /\beval\s*\(/i,
  /\bexec\s*\(/i,
  /\bimport\s*\(/i,
  // Template / prompt delimiters
  /\{\{.*?\}\}/,            // Handlebars / Jinja templates
  /\[INST\]|\[\/INST\]/i,   // Llama instruction tokens
  /<\|im_start\|>|<\|im_end\|>/i, // ChatML tokens
  // SQL injection starters in text fields
  /'\s*(OR|AND)\s+'?\d/i,
  /--\s*$/m,
  /;\s*DROP\s+TABLE/i,
  // Double newlines (common prompt delimiter bypass)
  /\n\n\n/,
];

/**
 * Returns true if the input contains prompt injection or adversarial patterns.
 */
export function detectPromptInjection(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  return INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

export function sanitizeInput(input: string, maxLength = 255): string {
  if (!input || typeof input !== 'string') return '';

  return (
    input
      .trim()
      // Remove null bytes
      .replace(/\0/g, '')
      // Strip potentially dangerous HTML/script tags
      .replace(/<[^>]*>?/gm, '')
      // Remove LLM instruction-delimiter characters
      .replace(/[`\u200B\u200C\u200D\uFEFF]/g, '') // zero-width chars + backticks
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

  // Reject injection patterns even in email fields
  if (detectPromptInjection(sanitized)) {
    return { valid: false, error: 'Invalid input detected' };
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
  // Reject blatant injection payloads in passwords
  if (detectPromptInjection(password)) {
    return { valid: false, error: 'Password contains invalid characters' };
  }
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; error?: string; cleanName: string } {
  const cleaned = sanitizeInput(name, 80);
  if (!cleaned || cleaned.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters', cleanName: '' };
  }

  if (detectPromptInjection(cleaned)) {
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
