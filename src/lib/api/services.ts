import { apiClient } from './client';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Bundle, Order, PerformanceMetrics, Event, Weather } from '@/lib/types';
import type { PaginatedResponse } from '@/lib/types';
import type { PaginationParams, FilterParams } from '@/lib/types/api.types';

// Bundle Services
export const bundleService = {
  getAll: (params?: PaginationParams & FilterParams) =>
    apiClient.get<PaginatedResponse<Bundle>>(API_ENDPOINTS.BUNDLES, params as Record<string, string | number>),
  
  getById: (id: string) =>
    apiClient.get<Bundle>(`${API_ENDPOINTS.BUNDLES}/${id}`),
  
  create: (data: Partial<Bundle>) =>
    apiClient.post<Bundle>(API_ENDPOINTS.BUNDLES, data),
  
  update: (id: string, data: Partial<Bundle>) =>
    apiClient.put<Bundle>(`${API_ENDPOINTS.BUNDLES}/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete<void>(`${API_ENDPOINTS.BUNDLES}/${id}`),
};

// Order Services
export const orderService = {
  getAll: (params?: PaginationParams & FilterParams) =>
    apiClient.get<PaginatedResponse<Order>>(API_ENDPOINTS.ORDERS, params as Record<string, string | number>),
  
  getById: (id: string) =>
    apiClient.get<Order>(`${API_ENDPOINTS.ORDERS}/${id}`),
  
  create: (data: Partial<Order>) =>
    apiClient.post<Order>(API_ENDPOINTS.ORDERS, data),
  
  updateStatus: (id: string, status: string) =>
    apiClient.patch<Order>(`${API_ENDPOINTS.ORDERS}/${id}/status`, { status }),
};

// Performance Services
export const performanceService = {
  getMetrics: (params?: { period?: string }) =>
    apiClient.get<PerformanceMetrics>(API_ENDPOINTS.PERFORMANCE, params),
};

// Event Services
export const eventService = {
  getUpcoming: (params?: { limit?: number }) =>
    apiClient.get<Event[]>(API_ENDPOINTS.EVENTS, params),
};

// Weather Services
export const weatherService = {
  getCurrent: (location: string) =>
    apiClient.get<Weather>(API_ENDPOINTS.WEATHER, { location }),
};

// Export all services
export const api = {
  bundles: bundleService,
  orders: orderService,
  performance: performanceService,
  events: eventService,
  weather: weatherService,
};
