// Global type definitions for Seira Modeling Agency

export interface Model {
  id: string;
  name: string;
  location?: string;
  image: string;
  categories: ModelCategory[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  rating?: number;
}

export interface ContactForm {
  name: string;
  email: string;
  package: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export type ModelCategory = 'Travel' | 'Fashion' | 'Beauty' | 'Executive Business';

export type ThemeMode = 'light' | 'dark';

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Security types
export interface SecurityConfig {
  enableCSP: boolean;
  enableXSS: boolean;
  enableClickjacking: boolean;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}
