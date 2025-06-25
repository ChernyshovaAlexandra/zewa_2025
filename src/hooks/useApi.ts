import { useState, useCallback } from 'react';

export interface ApiHookResult<TRequest, TResponse> {
  data: TResponse | null;
  loading: boolean;
  error: unknown;
  call: (payload: TRequest) => Promise<TResponse>;
}

export function useApi<TRequest, TResponse>(
  requestFn: (payload: TRequest) => Promise<TResponse> | Promise<{ data: TResponse }>,
): ApiHookResult<TRequest, TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const call = useCallback(
    async (payload: TRequest): Promise<TResponse> => {
      setLoading(true);
      setError(null);
      try {
        const res = await requestFn(payload);
        const result = (res as any).data ?? res;
        setData(result);
        return result as TResponse;
      } catch (err) {
        setError(err);
        throw err as Error;
      } finally {
        setLoading(false);
      }
    },
    [requestFn],
  );

  return { data, loading, error, call };
}
