export interface ImdbSync {
  id: number;
  imdbUserId: string | null;
  status: "pending" | "processing" | "completed" | "failed";
  totalItems: number;
  processedItems: number;
  successfulItems: number;
  skippedItems: number;
  failedItems: number;
  progressPercentage: number;
  results?: ImdbSyncResultItem[];
  errors?: ImdbSyncError[];
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

export interface ImdbSyncResultItem {
  imdbId: string;
  title: string;
  posterPath?: string;
  status: "success" | "skipped_items" | "failed_items";
  error?: string;
  mediaId?: number;
  mediaType?: "Movie" | "Tv";
}

export interface ImdbSyncError {
  message: string;
  timestamp: string;
}

export interface ImdbSyncProgress {
  type: "progress" | "complete" | "error";
  syncId: number;
  processed?: number;
  total?: number;
  successful?: number;
  skipped?: number;
  failed?: number;
  percentage?: number;
  error?: string;
}

export interface ImdbSyncIndexProps {
  syncs: ImdbSync[];
  savedImdbUserId: string | null;
}

export interface ImdbSyncShowProps {
  sync: ImdbSync;
}
