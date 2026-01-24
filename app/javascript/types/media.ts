export enum MediaType {
  MOVIE = "Movie",
  TV = "Tv",
}

export interface RatingsType {
  source: string;
  value: string;
  icon: string;
}

export interface StreamOption {
  logoPath: string;
  providerName: string;
  error?: string;
}

export interface StreamOptions {
  buy: StreamOption[];
  stream: StreamOption[];
  rent: StreamOption[];
  error?: string;
}

export interface WatchlistMediaItem {
  id: number;
  watched: boolean;
}

export interface WatchlistStatus {
  inPersonalWatchlist: boolean;
  personalWatchlistMediaItem: WatchlistMediaItem | null;
  inSharedWatchlist: boolean;
  partnersWatchlistMediaItem: WatchlistMediaItem | null;
  userImage: string;
  userInitials: string;
  watchlistPartnerImage: string;
  watchlistPartnerInitials: string;
}

export interface MediaItem {
  id: number;
  tmdbId: number;
  title: string;
  posterPath: string;
  mediaType: MediaType;
  watched: boolean;
}

export interface MediaDetails {
  type: string;
  adult: boolean;
  backdropPath: string;
  backdropPathAspectRatio: number;
  budget: string;
  imdbId: string;
  name: string;
  originCountry: string;
  originalLanguage: string;
  title: string;
  overview: string;
  posterPath: string;
  ratings: RatingsType[] | null;
  releaseDate: string;
  revenue: number;
  runtime: number;
  status: string;
  streamOptions: StreamOptions;
  tagline: string;
  tmdbId: number;
  tmdbVoteAverage: string | null;
  tmdbVoteCount: string | null;
  watchlistStatus: WatchlistStatus;
}

export interface SearchResultMedia {
  posterPath: string;
  tmdbId: number;
  mediaType: string;
}

export interface WatchlistItem {
  mediaItemId: number;
  mediaTmdbId: number;
  title: string;
  posterImg: string;
  watched: boolean;
  userImage: string;
}
