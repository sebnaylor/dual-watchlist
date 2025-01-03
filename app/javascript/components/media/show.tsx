import React from "react";
import Movie from "./movie";
import Tv from "./tv";
import { ratingsType } from "../home/types";

export interface MediaShowProps {
  media: {
    type: string;
    adult: boolean;
    backdropPath: string;
    backdropPathAspectRatio: number;
    budget: string;
    imdbId: string;
    originCountry: string;
    originalLanguage: string;
    title: string;
    overview: string;
    posterPath: string;
    ratings: ratingsType[] | null;
    releaseDate: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    tmdbId: number;
    tmdbVoteAverage: string | null;
    tmdbVoteCount: string | null;
    watchlistStatus: {
      inPersonalWatchlist: boolean;
    };
  };
  errors: string | null;
}

const MediaShow: React.FC<MediaShowProps> = ({ media, errors }) => {
  console.log(media, errors);

  const renderMedia = (media: MediaShowProps["media"]) => {
    if (media.type === "movie") {
      return <Movie media={media} errors={null} />;
    } else if (media.type === "tv") {
      return <Tv media={media} errors={null} />;
    }
  };

  return <div>{errors ? <div>{errors}</div> : renderMedia(media)}</div>;
};

export default MediaShow;
