import React from "react";
import Button from "../shared/Button";

interface MediaShowProps {
  media: {
    tmdbId: string;
    imdbId: string;
    adult: boolean;
    backdropPath: string;
    budget: number;
    origin_country: string;
    original_language: string;
    original_title: string;
    overview: string;
    posterPath: string;
    releaseDate: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    tmdbVoteAverage: number;
    tmdbVoteCount: number;
  };
  errors?: string;
}

const MediaShow: React.FC<MediaShowProps> = ({ media, errors }) => {
  console.log(media, errors);
  return (
    <div>
      <h1>Media Show</h1>
      <div className="flex flex-col">
        <div className="flex">
          {media.title}
          <Button text="Add to list" />
        </div>
        <div className="flex">
          <div className="flex">
            {media.releaseDate}
            {media.adult}
            {media.runtime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaShow;
