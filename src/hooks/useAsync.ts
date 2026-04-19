import { useState, useCallback, useRef } from 'react';

type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

interface UseAsyncReturn<T> {
  data: T | null;
  status: AsyncStatus;
  error: string | null;
  execute: (...args: unknown[]) => Promise<T | undefined>;
  reset: () => void;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const useAsync = <T,>(
  asyncFunction: (...args: unknown[]) => Promise<T>,
  immediate = false
): UseAsyncReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<AsyncStatus>(immediate ? 'pending' : 'idle');
  const [error, setError] = useState<string | null>(null);
  const pendingPromiseRef = useRef<Promise<T> | null>(null);

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | undefined> => {
      setStatus('pending');
      setError(null);

      const promise = asyncFunction(...args);
      pendingPromiseRef.current = promise;

      try {
        const result = await promise;

        // Only update state if this is still the latest promise
        if (pendingPromiseRef.current === promise) {
          setData(result);
          setStatus('success');
          return result;
        }
      } catch (err) {
        // Only update state if this is still the latest promise
        if (pendingPromiseRef.current === promise) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
          setStatus('error');
        }
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setStatus('idle');
    setError(null);
    pendingPromiseRef.current = null;
  }, []);

  // Execute immediately if requested
  if (immediate && status === 'idle') {
    // eslint-disable-next-line react-hooks/refs
    execute();
  }

  return {
    data,
    status,
    error,
    execute,
    reset,
    isIdle: status === 'idle',
    isPending: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};