import React, { ReactNode, createElement } from "react";
import { ImdbSyncShowProps, ImdbSyncResultItem } from "../../types";
import {
  CheckCircle,
  XCircle,
  SkipForward,
  ArrowLeft,
  Film,
  Tv,
} from "lucide-react";
import { router } from "@inertiajs/react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { NavProps } from "../../components/shared/Nav";

interface PageProps extends ImdbSyncShowProps {
  nav: NavProps;
}

interface PageComponent extends React.FC<PageProps> {
  layout?: (page: ReactNode) => React.ReactElement;
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    label: "Added",
  },
  skipped_items: {
    icon: SkipForward,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "Skipped",
  },
  failed_items: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    label: "Failed",
  },
};

const ImdbSyncShow: PageComponent = ({ sync }) => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBack = () => {
    router.visit("/watchlist/imdb-sync");
  };

  const results = (sync.results || []) as unknown as ImdbSyncResultItem[];

  const groupedResults = {
    success: results.filter((r) => r.status === "success"),
    skipped: results.filter((r) => r.status === "skipped_items"),
    failed: results.filter((r) => r.status === "failed_items"),
  };

  return (
    <div className="page-container section-spacing">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to IMDB Sync
        </button>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Sync Results
          </h1>
          <p className="text-brand-muted">
            {sync.imdbUserId} • {formatDate(sync.completedAt || sync.startedAt)}
          </p>
        </div>

        <div className="bg-brand-purple rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-white">
                {sync.totalItems}
              </div>
              <div className="text-sm text-brand-muted">Total Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {sync.successfulItems}
              </div>
              <div className="text-sm text-brand-muted">Added</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">
                {sync.skippedItems}
              </div>
              <div className="text-sm text-brand-muted">Already in Watchlist</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">
                {sync.failedItems}
              </div>
              <div className="text-sm text-brand-muted">Failed</div>
            </div>
          </div>
        </div>

        {groupedResults.success.length > 0 && (
          <ResultSection
            title="Added to Watchlist"
            items={groupedResults.success}
            status="success"
          />
        )}

        {groupedResults.skipped.length > 0 && (
          <ResultSection
            title="Already in Watchlist"
            items={groupedResults.skipped}
            status="skipped_items"
          />
        )}

        {groupedResults.failed.length > 0 && (
          <ResultSection
            title="Failed to Import"
            items={groupedResults.failed}
            status="failed_items"
          />
        )}

        {sync.errors && sync.errors.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Errors</h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 space-y-2">
              {sync.errors.map((err, index) => (
                <div key={index} className="text-red-400">
                  {err.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ResultSectionProps {
  title: string;
  items: ImdbSyncResultItem[];
  status: keyof typeof statusConfig;
}

const ResultSection: React.FC<ResultSectionProps> = ({ title, items, status }) => {
  const config = statusConfig[status];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <config.icon className={`w-5 h-5 ${config.color}`} />
        <h2 className="text-xl font-semibold text-white">
          {title} ({items.length})
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <ResultCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

interface ResultCardProps {
  item: ImdbSyncResultItem;
}

const ResultCard: React.FC<ResultCardProps> = ({ item }) => {
  const MediaIcon = item.mediaType === "Tv" ? Tv : Film;
  const config = statusConfig[item.status as keyof typeof statusConfig];

  return (
    <div className="bg-brand-purple rounded-lg overflow-hidden">
      <div className="aspect-[2/3] relative bg-brand-dark">
        {item.posterPath ? (
          <img
            src={item.posterPath}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MediaIcon className="w-12 h-12 text-brand-muted/30" />
          </div>
        )}
        <div
          className={`absolute top-2 right-2 p-1.5 rounded-full ${config.bgColor}`}
        >
          <config.icon className={`w-4 h-4 ${config.color}`} />
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-white truncate" title={item.title}>
          {item.title}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <MediaIcon className="w-3 h-3 text-brand-muted" />
          <span className="text-xs text-brand-muted">
            {item.mediaType === "Tv" ? "TV Show" : "Movie"}
          </span>
        </div>
        {item.error && (
          <p className="text-xs text-red-400 mt-1 truncate" title={item.error}>
            {item.error}
          </p>
        )}
      </div>
    </div>
  );
};

ImdbSyncShow.layout = (page: ReactNode) => {
  const props = (page as React.ReactElement).props as PageProps;
  return createElement(DefaultLayout, { nav: props.nav, children: page }, page);
};

export default ImdbSyncShow;
