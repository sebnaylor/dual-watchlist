import React, { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api-client";
import type { SeasonSummary, SeasonDetail } from "../../types/media";
import EpisodeList from "./EpisodeList";

interface SeasonsSectionProps {
  tmdbId: number;
  seasons: SeasonSummary[];
  watchlistMediaItemId?: number;
  initialWatchedEpisodes?: Record<string, number[]>;
}

const SeasonsSection: React.FC<SeasonsSectionProps> = ({
  tmdbId,
  seasons,
  watchlistMediaItemId,
  initialWatchedEpisodes,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(
    seasons[0]?.seasonNumber ?? 1
  );
  const [cache, setCache] = useState<Record<number, SeasonDetail>>({});
  const [loading, setLoading] = useState(false);
  const [watchedEpisodes, setWatchedEpisodes] = useState<Record<string, number[]>>(
    initialWatchedEpisodes ?? {}
  );

  const fetchSeason = useCallback(
    async (seasonNumber: number) => {
      if (cache[seasonNumber]) return;

      setLoading(true);
      try {
        const { data } = await api.media.getSeason(tmdbId, seasonNumber);
        setCache((prev) => ({ ...prev, [seasonNumber]: data }));
      } catch {
        // Silently fail — EpisodeList will show empty state
      } finally {
        setLoading(false);
      }
    },
    [tmdbId, cache]
  );

  useEffect(() => {
    fetchSeason(selectedSeason);
  }, [selectedSeason, fetchSeason]);

  const handleToggleEpisode = useCallback(
    async (episodeNumber: number) => {
      if (!watchlistMediaItemId) return;

      const season = String(selectedSeason);
      const prev = { ...watchedEpisodes };
      const seasonEps = [...(prev[season] || [])];

      if (seasonEps.includes(episodeNumber)) {
        seasonEps.splice(seasonEps.indexOf(episodeNumber), 1);
      } else {
        seasonEps.push(episodeNumber);
        seasonEps.sort((a, b) => a - b);
      }

      const next = { ...prev };
      if (seasonEps.length === 0) {
        delete next[season];
      } else {
        next[season] = seasonEps;
      }

      setWatchedEpisodes(next);

      try {
        const { data } = await api.watchlist.toggleEpisode(
          watchlistMediaItemId,
          selectedSeason,
          episodeNumber
        );
        setWatchedEpisodes(data.watched_episodes);
      } catch {
        setWatchedEpisodes(prev);
      }
    },
    [watchlistMediaItemId, selectedSeason, watchedEpisodes]
  );

  const currentSeason = cache[selectedSeason];

  return (
    <div className="space-y-6">
      <h3 className="text-xl md:text-2xl font-semibold text-theme-primary">
        Seasons
      </h3>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {seasons.map((season) => (
          <button
            key={season.seasonNumber}
            onClick={() => setSelectedSeason(season.seasonNumber)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSeason === season.seasonNumber
                ? "bg-brand-primary text-white"
                : "bg-theme-secondary text-theme-secondary hover:text-theme-primary"
            }`}
          >
            {season.name}
          </button>
        ))}
      </div>

      <EpisodeList
        episodes={currentSeason?.episodes ?? []}
        loading={loading && !currentSeason}
        watchedEpisodes={watchedEpisodes}
        seasonNumber={selectedSeason}
        onToggleEpisode={watchlistMediaItemId ? handleToggleEpisode : undefined}
      />
    </div>
  );
};

export default SeasonsSection;
