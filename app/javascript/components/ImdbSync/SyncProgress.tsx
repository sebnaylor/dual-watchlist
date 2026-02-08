import React from "react";
import { CheckCircle, XCircle, SkipForward, Loader2 } from "lucide-react";
import { ImdbSyncProgress } from "../../types";

interface SyncProgressProps {
  progress: ImdbSyncProgress | null;
  isProcessing: boolean;
}

const SyncProgress: React.FC<SyncProgressProps> = ({
  progress,
  isProcessing,
}) => {
  if (!progress && !isProcessing) return null;

  const percentage = progress?.percentage ?? 0;
  const processed = progress?.processed ?? 0;
  const total = progress?.total ?? 0;
  const successful = progress?.successful ?? 0;
  const skipped = progress?.skipped ?? 0;
  const failed = progress?.failed ?? 0;

  return (
    <div className="bg-brand-purple rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Sync Progress</h3>
        {isProcessing && (
          <Loader2 className="w-5 h-5 text-brand-accent animate-spin" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-brand-muted">
          <span>
            {processed} / {total} items
          </span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-brand-dark rounded-full h-3 overflow-hidden">
          <div
            className="bg-brand-accent h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <div className="text-white font-medium">{successful}</div>
            <div className="text-xs text-brand-muted">Added</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SkipForward className="w-5 h-5 text-yellow-500" />
          <div>
            <div className="text-white font-medium">{skipped}</div>
            <div className="text-xs text-brand-muted">Skipped</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" />
          <div>
            <div className="text-white font-medium">{failed}</div>
            <div className="text-xs text-brand-muted">Failed</div>
          </div>
        </div>
      </div>

      {progress?.error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-red-400 text-sm">{progress.error}</p>
        </div>
      )}
    </div>
  );
};

export default SyncProgress;
