import { useCallback } from "react";

const MAX_RETRIES = 5;

interface UseApiOptions {
  onError?: (error: Error) => void;
}

async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = MAX_RETRIES,
): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (response.status === 503 && retries > 0) {
      await new Promise((r) =>
        setTimeout(r, 2 ** (MAX_RETRIES - retries) * 500),
      );
      return fetchWithRetry(url, options, retries - 1);
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (
      retries > 0 &&
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw error; // Don't retry aborted requests
    }
    if (retries > 0 && !error) {
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

function showDefaultToast() {
  console.warn("Request to Server failed. Try refreshing website");
}

export function useApi({ onError }: UseApiOptions = {}) {
  const request = useCallback(
    async <T = unknown,>(
      url: string,
      options?: RequestInit & { parseAs?: "json" | "text" | "blob" | "raw" },
    ): Promise<T | null> => {
      try {
        const { parseAs = "json", ...fetchOptions } = options ?? {};
        const response = await fetchWithRetry(url, fetchOptions);

        if (parseAs === "raw") return response as unknown as T;
        return (await response[parseAs]()) as T;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error("API Request failed:", err);
        (onError ?? showDefaultToast)(err);
        return null;
      }
    },
    [onError],
  );

  return { request };
}
