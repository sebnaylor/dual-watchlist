import React from "react";
import { watchlistTypes } from "../../pages/home/types";

export interface WatchlistProps {
  watchlistItems: watchlistTypes;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlistItems }) => {
  const hasWatchedanItem = watchlistItems["tv"]
    .concat(watchlistItems["movies"])
    .some((item) => item.watched);

  const styles = {
    hideScrollbar: {
      overflowX: "scroll",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
    hideScrollbarWebkit: {
      display: "none",
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-semibold">Watchlist</h2>
      </div>
      <h3 className="text-white text-lg font-medium">Movies</h3>
      <div
        className="flex flex-no-wrap gap-x-2 py-2 scrolling-touch items-start"
        style={styles.hideScrollbar as React.CSSProperties}
      >
        {watchlistItems["movies"].map(
          (item) =>
            !item.watched && (
              <div
                className="flex-none rounded-lg w-28 relative"
                key={item.mediaItemId}
              >
                <a
                  href={`/media/${item.mediaTmdbId}?media_type=${item.mediaType}`}
                >
                  <img src={item.posterImg} alt={item.title} />
                </a>
              </div>
            )
        )}
      </div>
      <h3 className="text-white text-lg font-medium">TV</h3>
      <div
        className="flex flex-no-wrap gap-x-2 py-2 scrolling-touch items-start"
        style={styles.hideScrollbar as React.CSSProperties}
      >
        {watchlistItems["tv"].map(
          (item) =>
            !item.watched && (
              <div
                className="flex-none rounded-lg w-28 relative"
                key={item.mediaItemId}
              >
                <a
                  href={`/media/${item.mediaTmdbId}?media_type=${item.mediaType}`}
                >
                  <img src={item.posterImg} alt={item.title} />
                </a>
              </div>
            )
        )}
      </div>

      {hasWatchedanItem && (
        <>
          <h3 className="text-white text-lg font-medium">Recently Watched</h3>
          <div
            className="flex flex-no-wrap gap-x-2 py-2 scrolling-touch items-start"
            style={styles.hideScrollbar as React.CSSProperties}
          >
            {watchlistItems["tv"].concat(watchlistItems["movies"]).map(
              (item) =>
                item.watched && (
                  <div
                    className="flex-none rounded-lg w-28"
                    key={item.mediaItemId}
                  >
                    <a
                      href={`/media/${item.mediaTmdbId}?media_type=${item.mediaType}`}
                    >
                      <img src={item.posterImg} alt={item.title} />
                    </a>
                  </div>
                )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
