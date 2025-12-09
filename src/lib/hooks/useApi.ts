'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse } from '@/lib/types';
import type { ApiError } from '@/lib/types/api.types';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  initialData?: T;
}

export function useApi<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction();
      setData(response.data);
      options.onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      options.onError?.(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, options]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute,
  };
}

// Auto-fetch hook
export function useQuery<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> & { enabled?: boolean } = {}
) {
  const { enabled = true, ...restOptions } = options;
  const apiState = useApi(apiFunction, restOptions);

  useEffect(() => {
    if (enabled) {
      apiState.execute();
    }
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return apiState;
}

// Mutation hook for POST, PUT, DELETE operations
export function useMutation<TData, TVariables = void>(
  apiFunction: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options: UseApiOptions<TData> = {}
) {
  const [data, setData] = useState<TData | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction(variables);
        setData(response.data);
        options.onSuccess?.(response.data);
        return response.data;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        options.onError?.(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  return {
    mutate,
    data,
    loading,
    error,
    reset: () => {
      setData(undefined);
      setError(null);
    },
  };
}
