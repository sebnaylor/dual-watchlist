import React, { useState, useCallback } from "react";
import { ThumbsUp, X, Star, Sparkles } from "lucide-react";
import { api } from "../../lib/api-client";
import PosterPlaceholder from "../../components/shared/PosterPlaceholder";

interface Recommendation {
  sourceTitle: string;
  sourceTmdbId: number;
  sourceType: string;
  tmdbId: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  mediaType: string;
  voteAverage: number | null;
}

interface RecommendationsPageProps {
  hasWatchlistItems: boolean;
  recommendations: Recommendation[];
}

const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  hasWatchlistItems,
  recommendations,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [addedTmdbIds, setAddedTmdbIds] = useState<Set<number>>(new Set());

  const current = recommendations[currentIndex];
  const remaining = recommendations.length - currentIndex;

  const advance = useCallback(
    (direction: "left" | "right") => {
      setExitDirection(direction);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setExitDirection(null);
      }, 300);
    },
    []
  );

  const handleLike = useCallback(async () => {
    if (!current) return;
    try {
      await api.watchlist.add(current.tmdbId, current.mediaType);
      setAddedTmdbIds((prev) => new Set(prev).add(current.tmdbId));
    } catch {
      // silently fail
    }
    advance("right");
  }, [current, advance]);

  const handleDismiss = useCallback(() => {
    advance("left");
  }, [advance]);

  if (!hasWatchlistItems) {
    return (
      <div className="page-container section-spacing">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
            Recommendations
          </h1>
          <div className="bg-theme-secondary rounded-2xl p-8 md:p-12">
            <Sparkles className="w-12 h-12 text-brand-accent mx-auto mb-4" />
            <p className="text-theme-secondary text-lg">
              Add some movies or TV shows to your{" "}
              <a href="/" className="text-brand-accent hover:underline">
                watchlist
              </a>{" "}
              to get personalised recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0 || currentIndex >= recommendations.length) {
    return (
      <div className="page-container section-spacing">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
            Recommendations
          </h1>
          <div className="bg-theme-secondary rounded-2xl p-8 md:p-12">
            <Sparkles className="w-12 h-12 text-brand-accent mx-auto mb-4" />
            <p className="text-theme-secondary text-lg mb-2">
              {currentIndex > 0
                ? "You've seen all recommendations for now!"
                : "No recommendations available yet."}
            </p>
            {addedTmdbIds.size > 0 && (
              <p className="text-green-400 text-sm">
                {addedTmdbIds.size} {addedTmdbIds.size === 1 ? "title" : "titles"} added to your watchlist
              </p>
            )}
            <a
              href="/recommendations"
              className="inline-block mt-6 px-6 py-3 bg-brand-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Get fresh recommendations
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container section-spacing">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-theme-primary">
            For You
          </h1>
          <span className="text-sm text-theme-secondary">
            {remaining} left
          </span>
        </div>

        <p className="text-theme-secondary mb-4">
          Because you liked{" "}
          <a
            href={`/media/${current.sourceTmdbId}?media_type=${current.sourceType}`}
            className="text-brand-accent hover:underline font-medium"
          >
            {current.sourceTitle}
          </a>
        </p>

        <div
          className={`relative transition-all duration-300 ease-out ${
            exitDirection === "left"
              ? "-translate-x-full opacity-0"
              : exitDirection === "right"
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
          }`}
        >
          <a
            href={`/media/${current.tmdbId}?media_type=${current.mediaType}`}
            className="block rounded-2xl overflow-hidden bg-theme-secondary border border-theme hover:border-brand-primary transition-colors"
          >
            <div className="aspect-video relative">
              {(current.backdropPath || current.posterPath) ? (
                <img
                  src={current.backdropPath || current.posterPath!}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PosterPlaceholder className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-lg md:text-xl font-bold text-white mb-1">
                  {current.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium">
                    {current.mediaType === "Tv" ? "TV Show" : "Movie"}
                  </span>
                  {current.voteAverage && current.voteAverage > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {current.voteAverage}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {current.overview && (
              <p className="text-theme-secondary text-sm p-4 line-clamp-2">
                {current.overview}
              </p>
            )}
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={handleDismiss}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-secondary border border-theme text-theme-secondary hover:text-red-400 hover:border-red-400/50 transition-colors font-medium"
          >
            <X size={20} />
            Skip
          </button>
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white hover:opacity-90 transition-opacity font-medium"
          >
            <ThumbsUp size={20} />
            Add to Watchlist
          </button>
        </div>

        {addedTmdbIds.size > 0 && (
          <p className="text-center text-green-400 text-sm mt-4">
            {addedTmdbIds.size} added to watchlist
          </p>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;
