import React, { useState } from "react";
import { api } from "../../lib/api-client";
import { SearchIcon } from "../shared/icons";
import PosterPlaceholder from "../shared/PosterPlaceholder";
import { RefreshCw } from "lucide-react";

export interface MediaProps {
  posterPath: string | null;
  tmdbId: number;
  mediaType: string;
  title?: string;
}

export interface SearchResponseProps {
  media: MediaProps[];
}

interface SearchProps {
  savedImdbUserId?: string | null;
}

const Search: React.FC<SearchProps> = ({ savedImdbUserId }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mediaResponse, setMediaResponse] = useState<SearchResponseProps>({
    media: [],
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function search(term: string) {
    if (!term.trim()) return;

    setIsLoading(true);
    try {
      const response = await api.search.query(term);
      setMediaResponse(response.data);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      search(searchTerm);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-theme-primary/95 backdrop-blur-sm border-b border-theme">
        <div className="page-container py-4 md:py-6">
          <div className="flex gap-3 md:gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for a movie or TV show..."
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl input-theme border border-theme focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SearchIcon
                height={20}
                width={20}
                color="var(--text-muted)"
                className="absolute left-4 top-1/2 -translate-y-1/2"
              />
            </div>
            <button
              onClick={() => search(searchTerm)}
              disabled={isLoading}
              className="px-6 md:px-8 py-3 md:py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-xl transition-all disabled:opacity-50"
            >
              {isLoading ? "..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 page-container section-spacing">
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <SearchIcon height={48} width={48} color="var(--text-muted)" />
            <p className="mt-4 text-theme-secondary text-lg">
              Search for movies and TV shows to add to your watchlist
            </p>

            {savedImdbUserId ? (
              <a
                href="/watchlist/imdb-sync"
                className="mt-6 flex items-center gap-2 px-5 py-3 bg-brand-accent hover:bg-brand-accent/90 text-white font-medium rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Sync IMDB Watchlist
              </a>
            ) : (
              <a
                href="/watchlist/imdb-sync"
                className="mt-6 flex items-center gap-2 text-brand-muted hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Import from IMDB</span>
              </a>
            )}
          </div>
        ) : mediaResponse.media.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-theme-secondary text-lg">
              No results found for "{searchTerm}"
            </p>
            <p className="mt-2 text-theme-muted">
              Try searching for something else
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4 lg:gap-6">
            {mediaResponse.media.map((media) => (
              <a
                key={media.tmdbId}
                href={`/media/${media.tmdbId}?media_type=${media.mediaType}`}
                className="group"
              >
                <div className="rounded-lg overflow-hidden bg-theme-secondary transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl aspect-[2/3]">
                  {media.posterPath ? (
                    <img
                      src={media.posterPath}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PosterPlaceholder className="w-full h-full" />
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
