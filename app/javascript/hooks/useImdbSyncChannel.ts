import { useEffect, useRef, useCallback } from "react";
import { createConsumer, Subscription } from "@rails/actioncable";
import { ImdbSyncProgress } from "../types";

const consumer = createConsumer();

interface UseImdbSyncChannelOptions {
  onProgress?: (data: ImdbSyncProgress) => void;
  onComplete?: (data: ImdbSyncProgress) => void;
  onError?: (data: ImdbSyncProgress) => void;
}

export function useImdbSyncChannel({
  onProgress,
  onComplete,
  onError,
}: UseImdbSyncChannelOptions) {
  const subscriptionRef = useRef<Subscription | null>(null);

  const subscribe = useCallback(() => {
    if (subscriptionRef.current) return;

    subscriptionRef.current = consumer.subscriptions.create(
      { channel: "ImdbSyncChannel" },
      {
        received(data: ImdbSyncProgress) {
          switch (data.type) {
            case "progress":
              onProgress?.(data);
              break;
            case "complete":
              onComplete?.(data);
              break;
            case "error":
              onError?.(data);
              break;
          }
        },
      }
    );
  }, [onProgress, onComplete, onError]);

  const unsubscribe = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }
  }, []);

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, [subscribe, unsubscribe]);

  return { subscribe, unsubscribe };
}
