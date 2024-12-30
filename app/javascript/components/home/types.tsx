export interface previewMovieType {
  title: string;
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
