import React from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { ImdbSync } from "../../types";
import { router } from "@inertiajs/react";

interface SyncHistoryProps {
  syncs: ImdbSync[];
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "Pending",
  },
  processing: {
    icon: Loader2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    label: "Processing",
    animate: true,
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    label: "Completed",
  },
  failed: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    label: "Failed",
  },
};

const SyncHistory: React.FC<SyncHistoryProps> = ({ syncs }) => {
  if (syncs.length === 0) {
    return (
      <div className="text-center py-8 text-brand-muted">
        <p>No previous syncs</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClick = (syncId: number) => {
    router.visit(`/watchlist/imdb-sync/${syncId}`);
  };

  return (
    <div className="space-y-3">
      {syncs.map((sync) => {
        const config = statusConfig[sync.status];
        const StatusIcon = config.icon;

        return (
          <div
            key={sync.id}
            onClick={() => handleClick(sync.id)}
            className="bg-brand-purple rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-brand-purple/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${config.bgColor}`}>
                <StatusIcon
                  className={`w-5 h-5 ${config.color} ${
                    config.animate ? "animate-spin" : ""
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${config.color}`}>
                    {config.label}
                  </span>
                  <span className="text-brand-muted text-sm">
                    {formatDate(sync.createdAt)}
                  </span>
                </div>

                <div className="text-white text-sm mt-1">
                  {sync.successfulItems} added, {sync.skippedItems} skipped
                  {sync.failedItems > 0 && `, ${sync.failedItems} failed`}
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-brand-muted" />
          </div>
        );
      })}
    </div>
  );
};

export default SyncHistory;
