import React, { useState, useCallback, ReactNode, createElement } from "react";
import { ImdbSyncIndexProps, ImdbSyncProgress } from "../../types";
import { api } from "../../lib/api-client";
import { useImdbSyncChannel } from "../../hooks/useImdbSyncChannel";
import ImdbIdInput from "../../components/ImdbSync/ImdbIdInput";
import SyncProgress from "../../components/ImdbSync/SyncProgress";
import SyncHistory from "../../components/ImdbSync/SyncHistory";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { NavProps } from "../../components/shared/Nav";

interface PageProps extends ImdbSyncIndexProps {
  nav: NavProps;
}

interface PageComponent extends React.FC<PageProps> {
  layout?: (page: ReactNode) => React.ReactElement;
}

const ImdbSyncIndex: PageComponent = ({ syncs, savedImdbUserId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ImdbSyncProgress | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [syncHistory, setSyncHistory] = useState(syncs);

  const handleProgress = useCallback((data: ImdbSyncProgress) => {
    setProgress(data);
  }, []);

  const handleComplete = useCallback((data: ImdbSyncProgress) => {
    setProgress(data);
    setIsProcessing(false);
  }, []);

  const handleError = useCallback((data: ImdbSyncProgress) => {
    setProgress(data);
    setIsProcessing(false);
    setError(data.error);
  }, []);

  useImdbSyncChannel({
    onProgress: handleProgress,
    onComplete: handleComplete,
    onError: handleError,
  });

  const handleSync = useCallback(async (imdbUserId: string) => {
    setIsLoading(true);
    setError(undefined);
    setProgress(null);

    try {
      const response = await api.imdbSync.startSync(imdbUserId);
      if (response.data.success) {
        setIsProcessing(true);
        setSyncHistory((prev) => [
          {
            id: response.data.sync_id,
            imdbUserId: imdbUserId,
            status: "processing",
            totalItems: 0,
            processedItems: 0,
            successfulItems: 0,
            skippedItems: 0,
            failedItems: 0,
            progressPercentage: 0,
            startedAt: null,
            completedAt: null,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      } else {
        setError(response.data.error || "Failed to start sync");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to start sync. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="page-container section-spacing">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Sync IMDB Watchlist
          </h1>
          <p className="text-brand-muted">
            Import your public IMDB watchlist with one click.
          </p>
        </div>

        <ImdbIdInput
          onSync={handleSync}
          isLoading={isLoading}
          error={error}
          savedImdbUserId={savedImdbUserId}
        />

        <SyncProgress progress={progress} isProcessing={isProcessing} />

        {syncHistory.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Sync History</h2>
            <SyncHistory syncs={syncHistory} />
          </div>
        )}
      </div>
    </div>
  );
};

ImdbSyncIndex.layout = (page: ReactNode) => {
  const props = (page as React.ReactElement).props as PageProps;
  return createElement(DefaultLayout, { nav: props.nav, children: page }, page);
};

export default ImdbSyncIndex;
