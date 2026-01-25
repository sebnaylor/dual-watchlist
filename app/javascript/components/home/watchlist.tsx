import React from "react";
import { watchlistTypes } from "./types";
import MediaSection from "../shared/MediaSection";

export interface WatchlistProps {
  watchlistItems: watchlistTypes;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlistItems }) => {
  const allItems = watchlistItems.tv.concat(watchlistItems.movies);
  const hasWatchedItem = allItems.some((item) => item.watched);

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-theme-primary">
          Your Watchlist
        </h2>
      </div>
      <MediaSection title="Movies" items={watchlistItems.movies} />
      <MediaSection title="TV Shows" items={watchlistItems.tv} />
      {hasWatchedItem && (
        <MediaSection title="Recently Watched" items={allItems} showWatched />
      )}
    </div>
  );
};

export default Watchlist;
