import React, { useState } from "react";
import { watchlistTypes } from "./types";

export interface WatchlistProps {
  watchlistItems: watchlistTypes;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlistItems }) => {
  console.log(watchlistItems);

  return (
    <div className="px-2">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-semibold">Watchlist</h2>
      </div>
      <h3 className="text-white text-lg font-medium">Movies</h3>
      <div className="flex flex-no-wrap gap-x-2 py-2 overflow-x-scroll scrolling-touch items-start">
        {watchlistItems["movies"].map((item) => (
          <div className="flex-none rounded-lg w-28" key={item.mediaItemId}>
            <a href={`/media/${item.mediaTmdbId}?media_type=${item.mediaType}`}>
              <img src={item.posterImg} alt={item.title} />
            </a>
          </div>
        ))}
      </div>
      <h3 className="text-white text-lg font-medium">TV</h3>
      <div className="flex flex-no-wrap gap-x-2 py-2 overflow-x-scroll scrolling-touch items-start">
        {watchlistItems["tv"].map((item) => (
          <div className="flex-none rounded-lg w-28" key={item.mediaItemId}>
            <a href={`/media/${item.mediaTmdbId}?media_type=${item.mediaType}`}>
              <img src={item.posterImg} alt={item.title} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
