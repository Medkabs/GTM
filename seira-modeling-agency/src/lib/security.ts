// Security utilities and configurations

import { SecurityConfig } from "@/types";

/**
 * Security configuration for the application
 */
export const securityConfig: SecurityConfig = {
  enableCSP: true,
  enableXSS: true,
  enableClickjacking: true,
};

/**
 * Content Security Policy directives
 */
export const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // Required for Next.js
    "https://unpkg.com", // For Same runtime
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'", // Required for styled-components and CSS-in-JS
    "https://fonts.googleapis.com",
  ],
  imgSrc: [
    "'self'",
    "data:",
    "https://ext.same-assets.com",
    "https://ugc.same-assets.com",
    "https://source.unsplash.com",
    "https://images.unsplash.com",
  ],
  fontSrc: [
    "'self'",
    "https://fonts.gstatic.com",
  ],
  connectSrc: [
    "'self'",
    "https://api.same.com",
  ],
  frameSrc: ["'none'"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  frameAncestors: ["'none'"],
};

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input
    .replace(/[<>'"&]/g, (char) => {
      const entityMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
      };
      return entityMap[char] || char;
    })
    .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
    .trim()
    .slice(0, 1000); // Limit length to prevent DoS
};

/**
 * Sanitize multiline user input (e.g. textareas) while preserving
 * whitespace and newlines. This escapes dangerous characters but
 * does not trim or collapse spaces so users can type paragraphs naturally.
 */
export const sanitizeMultilineInput = (input: string, maxLength: number = 5000): string => {
  if (typeof input !== 'string') return '';

  const entityMap: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '&': '&amp;',
  };

  return input.replace(/[<>'"&]/g, (char) => entityMap[char] || char).slice(0, maxLength);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Generate secure headers for API responses
 */
export const getSecurityHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};

  if (securityConfig.enableCSP) {
    const csp = Object.entries(cspDirectives)
      .map(([directive, sources]) =>
        `${directive.replace(/([A-Z])/g, '-$1').toLowerCase()} ${sources.join(' ')}`
      )
      .join('; ');

    headers['Content-Security-Policy'] = csp;
  }

  if (securityConfig.enableXSS) {
    headers['X-XSS-Protection'] = '1; mode=block';
    headers['X-Content-Type-Options'] = 'nosniff';
  }

  if (securityConfig.enableClickjacking) {
    headers['X-Frame-Options'] = 'DENY';
    headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
  }

  // Additional security headers
  headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  headers['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()';

  return headers;
};

/**
 * Rate limiting utility
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

/**
 * CSRF token generation and validation
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for server-side or unsupported browsers
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Secure random string generator
 */
export const generateSecureId = (length: number = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    // Fallback for server-side
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return result;
};

/**
 * Validate and sanitize form data
 */
export const validateFormData = (data: Record<string, string> | Record<string, unknown>): Record<string, string> => {
  const sanitized: Record<string, string> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    }
  }

  return sanitized;
};

/**
 * Check if URL is safe for external linking
 */
export const isSafeUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    const allowedDomains = [
      'same.com',
      'instagram.com',
      'www.instagram.com',
      'twitter.com',
      'x.com',
      'linkedin.com',
      'www.linkedin.com'
    ];

    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      return false;
    }

    if (parsedUrl.protocol === 'javascript:' || parsedUrl.protocol === 'data:') {
      return false;
    }

    if (parsedUrl.hostname && !allowedDomains.some(domain =>
      parsedUrl.hostname === domain || parsedUrl.hostname.endsWith('.' + domain)
    )) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Log security events
 */
export const logSecurityEvent = (event: string, details: Record<string, unknown> = {}): void => {
  if (typeof window !== 'undefined') {
    console.warn(`[SECURITY] ${event}:`, details);
  }

  // In production, send to security monitoring service
  // Example: sendToSecurityService(event, details);
};
