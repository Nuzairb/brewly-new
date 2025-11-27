// API Endpoints
export const API_ENDPOINTS = {
  BUNDLES: '/api/bundles',
  ORDERS: '/api/orders',
  USERS: '/api/users',
  AUTH: '/api/auth',
  WEATHER: '/api/weather',
  EVENTS: '/api/events',
  PERFORMANCE: '/api/performance',
} as const;

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Brewly',
  API_TIMEOUT: 30000,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Status colors
export const STATUS_COLORS = {
  pending: 'bg-yellow-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500',
  active: 'bg-blue-500',
} as const;
