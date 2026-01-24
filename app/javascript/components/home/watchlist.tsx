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
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-semibold">Watchlist</h2>
      </div>
      <MediaSection title="Movies" items={watchlistItems.movies} />
      <MediaSection title="TV" items={watchlistItems.tv} />
      {hasWatchedItem && (
        <MediaSection title="Recently Watched" items={allItems} showWatched />
      )}
    </div>
  );
};

export default Watchlist;
