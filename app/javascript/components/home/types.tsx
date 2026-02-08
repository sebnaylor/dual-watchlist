export interface PreviewMovie {
  title: string;
  tmdbId: number;
  posterImg: string;
  ratings: ratingsType[];
  runtime: number;
  genres: string[];
}

// Keep for backwards compatibility
export type previewMovieTypes = PreviewMovie;

export interface ratingsType {
  source: string;
  value: string;
  icon: string;
}

export interface WatchlistItem {
  mediaType: string;
  mediaItemId: number;
  mediaTmdbId: number;
  title: string;
  posterImg: string;
  watched: boolean;
  userImage: string | null;
  userInitials: string;
  addedByCurrentUser: boolean;
  addedAt: string;
  rating: number | null;
  releaseDate: string | null;
}

export interface watchlistTypes {
  movies: WatchlistItem[];
  tv: WatchlistItem[];
}

export type SortOption = "addedAt" | "rating" | "releaseDate" | "title";

export type WatchlistFilter = "all" | "mine" | "partner";
