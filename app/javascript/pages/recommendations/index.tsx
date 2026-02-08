import React from "react";
import PosterPlaceholder from "../../components/shared/PosterPlaceholder";

interface Recommendation {
  tmdbId: number;
  title: string;
  posterPath: string | null;
  mediaType: string;
  voteAverage: number | null;
}

interface RecommendationGroup {
  sourceTitle: string;
  sourceTmdbId: number;
  sourceType: string;
  recommendations: Recommendation[];
}

interface RecommendationsPageProps {
  hasSharedWatchlist: boolean;
  recommendationGroups: RecommendationGroup[];
}

const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  hasSharedWatchlist,
  recommendationGroups,
}) => {
  if (!hasSharedWatchlist) {
    return (
      <div className="page-container section-spacing">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
            Recommendations
          </h1>
          <div className="bg-theme-secondary rounded-2xl p-8 md:p-12">
            <p className="text-theme-secondary text-lg">
              Connect with a partner on the{" "}
              <a
                href="/analytics"
                className="text-brand-accent hover:underline"
              >
                Watchlist Connect
              </a>{" "}
              page to get recommendations based on what you've both watched.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (recommendationGroups.length === 0) {
    return (
      <div className="page-container section-spacing">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
            Recommendations
          </h1>
          <div className="bg-theme-secondary rounded-2xl p-8 md:p-12">
            <p className="text-theme-secondary text-lg">
              Add some movies or TV shows to your watchlist to get personalised recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container section-spacing">
      <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-8">
        Recommendations
      </h1>

      <div className="space-y-10">
        {recommendationGroups.map((group) => (
          <div key={group.sourceTmdbId}>
            <h2 className="text-lg md:text-xl font-semibold text-theme-primary mb-4">
              Because you watched{" "}
              <a
                href={`/media/${group.sourceTmdbId}?media_type=${group.sourceType}`}
                className="text-brand-accent hover:underline"
              >
                {group.sourceTitle}
              </a>
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
              {group.recommendations.map((rec) => (
                <a
                  key={rec.tmdbId}
                  href={`/media/${rec.tmdbId}?media_type=${rec.mediaType}`}
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden bg-theme-secondary transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl aspect-[2/3]">
                    {rec.posterPath ? (
                      <img
                        src={rec.posterPath}
                        alt={rec.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <PosterPlaceholder className="w-full h-full" />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-theme-secondary truncate">
                    {rec.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;
