// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Bundle Types (from your dashboard)
export interface Bundle {
  id: string;
  name: string;
  description?: string;
  items: BundleItem[];
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BundleItem {
  id: string;
  name: string;
  image?: string;
  quantity?: number;
}

// Order Types
export interface Order {
  id: string;
  bundleId: string;
  userId: string;
  total: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'completed' | 'cancelled';

// Performance Types
export interface PerformanceMetrics {
  activeOrders: number;
  revenue: number;
  averageOrderValue: number;
  slowMovingItems: number;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
}

// Weather Types (for your dashboard)
export interface Weather {
  location: string;
  temperature: number;
  condition: string;
  icon?: string;
  date: string;
}
