import React from "react";
import { previewMovieTypes } from "./types";
import Ratings from "../shared/Ratings";

export interface MediaPreviewProps {
  previewMovie: previewMovieTypes;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ previewMovie }) => {
  return (
    <div
      style={
        {
          "--image-url": `url(${previewMovie.posterImg})`,
        } as React.CSSProperties
      }
      className="relative h-[500px] w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat object-center"
      onClick={() => {
        window.location.href = `/media/${previewMovie.tmdbId}?media_type=Movie`;
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 from-0% via-transparent via-40% to-black/80 to-100%"></div>
      <div className="relative grid place-items-center h-[500px] drop-shadow-lg">
        <div className="row-start-4 flex flex-col justify-center gap-2 mx-auto">
          <div className="flex justify-center text-2xl font-outline-2">
            {previewMovie.title}
          </div>
          <div className="flex justify-center">
            {previewMovie.runtime} minutes
          </div>
          <div className="flex justify-center gap-x-2">
            {previewMovie.genres.map((genre, index) => (
              <span key={index} className="text-white text-xs font-bold">
                {genre}
              </span>
            ))}
          </div>
          <Ratings ratings={previewMovie.ratings} />
        </div>
      </div>
    </div>
  );
};

export default MediaPreview;
