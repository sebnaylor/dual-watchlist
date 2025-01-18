export interface previewMovieTypes {
  title: string;
  tmdbId: number;
  posterImg: string;
  ratings: ratingsType[];
  runtime: string;
  genres: string[];
}

export interface ratingsType {
  source: string;
  value: string;
  icon: string;
}

export interface watchlistTypes {
  movies: {
    mediaType: string;
    mediaItemId: number;
    mediaTmdbId: number;
    title: string;
    posterImg: string;
  }[];
  tv: {
    mediaType: string;
    mediaItemId: number;
    mediaTmdbId: number;
    title: string;
    posterImg: string;
  }[];
}
