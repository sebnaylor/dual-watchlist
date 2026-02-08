import React from "react";
import { Star, CheckCircle2, Circle } from "lucide-react";
import type { Episode } from "../../types/media";

interface EpisodeListProps {
  episodes: Episode[];
  loading: boolean;
  watchedEpisodes?: Record<string, number[]>;
  seasonNumber?: number;
  onToggleEpisode?: (episodeNumber: number) => void;
}

const EpisodeSkeleton: React.FC = () => (
  <div className="flex flex-col sm:flex-row gap-4 animate-pulse">
    <div className="w-full sm:w-48 aspect-video bg-theme-secondary rounded-lg shrink-0" />
    <div className="flex-1 space-y-3">
      <div className="h-5 bg-theme-secondary rounded w-3/4" />
      <div className="h-4 bg-theme-secondary rounded w-1/2" />
      <div className="h-4 bg-theme-secondary rounded w-full" />
      <div className="h-4 bg-theme-secondary rounded w-5/6" />
    </div>
  </div>
);

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  loading,
  watchedEpisodes,
  seasonNumber,
  onToggleEpisode,
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <EpisodeSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <p className="text-theme-secondary py-4">No episodes available</p>
    );
  }

  const isEpisodeWatched = (episodeNumber: number): boolean => {
    if (!watchedEpisodes || seasonNumber == null) return false;
    const seasonEps = watchedEpisodes[String(seasonNumber)];
    return seasonEps?.includes(episodeNumber) ?? false;
  };

  return (
    <div className="space-y-6">
      {episodes.map((ep) => {
        const watched = isEpisodeWatched(ep.episodeNumber);

        return (
          <div
            key={ep.episodeNumber}
            className="flex flex-col sm:flex-row gap-4"
          >
            {ep.stillPath ? (
              <img
                src={ep.stillPath}
                alt={ep.name}
                loading="lazy"
                className="w-full sm:w-48 aspect-video object-cover rounded-lg shrink-0"
              />
            ) : (
              <div className="w-full sm:w-48 aspect-video bg-theme-secondary rounded-lg shrink-0 flex items-center justify-center">
                <span className="text-theme-secondary text-sm">No image</span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-theme-primary font-semibold">
                  E{ep.episodeNumber} &middot; {ep.name}
                </h4>

                {onToggleEpisode && (
                  <button
                    onClick={() => onToggleEpisode(ep.episodeNumber)}
                    className="shrink-0 p-1 transition-colors"
                    aria-label={watched ? "Mark as unwatched" : "Mark as watched"}
                  >
                    {watched ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-500/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-theme-secondary hover:text-green-500" />
                    )}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-theme-secondary mt-1">
                {ep.airDate && <span>{ep.airDate}</span>}
                {ep.runtime && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-theme-secondary" />
                    <span>{ep.runtime} min</span>
                  </>
                )}
                {ep.voteAverage > 0 && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-theme-secondary" />
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
                      {ep.voteAverage.toFixed(1)}
                    </span>
                  </>
                )}
              </div>

              {ep.overview && (
                <p className="text-theme-secondary text-sm mt-2 line-clamp-3">
                  {ep.overview}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EpisodeList;
