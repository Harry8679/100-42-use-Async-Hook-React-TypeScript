import { useState, useCallback, useRef, useEffect } from 'react';

type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

interface UseAsyncReturn<T, Args extends unknown[]> {
  data: T | null;
  status: AsyncStatus;
  error: string | null;
  execute: (...args: Args) => Promise<T | undefined>;
  reset: () => void;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const useAsync = <T, Args extends unknown[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  immediate = false
): UseAsyncReturn<T, Args> => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const pendingPromiseRef = useRef<Promise<T> | null>(null);

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
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

  // Execute immediately if requested (only works for functions with no required args)
  useEffect(() => {
    if (immediate) {
      execute([] as unknown as Args);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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