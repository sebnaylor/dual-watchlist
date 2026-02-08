import React, { useState, useMemo } from "react";
import { watchlistTypes, WatchlistItem, SortOption, WatchlistFilter } from "./types";
import MediaSection from "../shared/MediaSection";
import SortDropdown from "./SortDropdown";
import WatchlistFilterDropdown from "./WatchlistFilterDropdown";

export interface WatchlistProps {
  watchlistItems: watchlistTypes;
  hasSharedWatchlist: boolean;
  partnerName: string | null;
}

const sortItems = (items: WatchlistItem[], sortBy: SortOption): WatchlistItem[] => {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case "addedAt":
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      case "rating":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "releaseDate":
        if (!a.releaseDate && !b.releaseDate) return 0;
        if (!a.releaseDate) return 1;
        if (!b.releaseDate) return -1;
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
};

const dedupeItems = (items: WatchlistItem[]): WatchlistItem[] => {
  const seen = new Set<number>();
  return items.filter((item) => {
    if (seen.has(item.mediaTmdbId)) return false;
    seen.add(item.mediaTmdbId);
    return true;
  });
};

const filterItems = (items: WatchlistItem[], filter: WatchlistFilter): WatchlistItem[] => {
  if (filter === "mine") return items.filter((item) => item.addedByCurrentUser);
  if (filter === "partner") return items.filter((item) => !item.addedByCurrentUser);
  return dedupeItems(items);
};

const Watchlist: React.FC<WatchlistProps> = ({ watchlistItems, hasSharedWatchlist, partnerName }) => {
  const [sortBy, setSortBy] = useState<SortOption>("addedAt");
  const [filter, setFilter] = useState<WatchlistFilter>("all");

  const filteredMovies = useMemo(
    () => filterItems(watchlistItems.movies, filter),
    [watchlistItems.movies, filter]
  );

  const filteredTv = useMemo(
    () => filterItems(watchlistItems.tv, filter),
    [watchlistItems.tv, filter]
  );

  const sortedMovies = useMemo(
    () => sortItems(filteredMovies, sortBy),
    [filteredMovies, sortBy]
  );

  const sortedTv = useMemo(
    () => sortItems(filteredTv, sortBy),
    [filteredTv, sortBy]
  );

  const allItems = sortedTv.concat(sortedMovies);
  const hasWatchedItem = allItems.some((item) => item.watched);

  const title = hasSharedWatchlist ? "Shared Watchlist" : "Your Watchlist";

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-theme-primary">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {hasSharedWatchlist && (
            <WatchlistFilterDropdown
              value={filter}
              onChange={setFilter}
              partnerName={partnerName}
            />
          )}
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>
      <MediaSection title="Movies" items={sortedMovies} showUserAvatar={hasSharedWatchlist} />
      <MediaSection title="TV Shows" items={sortedTv} showUserAvatar={hasSharedWatchlist} />
      {hasWatchedItem && (
        <MediaSection title="Recently Watched" items={allItems} showWatched showUserAvatar={hasSharedWatchlist} />
      )}
    </div>
  );
};

export default Watchlist;
