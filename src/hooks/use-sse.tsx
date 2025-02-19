import { useState, useRef, useCallback } from "react";

/**
 * The possible statuses of our SSE flow
 */
export type SSEStatus = "idle" | "executing" | "success" | "error";

export interface SSEOptions<TOutput = { success: boolean; message: string }> {
  onExecute?: () => void;
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onMessage?: (message: string, progress: number) => void;
}

/**
 * If T is never, signature is () => void; otherwise (params: T) => void
 */
type StartSSEFunction<T> = [T] extends [never]
  ? () => void
  : (params: T) => void;

/**
 * If T is never, signature is () => Promise<TOutput>; otherwise (params: T) => Promise<TOutput>
 */
type StartSSEAsyncFunction<TParams, TOutput> = [TParams] extends [never]
  ? () => Promise<TOutput>
  : (params: TParams) => Promise<TOutput>;

export interface UseSSEReturn<TParams, TOutput> {
  status: SSEStatus;
  messages: string[];
  startSSE: StartSSEFunction<TParams>;
  startSSEAsync: StartSSEAsyncFunction<TParams, TOutput>;
  stopSSE: () => void;
}

/**
 * Utility function to build a URL with query parameters.
 */
function buildURLWithParams<TParams extends Record<string, any>>(
  baseUrl: string,
  params: TParams,
): string {
  // If no params, just return the base
  if (!params || Object.keys(params).length === 0) return baseUrl;

  const url = new URL(
    baseUrl,
    typeof window !== "undefined" ? window.location.origin : "http://localhost",
  );
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      url.searchParams.append(key, String(val));
    }
  });
  return url.toString();
}

/**
 * A custom hook for handling Server-Sent Events (SSE) with typed parameters.
 *
 * @param endpoint The base URL or endpoint for the SSE
 * @param options Optional callbacks: onExecute, onSuccess, onError, onMessage
 * @returns status, messages, startSSE, startSSEAsync, stopSSE
 */
export function useSSE<
  TParams = unknown,
  TOutput = { success: boolean; message: string },
>(
  endpoint: string,
  options?: SSEOptions<TOutput>,
): UseSSEReturn<TParams, TOutput> {
  const [status, setStatus] = useState<SSEStatus>("idle");
  const [messages, setMessages] = useState<string[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  /**
   * Stop / close the current SSE connection if it exists
   */
  const stopSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  /**
   * Internal method to start SSE
   */
  const startSSEInternal = useCallback(
    (params: TParams | undefined, isAsync: boolean) => {
      // Clean up any existing connection
      stopSSE();

      // Reset or set initial state
      setMessages([]);
      setStatus("idle");
      options?.onExecute?.();

      // Build final URL with query parameters (if any)
      const fullUrl = params ? buildURLWithParams(endpoint, params) : endpoint;

      // Create EventSource
      const es = new EventSource(fullUrl);
      eventSourceRef.current = es;

      es.onopen = () => {
        setStatus("executing");
      };

      es.onmessage = (event) => {
        const data = event.data;

        if (data?.startsWith("Done:")) {
          try {
            const parsedData = JSON.parse(data.slice(6)) as TOutput;
            setStatus("success");
            options?.onSuccess?.(parsedData);
            es.close();
            eventSourceRef.current = null;
            return;
          } catch (error) {
            /* ignore */
            console.error("Error parsing data", error);
            setStatus("success");
            options?.onSuccess?.(undefined as TOutput);
            es.close();
            eventSourceRef.current = null;
            return;
          }
        }

        // If there's any error signaled in the data
        if (data?.startsWith("Error:")) {
          setStatus("error");
          options?.onError?.(data);
          es.close();
          eventSourceRef.current = null;
          return;
        }

        // Normal stream data
        try {
          const parsedMessage = JSON.parse(data) as {
            message: string;
            progress: number;
          };
          setMessages((prev) => [...prev, parsedMessage.message]);
          options?.onMessage?.(parsedMessage.message, parsedMessage.progress);
        } catch (e) {
          setMessages((prev) => [...prev, data]);
          options?.onMessage?.(data, 0);
        }
      };

      return es;
    },
    [endpoint, options, stopSSE],
  );

  /**
   * Synchronous method: start SSE and return immediately
   * If TParams=never => 0 args. If TParams != never => 1 arg: TParams
   */
  const startSSE: StartSSEFunction<TParams> = useCallback(
    (params?: any) => {
      startSSEInternal(params, false);
    },
    [startSSEInternal],
  ) as StartSSEFunction<TParams>;

  /**
   * Asynchronous method: returns a promise that resolves or rejects.
   * If TParams=never => 0 args. If TParams != never => 1 arg: TParams
   */
  const startSSEAsync: StartSSEAsyncFunction<TParams, TOutput> = useCallback(
    (params?: any) => {
      return new Promise<TOutput>((resolve, reject) => {
        const es = startSSEInternal(params, true);

        if (!es) {
          reject(new Error("Failed to create an EventSource."));
          return;
        }

        es.onmessage = (event) => {
          const data = event.data;

          // The server signals completion via "end"
          if (data?.startsWith("Done:")) {
            try {
              const parsedData = JSON.parse(data.slice(6)) as TOutput;
              setStatus("success");
              options?.onSuccess?.(parsedData);
              es.close();
              eventSourceRef.current = null;
              resolve(parsedData);
            } catch (error) {
              /* ignore */
              console.error("Error parsing data", error);
              setStatus("success");
              options?.onSuccess?.(undefined as TOutput);
              es.close();
              eventSourceRef.current = null;
              return;
            }
          }

          // If there's any error signaled in the data
          if (data?.startsWith("Error:")) {
            setStatus("error");
            options?.onError?.(data);
            es.close();
            eventSourceRef.current = null;
            reject(new Error(data));
            return;
          }

          // Normal stream data
          try {
            const parsedMessage = JSON.parse(data) as {
              message: string;
              progress: number;
            };
            setMessages((prev) => [...prev, parsedMessage.message]);
            options?.onMessage?.(parsedMessage.message, parsedMessage.progress);
          } catch (e) {
            setMessages((prev) => [...prev, data]);
            options?.onMessage?.(data, 0);
          }
        };

        es.onerror = (error) => {
          setStatus("error");
          options?.onError?.(JSON.stringify(error));
          es.close();
          eventSourceRef.current = null;
          reject(error);
        };
      });
    },
    [options, startSSEInternal],
  ) as StartSSEAsyncFunction<TParams, TOutput>;

  return {
    status,
    messages,
    startSSE,
    startSSEAsync,
    stopSSE,
  };
}
